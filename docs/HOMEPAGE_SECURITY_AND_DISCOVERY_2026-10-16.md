# Homepage security and quality follow-up — 16 October 2026

**Repository:** `Rocky5502/rocky_202x`  
**Scope:** Static GitHub Pages academic portfolio (including its shared repository tools).  
**Review status:** Automated validation of the maintenance branch; live visitor security and third-party sign-in are not independently certified.

## Actions completed

1. Ran **Bun 1.4.3** `bun audit fix --ignore-scripts` against the **existing frozen dependency graph** in a temporary, branch-limited GitHub Actions workflow. No major direct-dependency update was requested.
2. Bun reported **56 advisory instances fixed in 20 packages** when considering its whole dependency graph. Only `bun.lock` was updated. This number is **not equivalent** to the previous filtered high-severity count; avoid comparing different scanner scopes.
3. Confirmed a clean TypeScript check, Vitest (**94 tests passed / 15 files**), Vite production build, strict first-party CSP generation, and security source scans **on the repaired lockfile**.
4. Adjusted two image tests that were bound to one specific Vite bundling representation. Local SVG images are valid whether compiled as same-origin asset URLs or compact `data:image/svg+xml` URLs; external image URLs are still disallowed in those assertions.
5. Deleted the temporary write-permitted workflow after the validated lockfile was committed. The published CI retains its read-only verification and explicit high/critical audit gate.

## Remaining advisory: not suppressed

The post-repair `bun audit --prod --audit-level=high` output on the branch reports **one high-severity finding**:

- **`braces@3.0.3`** — GitHub advisory [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), deeply nested-pattern stack exhaustion. Dependency chains include `tailwindcss → micromatch → braces` and `typescript-eslint → ... → micromatch → braces`.
- The Bun repair output marked this finding **“no published version fixes”** at the time of the check. The advisory remains visible and causes the dependency workflow to fail.
- Its listed chains are **local build / lint dependencies**, not evidence that `braces` runs inside the browser-facing static site. This is an exposure distinction, **not** a declaration that the dependency is safe or that remediation is complete.
- Next: revisit available patches for the actual resolved dependency and test an upstream `micromatch` / Tailwind / TypeScript-ESLint upgrade when a compatible fix exists. Do not add audit ignores or silence CI merely to obtain a green badge.

**Scanner interpretation:** `bun audit fix` reported additional unfiltered residual advisories while `bun audit --prod --audit-level=high` reported one. These are different filters; never combine their counts.

## Giscus reader discussion review

- The repository's **Announcements** category ID is confirmed from authenticated repository GraphQL CI. Although regular users cannot create new Announcements themselves, **Giscus explicitly recommends** the Announcements format for app-created threads. Therefore the category is left unchanged.
- The site has correct category ID, explicit per-essay discussion terms (needed for HashRouter), and a graceful visitor fallback if the app or external service is unavailable.
- **Still requires owner testing:** confirm the giscus GitHub App has access to this repository and that a non-maintainer signed-in visitor can actually like, comment and reply on an essay. JavaScript/unit CI cannot prove the external OAuth flow.

## Discovery improvements

Research Notes now also have an independently crawlable **real HTML collection route** at `/rocky_202x/notes/`, with visible essay descriptions, honest editorial classification, a canonical URL, sitemap inclusion, and a secure static stylesheet. The interactive English/Chinese essay URLs remain unchanged.

This improves discovery of the **collection**. Hash-fragment essay URLs themselves are **not automatically independent search-index entries**; per-essay server-rendered publication pages would be a separate future enhancement.

## Limits and next priorities

- Verify end-to-end real Giscus interaction manually in a logged-in browser.
- Evaluate the patched production site on real iOS / Android and with screen readers. Passing automated Chromium and axe checks does not certify complete accessibility.
- Keep dependency audits and lockfile repair separate from unverified scientific and CV claims. Avoid ungrounded achievements or inflated publication counts.
- The static site's CSP is a **meta policy**, not a server-set HTTP CSP, because GitHub Pages controls response headers.
