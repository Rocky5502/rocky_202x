# Article reader conversations

Eight publicly accessible research notes have dedicated GitHub Issue threads (see `src/data/articleThreads.ts`). This is a deliberate **no-secrets, GitHub-Pages-compatible** reader-feedback feature. It does not create a custom API, ask visitors for email addresses, or store likes in `localStorage`.

## Reader experience

- On every article: counts of **GitHub thumbs-up and heart reactions** to the opening issue (shown together as “likes”), the number of comments, and up to eight of the most recent comments fetched from a maximum of 100 available through the public GitHub API.
- Visitors can see public comments without signing in. They click **Like this article on GitHub** to choose 👍 or ❤️ on the opening issue, or **Write a comment** to post on the matching thread. GitHub sign-in is required to write/react.
- The article page never submits reactions or comments via an unauthenticated frontend request. **Do not describe the reaction control as a one-click in-page like button.** It is a link to GitHub’s secure UI.
- Reader comments render as plain text in React, not raw HTML or untrusted Markdown. External avatars are restricted to `avatars.githubusercontent.com`; GitHub comment links are validated to remain inside the correct issue. Comment text is capped at 2,000 characters and the source link shows the full comment.
- Fail-open viewing: if the GitHub public API is down or rate-limited, counts read as unavailable and the public GitHub posting links continue to work.
- English and Chinese share **the same one thread per article**, including after a language switch. Article URLs and dates are unchanged.

## Moderation

1. Open [the repository's Issues](https://github.com/Rocky5502/rocky_202x/issues) and search for `[Reader discussion]`. Eight specific Issue URLs are recorded in `src/data/articleThreads.ts`.
2. Use GitHub's issue moderation controls to hide, report, delete, or lock abusive or off-topic contributions. Locking an issue stops new comments; public comments already visible may still be read.
3. To avoid deleting discussions accidentally, do not rename routes or renumber/migrate threads without updating `articleThreads.ts`. Closing an issue can also prevent new participation. Avoid closing them as “completed” work.
4. There is no anonymous comment form, unverified email collection, local data storage, or fake engagement counter.
5. The GitHub API has unauthenticated rate limits (often 60 requests/hour per IP). The article UI makes two GET requests per article view and provides manual refresh; it does not poll continually. The user may read/follow the original thread directly even when counts are unavailable.

## Future upgrade: fully embedded replies and reactions

**Not yet active:** GitHub Discussions is disabled on this repository as of October 15, 2026. For true in-page posting, enabling GitHub Discussions and connecting [giscus](https://giscus.app/) is an option. That needs the owner to:
- Enable **Settings → General → Features → Discussions** on `Rocky5502/rocky_202x`.
- Install the official **giscus GitHub App** with repository-scoped access.
- Choose a dedicated Discussions category and record the correct repository/category IDs from giscus.
- Migrate or preserve existing Issue conversations thoughtfully before changing providers.

**Never** hardcode private credentials, introduce OAuth secrets in the public Vite bundle, fake counts, or silently switch off public Issue threads. The GitHub Issues approach above is functional without these additional steps.

## Smoke tests

Verify for each article: correct opening issue, both GitHub actions, public comment visibility or graceful fallback, markup-safe text, English/Chinese, mobile layout, dark mode, and public GitHub API latency. GitHub Actions checks are in `.github/workflows`. No backend hosting or service charge is required for the described Issues integration.
