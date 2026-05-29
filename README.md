# shuklaxd.com

Minimalist landing page. Static HTML/CSS, no build step.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Cloudflare Pages

**Option A — Git (recommended):**
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Pick this repo. Build settings: **Framework preset:** None, **Build command:** *(empty)*, **Output directory:** `/`.
4. After first deploy, add the custom domain `shuklaxd.com` under the project's *Custom domains* tab (Cloudflare will set the DNS records automatically if the domain is on your account).

**Option B — Direct upload via Wrangler:**
```bash
npx wrangler pages deploy . --project-name=shuklaxd
```
