export const profile = {
  name: "Chandan Kumar Sah",
  altName: "Rocky 文浩",
  handle: "Rocky_202X",
  role: "PhD Researcher · Software Engineering & Artificial Intelligence",
  affiliation: "Software Engineering Institute, Beihang University",
  location: "Beijing, China",
  tagline:
    "Building reliable, fair, and uncertainty-aware AI systems for the next generation of software intelligence.",
  email: "sahchandan98@buaa.edu.cn",
};

export const links = {
  scholar: "https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en",
  linkedin:
    "https://www.linkedin.com/in/chandan-sah-rocky-%E6%96%87%E6%B5%A9-5803bb1b4/",
  github: "https://github.com/Rocky5502",
  x: "https://x.com/Rocky_202X",
  researchgate: "https://www.researchgate.net/profile/Chandan-Kumar-Sah-2",
  openreview: "https://openreview.net/profile?id=%7EChandan_Kumar_Sah1",
  orcid: "https://orcid.org/0009-0002-4017-7970",
};

export type Publication = {
  title: string;
  venue?: string;
  year?: string;
  category:
    | "LLMs"
    | "Fairness"
    | "Multimodal"
    | "SE & AI"
    | "Education"
    | "Maintenance"
    | "Theory";
  status?: string;
  authors?: string;
  link?: string;
  contribution?: string;
};

export const publications: Publication[] = [
  {
    title: "Understanding Uncertainty in LLMs",
    authors: "Chandan Kumar Sah",
    venue:
      "2025 40th IEEE/ACM International Conference on Automated Software Engineering (ASE), pp. 4128–4130",
    year: "2025",
    category: "LLMs",
    status: "Published",
    contribution: "First author",
    link: "https://ieeexplore.ieee.org/abstract/document/11334526",
  },
  {
    title:
      "Uncertainty and Fairness Awareness in LLM-Based Recommendation Systems",
    authors:
      "Chandan Kumar Sah, Xiaoli Lian, Li Zhang, Tony Xu, Syed Shazaib Shah",
    venue:
      "The International Association for Safe & Ethical AI (IASEAI), February 2026 · Soon to appear in AAAI proceedings",
    year: "2026",
    category: "Fairness",
    status: "Published / Proceedings forthcoming",
    contribution: "First author",
    link: "https://arxiv.org/abs/2602.02582",
  },
  {
    title:
      "Fairness Evaluation in LLM-Based Educational Recommender Systems: A Framework for Equitable Learning",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Tony Xu, Li Zhang",
    venue:
      "Artificial Intelligence in Education — Creating an Equitable, Creative, and Effective Learning Environment, IntechOpen",
    year: "2026",
    category: "Education",
    status: "Published",
    contribution: "First author",
    link: "https://www.intechopen.com/chapters/1230310",
  },
  {
    title:
      "SafeRoute: Enhancing Traffic Scene Understanding via a Unified Deep Learning and Multimodal LLM",
    authors:
      "Ankit Kumar Shaw, Chandan Kumar Sah, Xiaoli Lian, Arsalan Shahid Baig, Tuopu Wen, Kun Jiang, Mengmeng Yang, Diange Yang, Li Zhang",
    venue:
      "The IEEE/CVF International Conference on Computer Vision, ICCV 2025",
    year: "2025",
    category: "Multimodal",
    status: "Published",
    contribution: "Equal contribution",
    link: "https://ieeexplore.ieee.org/document/11375739",
  },
  {
    title:
      "PerFairX: Is There a Balance Between Fairness and Personality in Large Language Model Recommendations?",
    authors: "Chandan Kumar Sah",
    venue:
      "The IEEE/CVF International Conference on Computer Vision, ICCV 2025",
    year: "2025",
    category: "Fairness",
    status: "Published",
    contribution: "First author",
    link: "https://ieeexplore.ieee.org/document/11375720",
  },
  {
    title:
      "Unveiling Bias in Fairness Evaluations of Large Language Models: A Critical Literature Review of Music and Movie Recommendation Systems",
    authors: "Sah Chandan Kumar, Lian Xiaoli, Muhammad Mirajul Islam",
    venue:
      "International Journal of Innovative Science and Research Technology",
    year: "2024",
    category: "Fairness",
    status: "Published",
    contribution: "First author",
    link: "https://doi.org/10.5281/zenodo.10469839",
  },
  {
    title:
      "Navigating the AI Frontier: A Critical Literature Review on Integrating Artificial Intelligence into Software Engineering Education",
    authors:
      "Sah Chandan Kumar, Lian Xiaoli, Muhammad Mirajul Islam, Md Kamrul Islam",
    venue:
      "The 36th IEEE International Conference on Software Engineering Education and Training",
    year: "2024",
    category: "SE & AI",
    status: "Published",
    contribution: "First author",
    link: "https://ieeexplore.ieee.org/abstract/document/10663054",
  },
  {
    title:
      "CleanMAP: Distilling Multimodal LLMs for Confidence-Driven Crowdsourced HD Map Updates",
    authors:
      "Ankit Kumar Shaw, Kun Jiang, Tuopu Wen, Sah Chandan Kumar, Yining Shi, Mengmeng Yang, Diange Yang, Xiaoli Lian",
    venue:
      "The IEEE/CVF Conference on Computer Vision and Pattern Recognition, CVPR 2025",
    year: "2025",
    category: "Multimodal",
    status: "Published",
    contribution: "Co-author",
    link: "https://openaccess.thecvf.com/content/CVPR2025W/WDFMAD/html/Shaw_CleanMAP_Distilling_Multimodal_LLMs_for_Confidence-Driven_Crowdsourced_HD_Map_Updates_CVPRW_2025_paper.html",
  },
  {
    title:
      "RUL Forecasting for Wind Turbine Predictive Maintenance Based on Deep Learning",
    authors: "Syed Shazaib Shah, Tan Daoliang, Sah Chandan Kumar",
    venue: "Heliyon, Cell",
    year: "2024",
    category: "Maintenance",
    status: "Published",
    contribution: "Co-author",
    link: "https://www.sciencedirect.com/science/article/pii/S2405844024152991",
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
  "Outstanding Reviewer Award — ECIR 2026",
  "Excellent International Graduate 2025 — Beihang University",
  "Chinese Government Scholarship — High-level Postgraduates Program, PhD",
  "International Student Ambassador, Beihang University",
  "Academic & Innovation Lead, International Graduate Student Union",
  "WiDS Ambassador — Beijing",
  "ASE 2025 Student Research Competition — Second Place, Graduate Category",
  "Terahertz Science & Application Summer School — Best Oral Presentation Award",
  "AI policy research engagement",
];

export const reviewing = {
  conferences: ["NeurIPS", "ICCV", "AAAI", "ECIR", "ASE", "CVPR"],
  journals: [
    "ACM Transactions on Software Engineering and Methodology (TOSEM)",
    "Complex & Intelligent Systems (Springer)",
    "IEEE Transactions on Neural Networks and Learning Systems",
  ],
};

export const talks = [
  {
    title: "Understanding Uncertainty in LLMs",
    venue: "ASE 2025 ",
    year: "2025",
  },
  {
    title: "Fairness & Innovation in AI for LLM Recommender Systems",
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
    when: "2025 — Present",
    title: "Ph.D. Researcher · Software Engineering & Artificial Intelligence",
    where:
      "School of Computer Science and Engineering, Beihang University · Beijing, China",
    link: "https://scse.buaa.edu.cn/",
    desc:
      "Researching uncertainty-aware LLMs, retrieval-augmented code generation, AI for software engineering, fairness-aware recommender systems, and reliable AI architectures.",
  },

  {
    when: "2022",
    title: "M.Eng. · Computer Science & Engineering",
    where:
      "School of Computer Science and Engineering, Beihang University · Beijing, China",
    link: "https://scse.buaa.edu.cn/",
    desc:
      "Focused on artificial intelligence, software engineering, recommender systems, fairness evaluation, multimodal AI, and LLM-based intelligent systems.",
  },

  {
    when: "2018",
    title: "B.Eng. · Software Engineering",
    where:
      "School of Software Engineering, Sichuan University · Chengdu, China",
    link: "https://sw.scu.edu.cn/",
    desc:
      "Built strong foundations in software engineering, algorithms, intelligent systems, programming, and applied machine learning.",
  },
  {
    when: "Ongoing",
    title: "Founders AGI · 文浩AGI",
    where: "Independent initiative",
    link: "https://www.linkedin.com/company/foundersagi/?viewAsMember=true",
    desc: "Applied generative intelligence and research entrepreneurship.",
  },

];

export const service = [
  "Reviewer — NeurIPS, ICCV, AAAI, ECIR",
  "Reviewer — ACM Transactions on Software Engineering and Methodology (TOSEM)",
  "Reviewer — Complex & Intelligent Systems (Springer)",
  "PC member / sub-reviewer — AAAI's AIES, ECIR research tracks",
  "International Student Ambassador, Beihang University",
  "WiDS Beijing community engagement & mentorship",
  "Graduate student leadership · diversity & inclusion in AI",
];
