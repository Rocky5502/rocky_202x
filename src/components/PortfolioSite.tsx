import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ClipboardCopy, Github, HeartHandshake, Mail, Menu, Moon, Sun, X } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import {
  identity, publications, researchAreas, academicService, conferenceRankings, rankingSources,
  distinctions, selectedTalks, type Publication,
} from "@/data/portfolio";
import { publicProjects, publicProjectUrl, type PublicProject } from "@/data/projects";
import { opportunityTracks, researchSupport } from "@/data/opportunities";
import "@/portfolio.css";

const navigation = [
  { to: "/", label: "Home", end: true },
  { to: "/publications", label: "Publications" },
  { to: "/projects", label: "Projects" },
  { to: "/research", label: "Research" },
  { to: "/service", label: "Service" },
  { to: "/recognition", label: "Recognition" },
  { to: "/connect", label: "Opportunities" },
];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}<ArrowUpRight aria-hidden="true" size={15} />
    </a>
  );
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem("portfolio-theme");
    return saved === "light" || saved === "dark" ? saved : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" to="/" aria-label="Chandan Kumar Sah, home">
          <span className="site-monogram" aria-hidden="true">CS</span>
          <span>Chandan Kumar Sah <span className="brand-suffix">/ Research</span></span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-navigation">
          {navigation.map(item => (
            <NavLink end={item.end} to={item.to} key={item.to} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="icon-control" onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button type="button" className="icon-control menu-control" onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-navigation" aria-label="Mobile navigation">
        {navigation.map(item => <NavLink end={item.end} to={item.to} key={item.to} className={({isActive}) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>{item.label}</NavLink>)}
      </nav>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-wrap footer-inner">
        <div>
          <p className="footer-name">{identity.name}</p>
          <p className="footer-caption">{identity.position} · {identity.institution}</p>
        </div>
        <div className="footer-links">
          <ExternalLink href={identity.scholar}>Google Scholar</ExternalLink>
          <ExternalLink href={identity.orcid}>ORCID</ExternalLink>
          <ExternalLink href={identity.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={identity.github}>GitHub</ExternalLink>
          <Link to="/connect">Opportunities</Link>
          <a href={`mailto:${identity.email}`}>Email</a>
        </div>
        <span className="footer-legal">© {new Date().getFullYear()} · Updated October 2026</span>
      </div>
    </footer>
  );
}

function PageHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return <header className="page-heading">
    <p className="eyebrow">{kicker}</p>
    <h1>{title}</h1>
    <p className="page-intro">{subtitle}</p>
  </header>;
}

function SectionTitle({ eyebrow, title, destination, destinationLabel }: { eyebrow: string; title: string; destination?: string; destinationLabel?: string }) {
  return <div className="section-title-row">
    <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
    {destination && <Link className="inline-link" to={destination}>{destinationLabel ?? "View all"} <ArrowRight size={17} /></Link>}
  </div>;
}

function PublicationRow({ publication, index }: { publication: Publication; index?: number }) {
  return <article className="publication-row">
    <span className="publication-year">{publication.year}{typeof index === "number" && <span className="publication-index"> / {String(index + 1).padStart(2, "0")}</span>}</span>
    <div className="publication-body">
      <div className="metadata-line"><span>{publication.type === "Conference" || publication.type === "Workshop" ? "Academic paper" : publication.type === "Journal" ? "Journal article" : publication.type}</span><span className="meta-dot" />{publication.venue}</div>
      <h3>{publication.linkKind === "venue" ? publication.title : <a href={publication.url} target="_blank" rel="noopener noreferrer">{publication.title}<ArrowUpRight className="title-arrow" size={16} aria-hidden="true" /></a>}</h3>
      {publication.status && <p className="acceptance-status">{publication.status} · <ExternalLink href={publication.url}>Conference website</ExternalLink></p>}
      <p className="author-line">{publication.authors}</p>
      {publication.rankingVenue && publication.rankingScope && <div className="rank-line" aria-label="Conference venue ranking">
        <span className="rank-label">{publication.rankingScope === "host-only" ? "Host venue" : "Venue"}</span>
        <span className="rank-venue">{conferenceRankings[publication.rankingVenue].label}</span>
        {conferenceRankings[publication.rankingVenue].ccf && <span className="rank-chip">CCF {conferenceRankings[publication.rankingVenue].ccf}</span>}
        <span className="rank-chip">ICORE {conferenceRankings[publication.rankingVenue].icore}</span>
        {publication.rankingScope === "host-only" && <span className="rank-caveat">Host-conference classification only; not an individual-paper rating</span>}
      </div>}
      <span className="topic-tag">{publication.topic}</span>
    </div>
  </article>;
}

function ProjectCard({ project, compact = false }: { project: PublicProject; compact?: boolean }) {
  return <article className={compact ? "public-project-card compact" : "public-project-card"}>
    <div className="project-card-top">
      <span className="project-symbol" aria-hidden="true">{project.icon}</span>
      <span className="project-status">{project.stage}</span>
    </div>
    <p className="eyebrow">{project.category}</p>
    <h3>{project.name}</h3>
    <p className="project-description">{project.description}</p>
    {!compact && <p className="project-question">{project.question}</p>}
    <div className="project-tags">{project.tags.slice(0, compact ? 2 : 3).map(t => <span key={t}>{t}</span>)}</div>
    <ExternalLink href={publicProjectUrl(project.repo)} className="project-repo-link"><Github size={15} /> View public repository</ExternalLink>
  </article>;
}

function ProjectsPage() {
  const categories = ["All projects", "Software engineering", "Uncertainty & reasoning", "Trustworthy AI"] as const;
  const [selected, setSelected] = useState<string>("All projects");
  const visible = selected === "All projects" ? publicProjects : publicProjects.filter(p => p.category === selected);
  return <div className="content-wrap interior-page">
    <PageHeading kicker="Engineering / 03" title="Open research projects" subtitle="A selected collection of public research artifacts and experimental systems. Every project links to an actual GitHub repository." />
    <div className="research-motif" aria-label="Research process: uncertainty leads to evidence, then verification and control">
      <span>01 <strong>Uncertainty</strong></span><ArrowRight size={16} aria-hidden="true" /><span>02 <strong>Evidence</strong></span><ArrowRight size={16} aria-hidden="true" /><span>03 <strong>Verification</strong></span><ArrowRight size={16} aria-hidden="true" /><span>04 <strong>Control</strong></span>
    </div>
    <div className="project-controls" role="group" aria-label="Filter projects by research topic">
      {categories.map(category => <button key={category} type="button" className={category === selected ? "project-filter selected" : "project-filter"} onClick={() => setSelected(category)} aria-pressed={category === selected}>{category}</button>)}
    </div>
    <div className="project-overview"><span>{visible.length} public repositories</span><ExternalLink href={identity.github}>View complete GitHub profile</ExternalLink></div>
    <div className="public-project-grid">{visible.map(project => <ProjectCard project={project} key={project.repo} />)}</div>
    <p className="editorial-note">This page features selected public repositories only. “In development” does not imply validated results, an accepted paper, or a released product. Private projects and confidential submissions are not listed.</p>
  </div>;
}

function Home() {
  const featured = [publications[0], publications[1], publications[2]];
  return <>
    <section className="home-hero content-wrap">
      <div className="hero-copy">
        <p className="eyebrow">PhD Researcher · Software Engineering & AI</p>
        <h1>Chandan Kumar Sah<span className="hero-also">Rocky 文浩</span></h1>
        <p className="hero-lead">Studying when AI systems should trust their evidence—and when they should not.</p>
        <p className="hero-description">I am a doctoral researcher at {identity.institution}. My work focuses on uncertainty in language models, dependable AI for software engineering, and responsible evaluation of intelligent systems.</p>
        <Link className="availability-inline" to="/connect"><span className="availability-dot" aria-hidden="true" />Open to research collaborations, visiting opportunities and fellowships <ArrowRight size={14} aria-hidden="true" /></Link>
        <div className="hero-actions">
          <Link className="primary-action" to="/publications">Explore publications <ArrowRight size={16} /></Link>
          <ExternalLink href={identity.scholar} className="secondary-action">Google Scholar</ExternalLink>
          <ExternalLink href={identity.linkedin} className="secondary-action">LinkedIn</ExternalLink>
        </div>
        <div className="identity-line">
          <span>{identity.department}</span>
          <span className="meta-dot" />
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
        </div>
      </div>
      <figure className="hero-portrait">
        <img src={portrait} alt="Portrait of Chandan Kumar Sah" width={520} height={620} decoding="async" fetchPriority="high" />
        <figcaption>Research · Engineering · Public interest</figcaption>
      </figure>
    </section>
    <section className="home-about content-wrap section-divider">
      <div><p className="eyebrow">Research statement</p><h2>Reliable systems begin with knowing their limits.</h2></div>
      <div className="home-about-text"><p>Large language models often produce fluent answers without reliable evidence. I investigate uncertainty as a practical signal for retrieval, checking, and decision-making—especially in software engineering, where wrong outputs can have real costs.</p><p>Alongside this work, I explore algorithmic fairness and safety-critical multimodal applications. My aim is to connect careful experiments with systems people can responsibly use.</p><Link className="text-action" to="/research">Research directions <ArrowRight size={17} /></Link></div>
    </section>
    <section className="content-wrap page-section section-divider">
      <SectionTitle eyebrow="Selected writing" title="Recent publications" destination="/publications" destinationLabel="All publications" />
      <div className="publication-list">{featured.map((p,i) => <PublicationRow publication={p} key={p.title} index={i} />)}</div>
    </section>
    <section className="content-wrap page-section section-divider">
      <SectionTitle eyebrow="Current questions" title="Research areas" destination="/research" destinationLabel="Research overview" />
      <div className="area-grid">{researchAreas.slice(0,3).map(area => <article className="area-card" key={area.index}>
        <span className="area-number">{area.index}</span><h3>{area.name}</h3><p>{area.description}</p>
      </article>)}</div>
    </section>
    <section className="content-wrap page-section section-divider">
      <SectionTitle eyebrow="Public code" title="Selected research systems" destination="/projects" destinationLabel="All public projects" />
      <div className="public-project-grid home-project-grid">{publicProjects.filter(p => p.featured).map(project => <ProjectCard key={project.repo} project={project} compact />)}</div>
    </section>
    <section className="content-wrap home-contact section-divider">
      <div><p className="eyebrow">Academic & industry opportunities</p><h2>Building reliable AI for a better future.</h2></div>
      <div><p>I welcome academic collaborations, visiting researcher opportunities, fellowships, and research-focused industry conversations. I am also interested in future postdoctoral opportunities as I progress through my PhD.</p><Link className="text-action" to="/connect"><BriefcaseBusiness size={17} /> Opportunities and ways to connect <ArrowRight size={17} /></Link><a className="text-action" href={`mailto:${identity.email}`}><Mail size={18} /> {identity.email}</a></div>
    </section>
  </>;
}

function PublicationsPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [type, setType] = useState("All types");
  const topics = ["All topics", ...Array.from(new Set(publications.map(p => p.topic)))];
  const types = ["All types", "Academic papers", "Journal articles", "Preprints", "Book chapters"];
  const filtered = useMemo(() => publications.filter(p => {
    const q = query.trim().toLowerCase();
    return (topic === "All topics" || p.topic === topic)
      && (type === "All types" || (type === "Academic papers" && (p.type === "Conference" || p.type === "Workshop")) || (type === "Journal articles" && p.type === "Journal") || (type === "Preprints" && p.type === "Preprint") || (type === "Book chapters" && p.type === "Book chapter"))
      && (!q || [p.title, p.authors, p.venue, String(p.year)].some(s => s.toLowerCase().includes(q)));
  }).sort((a,b) => b.year - a.year), [query,topic,type]);
  return <div className="content-wrap interior-page">
    <PageHeading kicker="Research / 01" title="Publications" subtitle="Research papers, journal articles, preprints, and forthcoming work. Publisher links and academic records are provided wherever available." />
    <div className="toolbar">
      <label className="search-wrap"><span className="sr-only">Search publications</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by title, author, or year…" /></label>
      <label className="select-wrap"><span className="sr-only">Filter by research topic</span><select value={topic} onChange={e=>setTopic(e.target.value)}>{topics.map(t=><option key={t}>{t}</option>)}</select></label>
      <label className="select-wrap"><span className="sr-only">Filter by publication type</span><select value={type} onChange={e=>setType(e.target.value)}>{types.map(t=><option key={t}>{t}</option>)}</select></label>
    </div>
    <div className="record-header"><span>{filtered.length} publication{filtered.length === 1 ? "" : "s"}</span><ExternalLink href={identity.scholar}>Full profile on Google Scholar</ExternalLink></div>
    <div className="publication-list">{filtered.map((p,i)=><PublicationRow key={p.title} publication={p} index={i} />)}</div>
    {filtered.length === 0 && <p className="empty-results">No papers match these filters. Try a broader search.</p>}
    <aside className="ranking-note">
      <h2>About venue rankings</h2>
      <p>CCF (7th edition, 2026) and ICORE 2026 classify <strong>venues</strong>, not individual articles.
        A Doctoral Symposium or workshop paper does not inherit the host conference's A/A* rating.
        For those entries, host venue ranks are displayed <strong>for context only</strong>.
        Unverified or unlisted venues have no rank shown; no rating is inferred.</p>
      <div className="ranking-sources"><ExternalLink href={rankingSources.ccf}>CCF official list (2026)</ExternalLink><ExternalLink href={rankingSources.icore}>ICORE conference database (2026)</ExternalLink></div>
    </aside>
    <p className="editorial-note">Published conference, workshop, and journal articles are distinguished from preprints and book chapters. No unconfirmed acceptance claims or guessed ranks are added.</p>
  </div>;
}

function ResearchPage() {
  return <div className="content-wrap interior-page">
    <PageHeading kicker="Research / 02" title="Research & projects" subtitle="A small set of connected questions, rather than a catalog of every experiment in progress." />
    <div className="research-statement"><p>My research asks how to make model uncertainty useful at decision time. Confidence estimates are only useful when they influence whether an agent retrieves evidence, verifies an answer, abstains, or takes a safer path.</p></div>
    <SectionTitle eyebrow="Themes" title="Research directions" />
    <div className="research-area-list">{researchAreas.map(area => <article key={area.index} className="research-area">
      <span className="area-number">{area.index}</span><div><h3>{area.name}</h3><p>{area.description}</p></div>
    </article>)}</div>
    <div className="spaced-section"><SectionTitle eyebrow="Implementation" title="From questions to reproducible code" destination="/projects" destinationLabel="Browse GitHub projects" /></div>
    <div className="public-project-grid home-project-grid">{publicProjects.filter(p => p.featured).map(project => <ProjectCard key={project.repo} project={project} compact />)}</div>
    <p className="editorial-note">The public code is curated separately from the publication record. Research-in-progress is not represented as an accepted paper.</p>
  </div>;
}

function ServicePage() {
  return <div className="content-wrap interior-page">
    <PageHeading kicker="Community / 03" title="Academic service" subtitle="Peer review, conference support, and work that helps the research community function." />
    <section className="service-section">
      <SectionTitle eyebrow="Scholarly peer review" title="Reviewer roles" />
      <p className="service-intro">I contribute to peer review across software engineering, machine learning, computer vision, and information retrieval. Venue names below describe reviewing service, not membership in organizing or program committees.</p>
      <div className="review-evidence" aria-label="Peer review activity records">
        <div><span className="review-value">{academicService.reviewRecord.webOfScienceRounds}</span><span className="review-term">Review rounds reported in Web of Science</span></div>
        <div><span className="review-value">{academicService.reviewRecord.webOfScienceManuscripts}</span><span className="review-term">Distinct manuscripts represented</span></div>
        <div><span className="review-value">{academicService.reviewRecord.orcidReviewRecords}</span><span className="review-term">Peer-review records on ORCID</span></div>
      </div>
      <p className="small-note">These researcher-supplied records may overlap; the counts are not added together. Individual manuscript titles and confidential reviewer reports are deliberately excluded.</p>
      <div className="service-columns">
        <div><h3>Conferences</h3><ul className="quiet-list">{academicService.conferences.map(v=><li key={v}>{v}</li>)}</ul></div>
        <div><h3>Journals</h3><ul className="quiet-list">{academicService.journals.map(v=><li key={v}>{v}</li>)}</ul></div>
      </div>
      <p className="small-note">Reviewing venues are listed for professional recognition only. The reported activity counts have not been independently checked in authenticated Web of Science or ORCID accounts.</p>
    </section>
    <section className="service-section section-divider">
      <SectionTitle eyebrow="Volunteer engagement" title="Community involvement" />
      <div className="simple-records">{academicService.volunteering.map(v=><article className="simple-record" key={v.organization}><span className="record-year">{v.year}</span><div><h3>{v.role}</h3><p className="record-subtitle">{v.organization}</p><p>{v.description}</p></div></article>)}</div>
    </section>
    <section className="service-section section-divider">
      <SectionTitle eyebrow="External profile" title="Academic identity" />
      <div className="profile-links"><ExternalLink href={identity.openreview}>OpenReview</ExternalLink><ExternalLink href={identity.orcid}>ORCID</ExternalLink><ExternalLink href={identity.linkedin}>LinkedIn</ExternalLink><ExternalLink href={identity.scholar}>Google Scholar</ExternalLink></div>
    </section>
  </div>;
}

function RecognitionPage() {
  return <div className="content-wrap interior-page">
    <PageHeading kicker="Community / 04" title="Recognition & talks" subtitle="Selected distinctions and academic presentations, kept separate from the main research profile." />
    <section className="service-section">
      <SectionTitle eyebrow="Selected recognition" title="Awards & distinctions" />
      <div className="simple-records">{distinctions.map(item=><article className="simple-record" key={item.name}><span className="record-year">{item.year}</span><div><h3>{item.name}</h3><p className="record-subtitle">{item.issuer}</p></div></article>)}</div>
      <p className="small-note">Selected highlights, not a complete personal history or CV.</p>
    </section>
    <section className="service-section section-divider">
      <SectionTitle eyebrow="Research presentations" title="Selected talks" />
      <div className="simple-records">{selectedTalks.map(t=><article className="simple-record" key={t.title}><span className="record-year">{t.year}</span><div><h3>{t.title}</h3><p className="record-subtitle">{t.event}</p><ExternalLink href={t.url}>Event information</ExternalLink></div></article>)}</div>
    </section>
  </div>;
}


function ConnectPage() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "unavailable">("idle");
  const copySupportEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.paypalEmail);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  };
  return <div className="content-wrap interior-page connect-page">
    <PageHeading
      kicker="Collaboration / 05"
      title="Opportunities & support"
      subtitle="I welcome thoughtful academic and industry collaborations that advance reliable, useful AI. My priority remains my ongoing doctoral research."
    />
    <section className="connect-overview" aria-label="Availability for academic and industry collaboration">
      <span className="availability-dot" aria-hidden="true" />
      <div><strong>Open to conversations</strong><p>Academic research · Visiting appointments · Fellowships · AI research & engineering</p></div>
    </section>
    <section className="service-section connect-section">
      <SectionTitle eyebrow="Professional interests" title="How we could work together" />
      <p className="service-intro">My interests center on uncertainty-aware language models, AI safety, software-engineering agents, trustworthy evaluation and open research infrastructure. I am particularly interested in projects that turn sound methods into tools people can use.</p>
      <div className="opportunity-list">{opportunityTracks.map((track, index) =>
        <article className="opportunity-item" key={track.title}>
          <span className="opportunity-index">{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{track.title}</h3><p className="opportunity-area">{track.area}</p><p className="opportunity-summary">{track.summary}</p></div>
        </article>
      )}</div>
      <div className="connect-actions">
        <a className="primary-action" href={"mailto:" + identity.email + "?subject=Academic%20research%20opportunity"}><Mail size={16} aria-hidden="true"/> Discuss an opportunity <ArrowRight size={16} aria-hidden="true" /></a>
        <ExternalLink className="secondary-action" href={identity.linkedin}>View LinkedIn</ExternalLink>
        <ExternalLink className="secondary-action" href={identity.scholar}>Research record</ExternalLink>
      </div>
      <p className="small-note">Visiting, fellowship and employment arrangements depend on institutional permissions, funding and eligibility. Expressions of interest do not imply an immediate start date or a current appointment.</p>
    </section>
    <section className="service-section section-divider support-section" aria-labelledby="support-research-heading">
      <div className="support-intro">
        <span className="support-symbol" aria-hidden="true"><HeartHandshake size={23}/></span>
        <div>
          <p className="eyebrow">Voluntary academic support</p>
          <h2 id="support-research-heading">{researchSupport.title}</h2>
        </div>
      </div>
      <p className="support-statement">{researchSupport.description}</p>
      <div className="support-details">
        <div className="support-payment-heading">
          <img src={researchSupport.paypalLogo} alt="" loading="lazy" decoding="async" width={35} height={35} />
          <div><strong>PayPal</strong><p>Optional personal research support</p></div>
        </div>
        <label className="support-email-label" htmlFor="paypal-recipient-address">PayPal recipient email</label>
        <div className="support-email-row">
          <input id="paypal-recipient-address" type="text" readOnly value={identity.paypalEmail} onFocus={event => event.currentTarget.select()} aria-label="PayPal support email address" />
          <button type="button" className="copy-address-button" onClick={copySupportEmail} aria-label="Copy PayPal recipient email address">
            {copyStatus === "copied" ? <Check size={15} aria-hidden="true"/> : <ClipboardCopy size={15} aria-hidden="true"/>}
            {copyStatus === "copied" ? "Copied" : "Copy email"}
          </button>
        </div>
        <p className="copy-feedback" role="status">{copyStatus === "copied" ? "Email copied to your clipboard." : copyStatus === "unavailable" ? "Automatic copying is unavailable here; please select and copy the email above." : "To contribute, enter this recipient email in PayPal and verify the recipient before confirming any payment."}</p>
        <ExternalLink className="support-paypal-link" href={researchSupport.paypalHomepage}>Open PayPal website</ExternalLink>
      </div>
      <p className="support-disclaimer">{researchSupport.disclaimer} The payment address is provided at the researcher's request and has not been verified as an active PayPal account. No embedded checkout or payment tracking is used.</p>
    </section>
  </div>;
}

function NotFound() {
  return <div className="content-wrap interior-page"><PageHeading kicker="404" title="Page not found" subtitle="This address does not match a page on the site." /><Link to="/" className="primary-action">Back to home <ArrowRight size={16}/></Link></div>;
}

export default function PortfolioSite() {
  return <div className="portfolio-shell"><a className="skip-link" href="#main-content">Skip to content</a><ScrollReset /><SiteHeader />
    <main id="main-content"><Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/publications" element={<PublicationsPage/>} />
      <Route path="/projects" element={<ProjectsPage/>} />
      <Route path="/research" element={<ResearchPage/>} />
      <Route path="/service" element={<ServicePage/>} />
      <Route path="/recognition" element={<RecognitionPage/>} />
      <Route path="/connect" element={<ConnectPage/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes></main><Footer />
  </div>;
}
