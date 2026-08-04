# CMS OAuth proxy — one-time setup

`admin/` (the Decap CMS content editor) needs to log editors in via GitHub. GitHub's
OAuth flow requires a client *secret*, and a static site on GitHub Pages can't hold one
safely — so a tiny separate server piece is required to broker the login. `worker.js` is
that piece, sized to run free on Cloudflare Workers. **It is not part of the deployed
site** — it lives in its own Cloudflare Worker, independent of GitHub Pages.

This is a one-time setup. Once done, `/admin/` on the live site works permanently.

## 1. Create a GitHub OAuth App

1. Go to GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name**: anything, e.g. `Ashihara Karate Türkiye CMS`
   - **Homepage URL**: `https://kivanc-incedemir.github.io/ashihara-karate-turkiye/` (or your custom domain once set up)
   - **Authorization callback URL**: `https://ashihara-cms-oauth.<your-subdomain>.workers.dev/callback` — you'll get the exact `<your-subdomain>` in step 2 below; come back and fill this in after deploying.
3. Click **Register application**, then **Generate a new client secret**. Keep the
   **Client ID** and **Client Secret** handy for step 2.

## 2. Deploy the Worker (Cloudflare, free tier)

Requires a free Cloudflare account and Node.js installed locally.

```bash
cd cms-oauth
npx wrangler login          # opens a browser to authorize wrangler with your Cloudflare account
npx wrangler secret put GITHUB_CLIENT_ID
# paste the Client ID from step 1 when prompted
npx wrangler secret put GITHUB_CLIENT_SECRET
# paste the Client Secret from step 1 when prompted
npx wrangler deploy
```

`wrangler deploy` prints the Worker's URL, e.g.
`https://ashihara-cms-oauth.<your-subdomain>.workers.dev`.

## 3. Wire it up

1. Go back to the GitHub OAuth App (step 1) and set its **Authorization callback URL**
   to `<worker-url>/callback`.
2. Edit `admin/config.yml` in this repo and replace the placeholder `base_url` under
   `backend:` with your Worker's URL (no trailing slash, no `/callback`).
3. Commit and push. GitHub Pages will redeploy automatically.

## 4. Try it

Open `https://kivanc-incedemir.github.io/ashihara-karate-turkiye/admin/` (or your custom
domain + `/admin/`), click **Login with GitHub**, and authorize. You'll land in the CMS
with the **Galeri Fotoğrafları** and **Site Metinleri** collections.

Note: anyone who logs in must be a **collaborator on this GitHub repo** — Decap has no
separate account system of its own. Add editors under the repo's
**Settings → Collaborators**.
