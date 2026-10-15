/**
 * Each article has one GitHub Issue used only for reader responses.
 * Data is public; no GitHub token, OAuth client secret, or third-party database.
 * Visitors react/comment using GitHub's own authenticated UI.
 */
export const articleThreads: Readonly<Record<string, number>> = Object.freeze({
  "/notes/essays/when-ai-says-i-know": 31,
  "/notes/ten-rules-phd-research-ai": 32,
  "/notes/essays/dear-younger-me-success-is-not-what-you-think": 33,
  "/notes/are-we-asking-the-right-questions": 34,
  "/notes/essays/why-i-choose-to-study-uncertainty": 35,
  "/notes/essays/what-does-it-mean-to-be-a-scientist-in-the-age-of-ai": 36,
  "/notes/essays/the-experiments-that-failed": 37,
  "/notes/essays/the-boy-from-nepal-who-refused-to-stop-dreaming": 38,
});

export const commentsRepo = "Rocky5502/rocky_202x";
export const discussionUrl = (issueNumber: number) =>
  `https://github.com/${commentsRepo}/issues/${issueNumber}`;

export const commentUrl = (issueNumber: number) =>
  discussionUrl(issueNumber) + "#new_comment_field";
