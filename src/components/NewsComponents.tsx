import { useState } from "react";
import { ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { newsItems, newsMonthKey, newsYears, type NewsItem } from "@/data/news";

/**
 * News is a sourced chronological archive of the owner's ORIGINAL site.
 * It is not a real-time press feed or independently verified awards database.
 */
function SourceLinks({ item }: { item: NewsItem }) {
  const urls = item.links?.length ? item.links : item.link ? [{ label: "Original source", url: item.link }] : [];
  return <div className="news-source-links">
    {urls.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
      {source.label}<ArrowUpRight size={14} aria-hidden="true" />
    </a>)}
    {item.video && <a href={item.video} target="_blank" rel="noopener noreferrer">Watch original video<ArrowUpRight size={14} aria-hidden="true" /></a>}
  </div>;
}

function NewsArchiveEntry({ item }: { item: NewsItem }) {
  const isNew = item.provenance === "Author-reported 2026 update";
  return <article className="news-entry">
    <div className="news-date-column">
      <time dateTime={newsMonthKey(item.date)}>{item.date}</time>
      <span className="news-date-mark" aria-hidden="true" />
    </div>
    <div className="news-story-column">
      <div className="news-entry-meta">
        <span className="news-topic">{item.tag}</span>
        <span>{item.location}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="news-entry-summary">{item.summary}</p>
      {isNew && <p className="news-corroboration">Acceptance reported by the author · ACM publication record forthcoming</p>}
      <details className="news-story-details">
        <summary>Read full story <ArrowRight size={15} aria-hidden="true" /></summary>
        <div className="news-story-body">
          <p>{item.article}</p>
          {item.dateDetail && <p className="news-date-note">{item.dateDetail}</p>}
        </div>
      </details>
      <SourceLinks item={item} />
    </div>
  </article>;
}

export function NewsPreview() {
  const latest = newsItems.slice(0, 3);
  return <section className="content-wrap page-section section-divider" aria-labelledby="home-news-heading">
    <div className="section-title-row">
      <div><p className="eyebrow">Milestones & research updates</p><h2 id="home-news-heading">News & announcements</h2></div>
      <Link className="inline-link" to="/news">All news & archive <ArrowRight size={17} aria-hidden="true" /></Link>
    </div>
    <div className="news-preview-grid">{latest.map(item => <article className="news-preview-card" key={item.title}>
      <div className="news-preview-top"><time dateTime={newsMonthKey(item.date)}>{item.date}</time><Newspaper size={17} strokeWidth={1.35} aria-hidden="true" /></div>
      <span className="news-preview-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <Link to="/news" className="news-preview-action">Browse full news archive <ArrowRight size={15} aria-hidden="true" /></Link>
    </article>)}</div>
  </section>;
}

export function NewsPage() {
  const [year, setYear] = useState("All years");
  const selectedYears = year === "All years" ? newsYears : newsYears.filter(y => y === year);
  const count = year === "All years" ? newsItems.length : newsItems.filter(item => newsMonthKey(item.date).startsWith(year)).length;
  return <div className="content-wrap interior-page news-page">
    <header className="page-heading">
      <p className="eyebrow">Research journey / News</p>
      <h1>News & milestones</h1>
      <p className="page-intro">Research announcements, academic recognition, and international activities — newest updates first.</p>
    </header>
    <div className="news-introduction">
      <span className="news-archive-stat">{newsItems.length} dated stories</span>
      <p>A timeline of research milestones, academic activities, and announcements, with original source links.</p>
    </div>
    <div className="news-year-controls" role="group" aria-label="Filter news by year">
      {["All years", ...newsYears].map(option => <button key={option} type="button"
        className={year === option ? "news-year-button selected" : "news-year-button"}
        aria-pressed={year === option} onClick={() => setYear(option)}>{option}</button>)}
      <span className="news-filter-count" aria-live="polite">{count} {count === 1 ? "entry" : "entries"}</span>
    </div>
    {selectedYears.map(groupYear => <section className="news-year-section" key={groupYear} aria-label={groupYear + " news"}>
      <h2 className="news-year-heading">{groupYear}<span>Chronological archive</span></h2>
      <div className="news-timeline">{newsItems.filter(item => newsMonthKey(item.date).startsWith(groupYear)).map(item =>
        <NewsArchiveEntry key={item.title} item={item} />)}</div>
    </section>)}
  </div>;
}
