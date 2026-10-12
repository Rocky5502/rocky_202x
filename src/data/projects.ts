/**
 * Curated PUBLIC repositories, verified in the owner's GitHub account
 * on 2026-10-12. Private work and under-review submissions are excluded.
 * Project descriptions refer to the published README, not private plans.
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
export const publicProjectUrl = (repo: string) => `https://github.com/Rocky5502/${encodeURIComponent(repo)}`;
