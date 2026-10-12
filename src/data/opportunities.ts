/**
 * Publicly expressed interests while enrolled in a PhD.
 * These describe openness to conversations, not confirmed employment,
 * eligibility, work authorization, immediate start dates, or a job search service.
 */
export const opportunityTracks = [
  {
    title: "Academic collaboration",
    area: "Joint research · reproducibility · publications",
    summary: "Collaborative projects on uncertainty estimation, AI safety, trustworthy agents, retrieval and software engineering.",
  },
  {
    title: "Visiting research & fellowships",
    area: "Visiting researcher · short research stays · fellowships",
    summary: "Research visits and competitive fellowships that complement doctoral research, subject to host and university requirements.",
  },
  {
    title: "Industry research & engineering",
    area: "Research internships · applied AI · software systems",
    summary: "Research-oriented placements and selective remote or part-time collaborations on reliable LLMs, AI agents and code-generation systems.",
  },
  {
    title: "Future academic appointments",
    area: "Postdoctoral research · research scientist positions",
    summary: "Early conversations about post-PhD positions and longer-term academic opportunities, aligned with my doctoral research timeline.",
  },
] as const;

export const researchSupport = {
  title: "Support open, responsible AI research",
  description: "I aim to develop accessible research, reproducible software and educational resources that make AI systems safer and more dependable. Voluntary individual support can help with computing, research materials and openly shared tools.",
  disclaimer: "Support is optional and personal. It is not a tax-deductible charitable donation, institutional sponsorship or an investment, and it does not affect scientific findings, authorship, peer review or access to research results.",
  paypalLogo: "https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg",
  paypalHomepage: "https://www.paypal.com/",
} as const;
