import { useEffect, useState } from "react";
import AnonymousLike from "@/components/AnonymousLike";
import GiscusDiscussion from "@/components/GiscusDiscussion";

/** Giscus retains authenticated comments; the optional independent backend
 * provides genuinely persistent no-login likes. No fake local-only totals.
 * If not provisioned, the existing Giscus experience is unchanged.
 */
export function validAnonymousApiUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 180) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.username === "" && url.password === "" &&
      url.hostname.endsWith(".workers.dev") &&
      url.pathname === "/" && !url.search && !url.hash;
  } catch { return false; }
}

export default function ArticleEngagement({articlePath}:{articlePath:string}) {
  const [apiBaseUrl, setApiBaseUrl] = useState<string | null>(null);
  useEffect(() => {
    const abort = new AbortController();
    fetch(import.meta.env.BASE_URL + "anonymous-likes-config.json", {
      cache:"no-store", signal:abort.signal,
    }).then(async response => {
      if (!response.ok) return;
      const config: unknown = await response.json();
      const candidate = (config && typeof config === "object" && "apiBaseUrl" in config)
        ? (config as {apiBaseUrl:unknown}).apiBaseUrl : null;
      if (validAnonymousApiUrl(candidate) && !abort.signal.aborted) setApiBaseUrl(candidate.replace(/\/$/,""));
    }).catch(()=>{ /* Unconfigured backend must not disrupt existing comments. */ });
    return () => abort.abort();
  }, []);
  return <>
    {apiBaseUrl && <AnonymousLike articlePath={articlePath} apiBaseUrl={apiBaseUrl}/>}
    <GiscusDiscussion articlePath={articlePath} reactionsEnabled={!apiBaseUrl}/>
  </>;
}
