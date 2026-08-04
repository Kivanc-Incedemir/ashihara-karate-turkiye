/* =========================================================================
   Decap CMS <-> GitHub OAuth proxy, for Cloudflare Workers (free tier).

   GitHub Pages can't run server code, but Decap's "github" backend needs an
   OAuth handshake that requires a client *secret* — which can't live in a
   static site. This tiny Worker is that missing server piece: it brokers
   the GitHub login and hands the resulting access token back to the CMS
   popup window, then GitHub API calls happen straight from the browser.

   Endpoints:
     GET /auth      — redirects the user to GitHub's OAuth consent screen
     GET /callback  — GitHub redirects here; exchanges the code for a token
                      and posts it back to the admin/index.html popup opener

   Deploy instructions: see cms-oauth/README.md in this same folder.
   ========================================================================= */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const SCOPE = "repo,user";
const STATE_MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes to complete login

async function hmac(data, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

// Stateless CSRF token: timestamp + HMAC signature, verified on /callback.
// No KV/session storage needed since the signature itself proves validity.
async function makeState(secret) {
  const ts = Date.now().toString();
  return `${ts}.${await hmac(ts, secret)}`;
}

async function verifyState(state, secret) {
  const [ts, sig] = (state || "").split(".");
  if (!ts || !sig) return false;
  if (sig !== (await hmac(ts, secret))) return false;
  return Date.now() - Number(ts) < STATE_MAX_AGE_MS;
}

function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function renderResult(script, message) {
  return `<!doctype html><html><body>
<script>${script}</script>
<p>${message}</p>
</body></html>`;
}

function renderSuccess(token) {
  const payload = JSON.stringify({ token, provider: "github" }).replace(/'/g, "\\'");
  const script = `
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${payload}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();`;
  return renderResult(script, "Giriş başarılı — bu pencereyi kapatabilirsiniz. / Login successful, you can close this window.");
}

function renderError(message) {
  const safe = message.replace(/'/g, "\\'");
  const script = `
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:error:${safe}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();`;
  return renderResult(script, "Giriş başarısız: " + message);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      if (!env.GITHUB_CLIENT_ID) {
        return html(renderError("Worker is missing GITHUB_CLIENT_ID."), 500);
      }
      const state = await makeState(env.GITHUB_CLIENT_SECRET);
      const redirectUri = `${url.origin}/callback`;
      const authorizeUrl =
        `${GITHUB_AUTHORIZE_URL}?client_id=${encodeURIComponent(env.GITHUB_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(SCOPE)}` +
        `&state=${encodeURIComponent(state)}`;
      return Response.redirect(authorizeUrl, 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (!code || !(await verifyState(state, env.GITHUB_CLIENT_SECRET))) {
        return html(renderError("Invalid or expired login attempt — close this window and try again."));
      }

      const tokenRes = await fetch(GITHUB_TOKEN_URL, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const tokenData = await tokenRes.json();

      if (!tokenData.access_token) {
        const reason = tokenData.error_description || tokenData.error || "GitHub did not return an access token.";
        return html(renderError(reason));
      }

      return html(renderSuccess(tokenData.access_token));
    }

    return new Response(
      "Decap CMS OAuth proxy for Ashihara Karate Türkiye. Endpoints: /auth, /callback",
      { status: 200 }
    );
  },
};
