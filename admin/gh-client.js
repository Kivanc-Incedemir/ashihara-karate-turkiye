/* =========================================================================
   gh-client.js — thin GitHub Contents API client for the admin panel, plus
   the OAuth popup handshake. The popup protocol (window.open -> listen for
   "authorizing:github" -> echo it back -> receive the final
   "authorization:github:success:{...}" message) is the exact handshake
   cms-oauth/worker.js already implements (it was written to satisfy Decap
   CMS's client), so this talks to that same deployed Worker unchanged.
   ========================================================================= */
(function () {
  const REPO = "Kivanc-Incedemir/ashihara-karate-turkiye";
  const BRANCH = "master";
  const OAUTH_BASE = "https://ashihara-cms-oauth.kivanc-incedemir.workers.dev";
  const API = "https://api.github.com";
  const TOKEN_KEY = "ak-admin-token";

  let TOKEN = null;
  try { TOKEN = localStorage.getItem(TOKEN_KEY) || null; } catch (e) { /* storage blocked */ }

  function utf8ToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function base64ToUtf8(b64) {
    return decodeURIComponent(escape(atob(b64)));
  }

  function authenticate() {
    return new Promise((resolve, reject) => {
      const popup = window.open(`${OAUTH_BASE}/auth`, "ak-cms-auth", "width=560,height=680");
      if (!popup) {
        reject(new Error("Popup engellendi — tarayıcınız popup pencerelerine izin vermiyor."));
        return;
      }

      function onMessage(e) {
        const data = e.data;
        if (data === "authorizing:github") {
          popup.postMessage("authorizing:github", "*");
          return;
        }
        if (typeof data !== "string") return;
        if (data.indexOf("authorization:github:success:") === 0) {
          window.removeEventListener("message", onMessage);
          try {
            const payload = JSON.parse(data.slice("authorization:github:success:".length));
            setToken(payload.token);
            resolve(payload.token);
          } catch (err) {
            reject(err);
          }
        } else if (data.indexOf("authorization:github:error:") === 0) {
          window.removeEventListener("message", onMessage);
          reject(new Error(data.slice("authorization:github:error:".length)));
        }
      }
      window.addEventListener("message", onMessage);
    });
  }

  function setToken(t) {
    TOKEN = t;
    try { localStorage.setItem(TOKEN_KEY, t); } catch (e) { /* storage blocked */ }
  }

  function logout() {
    TOKEN = null;
    try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* storage blocked */ }
  }

  function authHeaders() {
    if (!TOKEN) throw new Error("Oturum yok — önce GitHub ile giriş yapın.");
    return { Authorization: `token ${TOKEN}`, Accept: "application/vnd.github+json" };
  }

  // GET contents API; returns null on 404 (file doesn't exist yet)
  async function getFile(path) {
    const res = await fetch(`${API}/repos/${REPO}/contents/${encodeURI(path)}?ref=${BRANCH}`, {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub okuma hatası (${res.status}): ${path}`);
    const data = await res.json();
    return { sha: data.sha, base64: data.content.replace(/\n/g, "") };
  }

  async function getJson(path) {
    const file = await getFile(path);
    if (!file) return { data: null, sha: null };
    return { data: JSON.parse(base64ToUtf8(file.base64)), sha: file.sha };
  }

  async function putContents(path, base64Content, sha, message) {
    const body = { message, content: base64Content, branch: BRANCH };
    if (sha) body.sha = sha;
    const res = await fetch(`${API}/repos/${REPO}/contents/${encodeURI(path)}`, {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`GitHub yazma hatası (${res.status}): ${err.message || path}`);
    }
    return res.json();
  }

  function putJson(path, data, sha, message) {
    return putContents(path, utf8ToBase64(JSON.stringify(data, null, 2) + "\n"), sha, message);
  }

  function putImageFile(path, base64Content, sha, message) {
    return putContents(path, base64Content, sha, message);
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function getUser() {
    const res = await fetch(`${API}/user`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Kullanıcı bilgisi alınamadı.");
    return res.json();
  }

  window.AK_GH = {
    authenticate,
    logout,
    setToken,
    hasToken: () => !!TOKEN,
    getFile,
    getJson,
    putJson,
    putImageFile,
    fileToBase64,
    getUser,
    rawUrl: (path) => `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}`,
  };
})();
