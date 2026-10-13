import {
  ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, ChartNoAxesCombined,
  CheckCheck, Code2, Cpu, FileText, GitBranch, GraduationCap,
  ShieldCheck, FlaskConical, Terminal, Workflow, Languages, BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router-dom";
import { identity } from "@/data/portfolio";
import {
  education, researchSkills, programmingLanguages, spokenLanguages, cvLinks,
  type Skill,
} from "@/data/cv";

const skillIcons = {
  brain: BrainCircuit,
  chart: ChartNoAxesCombined,
  cpu: Cpu,
  code: Code2,
  check: CheckCheck,
  shield: ShieldCheck,
  terminal: Terminal,
  workflow: Workflow,
  flask: FlaskConical,
  git: GitBranch,
} as const;

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skillIcons[skill.icon];
  return <article className="cv-skill-card">
    <div className="cv-skill-heading">
      <span className="cv-skill-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.5}/></span>
      <span className="cv-skill-index">{skill.id} / 10</span>
    </div>
    <h3>{skill.name}</h3>
    <p>{skill.summary}</p>
    <div className="cv-skill-tags">
      {skill.methods.map(method => <span key={method}>{method}</span>)}
    </div>
    <a href={`https://github.com/Rocky5502/${encodeURIComponent(skill.evidenceRepo)}`}
      className="cv-evidence-link" target="_blank" rel="noopener noreferrer">
      <span>{skill.evidence} · {skill.evidenceType === "Public implementation" ? "Public code" : "Research tooling / plan"}</span>
      <ArrowUpRight size={15} aria-hidden="true"/>
    </a>
  </article>;
}

export default function CVPage() {
  return <div className="content-wrap interior-page cv-page">
    <header className="page-heading cv-heading">
      <p className="eyebrow">Academic profile / Curriculum vitae</p>
      <h1>CV & Skills</h1>
      <p className="page-intro">Research experience, education, technical competencies, and academic service—with an emphasis on evidence from public work rather than self-assigned expertise scores.</p>
      <div className="cv-quick-links">
        <a className="cv-quick-primary" href={identity.scholar} target="_blank" rel="noopener noreferrer"><BookOpen size={16} aria-hidden="true"/> Google Scholar <ArrowUpRight size={15} aria-hidden="true"/></a>
        <a href={identity.orcid} target="_blank" rel="noopener noreferrer">ORCID <ArrowUpRight size={14} aria-hidden="true"/></a>
        <a href={identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true"/></a>
        <a href={identity.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true"/></a>
      </div>
    </header>

    <section className="cv-section" aria-labelledby="cv-education-heading">
      <div className="cv-section-head">
        <div><p className="eyebrow">Academic foundation</p><h2 id="cv-education-heading">Education</h2></div>
        <GraduationCap size={23} strokeWidth={1.35} aria-hidden="true"/>
      </div>
      <div className="cv-education-list">
        {education.map((entry, i) => <article className="cv-education-row" key={entry.degree}>
          <div className="cv-education-aside"><span>{String(i + 1).padStart(2, "0")}</span><span>{entry.period}</span></div>
          <div className="cv-education-detail">
            <h3>{entry.degree}</h3>
            <p className="cv-degree-field">{entry.field}</p>
            <div className="cv-institution"><a href={entry.institutionUrl} target="_blank" rel="noopener noreferrer">{entry.institution} <ArrowUpRight size={14} aria-hidden="true"/></a><span>· {entry.location}</span></div>
            <p className="cv-education-description">{entry.description}</p>
          </div>
        </article>)}
      </div>
      <p className="cv-editor-note">Education entries were restored from the original website. The earlier CV used 2022 and 2018 as year markers for the master's and bachelor's records; these are not treated as verified graduation dates. Confirmed dates can be added later.</p>
    </section>

    <section className="cv-section cv-technical" aria-labelledby="cv-skills-heading">
      <div className="cv-section-head">
        <div><p className="eyebrow">Methods, tooling & systems</p><h2 id="cv-skills-heading">10 research & engineering competencies</h2></div>
        <BrainCircuit size={22} strokeWidth={1.35} aria-hidden="true"/>
      </div>
      <p className="cv-section-intro">A selected inventory of recurring research themes, code capabilities and experimental workflows. Source links illustrate implementation or research preparation; they are not claims that every planned benchmark or model run has been completed.</p>
      <div className="cv-skills-grid">{researchSkills.map(skill => <SkillCard skill={skill} key={skill.id}/>)}</div>
    </section>

    <section className="cv-section" aria-labelledby="cv-programming-heading">
      <div className="cv-section-head">
        <div><p className="eyebrow">Programming & research computing</p><h2 id="cv-programming-heading">Programming languages</h2></div>
        <Code2 size={22} strokeWidth={1.4} aria-hidden="true"/>
      </div>
      <div className="cv-language-list">{programmingLanguages.map(lang =>
        <div className="cv-language-item" key={lang.name}><span className="cv-lang-code" aria-hidden="true">⌘</span><strong>{lang.name}</strong><span>{lang.basis}</span></div>
      )}</div>
      <p className="cv-editor-note">Python and TypeScript are visible in public source code. Java, C++, C and R are included from my researcher-provided list; their depth of use and proficiency levels are not independently assessed.</p>
    </section>

    <section className="cv-section" aria-labelledby="cv-languages-heading">
      <div className="cv-section-head">
        <div><p className="eyebrow">International communication</p><h2 id="cv-languages-heading">Languages</h2></div>
        <Languages size={23} strokeWidth={1.35} aria-hidden="true"/>
      </div>
      <div className="cv-spoken-list">{spokenLanguages.map((lang, i) =>
        <span className="cv-spoken-item" key={lang}><span aria-hidden="true">{String(i+1).padStart(2, "0")}</span>{lang}</span>
      )}</div>
      <p className="cv-editor-note">Self-reported languages; no formal CEFR level, certification, native-language classification, or fluency ranking is claimed.</p>
    </section>

    <section className="cv-section cv-experience" aria-labelledby="cv-experience-heading">
      <div className="cv-section-head">
        <div><p className="eyebrow">Further academic information</p><h2 id="cv-experience-heading">Research, publications & service</h2></div>
        <FileText size={22} strokeWidth={1.35} aria-hidden="true"/>
      </div>
      <div className="cv-destinations">
        <Link to={cvLinks.research}><BrainCircuit size={19} aria-hidden="true"/><span><strong>Research directions</strong><small>Trustworthy AI, uncertainty, software engineering</small></span><ArrowRight size={16} aria-hidden="true"/></Link>
        <Link to={cvLinks.publications}><BookOpen size={19} aria-hidden="true"/><span><strong>Publications</strong><small>Journal articles, conference papers, preprints</small></span><ArrowRight size={16} aria-hidden="true"/></Link>
        <Link to={cvLinks.projects}><GitBranch size={19} aria-hidden="true"/><span><strong>Open research projects</strong><small>Repository links and reproducible research artifacts</small></span><ArrowRight size={16} aria-hidden="true"/></Link>
        <Link to={cvLinks.service}><ShieldCheck size={19} aria-hidden="true"/><span><strong>Academic service</strong><small>Peer review, volunteering, student leadership</small></span><ArrowRight size={16} aria-hidden="true"/></Link>
        <Link to={cvLinks.awards}><GraduationCap size={19} aria-hidden="true"/><span><strong>Awards & appreciation</strong><small>Historical records and certificates by year</small></span><ArrowRight size={16} aria-hidden="true"/></Link>
        <Link to={cvLinks.opportunities}><BriefcaseBusiness size={19} aria-hidden="true"/><span><strong>Opportunities</strong><small>Academic, visiting, fellowship and industry research</small></span><ArrowRight size={16} aria-hidden="true"/></Link>
      </div>
    </section>

    <div className="cv-endnote"><p>This is a concise web CV, not a verified transcript or formal PDF curriculum vitae. Degree dates, programming proficiency and spoken-language levels should be confirmed before use in formal applications.</p><a href={`mailto:${identity.email}?subject=Research%20or%20academic%20opportunity`}>Request academic details <ArrowRight size={15} aria-hidden="true"/></a></div>
  </div>;
}
