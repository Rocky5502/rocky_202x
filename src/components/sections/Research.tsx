import { Section } from "@/components/Section";
import { pillars } from "@/data/site";
import { Sparkles, Code2, Scale, Layers } from "lucide-react";

const icons = [Sparkles, Code2, Scale, Layers];

export const Research = () => (
  <Section
    id="research"
    eyebrow="02 · Research Vision"
    title="Four pillars of reliable intelligence."
    subtitle="From uncertainty in LLM reasoning to fair recommenders and multimodal autonomy — research that takes deployment seriously."
  >
    <div className="grid md:grid-cols-2 gap-5 mb-10">
      {pillars.map((p, i) => {
        const Icon = icons[i];
        return (
          <div key={p.title} className="card-elegant p-7 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        );
      })}
    </div>

    <div className="card-elegant p-8 md:p-10 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
      <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
        Current PhD Direction
      </div>
      <h3 className="heading-display text-2xl md:text-3xl font-bold mb-4">
        Beyond "What to Retrieve" — Uncertainty in Retrieval-Augmented Code Generation
      </h3>
      <p className="text-foreground/80 text-lg leading-relaxed">
        And: <strong>When LLMs Say "I Don't Know"</strong> — uncertainty,
        calibration, and reliability in LLM reasoning. Building models that
        understand the limits of their own knowledge.
      </p>
    </div>
  </Section>
);
