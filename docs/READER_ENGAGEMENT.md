# In-page article comments and likes

## Production integration

All eight Research Notes share one secure, directly embedded **giscus / GitHub Discussions** interaction system, with one discussion per article.

- Repository: `Rocky5502/rocky_202x`
- Repo node ID: `R_kgDOSeIGfg`
- Discussion category: **Announcements**
- Category ID: `DIC_kwDOSeIGfs4DIhO6` (retrieved 2026-10-15 through a GitHub Actions job running a GitHub GraphQL query with the repository's scoped `GITHUB_TOKEN`)
- Mapping: `specific` with a unique fixed `Rocky Research Notes: /notes/...` term for each of the eight HashRouter paths.
- Reactions: enabled, along with comments and replies.
- Language: English or Chinese. Site theme: light or dark.

The embedded widget loads on the article page. Unlike the retired Issues-based prototype, the website has **no buttons redirecting to GitHub Issues to leave a like or comment**. A Github sign-in popup may be required to participate. The login, data persistence, moderation, and reactions are managed by GitHub Discussions, so there are no secrets, pretend counts, or unprotected anonymous write endpoints in the public site.

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
