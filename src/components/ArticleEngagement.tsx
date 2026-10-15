import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Heart, MessageCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { articleThreads, commentUrl, commentsRepo, discussionUrl } from "@/data/articleThreads";
import "@/article-engagement.css";

type GitHubIssue = {
  number: number; comments: number; state: string; locked?: boolean;
  reactions?: { "+1"?: number; heart?: number };
};
type GitHubComment = {
  id: number; body: string | null; created_at: string;
  html_url?: string;
  user?: { login?: string; avatar_url?: string };
};
type EngagementData = { appreciations: number; commentCount: number; comments: GitHubComment[] };

const apiBase = "https://api.github.com/repos/" + commentsRepo;
const requestHeaders = { Accept: "application/vnd.github+json" };
const trustedAvatar = (url: string | undefined) =>
  url && /^https:\/\/avatars\.githubusercontent\.com\/u\/\d+(?:\?.*)?$/.test(url) ? url : null;
const validUser = (login: string | undefined) => login && /^[A-Za-z0-9-]{1,39}$/.test(login) ? login : null;
const safeCommentLink = (url: string | undefined, issue: number) => {
  if (!url) return discussionUrl(issue);
  try {
    const parsed = new URL(url);
    const root = new URL(discussionUrl(issue));
    return parsed.origin === root.origin &&
      parsed.pathname === root.pathname && /^issuecomment-\d+$/.test(parsed.hash.slice(1)) ? parsed.href : root.href;
  } catch { return discussionUrl(issue); }
};

const copy = {
  en: {
    eyebrow: "Reader conversation", title: "Thoughts, questions & reactions",
    description: "A thoughtful conversation makes every essay better. Read responses below, or join the discussion using your GitHub account.",
    appreciate: "Like this article on GitHub", comment: "Write a comment",
    likes: "likes", comments: "comments", loading: "Loading reader responses…",
    empty: "Be the first to share a thoughtful response.",
    unavailable: "Live counts are temporarily unavailable. You can still open the conversation on GitHub.",
    refresh: "Refresh responses", read: "Read on GitHub", full: "View full comment on GitHub",
    viewAll: "See all comments on GitHub", trust: "Sign in with GitHub to participate. No account details are collected by this site.",
    updated: "Responses are stored and moderated in the public GitHub repository.",
  },
  zh: {
    eyebrow: "读者交流", title: "想法、提问与回应",
    description: "有价值的交流能让每篇文章变得更好。您可以阅读下方评论，或通过 GitHub 账号参与讨论。",
    appreciate: "在 GitHub 点赞", comment: "发表评论",
    likes: "点赞", comments: "评论", loading: "正在加载读者评论…",
    empty: "欢迎留下第一条有价值的评论。",
    unavailable: "暂时无法获取实时数据，仍然可以在 GitHub 参与讨论。",
    refresh: "刷新评论", read: "前往 GitHub 阅读", full: "在 GitHub 查看完整评论",
    viewAll: "在 GitHub 查看所有评论", trust: "需要通过 GitHub 登录参与。本网站不会收集您的账号信息。",
    updated: "评论与回应保存在公开 GitHub 仓库中，并可进行审核管理。",
  },
};

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, headers: requestHeaders });
  if (!response.ok) throw new Error("GitHub public API returned HTTP " + response.status);
  return response.json() as Promise<T>;
}

export default function ArticleEngagement({ articlePath }: { articlePath: string }) {
  const { language } = useLanguage();
  const zh = language === "zh-CN";
  const c = zh ? copy.zh : copy.en;
  const issue = articleThreads[articlePath];
  const [data, setData] = useState<EngagementData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!issue) return;
    const controller = new AbortController();
    setStatus("loading");
    setData(null);
    const endpoint = apiBase + "/issues/" + issue;
    Promise.all([
      fetchJson<GitHubIssue>(endpoint, controller.signal),
      fetchJson<GitHubComment[]>(endpoint + "/comments?per_page=100", controller.signal),
    ]).then(([thread, comments]) => {
      if (controller.signal.aborted) return;
      if (thread.number !== issue || !Array.isArray(comments)) throw new Error("Unexpected issue response");
      setData({
        appreciations: Math.max(0,Number(thread.reactions?.["+1"] ?? 0)) + Math.max(0,Number(thread.reactions?.heart ?? 0)),
        commentCount: Math.max(0, Number(thread.comments ?? 0)),
        comments: comments.filter(item => Number.isSafeInteger(item.id) && item.id > 0 && typeof item.body === "string")
          .sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at)).slice(0,8),
      });
      setStatus("ready");
    }).catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [issue, refresh]);

  const onRefresh = useCallback(() => setRefresh(n => n+1), []);
  if (!issue) return null;
  const github = discussionUrl(issue);

  return <section className="article-engagement" aria-labelledby="reader-conversation-title" id="reader-conversation">
    <div className="article-engagement-heading">
      <p className="eyebrow">{c.eyebrow}</p>
      <h2 id="reader-conversation-title">{c.title}</h2>
      <p>{c.description}</p>
    </div>
    <div className="article-engagement-summary" aria-live="polite">
      <div className="article-engagement-metrics">
        <span><Heart size={17} aria-hidden="true" /> <strong>{status === "ready" ? data?.appreciations : "—"}</strong> {c.likes}</span>
        <span><MessageCircle size={17} aria-hidden="true" /> <strong>{status === "ready" ? data?.commentCount : "—"}</strong> {c.comments}</span>
      </div>
      <div className="article-engagement-actions">
        <a href={github} target="_blank" rel="noopener noreferrer" className="article-engagement-like"><Heart size={17} aria-hidden="true" /> {c.appreciate} <ArrowUpRight size={14} aria-hidden="true" /></a>
        <a href={commentUrl(issue)} target="_blank" rel="noopener noreferrer" className="article-engagement-comment"><MessageCircle size={17} aria-hidden="true" /> {c.comment} <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </div>
    <div className="article-engagement-list">
      <div className="article-engagement-list-header">
        <h3>{c.comments}</h3>
        <button type="button" onClick={onRefresh} disabled={status === "loading"}><RefreshCw size={14} aria-hidden="true" /> {c.refresh}</button>
      </div>
      {status === "loading" && <p role="status" className="article-engagement-state">{c.loading}</p>}
      {status === "error" && <p role="status" className="article-engagement-state">{c.unavailable}</p>}
      {status === "ready" && data?.comments.length === 0 && <p className="article-engagement-state">{c.empty}</p>}
      {status === "ready" && data?.comments.map(item => {
        const user = validUser(item.user?.login);
        const avatar = trustedAvatar(item.user?.avatar_url);
        return <article key={item.id} className="article-engagement-entry">
          <div className="article-engagement-author">
            {avatar ? <img src={avatar} alt="" width="34" height="34" loading="lazy" referrerPolicy="no-referrer"/> : <span className="article-engagement-avatar" aria-hidden="true"><MessageCircle size={17}/></span>}
            <div><strong>{user || (zh ? "GitHub 用户" : "GitHub reader")}</strong>
              <time dateTime={item.created_at}>{Number.isFinite(Date.parse(item.created_at)) ? new Intl.DateTimeFormat(zh ? "zh-CN" : "en-US",{dateStyle:"medium"}).format(new Date(item.created_at)) : ""}</time>
            </div>
          </div>
          <p className="article-engagement-body">{item.body?.slice(0,2000)}{(item.body?.length ?? 0)>2000 ? "…" : ""}</p>
          <a className="article-engagement-external" href={safeCommentLink(item.html_url, issue)} target="_blank" rel="noopener noreferrer">{c.full} <ArrowUpRight size={13} aria-hidden="true" /></a>
        </article>;
      })}
      {status === "ready" && data && data.commentCount > data.comments.length && <a href={github} target="_blank" rel="noopener noreferrer" className="article-engagement-all">{c.viewAll} <ArrowUpRight size={14} aria-hidden="true"/></a>}
    </div>
    <p className="article-engagement-privacy"><ShieldCheck size={16} aria-hidden="true"/><span>{c.trust} {c.updated}</span></p>
  </section>;
}
