import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { giscusReady, giscusSettings, giscusTerm } from "@/data/giscusSettings";
import "@/giscus-discussion.css";

export default function GiscusDiscussion({articlePath}:{articlePath:string}) {
  const {language}=useLanguage();
  const mountRef=useRef<HTMLDivElement>(null);
  const [dark,setDark]=useState(()=>document.documentElement.classList.contains("dark"));
  const zh=language==="zh-CN";

  useEffect(()=>{
    const observer=new MutationObserver(()=>setDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
    return ()=>observer.disconnect();
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
      "data-reactions-enabled":"1",
      "data-emit-metadata":"0",
      "data-input-position":"top",
      "data-theme":dark?"dark":"light",
      "data-lang":zh?"zh-CN":"en",
      "data-loading":"lazy",
    };
    for(const [key,value] of Object.entries(attributes))script.setAttribute(key,value);
    script.crossOrigin="anonymous";
    script.async=true;
    mount.appendChild(script);
    return ()=>{mount.replaceChildren();};
    // Identity changes re-create widget; language and theme changes are sent
    // through postMessage to avoid losing drafts.
  },[articlePath]);

  useEffect(()=>{
    const iframe=mountRef.current?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage({giscus:{setConfig:{theme:dark?"dark":"light",lang:zh?"zh-CN":"en"}}},"https://giscus.app");
  },[dark,zh]);

  return <section className="onpage-discussion" id="reader-conversation" aria-label={zh?"点赞与评论":"Likes and comments"}>
    <p className="eyebrow">{zh?"读者交流":"Reader conversation"}</p>
    <h2><Heart size={23} strokeWidth={1.6} aria-hidden="true"/>{zh?"点赞与评论":"Likes & comments"}<MessageCircle size={23} strokeWidth={1.6} aria-hidden="true"/></h2>
    <p>{zh?"直接在本页点赞、评论或回复。参与互动时需通过 GitHub 登录。":"Like, comment, or reply below without leaving this article. GitHub sign-in is required to participate."}</p>
    {giscusReady ? <div ref={mountRef} className="onpage-discussion-frame" aria-label={zh?"嵌入的讨论区":"Embedded discussion"}/> :
      <p role="status">{zh?"评论服务暂不可用。":"Comments are temporarily unavailable."}</p>}
  </section>;
}
