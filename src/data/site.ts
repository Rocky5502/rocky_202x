export const profile = {
  name: "Chandan Kumar Sah",
  altName: "Rocky 文浩",
  handle: "Rocky_202X",
  role: "PhD Researcher · Software Engineering & Artificial Intelligence",
  affiliation: "Software Engineering Institute, Beihang University",
  location: "Beijing, China",
  tagline:
    "Building reliable, fair, and uncertainty-aware AI systems for the next generation of software intelligence.",
  email: "your.email@example.com", // editable placeholder
};

export const links = {
  scholar: "https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en",
  linkedin:
    "https://www.linkedin.com/in/chandan-sah-rocky-%E6%96%87%E6%B5%A9-5803bb1b4/",
  github: "https://github.com/Rocky5502",
  x: "https://x.com/Rocky_202X",
  researchgate: "https://www.researchgate.net/profile/Chandan-Kumar-Sah-2",
  ase: "https://conf.researchr.org/profile/ase-2025/chandankumarsah",
  aiware: "https://2025.aiwareconf.org/profile/chandankumarsah",
};

export type Publication = {
  title: string;
  venue?: string;
  year?: string;
  category: "LLMs" | "Fairness" | "Multimodal" | "SE & AI" | "Theory";
  status?: string;
  authors?: string;
};

export const publications: Publication[] = [
  {
    title: "Understanding Uncertainty In LLMs",
    category: "LLMs",
    status: "Selected · ASE / AIware 2025 profile",
    venue: "Selected research talk",
  },
  {
    title:
      "PerFairX: Is There a Balance Between Fairness and Personality in Large Language Model Recommendations?",
    category: "Fairness",
    status: "Under review",
  },
  {
    title:
      "SafeRoute: Enhancing Traffic Scene Understanding via a Unified Deep Learning and Multimodal LLM",
    category: "Multimodal",
    status: "Selected",
  },
  {
    title:
      "CleanMAP: Distilling Multimodal LLMs for Confidence-Driven Crowdsourced HD Map Updates",
    category: "Multimodal",
    status: "Selected",
  },
  {
    title:
      "FairEval: Evaluating Fairness in LLM-Based Recommendations with Personality Awareness",
    category: "Fairness",
    status: "Under review",
  },
  {
    title:
      "Navigating the AI Frontier: A Critical Literature Review on Integrating Artificial Intelligence into Software Engineering Education",
    category: "SE & AI",
    status: "Selected",
  },
  {
    title:
      "Unveiling Bias in Fairness Evaluations of Large Language Models: A Critical Literature Review of Music and Movie Recommendation Systems",
    category: "Fairness",
    status: "Selected",
  },
  {
    title:
      "Prescribed Performance Control for Solving Time-Varying Underdetermined Linear Systems With Bounds on States and Their Derivatives",
    category: "Theory",
    status: "Published",
  },
];

export const projects = [
  {
    name: "OpenCoder",
    desc: "Open initiative on uncertainty-aware code generation and retrieval-augmented programming assistants.",
    tags: ["LLM", "Code", "RAG"],
  },
  {
    name: "Uncertainty Propagation in LLM Reasoning",
    desc: 'Calibration, abstention, and reliability in LLMs — when models should say "I don\'t know."',
    tags: ["LLM", "Calibration", "Reliability"],
  },
  {
    name: "PerFairX / FairEval",
    desc: "Evaluating fairness, personality, and bias in LLM-based recommender systems.",
    tags: ["Fairness", "RecSys", "LLM"],
  },
  {
    name: "CleanMAP / SafeRoute",
    desc: "Multimodal LLM systems for HD-map updates and traffic scene understanding.",
    tags: ["Multimodal", "Autonomy"],
  },
  {
    name: "Founders AGI · 文浩AGI",
    desc: "Independent research and entrepreneurial initiative exploring applied generative intelligence.",
    tags: ["AGI", "Applied"],
  },
];

export const pillars = [
  {
    title: "Uncertainty-Aware LLMs",
    desc: "Calibrating reasoning, retrieval, and abstention so language models know what they don't know.",
  },
  {
    title: "AI for Software Engineering",
    desc: "LLM-driven code generation, repair, and assistive tooling that engineers can actually trust.",
  },
  {
    title: "Fair & Personalized Recommenders",
    desc: "Designing recommender systems that balance personalization, fairness, and personality awareness.",
  },
  {
    title: "Multimodal & Applied AI",
    desc: "Vision-language systems for autonomy, mapping, and real-world AI deployment.",
  },
];

export const honors = [
  "International Student Ambassador, Beihang University",
  "Academic & Innovation Lead, International Graduate Student Union",
  "WiDS (Women in Data Science) Ambassador — Beijing",
  "AI policy research engagement",
  "Terahertz Science & Application Summer School — participant & presenter",
];

export const talks = [
  {
    title: "Understanding Uncertainty In LLMs",
    venue: "ASE 2025 / AIware 2025 — Selected",
    year: "2025",
  },
  {
    title:
      "Fairness & Innovation in AI for LLM Recommender Systems",
    venue: "Beihang Terahertz Summer School Presentation",
    year: "2024",
  },
  {
    title: "Invited talks · seminars · workshops",
    venue: "Coming soon",
    year: "2026",
  },
];

export const timeline = [
  {
    when: "2024 — Present",
    title: "PhD Researcher",
    where: "Software Engineering Institute, Beihang University",
    desc: "Reliable, uncertainty-aware AI for software engineering and LLM reasoning.",
  },
  {
    when: "2021 — 2024",
    title: "M.Eng. · Computer Science & Engineering",
    where: "School of Computer Science and Engineering, Beihang University",
    desc: "Research in deep learning, fairness, and recommender systems.",
  },
  {
    when: "Earlier",
    title: "Software Engineering Studies",
    where: "Undergraduate foundation",
    desc: "Software systems, algorithms, and applied machine learning.",
  },
  {
    when: "Ongoing",
    title: "Founders AGI · 文浩AGI",
    where: "Independent initiative",
    desc: "Applied generative intelligence and research entrepreneurship.",
  },
];

export const service = [
  "International Student Ambassador, Beihang University",
  "Graduate student leadership & mentorship",
  "WiDS Beijing community engagement",
  "Diversity & inclusion in AI research",
  "AI policy & governance dialogue",
  "Research recruitment & global collaboration",
];
