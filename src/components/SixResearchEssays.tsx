import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Printer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { essayPrefix, publishedLabel, publishedOn, researchEssays } from "@/data/researchEssays";
import { essayCovers } from "@/assets/essayCovers";
import NotesNavigation from "@/components/NotesNavigation";
import "@/six-research-essays.css";

export function EssayThumbnail({ index, label, className = "" }: { index: number; label: string; className?: string }) {
  const src = essayCovers[index];
  if (!src) return null;
  return <img className={"essay-thumb " + className} src={src} alt={label} width="1920" height="1080" loading="lazy" decoding="async" />;
}

export default function ResearchEssayPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isZh = language === "zh-CN";
  const essay = researchEssays.find(p => p.slug === slug);
  if (!essay) {
    return <section className="content-wrap interior-page"><h1>{isZh ? "未找到文章" : "Article not found"}</h1><Link to="/notes">{isZh ? "返回科研随笔" : "Back to Research Notes"}</Link></section>;
  }
  const c = isZh ? essay.zh : essay;
  return <article className="essay-reader" data-no-translate>
    <div className="essay-reader-wrap">
      <nav className="essay-reader-back" aria-label={isZh ? "文章导航" : "Article navigation"}><Link to="/notes"><ArrowLeft size={15} aria-hidden="true" />{isZh ? "全部科研随笔" : "All Research Notes"}</Link></nav>
      <header className="essay-reader-header">
        <p className="eyebrow">{c.category} · {isZh ? "个人文章" : "Personal writing"}</p>
        <h1>{c.title}</h1>
        <p className="essay-reader-subtitle">{c.subtitle}</p>
        <div className="essay-reader-dates">
          <span><CalendarDays size={15} aria-hidden="true" /><time dateTime={publishedOn}>{isZh ? "发表于2026年10月15日" : "Published " + publishedLabel}</time></span>
          <span>{isZh ? "作者：Chandan Kumar Sah" : "Chandan Kumar Sah · Beijing, China"}</span>
        </div>
      </header>
      <figure className="essay-reader-figure">
        <EssayThumbnail index={essay.thumbnail} label={c.title} />

      </figure>
      <div className="essay-reader-prose">
        <p className="essay-reader-opening">{c.opening}</p>
        {c.sections.map((section, i) => <section className="essay-reader-chapter" key={i}>
          <p className="essay-reader-index">{String(i + 1).padStart(2, "0")}</p>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, j) => <p key={j}>{paragraph}</p>)}
        </section>)}
        <blockquote className="essay-reader-end-quote">{c.closing}</blockquote>
        <div className="essay-reader-takeaway"><span>{isZh ? "铭记" : "The thought to keep"}</span><p>{c.takeaway}</p></div>
        {essay.references && <aside className="essay-reader-references" aria-label={isZh ? "科学资料" : "Scientific references"}>
          <h2>{isZh ? "延伸阅读与科学依据" : "Scientific sources and further reading"}</h2>
          <p>{isZh ? "下列资料支持文中提到的已发表研究，而非证明作者尚在探索的假设。" : "These sources support the described published research, not the author's proposed hypotheses or unverified personal experiments."}</p>
          <ol>{essay.references.map(ref => <li key={ref.href}><a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label} <ArrowUpRight size={13} aria-hidden="true" /></a><span>{ref.note}</span></li>)}</ol>
        </aside>}
        <div className="essay-reader-tools">
          <button type="button" onClick={() => window.print()}><Printer size={15} aria-hidden="true" />{isZh ? "打印 / 保存" : "Print / Save as PDF"}</button>
        </div>
      </div>
      <NotesNavigation currentPath={essayPrefix + essay.slug}/>
    </div>
  </article>;
}
