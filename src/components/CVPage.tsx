import {
  ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, ChartNoAxesCombined,
  CheckCheck, Code2, Cpu, GitBranch, GraduationCap, ShieldCheck,
  FlaskConical, Terminal, Workflow, Languages,
  Snowflake, Sun, School, Landmark, Award, type LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { identity } from "@/data/portfolio";
import {
  education, researchSkills, researchSchools, additionalLearning,
  programmingLanguages, spokenLanguages, cvLinks, type Skill, type ResearchSchool
} from "@/data/cv";

const skillIcons = {
  brain: BrainCircuit, chart: ChartNoAxesCombined, cpu: Cpu, code: Code2,
  check: CheckCheck, shield: ShieldCheck, terminal: Terminal, workflow: Workflow,
  flask: FlaskConical, git: GitBranch,
} as const;

const cvSections = [
  {
    to: "/cv/education", icon: GraduationCap, index: "01",
    label: "Education", meta: "Degrees · Summer & winter schools",
    description: "My academic degrees and selected international research schools, each presented with their historical source context.",
    stat: "3 degrees · 4 schools",
  },
  {
    to: "/cv/skills", icon: BrainCircuit, index: "02",
    label: "Research & technical skills", meta: "Evidence-linked AI / SE competencies",
    description: "Ten research methods and engineering competencies, with links to the public code and research tooling behind them.",
    stat: "10 focused competencies",
  },
  {
    to: "/cv/languages", icon: Languages, index: "03",
    label: "Programming & languages", meta: "Computing · International communication",
    description: "Programming languages and spoken languages, carefully separated from unsupported proficiency or certification claims.",
    stat: "6 programming · 6 spoken",
  },
  {
    to: "/recognition", icon: Award, index: "04",
    label: "Recognition", meta: "Honours · Awards · Academic talks",
    description: "Explore selected academic presentations and the separate, year-by-year Awards & Appreciation archive.",
    stat: "Talks & awards archive",
  },
  {
    to: "/projects", icon: GitBranch, index: "05",
    label: "Projects", meta: "Open code · Experiments · Benchmarks",
    description: "Browse public research repositories, source code, and reproducibility artifacts in the existing Projects directory.",
    stat: "Public research repositories",
  },
] as const;

function CVHeader({ section, title, subtitle }: { section?: string; title: string; subtitle: string }) {
  return <header className="page-heading cv-heading">
    {section && <nav className="cv-breadcrumb" aria-label="CV breadcrumb">
      <Link to="/cv"><ArrowLeft size={15} aria-hidden="true"/> CV & Skills</Link>
      <span aria-hidden="true">/</span><span aria-current="page">{section}</span>
    </nav>}
    <p className="eyebrow">Academic profile / {section ?? "Overview"}</p>
    <h1>{title}</h1>
    <p className="page-intro">{subtitle}</p>
  </header>;
}

function CVSectionNav({ active }: { active: string }) {
  return <nav className="cv-inner-navigation" aria-label="CV sections">
    {cvSections.map(item =>
      <Link key={item.to} to={item.to} aria-current={active === item.to ? "page" : undefined}>
        {item.label}
      </Link>
    )}
  </nav>;
}

function CVLinkedItem({ to, icon: Icon, label, note }: {
  to: string; icon: LucideIcon; label: string; note: string;
}) {
  return <Link to={to} className="cv-linked-item">
    <Icon size={20} strokeWidth={1.45} aria-hidden="true"/>
    <span><strong>{label}</strong><small>{note}</small></span>
    <ArrowRight size={16} aria-hidden="true"/>
  </Link>;
}

export default function CVPage() {
  return <div className="content-wrap interior-page cv-page cv-overview">
    <CVHeader title="CV & Skills"
      subtitle="A concise academic profile. Explore education, research skills, languages, recognition, and open projects through separate sections."/>
    <div className="cv-profile-line">
      <div><p className="eyebrow">Current position</p><strong>Doctoral Researcher</strong><span>Software Engineering & AI · Beihang University</span><p className="cv-origin-note">From Nepal · Chinese Government Scholarship recipient</p></div>
      <div className="cv-profile-links">
        <a href={identity.scholar} target="_blank" rel="noopener noreferrer">Google Scholar <ArrowUpRight size={14} aria-hidden="true"/></a>
        <a href={identity.orcid} target="_blank" rel="noopener noreferrer">ORCID <ArrowUpRight size={14} aria-hidden="true"/></a>
        <a href={identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true"/></a>
        <a href={identity.webOfScienceSearch} target="_blank" rel="noopener noreferrer" title="Web of Science author search portal, not a verified personal author profile">Web of Science Author Search <ArrowUpRight size={14} aria-hidden="true"/></a>
      </div>
    </div>

    <section className="cv-overview-section" aria-labelledby="cv-overview-sections">
      <div className="cv-section-head"><div><p className="eyebrow">Explore the academic CV</p><h2 id="cv-overview-sections">Choose a section</h2></div></div>
      <div className="cv-layer-grid">{cvSections.map(item => {
        const Icon = item.icon;
        return <Link className="cv-layer-card" to={item.to} key={item.to}>
          <div className="cv-layer-top"><span className="cv-layer-icon"><Icon size={24} strokeWidth={1.4} aria-hidden="true"/></span><span>{item.index} / 05</span></div>
          <span className="cv-layer-meta">{item.meta}</span>
          <h3>{item.label}</h3>
          <p>{item.description}</p>
          <div className="cv-layer-bottom"><span>{item.stat}</span><ArrowRight size={18} aria-hidden="true"/></div>
        </Link>;
      })}</div>
      <p className="cv-editor-note">The CV is intentionally layered. Education, skills, and languages have dedicated pages; Recognition and Projects link to their existing sections without duplicating their records.</p>
    </section>

    <section className="cv-section cv-overview-footer" aria-labelledby="cv-related-heading">
      <div className="cv-section-head"><div><p className="eyebrow">More of my research profile</p><h2 id="cv-related-heading">Academic record</h2></div></div>
      <div className="cv-destinations">
        <CVLinkedItem to={cvLinks.publications} icon={BookOpen} label="Publications" note="Papers and academic preprints"/>
        <CVLinkedItem to={cvLinks.service} icon={ShieldCheck} label="Service" note="Peer review and volunteering"/>
      </div>
    </section>
  </div>;
}

function SchoolCard({ item }: { item: ResearchSchool }) {
  const Icon = item.type === "Winter school" ? Snowflake : item.type === "Summer school" ? Sun : School;
  return <article className="cv-school-card">
    <div className="cv-school-top">
      <span className="cv-school-icon"><Icon size={20} strokeWidth={1.4} aria-hidden="true"/></span>
      <span className="cv-school-type">{item.type}</span>
      <span className="cv-school-year">{item.year}</span>
    </div>
    <h3>{item.name}</h3>
    <p className="cv-school-org">{item.organization} · {item.location}</p>
    <p className="cv-school-focus">{item.focus}</p>
    <a href={item.eventUrl} target="_blank" rel="noopener noreferrer">School / organizer website <ArrowUpRight size={15} aria-hidden="true"/></a>
  </article>;
}

export function CVEducationPage() {
  const schoolYears = [...new Set(researchSchools.map(s => s.year))].sort((a,b)=>b-a);
  return <div className="content-wrap interior-page cv-page cv-education-page">
    <CVHeader section="Education" title="Education"
      subtitle="Academic degrees and selected summer and winter schools. Research schools and short courses are distinct from degree qualifications."/>
    <CVSectionNav active="/cv/education"/>

    <section className="cv-section" aria-labelledby="cv-degrees-heading">
      <div className="cv-section-head"><div><p className="eyebrow">Formal academic education</p><h2 id="cv-degrees-heading">University degrees</h2></div><GraduationCap size={23} strokeWidth={1.35} aria-hidden="true"/></div>
      <div className="cv-education-list">{education.map((entry,i) => <article className="cv-education-row" key={entry.degree}>
        <div className="cv-education-aside"><span>{String(i+1).padStart(2,"0")}</span></div>
        <div className="cv-education-detail">
          <h3>{entry.degree}</h3><p className="cv-degree-field">{entry.field}</p>
          <div className="cv-institution"><a href={entry.institutionUrl} target="_blank" rel="noopener noreferrer">{entry.institution} <ArrowUpRight size={14} aria-hidden="true"/></a><span>· {entry.location}</span></div>
          <p className="cv-education-description">{entry.description}</p>
        </div>
      </article>)}</div>
      <p className="cv-editor-note">University degrees are listed without dates. The PhD remains in progress; degree titles and institutions are based on the original academic portfolio.</p>
    </section>

    <section className="cv-section" aria-labelledby="cv-schools-heading">
      <div className="cv-section-head"><div><p className="eyebrow">International academic development</p><h2 id="cv-schools-heading">Summer & winter schools</h2></div><School size={23} strokeWidth={1.35} aria-hidden="true"/></div>
      <p className="cv-section-intro">Restored from my earlier website’s certificates and recognition archive. The linked organizer pages establish each programme, while individual participation or awards are retained as historical researcher-provided records.</p>
      {schoolYears.map(year => <div className="cv-schools-year" key={year}>
        <h3 className="cv-schools-year-heading">{year}<span>{researchSchools.filter(s=>s.year===year).length} programmes</span></h3>
        <div className="cv-schools-grid">{researchSchools.filter(item=>item.year===year).map(item => <SchoolCard key={item.name} item={item}/>)}</div>
      </div>)}
      <p className="cv-editor-note">The Terahertz Summer School entry comes from an archived oral-presentation award, not a course-completion certificate. No school qualifies as an additional university degree, and archived certificate images are not fabricated or replaced.</p>
    </section>

    <section className="cv-section cv-short-programmes" aria-labelledby="cv-development-heading">
      <div className="cv-section-head"><div><p className="eyebrow">Further professional development</p><h2 id="cv-development-heading">Other short programmes</h2></div><Landmark size={22} strokeWidth={1.4} aria-hidden="true"/></div>
      {additionalLearning.map(item => <article className="cv-short-programme" key={item.name}>
        <div className="cv-short-year">{item.year}</div>
        <div><h3>{item.name}</h3><p>{item.organization} · {item.location}</p><a href={item.eventUrl} target="_blank" rel="noopener noreferrer">Institution website <ArrowUpRight size={14} aria-hidden="true"/></a></div>
      </article>)}
      <p className="cv-editor-note">The historical Oxford/UNESCO record is presented as professional learning, not as an Oxford degree, formal university appointment, or independently verified qualification.</p>
    </section>
  </div>;
}

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skillIcons[skill.icon];
  return <article className="cv-skill-card">
    <div className="cv-skill-heading"><span className="cv-skill-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.5}/></span><span className="cv-skill-index">{skill.id} / 10</span></div>
    <h3>{skill.name}</h3><p>{skill.summary}</p>
    <div className="cv-skill-tags">{skill.methods.map(method => <span key={method}>{method}</span>)}</div>
    <a href={`https://github.com/Rocky5502/${encodeURIComponent(skill.evidenceRepo)}`} className="cv-evidence-link" target="_blank" rel="noopener noreferrer">
      <span>{skill.evidence} · {skill.evidenceType === "Public implementation" ? "Public code" : "Research tooling / plan"}</span>
      <ArrowUpRight size={15} aria-hidden="true"/>
    </a>
  </article>;
}

export function CVSkillsPage() {
  return <div className="content-wrap interior-page cv-page cv-skills-page">
    <CVHeader section="Research & technical skills" title="Research & technical skills"
      subtitle="Ten focused AI and software-engineering competencies, each accompanied by evidence from public research artifacts."/>
    <CVSectionNav active="/cv/skills"/>
    <section className="cv-section" aria-labelledby="cv-skills-heading">
      <div className="cv-section-head"><div><p className="eyebrow">Methods, tooling & systems</p><h2 id="cv-skills-heading">10 research & engineering competencies</h2></div><BrainCircuit size={22} strokeWidth={1.35} aria-hidden="true"/></div>
      <p className="cv-section-intro">These links show code or planned experimental tooling, not a claim that every configured model, dataset, or GPU experiment has been successfully executed.</p>
      <div className="cv-skills-grid">{researchSkills.map(skill => <SkillCard skill={skill} key={skill.id}/>)}</div>
    </section>
  </div>;
}

export function CVLanguagesPage() {
  return <div className="content-wrap interior-page cv-page cv-languages-page">
    <CVHeader section="Languages" title="Programming & languages"
      subtitle="A practical overview of computing languages and international communication, without invented proficiency labels."/>
    <CVSectionNav active="/cv/languages"/>
    <section className="cv-section" aria-labelledby="cv-programming-heading">
      <div className="cv-section-head"><div><p className="eyebrow">Research computing</p><h2 id="cv-programming-heading">Programming languages</h2></div><Code2 size={22} strokeWidth={1.4} aria-hidden="true"/></div>
      <div className="cv-language-list">{programmingLanguages.map(lang =>
        <div className="cv-language-item" key={lang.name}><span className="cv-lang-code" aria-hidden="true">⌘</span><strong>{lang.name}</strong><span>{lang.basis}</span></div>
      )}</div>
      <p className="cv-editor-note">Python and TypeScript are visible in public code. Java, C++, C and R are researcher-listed; formal skills assessment has not been performed.</p>
    </section>
    <section className="cv-section" aria-labelledby="cv-languages-heading">
      <div className="cv-section-head"><div><p className="eyebrow">International communication</p><h2 id="cv-languages-heading">Spoken languages</h2></div><Languages size={23} strokeWidth={1.35} aria-hidden="true"/></div>
      <div className="cv-spoken-list">{spokenLanguages.map((lang,i) =>
        <span className="cv-spoken-item" key={lang}><span aria-hidden="true">{String(i+1).padStart(2,"0")}</span>{lang}</span>
      )}</div>
      <p className="cv-editor-note">Researcher-reported communication languages; no CEFR rating, native-fluency label or language certification is claimed.</p>
    </section>
  </div>;
}
