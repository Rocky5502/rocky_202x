/**
 * Public academic record, reviewed 12 October 2026.
 * Keep only items with a working primary-source publication URL.
 * Google Scholar blocks reliable automated scraping; use it as the
 * canonical complete list and maintain this selected, verified mirror.
 */
export type Publication = {
  title: string;
  authors: string;
  year: number;
  venue: string;
  type: "Journal" | "Conference" | "Workshop" | "Preprint" | "Book chapter";
  topic: "Reliable AI" | "AI for SE" | "Fairness" | "Multimodal AI" | "Other";
  url: string;
  /** Link to event rather than individual paper when proceedings are not yet online. */
  linkKind?: "venue";
  status?: "Accepted — author-reported; proceedings forthcoming";
  /** Rank is for the named venue, never automatically for workshops or special tracks. */
  rankingVenue?: "ASE" | "ICCV" | "CVPR" | "CSEET" | "CCS";
  rankingScope?: "main" | "host-only";
};

export const identity = {
  name: "Chandan Kumar Sah",
  also: "Rocky 文浩",
  position: "Doctoral Researcher",
  institution: "Beihang University",
  department: "Software Engineering Institute",
  email: "sahchandan98@buaa.edu.cn",
  // Public-facing PayPal recipient email requested by the site owner.
  // This is not a verified PayPal account or a payment link.
  paypalEmail: "sahchandan98@gmail.com",
  scholar: "https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en",
  orcid: "https://orcid.org/0009-0002-4017-7970",
  github: "https://github.com/Rocky5502",
  linkedin: "https://www.linkedin.com/in/chandan-sah-rocky-%E6%96%87%E6%B5%A9-5803bb1b4/",
  openreview: "https://openreview.net/profile?id=%7EChandan_Kumar_Sah1",
} as const;

export const publications: Publication[] = [
  {
    title: "Auditable Uncertainty Control for Secure LLM Agents",
    authors: "Chandan Kumar Sah",
    year: 2026,
    venue: "ACM SIGSAC Conference on Computer and Communications Security (CCS 2026), 15–19 November, The Hague, Netherlands",
    type: "Conference",
    topic: "Reliable AI",
    status: "Accepted — author-reported; proceedings forthcoming",
    linkKind: "venue",
    rankingVenue: "CCS",
    rankingScope: "host-only",
    url: "https://www.sigsac.org/ccs/CCS2026/",
  },
  {
    title: "Beyond Self-Knowledge: Propagating Uncertainty Across Reasoning and Retrieval in LLMs",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Li Zhang",
    year: 2026, venue: "arXiv:2607.25600", type: "Preprint", topic: "Reliable AI",
    url: "https://arxiv.org/abs/2607.25600",
  },
  {
    title: 'Beyond "What to Retrieve": Uncertainty in Retrieval-Augmented Code Generation',
    authors: "Chandan Kumar Sah, Xiaoli Lian, Li Zhang",
    year: 2026, venue: "arXiv:2607.24884", type: "Preprint", topic: "AI for SE",
    url: "https://arxiv.org/abs/2607.24884",
  },
  {
    title: "Uncertainty and Fairness Awareness in LLM-Based Recommendation Systems",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Li Zhang, Tony Xu, Syed Shazaib Shah",
    year: 2026, venue: "IASEAI 2026", type: "Conference", topic: "Fairness",
    url: "https://ojs.aaai.org/index.php/IASEAI/article/view/43060",
  },
  {
    title: "Fairness Evaluation in LLM-Based Educational Recommender Systems: A Framework for Equitable Learning",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Tony Xu, Li Zhang",
    year: 2026, venue: "IntechOpen", type: "Book chapter", topic: "Fairness",
    url: "https://www.intechopen.com/chapters/1230310",
  },
  {
    title: "Understanding Uncertainty in LLMs",
    authors: "Chandan Kumar Sah",
    year: 2025, venue: "ASE 2025 — Doctoral Symposium", type: "Conference", topic: "Reliable AI",
    rankingVenue: "ASE", rankingScope: "host-only",
    url: "https://ieeexplore.ieee.org/abstract/document/11334526",
  },
  {
    title: "PerFairX: Is There a Balance Between Fairness and Personality in Large Language Model Recommendations?",
    authors: "Chandan Kumar Sah, Xiaoli Lian",
    year: 2025, venue: "ICCV Workshops 2025", type: "Workshop", topic: "Fairness",
    rankingVenue: "ICCV", rankingScope: "host-only",
    url: "https://openaccess.thecvf.com/content/ICCV2025W/MCL/html/Sah_PerFairX_Is_There_a_Balance_Between_Fairness_and_Personality_in_ICCVW_2025_paper.html",
  },
  {
    title: "SafeRoute: Enhancing Traffic Scene Understanding via a Unified Deep Learning and Multimodal LLM",
    authors: "Ankit Kumar Shaw, Chandan Kumar Sah, Xiaoli Lian, Arsalan Shahid Baig, Tuopu Wen, Kun Jiang, Mengmeng Yang, Diange Yang, Li Zhang",
    year: 2025, venue: "ICCV Workshops 2025", type: "Workshop", topic: "Multimodal AI",
    rankingVenue: "ICCV", rankingScope: "host-only",
    url: "https://openaccess.thecvf.com/content/ICCV2025W/WDFM-AD/html/Shaw_SafeRoute_Enhancing_Traffic_Scene_Understanding_via_a_Unified_Deep_Learning_ICCVW_2025_paper.html",
  },
  {
    title: "CleanMAP: Distilling Multimodal LLMs for Confidence-Driven Crowdsourced HD Map Updates",
    authors: "Ankit Kumar Shaw, Kun Jiang, Tuopu Wen, Chandan Kumar Sah, Yining Shi, Mengmeng Yang, Diange Yang, Xiaoli Lian",
    year: 2025, venue: "CVPR Workshops 2025", type: "Workshop", topic: "Multimodal AI",
    rankingVenue: "CVPR", rankingScope: "host-only",
    url: "https://openaccess.thecvf.com/content/CVPR2025W/WDFM-AD/html/Shaw_CleanMAP_Distilling_Multimodal_LLMs_for_Confidence-Driven_Crowdsourced_HD_Map_Updates_CVPRW_2025_paper.html",
  },
  {
    title: "FairEval: Evaluating Fairness in LLM-Based Recommendations with Personality Awareness",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Tony Xu, Li Zhang",
    year: 2025, venue: "arXiv:2504.07801", type: "Preprint", topic: "Fairness",
    url: "https://arxiv.org/abs/2504.07801",
  },
  {
    title: "RUL Forecasting for Wind Turbine Predictive Maintenance Based on Deep Learning",
    authors: "Syed Shazaib Shah, Daoliang Tan, Chandan Kumar Sah",
    year: 2024, venue: "Heliyon", type: "Journal", topic: "Other",
    url: "https://www.sciencedirect.com/science/article/pii/S2405844024152991",
  },
  {
    title: "Navigating the AI Frontier: A Critical Literature Review on Integrating Artificial Intelligence into Software Engineering Education",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Muhammad Mirajul Islam, Md Kamrul Islam",
    year: 2024, venue: "CSEE&T 2024", type: "Conference", topic: "AI for SE",
    rankingVenue: "CSEET", rankingScope: "main",
    url: "https://ieeexplore.ieee.org/abstract/document/10663054",
  },
  {
    title: "Unveiling Bias in Fairness Evaluations of Large Language Models: A Critical Literature Review of Music and Movie Recommendation Systems",
    authors: "Chandan Kumar Sah, Xiaoli Lian, Muhammad Mirajul Islam",
    year: 2024, venue: "International Journal of Innovative Science and Research Technology", type: "Journal", topic: "Fairness",
    url: "https://doi.org/10.5281/zenodo.10469839",
  },
];

export const researchAreas = [
  { index: "01", name: "Uncertainty in language models", description: "What do language models know, and how can uncertainty guide retrieval, verification, and abstention?" },
  { index: "02", name: "AI for software engineering", description: "Building dependable code-generation systems around repository context, evidence quality, and testing." },
  { index: "03", name: "Fair and responsible recommendation", description: "Studying trade-offs between personalization, robustness, and demographic equity." },
  { index: "04", name: "Safety in autonomous systems", description: "Combining multimodal reasoning and formal safety questions with evidence-driven evaluation." },
];

export const selectedProjects = [
  { name: "BeyondUncertainty", category: "Retrieval decisions · LLMs", summary: "An empirical study of verbalized uncertainty and selective retrieval for question answering.", url: "https://arxiv.org/abs/2607.25600" },
  { name: "OpenCoder", category: "Repository-level code generation", summary: "Understanding when heterogeneous retrieval sources help or hurt code generation.", url: "https://arxiv.org/abs/2607.24884" },
  { name: "PerFairX", category: "Responsible recommendation", summary: "Measuring the tension between personality-sensitive recommendations and group fairness.", url: "https://openaccess.thecvf.com/content/ICCV2025W/MCL/html/Sah_PerFairX_Is_There_a_Balance_Between_Fairness_and_Personality_in_ICCVW_2025_paper.html" },
  { name: "CleanMAP", category: "Multimodal systems", summary: "Confidence-driven map updating from crowdsourced road observations.", url: "https://openaccess.thecvf.com/content/CVPR2025W/WDFM-AD/html/Shaw_CleanMAP_Distilling_Multimodal_LLMs_for_Confidence-Driven_Crowdsourced_HD_Map_Updates_CVPRW_2025_paper.html" },
];

export const academicService = {
  conferences: ["NeurIPS", "AAAI", "CVPR", "ICCV", "ECIR", "ASE"],
  journals: [
    "ACM Transactions on Software Engineering and Methodology (TOSEM)",
    "Complex & Intelligent Systems",
    "Expert Systems",
    "International Journal of Human-Computer Interaction",
  ],
  reviewRecord: {
    webOfScienceRounds: 7,
    webOfScienceManuscripts: 5,
    orcidReviewRecords: 2,
    summary: "7 review-round records associated with 5 manuscripts in Web of Science, plus 2 ORCID review records. These may overlap and are not summed.",
    source: "Researcher-provided Web of Science and ORCID summaries (2025–2026); not independently accessible without account access.",
  },
  volunteering: [
    { role: "Student Volunteer", organization: "ASE 2025", year: "2025", description: "40th IEEE/ACM International Conference on Automated Software Engineering." },
    { role: "Conference Volunteer", organization: "International Association for Safe & Ethical AI (IASEAI’26)", year: "2026", description: "Volunteer service supporting the 2026 IASEAI conference in Paris. Role reported by the researcher." },
    { role: "Student Ambassador", organization: "Beihang University", year: "2023–present", description: "International academic community engagement and student outreach." },
    { role: "Academic & Innovation Department Lead", organization: "Beihang International Graduate Student Union", year: "2023–2025", description: "Graduate student leadership and academic community activities." },
  ],
};

export const distinctions = [
  { name: "Outstanding Reviewer", issuer: "ECIR", year: "2026" },
  { name: "Student Research Competition — Second Place (Graduate)", issuer: "ASE", year: "2025" },
  { name: "Excellent International Graduate", issuer: "Beihang University", year: "2025" },
  { name: "Excellent Paper & Poster", issuer: "Tsinghua Shenzhen / Asian Universities Alliance Postgraduate Forum", year: "2025" },
  { name: "Fellowship", issuer: "Asia Pacific Next Generation Camp", year: "2026" },
  { name: "Belt and Road Ambassador Scholarship — First Prize", issuer: "Embassy of Nepal / OCCFC", year: "2025" },
];

export const selectedTalks = [
  { title: "Uncertainty and Fairness Awareness in LLM-Based Recommendation Systems", event: "IASEAI", year: "2026", url: "https://www.iaseai.org/our-programs/iaseai26" },
  { title: "Understanding Uncertainty in LLMs", event: "ASE", year: "2025", url: "https://conf.researchr.org/home/ase-2025" },
  { title: "FairEval: Evaluating Fairness in LLM-Based Recommendations with Personality Awareness", event: "Asian Universities Alliance Postgraduate Forum", year: "2025", url: "https://www.sigs.tsinghua.edu.cn/en/2026/0114/c1303a288207/page.htm" },
];

/**
 * Conference venue rankings, checked 12 Oct 2026.
 * Source: CCF 7th list (2026) and ICORE 2026.
 * A venue ranking is not a rating of an individual paper.
 * CCF explicitly excludes workshops, symposium short papers and doctoral tracks.
 */
export const conferenceRankings: Record<NonNullable<Publication["rankingVenue"]>, {
  label: string;
  ccf?: "A" | "B" | "C";
  icore: "A*" | "A" | "B" | "C";
  source: string;
}> = {
  CCS: { label: "ACM CCS", ccf: "A", icore: "A*", source: "https://portal.core.edu.au/conf-ranks/?by=all&search=CCS" },
  ASE: { label: "ASE", ccf: "A", icore: "A*", source: "https://portal.core.edu.au/conf-ranks/?search=Automated+Software+Engineering" },
  ICCV: { label: "ICCV", ccf: "A", icore: "A*", source: "https://portal.core.edu.au/conf-ranks/638/" },
  CVPR: { label: "CVPR", ccf: "A", icore: "A*", source: "https://portal.core.edu.au/conf-ranks/604/" },
  CSEET: { label: "CSEE&T", icore: "C", source: "https://portal.core.edu.au/conf-ranks/380/" },
};
export const rankingSources = {
  ccf: "https://www.ccf.org.cn/Academic_Evaluation/By_category/",
  icore: "https://portal.core.edu.au/conf-ranks/",
} as const;
