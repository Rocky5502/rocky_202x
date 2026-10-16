# Anonymous likes: production guide (October 16, 2026)

## What visitors see

Once activated, the eight Research Notes show a **Like / Liked** button and an authoritative shared count with **no GitHub or Google login**. Readers can undo their own vote. The independent Giscus section remains for GitHub-authenticated **comments and replies**, with duplicate Giscus reactions disabled.

While the backend is not actually provisioned, `public/anonymous-likes-config.json` contains `{"apiBaseUrl": null}`. No anonymous counter, fabricated count, client-side-only total, or invalid API hostname is shown. Existing Giscus reactions continue normally until the new backend is enabled.

## Architecture

- **Frontend:** `src/components/AnonymousLike.tsx`, one site-local random UUID v4 stored in the visitor's browser (not an email, login, fingerprint, or account).
- **Backend:** `cloudflare/anonymous-likes/src/index.mjs`, Cloudflare Worker using a secret HMAC-SHA256 of the UUID.
- **Database:** Cloudflare **D1** SQLite. `PRIMARY KEY(article,visitor_hash)` rejects duplicate votes; SQL insert/delete triggers update the shared count atomically, including under concurrent requests.
- **Abuse protection:** Cloudflare rate-limit binding (40 writes/minute per daily hashed network identifier), a daily maximum of 32 new votes per hashed IP shared across all eight essays, exact article allowlist, input length/type checks, and strict browser Origin and CORS checks. A bot with changing devices/IPs can still game anonymous popularity counts. Network caps can affect many legitimate readers on a shared institutional network.
- **Privacy:** No raw IP, Google/GitHub login, email, or user-agent fingerprint is saved in D1. HMACs of browser IDs remain for as long as the visitor's vote is active; keyed daily IP hashes in rate-budget records are deleted by the Worker scheduled task after 3 days. Cloudflare may separately handle or log network details under its platform policies. Do not claim perfect anonymity or one vote per human.
- **Availability:** If the API cannot be reached, no number is invented; the button is disabled and an error is displayed.

## One-time deployment by repository owner

**Cloudflare account and permission required.** There is no Cloudflare deployment account connected to the current ChatGPT tools; this cannot be marked live before these steps succeed.

1. Choose the Cloudflare Workers **Free** plan, which supports Workers and D1 subject to daily use caps. Cloudflare may change terms. Pricing: https://developers.cloudflare.com/workers/platform/pricing/
2. From a working local clone of `Rocky5502/rocky_202x`, in Bash / WSL:
   ```bash
   cd cloudflare/anonymous-likes
   npx wrangler login
   npx wrangler d1 create rocky-research-anonymous-likes
   ```
   Copy the **actual UUID** returned into the `d1_databases[0].database_id` property in `wrangler.jsonc`, replacing `REPLACE_WITH_YOUR_D1_DATABASE_ID`. Do not invent a UUID or commit secrets.
3. Apply the audited database migration to the real database:
   ```bash
   npx wrangler d1 migrations apply rocky-research-anonymous-likes --remote
   ```
4. Set a secret unique to this backend, **never in Git or the browser**, then deploy:
   ```bash
   openssl rand -hex 32 | npx wrangler secret put LIKE_HMAC_SECRET
   npx wrangler deploy
   ```
   Cloudflare displays the real HTTPS Workers URL. Verify that a GET to `<URL>/v1/likes/ten-rules-phd-research-ai` returns `{"article":"ten-rules-phd-research-ai","count":0,"liked":false}` before enabling the website. The initial count is 0 only if the database is actually new.
5. In the repository's `public/anonymous-likes-config.json`, change `apiBaseUrl` from `null` to the **exact real Worker origin**, e.g. `"https://rocky-research-anonymous-likes.YOUR-SUBDOMAIN.workers.dev"`. The hardening step validates HTTPS and the workers.dev suffix, then admits **only that precise origin** in the website Content Security Policy.
6. Commit this config change to `main`; wait for matching **Verify portfolio**, **Chromium browser audit**, and **Deploy Vite site to Pages** green runs. The previous standalone Giscus reactions disappear, replaced by the new anonymous Like button. Giscus comments remain.
7. Confirm in an unauthenticated/incognito browser: like one article, reload to see the same counted vote, unlike to decrement, and verify the other articles' totals are independent. Test Chinese and mobile layouts. Check D1 metrics and Cloudflare Worker logs without logging voter tokens or raw IPs.

## Test and release commands

```bash
node --test scripts/test-anonymous-likes.mjs
python3 scripts/test-anonymous-likes-schema.py
bun run test
bunx tsc --noEmit -p tsconfig.app.json
bun run build
node scripts/harden-dist.cjs
node scripts/security-audit.cjs
```

## Required boundaries

- **Do not** collect private GitHub/Google credentials, add a GitHub token to client code, write anonymous votes through a public GitHub token, store or expose the Worker HMAC secret, or imply Giscus can perform unauthenticated GitHub reactions.
- **Do not** show a hard-coded or browser-local-only number as a real public total.
- Do not migrate the already-existing Giscus reactions into this new metric; they are not equivalent systems.
- HMAC-secret rotation changes a visitor's ability to recognize their old vote. Back up secrets securely if you want vote continuity.
- This is a lightweight appreciation mechanism, **not** a scientifically validated readership or unique-user metric.
