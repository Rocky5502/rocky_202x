# In-page article comments and likes

## Production integration

All eight Research Notes share one secure, directly embedded **giscus / GitHub Discussions** interaction system, with one discussion per article.

- Repository: `Rocky5502/rocky_202x`
- Repo node ID: `R_kgDOSeIGfg`
- Discussion category: **Announcements** (the format recommended by Giscus for app-created, moderated discussion threads; regular users can comment but cannot independently create announcements)
- Category ID: `DIC_kwDOSeIGfs4DIhO6` (retrieved 2026-10-15 through a GitHub Actions job running a GitHub GraphQL query with the repository's scoped `GITHUB_TOKEN`)
- Mapping: `specific` with a unique fixed `Rocky Research Notes: /notes/...` term for each of the eight HashRouter paths.
- Reactions: enabled, along with comments and replies.
- Language: English or Chinese. Site theme: light or dark.

The embedded widget loads on the article page. Unlike the retired Issues-based prototype, the website has **no buttons redirecting to GitHub Issues to leave a like or comment**. A Github sign-in popup may be required to participate. The login, data persistence, moderation, and reactions are managed by GitHub Discussions, so there are no secrets, pretend counts, or unprotected anonymous write endpoints in the public site.

## October 16, 2026: Owner installation and real-browser verification

The site owner reports installing the official giscus GitHub App for the repository. A **read-only** Playwright/Chromium test of a production-built preview then confirmed that the live giscus service renders its iframe, the reactions section, the comment editor, and GitHub sign-in on both an English article and a Chinese mobile article. The test did **not** sign in or post a test discussion.

Two concrete website-side bugs were resolved:
- The strict production Content Security Policy previously blocked `https://giscus.app/default.css`. The new policy permits that **single exact stylesheet origin**; it does not allow general remote CSS or scripts.
- Giscus sends `Discussion not found` when an article has no reader interaction yet. That is an **expected** state: Giscus creates the thread on the first comment or reaction. The website no longer hides the working widget after that notification. It also allows Giscus to recover automatically from expired OAuth session notifications.

The read-only test is recorded in `scripts/giscus-live-probe.cjs`, and `.github/workflows/giscus-live-smoke.yml` performs an additional check after a successful main-branch Pages deployment. This is an **anonymous widget availability test**, not an authenticated end-to-end comment-submission certification. A person must still test the actual login and posting flow once.

## Important post-deployment verification

The category ID and repo Discussions enabled state have been confirmed by the repository's GraphQL API. A successful build **does not prove the giscus GitHub App was installed with repository permissions**, nor does it prove individual readers can log in and post. After deployment, visit one article, scroll to the embedded widget, and test a real 👍 and a comment while logged in. If giscus says the Discussions API is unavailable, the owner must confirm the [giscus GitHub App](https://github.com/apps/giscus) has access to this repo.

## Moderation and privacy

Discussed content is public on GitHub Discussions. The website does not store visitors' GitHub OAuth credentials. Moderators can manage spam and abusive replies through the repository's Discussions interface. The website restricts remote scripts/iframes via its CSP to `giscus.app`. No local browser-only likes are presented as global statistics.

The former eight GitHub Issues reader threads may remain archived in GitHub, but are not linked or requested by the website.

## Maintaining the implementation

- `src/data/giscusSettings.ts` holds the public category and repo IDs.
- `src/components/GiscusDiscussion.tsx` mounts the in-page widget and follows website language/theme.
- `src/components/ArticleEngagement.tsx` attaches the widget to each article.
- Regression tests: `src/test/article-engagement.test.tsx` and `src/test/giscus-discussion.test.tsx`.
- Security policy: `scripts/harden-dist.cjs` and `scripts/security-audit.cjs`.

Do not switch giscus to `pathname` mapping: GitHub Pages uses HashRouter, and that would collapse all articles into a single shared discussion.
