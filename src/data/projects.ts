/**
 * Curated public repositories verified using the owner's connected GitHub account.
 * Separately named private project previews below are intentionally high-level:
 * never link to inaccessible repos or reveal private artifacts or findings.
 */
export type PublicProject = {
  name: string;
  repo: string;
  category: "Software engineering" | "Uncertainty & reasoning" | "Trustworthy AI";
  icon: string;
  description: string;
  question: string;
  tags: string[];
  featured?: boolean;
  stage: "Research artifact" | "In development";
  /** Do not imply a curated public release exists, even when a GitHub shell is visible. */
  release?: "coming-soon";
};
export const publicProjects: PublicProject[] = [
  {
    name: "OpenCoderX", repo: "OCX_Uncertainty", category: "Software engineering", icon: "⌘",
    description: "An uncertainty-aware environment for repository-level coding, retrieval, verification, and human–AI decision-making.",
    question: "When should a coding assistant act, ask for context, or stop?",
    tags: ["Code generation", "Repository retrieval", "Human–AI"],
    featured: true, stage: "Research artifact",
  },
  {
    name: "GreenUTest", repo: "GreenUTest", category: "Software engineering", icon: "♻",
    description: "Energy- and uncertainty-aware test-generation research, with resource-conscious verification and escalation.",
    question: "When is extra computation worthwhile for a software test?",
    tags: ["Software testing", "Energy", "Uncertainty"],
    featured: true, stage: "In development",
  },
  {
    name: "U-TRUST", repo: "U_TRUST_v1", category: "Trustworthy AI", icon: "◇",
    description: "An experimental multi-agent trust-routing framework for reducing prompt-injection propagation.",
    question: "How can agents detect and contain untrusted instructions?",
    tags: ["Agent security", "Prompt injection", "Alignment"],
    featured: true, stage: "In development",
  },
  {
    name: "TraceCalib-SE", repo: "TraceCalib", category: "Software engineering", icon: "↗",
    description: "Studies uncertainty across coding-agent trajectories, from repository search through repair.",
    question: "At which point in an engineering workflow can failure be predicted?",
    tags: ["Agent trajectories", "Calibration", "SE agents"],
    stage: "In development",
  },
  {
    name: "U-SemBridge", repo: "U-SemBridge_V1", category: "Trustworthy AI", icon: "⇄",
    description: "Investigates semantic errors when natural-language problems are translated into formal representations.",
    question: "Can correct solver answers be trusted when the translation is wrong?",
    tags: ["Neuro-symbolic", "Verification", "Semantic risk"],
    stage: "In development",
  },
  {
    name: "ULLM", repo: "ULLM", category: "Uncertainty & reasoning", icon: "◎",
    description: "Evaluates semantic uncertainty, calibrated confidence, and selective decisions in language models.",
    question: "Does uncertainty reflect missing information or model confusion?",
    tags: ["Language models", "Calibration", "Evaluation"],
    stage: "Research artifact",
  },
  {
    name: "BeyondUncertainty", repo: "BeyondUncertainty", category: "Uncertainty & reasoning", icon: "∿",
    description: "Studies how uncertainty evolves during reasoning and retrieval, rather than at the final answer alone.",
    question: "When should an LLM retrieve, continue, or abstain?",
    tags: ["Retrieval", "Reasoning", "Selective prediction"],
    stage: "Research artifact",
  },
  {
    name: "OpenCoder", repo: "OpenCoder", category: "Software engineering", icon: "{ }",
    release: "coming-soon",
    description: "Experiments with retrieval-source quality and uncertainty in repository-level code generation.",
    question: "Which retrieved context makes generated code more reliable?",
    tags: ["Code", "RAG", "Uncertainty"],
    stage: "Research artifact",
  },
  {
    name: "CL / EBF", repo: "CL_V1", category: "Trustworthy AI", icon: "⚖",
    description: "Explores fairness in how language models recognize and communicate uncertainty.",
    question: "Do models handle uncertain evidence consistently across contexts?",
    tags: ["Fairness", "Epistemic behavior", "Evaluation"],
    stage: "In development",
  },
];
/**
 * Names and broad descriptions approved for the public CV/Projects page.
 * The GitHub repositories are PRIVATE as checked through the connected account.
 * No outcomes, technical configurations, acceptance claims or code links are shown.
 */
export type OngoingProject = {
  name: string;
  category: PublicProject["category"];
  icon: string;
  description: string;
  question: string;
  tags: string[];
  stage: "Private research";
};
export const ongoingProjects: OngoingProject[] = [
  {
    name: "U-SMASH", category: "Software engineering", icon: "↗",
    description: "Research on source-aware uncertainty in repository-level software repair workflows.",
    question: "Which stage of a repair workflow creates uncertainty, and when is further checking warranted?",
    tags: ["Software repair", "Uncertainty", "Verification"],
    stage: "Private research",
  },
  {
    name: "UOpenAI / U-PROVE", category: "Uncertainty & reasoning", icon: "∴",
    description: "Investigation of uncertainty-informed review priorities for AI-generated mathematical proofs.",
    question: "Can uncertainty help prioritize independent verification of proof steps?",
    tags: ["Mathematical reasoning", "Verification", "Calibration"],
    stage: "Private research",
  },
  {
    name: "NMI · Epistemic Conservation", category: "Trustworthy AI", icon: "◇",
    description: "An exploratory study of whether AI systems become more confident without receiving new evidence.",
    question: "Can evidence-preserving transformations reveal unjustified confidence gains?",
    tags: ["Evidence", "Confidence", "Reliability"],
    stage: "Private research",
  },
  {
    name: "TrajUQ", category: "Uncertainty & reasoning", icon: "◎",
    description: "Research into trajectory-aware uncertainty for diffusion language models.",
    question: "Can generation trajectories help identify risky predictions and guide selective inference?",
    tags: ["Diffusion language models", "Calibration", "Selective generation"],
    stage: "Private research",
  },
];

export const publicProjectUrl = (repo: string) => `https://github.com/Rocky5502/${encodeURIComponent(repo)}`;
