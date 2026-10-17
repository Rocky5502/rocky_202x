# X Programming — 52-second film release readiness (17 October 2026)

Status: **REVIEW ONLY — NOT RELEASED OR DEPLOYED**

## Creative identity and claims

The X film introduces an experimental language in eight timed visual chapters: clearer code; explicit semantics; a small valid X function; source → parser → types → Core IR research; human/AI-ready inspection; evidence before promises; honest pre-alpha status; and the X logo/tagline **Build what you can verify**.

No private Rust source, proprietary model output, unverified speed benchmark, completed native backend, formal guarantee, or production-readiness claim appears in the website film. The embedded experience has an explicit transcript; the animation is designed to honor `prefers-reduced-motion`.

## Website implementation

- Film route: `public/x/film/index.html`, linked from all seven pre-existing X pages, including their previous inaccessible **Private source** CTA.
- Style: `public/x/assets/film.css`; controller: `public/x/assets/film.js`.
- Security: first-party-only CSP; no inline scripts, inline styles, remote embeds, analytics, or external APIs. The controller uses an HTML `<progress>` element instead of writing inline styles.
- Sitemap: `public/sitemap.xml` now includes `/rocky_202x/x/film/`.
- Static gate: `scripts/verify-x-microsite.py` enumerates eight pages and eight required assets, rejects private compiler links and inline code, verifies routes and the film contract.
- Real-browser gate: `scripts/x-pages-browser-audit.cjs` now includes desktop/mobile film checks for eight chapters, play/pause/replay, 52-second timing text, CSP, and accessibility.

This browser film is a **self-contained 52-second animation**, not an embedded MP4 file. No binary clip has been uploaded to the public GitHub repository in this review.

## Separately rendered MP4 prototype

A local audiovisual deliverable was exported on 17 October 2026. Its measured metadata:

| Field | Value |
|---|---|
| Duration | 52.000 seconds |
| Resolution | 1280 × 720 |
| Frame rate | 24 fps |
| Video | H.264 |
| Audio | AAC |
| Size | 3,648,943 bytes |
| SHA-256 | `5953c48f6e08937c6d2cddbac0976d646418f5d10536ac3f7d7987988d2dd245` |

Filename in local export workspace: `X_Language_Cinematic_52sec_v2.mp4`. It is **not** a repository release asset, a live website asset, or proof of mobile playback in a deployed site. Do not create a `<video src>` pointing to this file until it is uploaded to an approved public host, and content-type, caching, download size, poster, accessibility and license conditions have been reviewed.

The MP4 is a typography-led creative prototype with subtle pan/crossfade motion and ambient audio; do not describe it as a full 3D product-rendering or AI-generated commercial spot. The Descript AI-agent editing attempt was blocked by insufficient account credits; no paid generation was performed.

## Remaining release gates

1. At the **exact final PR SHA**, run `python3 scripts/verify-x-microsite.py`, a production build, first-party source/security checks, X-focused Chromium desktop/mobile route/interaction tests and Axe WCAG audit. Do not substitute an older green SHA.
2. Remediate [dependency issue #22](https://github.com/Rocky5502/rocky_202x/issues/22): an inherited production Bun audit has 18 high-severity advisory findings. Do not suppress or mislabel the failing audit.
3. Review film page navigation, transcript, reduced-motion policy, external link privacy, poster, and user-facing claims on desktop and mobile. The X compiler GitHub source remains private.
4. Obtain publication approval, then merge the reviewed PR; verify Pages deployment SHA and public route availability afterward. No private compiler publication or repo-visibility change is authorized by this film review.

**No completed exact-head browser/audit run, merge or deployment is asserted by this document.**
