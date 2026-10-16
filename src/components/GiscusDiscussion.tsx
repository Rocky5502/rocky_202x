import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, RotateCcw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { giscusReady, giscusSettings, giscusTerm } from "@/data/giscusSettings";
import "@/giscus-discussion.css";

/**
 * One embedded Discussion per article; comments/reactions remain on this page.
 * The official giscus GitHub App MUST be installed on this repository by the owner.
 * If missing, giscus sends a documented postMessage error: replace its raw error
 * iframe with a polished, honest temporary-unavailable state.
 */
export default function GiscusDiscussion({articlePath, reactionsEnabled = true}:{articlePath:string; reactionsEnabled?:boolean}) {
  const {language}=useLanguage();
  const mountRef=useRef<HTMLDivElement>(null);
  const [dark,setDark]=useState(()=>document.documentElement.classList.contains("dark"));
  const [serviceError,setServiceError]=useState(false);
  const [retryCount,setRetryCount]=useState(0);
  const zh=language==="zh-CN";

  useEffect(()=>{
    const observer=new MutationObserver(()=>setDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
    return ()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    function handleGiscusMessage(event:MessageEvent) {
      if(event.origin!=="https://giscus.app"||!event.data||typeof event.data!=="object")return;
      const body=(event.data as {giscus?:{error?:unknown}}).giscus;
      if(!body||typeof body.error!=="string")return;
      const iframe=mountRef.current?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if(iframe?.contentWindow&&event.source!==iframe.contentWindow)return;
      // Official Giscus behavior: an article with no Discussion yet reports
      // "Discussion not found" and creates it upon the first comment/reaction.
      // Expired GitHub sessions are also reset automatically by client.js.
      // Neither is a fatal widget failure; do not hide a usable comment box.
      if(/Discussion not found|Bad credentials|Invalid state value|State has expired/i.test(body.error))return;
      // Other trusted Giscus errors show a safe retry, without leaking details.
      setServiceError(true);
    }
    window.addEventListener("message",handleGiscusMessage);
    return ()=>window.removeEventListener("message",handleGiscusMessage);
  },[]);

  useEffect(()=>{
    if(!giscusReady||!mountRef.current)return;
    const mount=mountRef.current;
    const script=document.createElement("script");
    script.src="https://giscus.app/client.js";
    const attributes:Record<string,string>={
      "data-repo":giscusSettings.repo,
      "data-repo-id":giscusSettings.repoId,
      "data-category":giscusSettings.category,
      "data-category-id":giscusSettings.categoryId,
      "data-mapping":"specific",
      "data-term":giscusTerm(articlePath),
      "data-strict":"1",
      "data-reactions-enabled":reactionsEnabled?"1":"0",
      "data-emit-metadata":"0",
      "data-input-position":"top",
      "data-theme":dark?"dark":"light",
      "data-lang":zh?"zh-CN":"en",
      "data-loading":"lazy",
    };
    for(const [key,value] of Object.entries(attributes))script.setAttribute(key,value);
    script.crossOrigin="anonymous";
    script.async=true;
    script.onerror=()=>setServiceError(true);
    mount.appendChild(script);
    return ()=>{mount.replaceChildren();};
  },[articlePath,retryCount,reactionsEnabled]);

  useEffect(()=>{
    const iframe=mountRef.current?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage({giscus:{setConfig:{theme:dark?"dark":"light",lang:zh?"zh-CN":"en"}}},"https://giscus.app");
  },[dark,zh]);

  return <section className="onpage-discussion" id="reader-conversation" aria-label={reactionsEnabled ? (zh?"点赞与评论":"Likes and comments") : (zh?"读者评论":"Reader comments")}>
    <p className="eyebrow">{zh?"读者交流":"Reader conversation"}</p>
    <h2><Heart size={23} strokeWidth={1.6} aria-hidden="true"/>{reactionsEnabled ? (zh?"点赞与评论":"Likes & comments") : (zh?"读者评论":"Reader comments")}<MessageCircle size={23} strokeWidth={1.6} aria-hidden="true"/></h2>
    <p>{reactionsEnabled ? (zh?"直接在本页点赞、评论或回复。参与互动时需通过 GitHub 登录。":"Like, comment, or reply below without leaving this article. GitHub sign-in is required to participate.") : (zh?"评论和回复由 GitHub Discussions 提供，需要 GitHub 账号；上方匿名点赞无需登录。":"Comments and replies use GitHub Discussions and require GitHub sign-in. Anonymous likes above need no account.")}</p>
    <div ref={mountRef} className="onpage-discussion-frame" hidden={serviceError||!giscusReady} aria-label={zh?"嵌入的讨论区":"Embedded discussion"}/>
    {(serviceError||!giscusReady)&&<div className="onpage-discussion-fallback" role="status">
      <p>{zh?"读者评论暂时无法使用。网站正在完成评论服务配置。":"Reader comments and reactions are temporarily unavailable while the discussion service is being configured."}</p>
      {giscusReady&&<button type="button" onClick={()=>{setServiceError(false);setRetryCount(n=>n+1);}}><RotateCcw size={14} aria-hidden="true"/>{zh?"重新尝试":"Try again"}</button>}
    </div>}
  </section>;
}
