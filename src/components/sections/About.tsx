import { Section } from "@/components/Section";
import { Sparkles, ShieldCheck, Cpu, Users } from "lucide-react";

const focus = [
  {
    icon: ShieldCheck,
    label: "Reliable AI",
    text: "Calibration, abstention, and uncertainty quantification for LLM reasoning.",
  },
  {
    icon: Cpu,
    label: "AI for SE",
    text: "Retrieval-augmented code generation, repair, and developer assistance.",
  },
  {
    icon: Sparkles,
    label: "Fair Recommenders",
    text: "Personality-aware, bias-audited LLM recommendation systems.",
  },
  {
    icon: Users,
    label: "Community",
    text: "Reviewer for NeurIPS, CVPR, ICCV, AAAI, TOSEM. ECIR 2026 Outstanding Reviewer.",
  },
];

export const About = () => (
  <Section
    id="about"
    eyebrow="01 · About"
    title="Building AI that engineers, scientists, and society can trust."
    subtitle="Doctoral researcher at Beihang University working at the intersection of large language models, software engineering, fairness, and uncertainty-aware reliable AI."
  >
    <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div className="space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
        <p>
          I am <strong>Chandan Kumar Sah</strong> — professionally known as{" "}
          <strong>Rocky 文浩</strong> — a Ph.D. researcher at the{" "}
          <em>School of Computer Science and Engineering, Beihang University</em>,
          supervised by{" "}
          <span className="font-semibold text-cyan-600 dark:text-cyan-300">
            Prof. Li Zhang
          </span>{" "}
          and{" "}
          <span className="font-semibold text-cyan-600 dark:text-cyan-300">
            Prof. Xiaoli Lian
          </span>
          . My research focuses on building{" "}
          <strong>uncertainty-aware and trustworthy AI systems</strong> that can
          reason reliably, recognize their limitations, and support real-world
          decision-making responsibly.
        </p>

        <p>
          My current work explores the intersection of{" "}
          <strong>
            large language models, software engineering, retrieval-augmented
            generation, and multimodal AI systems
          </strong>
          . I study how uncertainty propagates through reasoning and retrieval
          pipelines, when LLMs should abstain from answering, and how
          next-generation AI coding systems can become more reliable,
          transparent, and human-aligned.
        </p>

        <p>
          In parallel, I investigate{" "}
          <strong>
            fairness, bias, and personality-aware recommendation systems
          </strong>
          , examining how LLM-driven recommender systems influence human
          behavior, personalization, and information exposure. My broader vision
          is to advance <strong>AI for Good</strong> by designing intelligent
          systems that are not only powerful, but also safe, equitable,
          interpretable, and socially responsible.
        </p>

        <p>
          Beyond research, I actively contribute to the international AI and
          software engineering community as a reviewer for{" "}
          <strong>NeurIPS, CVPR, ICCV, AAAI, ECIR</strong>,{" "}
          <strong>ACM Transactions on Software Engineering and Methodology</strong>{" "}
          and <strong>Complex &amp; Intelligent Systems</strong>. I was honored
          with the <strong>Outstanding Reviewer Award at ECIR 2026</strong>, and
          continue to engage globally through academic leadership, mentoring,
          international research collaborations, and AI education initiatives.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {focus.map(({ icon: Icon, label, text }) => (
          <div key={label} className="card-elegant p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-accent">
              <Icon className="h-4 w-4 text-white" />
            </div>

            <div className="font-display mb-1 text-sm font-semibold">
              {label}
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
