# Working in this repo

## Branch workflow (claude-branch-flow)

Changes made by Claude in this repo follow a verify-before-merge flow. **`main`
is never edited directly** — it only ever receives changes that have been run
locally and explicitly approved.

1. **Branch first.** Before any edit, switch to the `claude` working branch off
   the latest `main`: `git checkout -B claude`. A global `PreToolUse` hook
   (`~/.claude/hooks/block-default-branch-edits.sh`) blocks Edit/Write while the
   repo is on `main`, so this step is mandatory, not optional.
2. **Work + commit on `claude`.** Make all changes there.
3. **Deploy locally for review** (see below) and tell the user how to verify.
4. **Wait for explicit confirmation**, then merge into `main`
   (`git checkout main && git merge --no-ff claude`).
5. **Push is a separate, confirmed step** — pushing `main` triggers the
   Cloudflare deploy, so don't push unless asked.

Escape hatch: set `CLAUDE_ALLOW_MAIN_EDITS=1` for the session to edit `main`
directly (rarely needed).

## Run locally

```bash
# static only (no clipboard API)
python3 -m http.server 8000 --directory public   # http://localhost:8000

# full stack (site + Worker + local KV), so the Clipboard tab works
npx wrangler dev
```

## Layout

- `public/` — the static site that gets served (HTML/CSS/JS, no build step)
- `worker/index.js` — Worker: `/api/clipboard`, falls through to `public/`
- `wrangler.jsonc` — Worker + assets + KV config

Deploys via Cloudflare Workers Builds on push to `main` (or `npx wrangler deploy`).
