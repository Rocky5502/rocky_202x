# Embedded comments and reactions — on the article page

This website is hosted on GitHub Pages. It does not require a custom server to embed a reliable moderated conversation: **GitHub Discussions is the persistent backend**, while [giscus](https://giscus.app/) supplies the comments, replies, and emoji reaction interface inside each article.

## Current activation state

**Prepared, but not active until the repository owner finishes GitHub setup.** As of October 15, 2026, Discussions on `Rocky5502/rocky_202x` is disabled, and no Discussions category ID is available. The live website therefore continues displaying the existing GitHub Issues comment/reaction fallback until setup is complete. Do not claim in-page posting works before this activation.

## One-time owner setup (no passwords sent to assistants)

1. On [repository Settings → General](https://github.com/Rocky5502/rocky_202x/settings), under **Features**, enable **Discussions**.
2. Install the verified free [giscus GitHub App](https://github.com/apps/giscus) and grant access to **only** `Rocky5502/rocky_202x`.
3. Open [giscus configuration](https://giscus.app/), enter `Rocky5502/rocky_202x`, and choose the existing **Announcements** category. Use the category type that restricts new discussions to maintainers and applications; readers can still comment/reply/react.
4. Send only the **category ID** (`DIC_...`), not any secret or OAuth code, to the website maintainer. Set `categoryId` in `src/data/giscusSettings.ts` to that ID. The known repository ID is `R_kgDOSeIGfg`.
5. The next tested, merged GitHub Pages build activates the embedded widget for all eight articles. Check one English and one Chinese article using a regular reader account.

## Expected reader experience after activation

- Beneath every article, click **Show comments and reactions**. The giscus widget loads in the page, not as a GitHub redirect.
- Readers can click emojis, write comments, and reply without leaving the article. GitHub may open a temporary authentication window when a reader chooses to participate.
- Reader identity and moderation are managed by GitHub. No visitor authentication token or secret is stored in this website's source.
- The integration uses `data-mapping="specific"` and a stable term derived from the **React article route** (`Rocky Research Notes: /notes/...`). Never change this to `pathname`: GitHub Pages uses HashRouter, so all articles otherwise share `/rocky_202x/`.
- The site supports a single discussion per article across English and Chinese; the iframe receives dark/light mode and language updates. The widget is click-to-load to avoid contacting a third party before reader consent.
- Eight older Issue threads #31–38 have no reader comments as of creation. They are not silently migrated; keep them available in GitHub for historical continuity if needed.

## Security and moderation

- Production Content Security Policy allows `https://giscus.app` for script and iframe; public `https://api.github.com` reads continue to support the legacy fallback. No `unsafe-inline` JavaScript, no wildcard origin, no client-side GitHub personal access tokens.
- Readers sign in to GitHub when they engage. GitHub Discussions controls can hide, lock or remove spam and abusive messages.
- A one-time GitHub App installation is explicit user authorization; automated tools cannot silently perform that action.
- If the category ID is missing or invalid, the existing Issue-based fallback remains functional. Do not invent engagement counts or create an anonymous insecure write endpoint to replace it.

## Tests

Run `bun run test`, TypeScript checks, `scripts/security-audit.cjs` after production CSP injection, and Chromium accessibility/browser audit. The `giscus-discussion.test.tsx` suite covers per-article mapping, the activation gate, lazy iframe insertion, and reaction configuration.
