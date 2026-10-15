import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Printer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { essayPrefix, publishedLabel, publishedOn, researchEssays } from "@/data/researchEssays";
import { essayThumbSprite } from "@/assets/essayThumbSprite";
import "@/six-research-essays.css";

export function EssayThumbnail({ index, label, className = "" }: { index: number; label: string; className?: string }) {
  return <span role="img" aria-label={label} className={"essay-thumb " + className} style={{
    backgroundImage: "url(" + essayThumbSprite + ")",
    backgroundSize: "200% 300%",
    backgroundPosition: (index % 2 === 0 ? "0%" : "100%") + " " + (Math.floor(index / 2) * 50) + "%",
  }} />;
}

export function SixEssayCollection() {
  const { language } = useLanguage();
  const isZh = language === "zh-CN";
  return <section className="essay-series" aria-label={isZh ? "六篇新文章" : "Six new essays"} data-no-translate>
    <div className="essay-series-head">
      <p className="eyebrow">{isZh ? "六篇文章 · 科研与生活" : "Six essays · Science and a life of curiosity"}</p>
      <h2>{isZh ? "从尼泊尔的童年，到 AI 时代的问题" : "A journey from Nepal to the questions of our time"}</h2>
      <p>{isZh ? "回望2025年1月至2026年10月的主题。六篇文章均于2026年10月15日撰写发表，不是当年的历史文章。" : "Six reflections across January 2025–October 2026. The dates below are retrospective themes; every essay was written and published on October 15, 2026."}</p>
    </div>
    <div className="essay-series-grid">
      {researchEssays.map(essay => {
        const c = isZh ? essay.zh : essay;
        return <article className="essay-series-card" key={essay.slug}>
          <Link className="essay-series-art" to={essayPrefix + essay.slug} aria-label={c.title}><EssayThumbnail index={essay.thumbnail} label={c.title} /></Link>
          <div className="essay-series-copy">
            <p className="essay-series-date">{isZh ? "回顾主题：" : "Looking back · "}{c.retrospective}</p>
            <h3><Link to={essayPrefix + essay.slug}>{c.title}</Link></h3>
            <p className="essay-series-subtitle">{c.subtitle}</p>
            <Link className="essay-series-link" to={essayPrefix + essay.slug}>{isZh ? "阅读全文" : "Read essay"} <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>;
      })}
    </div>
  </section>;
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
  const index = researchEssays.indexOf(essay);
  const next = researchEssays[(index + 1) % researchEssays.length];
  const nextC = isZh ? next.zh : next;
  return <article className="essay-reader" data-no-translate>
    <div className="essay-reader-wrap">
      <nav className="essay-reader-back" aria-label={isZh ? "文章导航" : "Article navigation"}><Link to="/notes"><ArrowLeft size={15} aria-hidden="true" />{isZh ? "全部科研随笔" : "All Research Notes"}</Link></nav>
      <header className="essay-reader-header">
        <p className="eyebrow">{c.category} · {isZh ? "个人文章" : "Personal writing"}</p>
        <h1>{c.title}</h1>
        <p className="essay-reader-subtitle">{c.subtitle}</p>
        <div className="essay-reader-dates">
          <span><CalendarDays size={15} aria-hidden="true" /><time dateTime={publishedOn}>{isZh ? "发表于2026年10月15日" : "Published " + publishedLabel}</time></span>
          <span>{isZh ? "回望：" : "Retrospective theme: "}{c.retrospective}</span>
          <span>{isZh ? "作者：Chandan Kumar Sah" : "Chandan Kumar Sah · Beijing, China"}</span>
        </div>
      </header>
      <figure className="essay-reader-figure">
        <EssayThumbnail index={essay.thumbnail} label={c.title} />
        <figcaption>{isZh ? "作者提供的原始推荐图，经截图裁切保存；仅作为编辑配图。" : "Original recommendation image, cropped from the author's screenshot and archived for this collection."}</figcaption>
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
        <footer className="essay-reader-colophon">
          <p>{isZh ? "编辑说明：本文是2026年10月15日发表的原创回顾性随笔，主题日期不代表早期已发表。ChatGPT 协助草拟和语言润色。个人经验及未验证观点不应视为实验事实。" : "Editorial note: An original retrospective essay published October 15, 2026. Its thematic date does not imply earlier publication. ChatGPT assisted with drafting and copy-editing. Illustrative scenarios are not presented as completed experiments or independently verified memories."}</p>
          <button type="button" onClick={() => window.print()}><Printer size={15} aria-hidden="true" />{isZh ? "打印 / 保存" : "Print / Save as PDF"}</button>
        </footer>
      </div>
      <Link className="essay-reader-next" to={essayPrefix + next.slug}>
        <span><span className="eyebrow">{isZh ? "继续阅读" : "Continue reading"}</span><strong>{nextC.title}</strong></span>
        <ArrowRight size={23} aria-hidden="true" />
      </Link>
    </div>
  </article>;
}
