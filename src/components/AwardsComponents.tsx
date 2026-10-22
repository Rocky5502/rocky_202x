import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, GraduationCap,
  Medal, Presentation, Search, TicketCheck
} from "lucide-react";
import {
  awardCategories, awardCountByYear, awardYears, awardsArchive,
  type AwardCategory, type AwardRecord, type AwardYear
} from "@/data/awards";

const categoryIcons = {
  "Prizes & distinctions": Medal,
  "Scholarships & fellowships": GraduationCap,
  "Academic service & presentations": Presentation,
  "Participation & certificates": TicketCheck,
} as const;

/** A compact entry point: no full awards wall on the Recognition page. */
export function AwardsInvitation() {
  return <Link className="awards-invitation" to="/awards" aria-label="Explore the Awards & Appreciation archive">
    <span className="awards-invitation-icon" aria-hidden="true"><Award size={26} strokeWidth={1.5} /></span>
    <span className="awards-invitation-copy">
      <span className="eyebrow">Awards, certificates & academic milestones</span>
      <strong>Awards & Appreciation</strong>
      <span>An organized archive of distinctions, scholarships, professional certificates, presentations and learning experiences.</span>
      <span className="awards-invitation-action">Explore the year-by-year archive <ArrowRight size={16} aria-hidden="true" /></span>
    </span>
    <span className="awards-invitation-years" aria-hidden="true">2026—2018 <ArrowUpRight size={17} /></span>
  </Link>;
}

function AwardCard({ item }: { item: AwardRecord }) {
  const Icon = categoryIcons[item.category];
  return <article className="award-archive-card">
    <div className="award-archive-top">
      <span className="award-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.55}/></span>
      <span className="award-archive-category">{item.category}</span>
    </div>
    <h3>{item.title}</h3>
    <p className="award-issuer"><span>Issued by</span>{item.issuedBy}</p>
    <p className="award-location">{item.location}</p>
    <a className="award-issuer-link" href={item.link} target="_blank" rel="noopener noreferrer">
      Event or issuer information <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  </article>;
}

export function AwardsPage() {
  const { tr } = useLanguage();
  const [year, setYear] = useState<"All years" | AwardYear>("All years");
  const [category, setCategory] = useState<"All categories" | AwardCategory>("All categories");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return awardsArchive.filter(item =>
      (year === "All years" || item.yearGroup === year) &&
      (category === "All categories" || item.category === category) &&
      (!q || [item.title, item.issuedBy, item.location, item.category].some(s => s.toLocaleLowerCase().includes(q) || tr(s).toLocaleLowerCase().includes(q)))
    );
  }, [year, category, query, tr]);

  const visibleYears = awardYears.filter(group => visible.some(item => item.yearGroup === group));

  return <div className="content-wrap interior-page awards-page">
    <nav className="awards-breadcrumb" aria-label="Awards breadcrumb">
      <Link to="/recognition"><ArrowLeft size={15} aria-hidden="true"/> Recognition & talks</Link>
      <span aria-hidden="true">/</span><span aria-current="page">Awards & Appreciation</span>
    </nav>
    <header className="page-heading">
      <p className="eyebrow">Recognition / Archive</p>
      <h1>Awards & Appreciation</h1>
      <p className="page-intro">An organized archive of academic distinctions, scholarships, reviewer service, certificates and international learning experiences.</p>
    </header>
    <div className="awards-summary">
      <BookOpen size={20} strokeWidth={1.4} aria-hidden="true"/>
      <p>My academic distinctions, scholarships, certificates, conference participation, and service activities—organized by year.</p>
    </div>
    <div className="awards-tools">
      <div className="awards-year-controls" role="group" aria-label="Filter archived awards by year">
        {(["All years", ...awardYears] as const).map(y =>
          <button key={y} type="button" className={year === y ? "awards-year selected" : "awards-year"} aria-pressed={year === y} onClick={() => setYear(y)}>
            {y}{y !== "All years" && <span>{awardCountByYear[y]}</span>}
          </button>
        )}
      </div>
      <div className="awards-secondary-controls">
        <label className="awards-search">
          <Search size={15} aria-hidden="true"/>
          <span className="sr-only">Search archived awards</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search titles, issuers, places…" type="search"/>
        </label>
        <label className="awards-category-control">
          <span className="sr-only">Filter archive by category</span>
          <select value={category} onChange={e => setCategory(e.target.value as typeof category)}>
            <option value="All categories">All categories</option>
            {awardCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </label>
      </div>
      <p className="awards-results" role="status">{visible.length} {visible.length === 1 ? "record" : "records"} shown</p>
    </div>

    {visible.length ? visibleYears.map(group => <section key={group} className="award-year-group" aria-label={group + " awards and certificates"}>
      <header className="award-year-heading">
        <h2>{group}</h2><span>{visible.filter(item => item.yearGroup === group).length} {visible.filter(item => item.yearGroup === group).length === 1 ? "record" : "records"}</span>
      </header>
      <div className="award-cards-grid">
        {visible.filter(item => item.yearGroup === group).map((item, index) =>
          <AwardCard key={group + "-" + item.title + "-" + index} item={item}/>)}
      </div>
    </section>) : <div className="awards-empty">
      <Award size={24} aria-hidden="true"/>
      <h2>No records match these filters.</h2>
      <p>Try another year, category, or keyword.</p>
      <button type="button" onClick={() => { setYear("All years"); setCategory("All categories"); setQuery(""); }}>Clear all filters <ArrowRight size={14} aria-hidden="true" /></button>
    </div>}

  </div>;
}
