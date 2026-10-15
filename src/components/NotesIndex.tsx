import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { nobelMeetingsCollage } from "@/assets/nobelMeetingsCollage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { notesCatalog } from "@/data/notesCatalog";
import { EssayThumbnail } from "@/components/SixResearchEssays";
import "@/questions-essay.css";
import "@/six-research-essays.css";

export default function NotesIndex() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";
  return <section className="notes-index notes-unified content-wrap interior-page" data-no-translate>
    <header className="notes-index-header">
      <p className="eyebrow">{zh ? "个人随笔 / 科学与生活" : "Personal writing / Research Notes"}</p>
      <h1>{zh ? "关于未知的笔记" : "Notes from the Unknown"}</h1>
      <p>{zh ? "关于科研、人工智能、好奇心以及成长路上的思考。" : "Essays on research, artificial intelligence, curiosity, and the work of becoming a scientist."}</p>
    </header>
    <div className="notes-unified-grid" aria-label={zh ? "文章（由近及远）" : "Essays, newest to oldest"}>
      {notesCatalog.map(item => {
        const title = zh ? item.titleZh : item.title;
        const subtitle = zh ? item.subtitleZh : item.subtitle;
        const category = zh ? item.categoryZh : item.category;
        const label = zh ? item.labelZh : item.label;
        return <article className="notes-unified-card" key={item.path}>
          <Link className="notes-unified-visual" to={item.path} aria-label={title}>
            {item.visual.kind === "cover"
              ? <EssayThumbnail index={item.visual.index} label={title} />
              : <img src={item.visual.kind === "portrait" ? portrait : nobelMeetingsCollage} alt={item.visual.kind === "portrait" ? (zh?"作者肖像":"Author portrait") : (zh?"作者提供的会议摄影拼图":"Original conference photo collage")} width="1200" height="675" loading="lazy" decoding="async" />}
          </Link>
          <div className="notes-unified-copy">
            <p className="notes-unified-date">{label}<span aria-hidden="true"> · </span>{category}</p>
            <h2><Link to={item.path}>{title}</Link></h2>
            <p>{subtitle}</p>
            <Link className="notes-unified-read" to={item.path}>{zh?"阅读文章":"Read article"}<ArrowRight size={16} aria-hidden="true"/></Link>
          </div>
        </article>;
      })}
    </div>
  </section>;
}
