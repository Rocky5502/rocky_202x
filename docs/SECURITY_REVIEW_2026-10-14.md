# Website engineering and security audit — 14 October 2026

**Project:** [Rocky5502/rocky_202x](https://github.com/Rocky5502/rocky_202x)  
**Production:** https://rocky5502.github.io/rocky_202x/  
**Scope:** public Vite/React site, not the owner's other research repositories.

## Executive assessment

The site has no custom backend, visitor login, database or payment checkout. Its main exposure is client-side JavaScript, dependency supply-chain risk, public links, third-party image requests, and GitHub Pages hosting behaviour. Changes in this audit are designed to **improve security, maintain the calm academic design, and preserve English/中文 accessibility**, not to create flashy new homepage sections.

This review is a **targeted application and CI security pass, not a penetration test**, server security assessment, or full manual WCAG inspection. The live site must not be described as “100% secure”.

## Implemented controls

| Area | Change | Verification |
| --- | --- | --- |
| Browser script injection | Production meta Content Security Policy: only same-origin bundled scripts and the pinned SHA-256 hash of the original Person JSON-LD. Inline event attributes, non-site network APIs, framing, embedded objects and form submissions disallowed. | `scripts/harden-dist.cjs`, `scripts/security-audit.cjs`, and real Chromium script-injection checks |
| Browser privacy | `<meta name="referrer" content="no-referrer">` prevents transmitting referral page addresses to third-party destinations. | Static unit check and Chromium metadata check |
| External links | `target="_blank"` anchors use `rel="noopener noreferrer"` to prevent tabnabbing. | Existing source links + security source scan and browser validation |
| Direct URLs | GitHub Pages 404 recovery retains a strict allowlist and preserves only `en` or `zh-CN` query language selection, never untrusted redirect URLs. | `src/test/security.test.ts`, `scripts/security-audit.cjs` |
| Secrets, dynamic execution | Release gate screens first-party TypeScript for common API-token/private-key patterns and dangerous direct script-execution primitives. | `scripts/security-audit.cjs` in verify, preview and publish |
| Lockfile | Migrated from `bun.lockb` and inconsistent `package-lock.json` to a single reviewed `bun.lock`. All production, unit-test, browser and dependency scan workflows use frozen Bun installs. The one-shot write-capable migration workflow was deleted after completion. | [one-time migration run](https://github.com/Rocky5502/rocky_202x/actions/runs/38493845174) and current GitHub workflows |
| Dependency maintenance | Removed unused `firebase`; updated `react-router-dom` to v6.30.6+, `postcss` to v8.5.18+ and `lodash` to v4.18.0+ via package override. Dependabot monitors npm packages and GitHub Actions weekly. | `package.json`, `.github/dependabot.yml`, `.github/workflows/dependency-security.yml` |
| Disclosure | Added [SECURITY.md](../SECURITY.md) with a private report channel and realistic static-hosting boundaries. | GitHub's standard security-policy file |
| Research accuracy | No awards, publication-status changes, CV graduation dates, payment account verification or technical benchmarks were fabricated during this work. | Current existing site regression suite |

### Important hosting limitation

The policy above is an **HTML meta CSP**, not an HTTP response header. GitHub Pages controls delivery headers. Policies that require server-set HTTP headers — such as `frame-ancestors`, HSTS, COOP and COEP — **cannot be fully enforced via this meta tag**. The CSP does not replace secure browser defaults, dependency updates or manual security testing.

Because the page is a GitHub Pages project site, the root `https://rocky5502.github.io/` may host other projects. No response-header claims or ownership of the entire shared hostname are made.

### Existing outbound resources

Site images for the optional PayPal and Google Pay contact panel can load from those providers' official asset domains. Those are **image requests**, not payment processing or third-party JavaScript integration. They remain on the CSP allowlist; `no-referrer` limits leakage of the visitor's portfolio path. Official social/academic links are outbound and may apply their own privacy practices.

## Advisory results — do not hide outstanding work

**Initial actual Bun graph scan:** 25 advisories (1 critical, 24 high) on 14 October 2026. The critical chain involved the unused Firebase package through websocket-driver. **Removing Firebase reduced the tally to 20 high with no critical advisory.** Subsequent direct React Router, PostCSS and Lodash updates reduced the reported count to **18 high** before the lockfile migration.

Most remaining advisories appeared in dependency paths involving **development/build tooling** (ESLint, Tailwind CSS, TypeScript-ESLint, Vitest, PostCSS, nested transitive utilities), even with Bun's `--prod` flag. This is an installed-tree scanner result; it does **not** establish that the vulnerable code is shipped in the static browser bundle or reachable via visitor input. No claim of complete remediation is made. See the latest [Dependency security audit](https://github.com/Rocky5502/rocky_202x/actions/workflows/dependency-security.yml) for current counts.

**Unresolved advisories must remain visible.** They are not suppressed in CI. A failed dependency scan and a successful Vite build measure different things, and must be reported separately.

### Next remediation cycle, prioritized

1. Assess shipped production-bundle dependencies separately from developer/build dependencies, so a toolchain advisory is not described as an exploitable public-web defect.
2. Review/patch `brace-expansion`, `minimatch`, `picomatch`, `cross-spawn`, `glob`, `nanoid`, `source-map-js`, and other transitive packages with compatible patch versions, keeping the `bun.lock` graph frozen and tested. Avoid overrides across incompatible major versions.
3. Track `braces <=3.0.3` advisory GHSA-vfj7-8cjw-p6xm carefully: a safe patched npm release was not established at the time of this review. Prefer an upstream fix or removal of the dependent build-tool path to inventing a nonexistent safe version.
4. Review Dependabot PRs rather than merging them blindly. Preserve 13 published portfolio routes, 11 News records, 62 Awards, bilingual deep links and the user's date-free CV degrees.
5. Run additional keyboard, screen-reader and **actual deployed-site** visual checks when an interactive live-site browser is available.

## How to verify a future release

```bash
bun install --frozen-lockfile
bunx tsc --noEmit -p tsconfig.app.json
bun run test
bun run build
node scripts/harden-dist.cjs
node scripts/security-audit.cjs
bun audit --prod --audit-level=high
```

For user-facing release claims, inspect the *same exact head SHA* in the [Verify portfolio](https://github.com/Rocky5502/rocky_202x/actions/workflows/verify.yml), [Chromium browser audit](https://github.com/Rocky5502/rocky_202x/actions/workflows/browser-audit.yml), [Deploy Vite site to Pages](https://github.com/Rocky5502/rocky_202x/actions/workflows/deploy.yml), and [Dependency security audit](https://github.com/Rocky5502/rocky_202x/actions/workflows/dependency-security.yml).

**Do not label the dependency security workflow passed if it still reports advisories.**
