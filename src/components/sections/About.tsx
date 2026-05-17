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
    subtitle="Doctoral researcher at Beihang University working at the intersection of large language models, software engineering, and the science of reliable, fairness
 uncertainty-aware AI."
  >
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
      <div className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
        <p>
         I am <strong>Chandan Kumar Sah</strong> — professionally known as{" "}
          <strong>Rocky 文浩</strong> — a Ph.D. researcher at the{" "}
          <em>School of Computer Science and Engineering, Beihang University</em>,
          supervised by{" "}
          <a
            href="https://shi.buaa.edu.cn/06453/en/yjgk/21897/list/index.htm"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
          >
            Prof. Li Zhang
          </a>{" "}
          and{" "}
          <a
            href="https://scse.buaa.edu.cn/info/1389/10618.htm"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
          >
            Prof. Xiaoli Lian
         </a>
          . My research focuses on building{" "}
          <strong>uncertainty-aware and trustworthy AI systems</strong> that can
          reason reliably, recognize their limitations, and support real-world
          decision-making responsibly.
        </p>

        <p>
          My current work explores the intersection of{" "}
          <strong>large language models, software engineering, retrieval-augmented generation,
          and multimodal AI systems</strong>. I study how uncertainty propagates
          through reasoning and retrieval pipelines, how LLMs should abstain
          when uncertain, and how next-generation AI coding systems can become
          more reliable, transparent, and human-aligned.
        </p>

        <p>
          In parallel, I investigate{" "}
          <strong>fairness, bias, and personality-aware recommendation systems</strong>,
          examining how LLM-driven recommender systems influence human behavior,
          personalization, and information exposure. My broader vision is to
          advance <strong>AI for Good</strong> by designing intelligent systems
          that are not only powerful, but also safe, equitable, interpretable,
          and socially responsible.
        </p>

        <p>
          Beyond research, I actively contribute to the international AI
          community as a reviewer for{" "}
          <strong>NeurIPS, CVPR, ICCV, AAAI, ECIR</strong>,{" "}
          <strong>ACM TOSEM</strong>, and{" "}
          <strong>Complex & Intelligent Systems</strong>. I was honored with the{" "}
          <strong>Outstanding Reviewer Award at ECIR 2026</strong>, and continue
          to engage globally through academic leadership, mentoring,
          international research collaborations, and AI education initiatives.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {focus.map(({ icon: Icon, label, text }) => (
          <div key={label} className="card-elegant p-5">
            <div className="h-9 w-9 rounded-lg bg-gradient-accent flex items-center justify-center mb-3">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div className="font-display font-semibold text-sm mb-1">{label}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
