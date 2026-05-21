import { Section } from "@/components/Section";
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Users,
  type LucideIcon,
} from "lucide-react";

type FocusItem = {
  icon: LucideIcon;
  label: string;
  text: string;
};

const focus: FocusItem[] = [
  {
    icon: ShieldCheck,
    label: "Reliable AI",
    text: "Calibration, abstention, uncertainty propagation, and trustworthy reasoning for LLM systems.",
  },
  {
    icon: Cpu,
    label: "AI for Software Engineering",
    text: "Retrieval-augmented code generation, repair, uncertainty-aware coding agents, and developer assistance.",
  },
  {
    icon: Sparkles,
    label: "Fair & Responsible AI",
    text: "Fairness, bias, personality-aware recommendation, and trustworthy evaluation of LLM-driven systems.",
  },
  {
    icon: Users,
    label: "Research Community",
    text: "Reviewer for NeurIPS, CVPR, ICCV, AAAI, ECIR, ACM TOSEM, and ECIR 2026 Outstanding Reviewer.",
  },
];

export const About = () => {
  return (
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
            <em>
              School of Computer Science and Engineering, Beihang University
            </em>
            , supervised by{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-300">
              Prof. Li Zhang
            </span>{" "}
            and{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-300">
              Prof. Xiaoli Lian
            </span>
            .
          </p>

          <p>
            My research focuses on{" "}
            <strong>uncertainty-aware and trustworthy AI</strong>, especially
            large language models, AI for software engineering,
            retrieval-augmented code generation, and multimodal AI systems.
          </p>

          <p>
            I also study{" "}
            <strong>
              fairness, bias, and personality-aware recommendation systems
            </strong>
            , with the broader goal of building AI systems that are reliable,
            equitable, interpretable, and useful for society.
          </p>

          <p>
            Beyond research, I serve as a reviewer for{" "}
            <strong>NeurIPS, CVPR, ICCV, AAAI, ECIR, ACM TOSEM</strong>, and{" "}
            <strong>Complex &amp; Intelligent Systems</strong>, and was
            recognized with the{" "}
            <strong>Outstanding Reviewer Award at ECIR 2026</strong>.
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
};

export default About;
