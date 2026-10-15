import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getAdjacentNotes } from "@/data/notesCatalog";
import "@/six-research-essays.css";

/** Compact previous/next navigation covering the original two and six newer essays. */
export default function NotesNavigation({ currentPath }: {currentPath:string}) {
  const {language} = useLanguage();
  const zh=language==="zh-CN";
  const {newer,older}=getAdjacentNotes(currentPath);
  return <nav className="notes-chronology" aria-label={zh?"文章时间顺序":"Article chronology"}>
    {newer ? <Link className="notes-chronology-link" to={newer.path}>
      <ArrowLeft size={18} aria-hidden="true"/>
      <span><span className="eyebrow">{zh?"较新文章":"Newer article"}</span><strong>{zh?newer.titleZh:newer.title}</strong></span>
    </Link> : <span className="notes-chronology-empty"/>}
    {older ? <Link className="notes-chronology-link notes-chronology-older" to={older.path}>
      <span><span className="eyebrow">{zh?"较早文章":"Older article"}</span><strong>{zh?older.titleZh:older.title}</strong></span>
      <ArrowRight size={18} aria-hidden="true"/>
    </Link> : <span className="notes-chronology-empty"/>}
  </nav>;
}
