/**
 * A compact research-oriented CV, recovered from the owner's historical
 * portfolio and curated against public GitHub README files (2026-10-13).
 *
 * Avoid unsupported claims of "top 0.1%", arbitrary mastery percentages,
 * confirmed model runs, certified fluency, or degree-completion dates.
 */
export type EducationRecord = {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  sourceNote: string;
  description: string;
  institutionUrl: string;
};
export const education: EducationRecord[] = [
  {
    degree: "Ph.D. · In progress",
    field: "Software Engineering & Artificial Intelligence",
    institution: "Beihang University",
    location: "Beijing, China",
    period: "2025–present",
    sourceNote: "Doctoral study, as stated in the original academic website.",
    description: "Uncertainty-aware language models, trustworthy AI agents, and dependable software engineering.",
    institutionUrl: "https://scse.buaa.edu.cn/",
  },
  {
    degree: "Master of Engineering",
    field: "Computer Science & Engineering",
    institution: "Beihang University",
    location: "Beijing, China",
    period: "Previous degree",
    sourceNote: "Original portfolio carried the year 2022; this has not been verified as a graduation date.",
    description: "Research foundations in AI, software engineering, fairness-aware recommendation and multimodal systems.",
    institutionUrl: "https://scse.buaa.edu.cn/",
  },
  {
    degree: "Bachelor of Engineering",
    field: "Software Engineering",
    institution: "Sichuan University",
    location: "Chengdu, China",
    period: "Previous degree",
    sourceNote: "Original portfolio carried the year 2018; this has not been verified as a graduation date.",
    description: "Software engineering, programming, algorithms and applied machine learning.",
    institutionUrl: "https://www.scu.edu.cn/",
  },
];

export type Skill = {
  id: string;
  name: string;
  icon: "brain" | "chart" | "cpu" | "code" | "check" | "shield" | "terminal" | "workflow" | "flask" | "git";
  summary: string;
  methods: readonly string[];
  evidence: string;
  evidenceRepo: string;
  evidenceType: "Public implementation" | "Public research plan / tooling";
};
export const researchSkills: Skill[] = [
  {
    id: "01", name: "LLM evaluation & benchmarking", icon: "chart",
    summary: "Auditable experiments on model reliability, semantic uncertainty and cross-model behavior.",
    methods: ["Benchmark design", "Paired comparisons", "Risk–coverage"],
    evidence: "ULLM", evidenceRepo: "ULLM", evidenceType: "Public implementation",
  },
  {
    id: "02", name: "Uncertainty quantification & calibration", icon: "brain",
    summary: "Calibration, selective prediction, abstention and uncertainty across reasoning or retrieval steps.",
    methods: ["Brier / NLL", "AUROC / AURC", "Selective control"],
    evidence: "ULLM", evidenceRepo: "ULLM", evidenceType: "Public implementation",
  },
  {
    id: "03", name: "Open-weight LLM ecosystems", icon: "cpu",
    summary: "Model-family integrations and experimental configurations, including Qwen, Mistral and access-dependent Llama.",
    methods: ["Qwen", "Mistral", "Llama (configured)"],
    evidence: "U-SemBridge", evidenceRepo: "U-SemBridge_V1", evidenceType: "Public research plan / tooling",
  },
  {
    id: "04", name: "Repository-level code generation", icon: "code",
    summary: "Retrieval-augmented coding assistants that combine repository context, API knowledge and executable feedback.",
    methods: ["Code RAG", "Repository context", "Verification"],
    evidence: "OpenCoderX", evidenceRepo: "OCX_Uncertainty", evidenceType: "Public implementation",
  },
  {
    id: "05", name: "Software testing & empirical SE", icon: "check",
    summary: "Evaluation pipelines for test generation, uncertainty-aware escalation, coverage and mutation-oriented quality.",
    methods: ["Test generation", "Coverage", "Reproducibility"],
    evidence: "GreenUTest", evidenceRepo: "GreenUTest", evidenceType: "Public implementation",
  },
  {
    id: "06", name: "Trustworthy AI & agent security", icon: "shield",
    summary: "Experimental threat models, trust routing and prompt-injection risk in multi-agent LLM workflows.",
    methods: ["Prompt injection", "Agent routing", "Risk controls"],
    evidence: "U-TRUST", evidenceRepo: "U_TRUST_v1", evidenceType: "Public research plan / tooling",
  },
  {
    id: "07", name: "GPU experiment engineering", icon: "terminal",
    summary: "Environment preflight, CUDA/PyTorch checks, model download/smoke tests and resource-conscious inference plans.",
    methods: ["CUDA / PyTorch", "Quantization", "Run manifests"],
    evidence: "U-TRUST", evidenceRepo: "U_TRUST_v1", evidenceType: "Public research plan / tooling",
  },
  {
    id: "08", name: "Neuro-symbolic verification", icon: "workflow",
    summary: "Formal intermediate representations, semantic-risk diagnosis and solver-aware AI evaluation.",
    methods: ["Translation risk", "Selective verification", "Solver checks"],
    evidence: "U-SemBridge", evidenceRepo: "U-SemBridge_V1", evidenceType: "Public implementation",
  },
  {
    id: "09", name: "Reproducible research & statistics", icon: "flask",
    summary: "Versioned model/data manifests, statistical evaluation, experiment audits and careful claims-to-evidence tracking.",
    methods: ["Python", "Statistical tests", "Experiment audits"],
    evidence: "TraceCalib-SE", evidenceRepo: "TraceCalib", evidenceType: "Public research plan / tooling",
  },
  {
    id: "10", name: "Research software engineering", icon: "git",
    summary: "Building Python research packages, CLI tools, automated checks and documented public research artifacts.",
    methods: ["Python", "Git / GitHub", "Testing / CI"],
    evidence: "OpenCoder", evidenceRepo: "OpenCoder", evidenceType: "Public implementation",
  },
];

/** User-provided lists; only Python and site TypeScript have been checked
 * against public repositories. Do not assert proficiency levels. */
export const programmingLanguages = [
  { name: "Python", basis: "Public research repositories" },
  { name: "TypeScript", basis: "Public website source" },
  { name: "Java", basis: "Researcher-listed" },
  { name: "C++", basis: "Researcher-listed" },
  { name: "C", basis: "Researcher-listed" },
  { name: "R", basis: "Researcher-listed" },
] as const;

/** Researcher-listed communication languages, NOT certified proficiency. */
export const spokenLanguages = ["Nepali", "English", "Chinese", "Hindi", "Urdu", "French"] as const;
export const cvLinks = {
  research: "/research",
  publications: "/publications",
  projects: "/projects",
  service: "/service",
  awards: "/awards",
  opportunities: "/connect",
} as const;
