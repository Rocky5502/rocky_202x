import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { giscusSettings, giscusTerm } from "@/data/giscusSettings";
import "@/giscus-discussion.css";

export default function GiscusDiscussion({articlePath,categoryId=giscusSettings.categoryId}:{articlePath:string;categoryId?:string}) {
  const {language}=useLanguage();
  const [enabled,setEnabled]=useState(false);
  const host=useRef<HTMLDivElement>(null);
  const zh=language==="zh-CN";
  useEffect(()=>{
    if(!enabled||!categoryId||!host.current)return;
    const mount=host.current;
    const script=document.createElement("script");
    script.src="https://giscus.app/client.js";
    const attrs:Record<string,string>={
      "data-repo":giscusSettings.repo,
      "data-repo-id":giscusSettings.repoId,
      "data-category":giscusSettings.category,
      "data-category-id":categoryId,
      "data-mapping":"specific",
      "data-term":giscusTerm(articlePath),
      "data-strict":"1",
      "data-reactions-enabled":"1",
      "data-input-position":"top",
      "data-theme":document.documentElement.classList.contains("dark")?"dark":"light",
      "data-lang":zh?"zh-CN":"en",
      "data-loading":"lazy"
    };
    for(const [key,value] of Object.entries(attrs))script.setAttribute(key,value);
    script.crossOrigin="anonymous";
    script.async=true;
    mount.appendChild(script);
    return ()=>{mount.replaceChildren();};
  },[enabled,articlePath,categoryId,zh]);
  return <section className="onpage-discussion" aria-label={zh?"点赞与评论":"Likes and comments"}>
    <h2>{zh?"点赞与评论":"Likes & comments"}</h2>
    <p>{zh?"在本页点赞、留言与回复。需要 GitHub 登录。":"Leave reactions, comments and replies here. GitHub handles sign-in."}</p>
    {!enabled&&<button type="button" onClick={()=>setEnabled(true)}>{zh?"显示评论":"Show comments and reactions"}</button>}
    <div ref={host} className="onpage-discussion-frame"/>
  </section>;
}
