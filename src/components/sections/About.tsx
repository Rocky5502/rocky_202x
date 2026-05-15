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
    text: "Reviewer for NeurIPS, ICCV, AAAI, TOSEM. ECIR 2026 Outstanding Reviewer.",
  },
];

export const About = () => (
  <Section
    id="about"
    eyebrow="01 · About"
    title="Building AI that engineers, scientists, and society can trust."
    subtitle="Doctoral researcher at Beihang University working at the intersection of large language models, software engineering, and the science of reliable, uncertainty-aware AI."
  >
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
      <div className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
        <p>
          I am <strong>Chandan Kumar Sah</strong> — known professionally as{" "}
          <strong>Rocky 文浩</strong> — a PhD researcher at the{" "}
          <em>Software Engineering Institute, Beihang University</em>. My research
          program develops the foundations of <strong>uncertainty-aware language
          models</strong> and the systems that turn them into{" "}
          <strong>trustworthy software intelligence</strong>: code generation
          assistants that know what they don't know, retrieval-augmented
          reasoning that can abstain, and evaluation methodology that treats
          calibration as a first-class metric.
        </p>
        <p>
          I work across the full stack of modern AI research — from{" "}
          <em>training and post-training</em> of LLMs, to{" "}
          <em>retrieval-augmented generation</em> and tool use, to{" "}
          <em>multimodal vision–language</em> systems for autonomy and HD-map
          updating. A second thread of my work studies{" "}
          <strong>fairness and personality-aware recommendation</strong>,
          auditing how LLM recommenders shape what people see, listen to, and
          believe.
        </p>
        <p>
          Beyond research, I serve the community as a reviewer for{" "}
          <strong>NeurIPS, ICCV, AAAI, ECIR</strong>, the{" "}
          <strong>ACM Transactions on Software Engineering and Methodology
          (TOSEM)</strong>, and <strong>Complex &amp; Intelligent Systems</strong>,
          and was recognized with the <strong>Outstanding Reviewer Award at
          ECIR 2026</strong>. I lead student initiatives as an International
          Student Ambassador and WiDS Beijing Ambassador, mentor across borders,
          and collaborate widely on the question of how generative intelligence
          should be deployed responsibly.
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
