import { useEffect, useMemo, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import "@/anonymous-likes.css";

const STORAGE_KEY = "rocky-anonymous-reaction-visitor-v1";
type ReactionResult = { article: string; count: number; liked: boolean };
type Props = { articlePath: string; apiBaseUrl: string };

function getAnonymousVisitorId() {
  let id: string | null = null;
  try { id = window.localStorage.getItem(STORAGE_KEY); } catch { /* storage blocked */ }
  if(id && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
    return id;
  id = window.crypto.randomUUID();
  try { window.localStorage.setItem(STORAGE_KEY, id); } catch { /* session-only */ }
  return id;
}

function validResponse(value: unknown, slug: string): value is ReactionResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<ReactionResult>;
  return result.article === slug
    && Number.isSafeInteger(result.count) && (result.count as number) >= 0
    && typeof result.liked === "boolean";
}

const errorCopy = (zh: boolean, limited = false) => limited
  ? (zh ? "操作过于频繁，请稍后再试。" : "Too many reactions; please try later.")
  : (zh ? "暂时无法获取点赞信息，请稍后重试。" : "Likes are temporarily unavailable. Try again later.");

export default function AnonymousLike({articlePath, apiBaseUrl}: Props) {
  const { language } = useLanguage();
  const zh = language === "zh-CN";
  const slug = useMemo(() => articlePath.split("/").at(-1) || "", [articlePath]);
  const visitorId = useMemo(() => getAnonymousVisitorId(), []);
  const [result, setResult] = useState<ReactionResult | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    const abort = new AbortController();
    setResult(null);
    setMessage("");
    setLoading(true);
    fetch(apiBaseUrl + "/v1/likes/" + encodeURIComponent(slug), {
      method: "GET",
      headers: {"X-Anonymous-Visitor": visitorId},
      cache: "no-store",
      signal: abort.signal,
    }).then(async response => {
      if (!response.ok) throw new Error("read_failed");
      const data: unknown = await response.json();
      if (!validResponse(data, slug)) throw new Error("invalid_result");
      setResult(data);
    }).catch(() => {
      if (!abort.signal.aborted) setMessage(errorCopy(zh));
    }).finally(() => {
      if (!abort.signal.aborted) setLoading(false);
    });
    return () => abort.abort();
  }, [apiBaseUrl, slug, visitorId, zh]);

  async function toggle() {
    if (!result || busy.current) return;
    busy.current = true;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(apiBaseUrl + "/v1/likes/" + encodeURIComponent(slug), {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({visitorId, liked: !result.liked}),
        cache: "no-store",
      });
      if (!response.ok) {
        const limited = response.status === 429;
        setMessage(errorCopy(zh,limited));
        return;
      }
      const data: unknown = await response.json();
      if (!validResponse(data,slug)) throw new Error("invalid_result");
      setResult(data);
    } catch {
      setMessage(errorCopy(zh));
    } finally {
      busy.current = false;
      setSaving(false);
    }
  }

  return (
    <section className="anonymous-like" aria-label={zh ? "匿名点赞" : "Anonymous appreciation"}>
      <div className="anonymous-like-copy">
        <p className="anonymous-like-eyebrow">{zh ? "不需登录" : "No account required"}</p>
        <h2>{zh ? "喜欢这篇文章吗？" : "Enjoyed this article?"}</h2>
        <p>{zh ? "点一下爱心即可支持作者。不需要 GitHub 或 Google 账号。" : "Tap the heart to appreciate it. No GitHub or Google sign-in."}</p>
      </div>
      <div className="anonymous-like-action">
        <button type="button" onClick={toggle} aria-pressed={Boolean(result?.liked)}
          disabled={loading || saving || !result}
          aria-label={result?.liked
            ? (zh ? "取消匿名点赞" : "Remove anonymous like")
            : (zh ? "匿名点赞文章" : "Like article anonymously")}>
          <Heart size={19} fill={result?.liked ? "currentColor" : "none"} strokeWidth={1.7} aria-hidden="true"/>
          <span>{saving ? (zh ? "保存中…" : "Saving…") : result?.liked ? (zh ? "已点赞" : "Liked") : (zh ? "点赞" : "Like")}</span>
        </button>
        <span className="anonymous-like-count" aria-live="polite">
          {loading ? "—" : result ? result.count.toLocaleString(zh?"zh-CN":"en-US") : "—"}
          <span>{zh ? " 个赞" : " likes"}</span>
        </span>
      </div>
      {message && <p className="anonymous-like-message" role="status">{message}</p>}
    </section>
  );
}
