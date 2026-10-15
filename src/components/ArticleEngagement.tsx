import GiscusDiscussion from "@/components/GiscusDiscussion";

/** All article engagement happens inside the webpage via GitHub Discussions.
 * No legacy GitHub-issue redirect buttons or fake browser-local counters.
 */
export default function ArticleEngagement({articlePath}:{articlePath:string}) {
  return <GiscusDiscussion articlePath={articlePath}/>;
}
