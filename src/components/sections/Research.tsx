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

    ```tsx
<div className="card-elegant p-8 md:p-10 relative overflow-hidden">
  <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-accent opacity-20 blur-3xl rounded-full" />

  <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
    Current PhD Direction
  </div>

  <div className="space-y-8">
    {/* Project 1 */}
    <div>
      <h3 className="heading-display text-2xl md:text-3xl font-bold mb-3">
        Beyond "What to Retrieve" — Uncertainty in Retrieval-Augmented Code Generation
      </h3>

      <p className="text-foreground/80 text-lg leading-relaxed">
        Exploring uncertainty-aware retrieval and reasoning for repository-level
        code generation, with a focus on reliable AI coding agents,
        retrieval calibration, and robust OpenCoder-style frameworks for
        trustworthy software intelligence.
      </p>
    </div>

    {/* Project 2 */}
    <div className="border-t border-border/60 pt-6">
      <h3 className="heading-display text-2xl md:text-3xl font-bold mb-3">
        Beyond Self-Knowledge: Propagating Uncertainty Across Reasoning and Retrieval in LLMs
      </h3>

      <p className="text-foreground/80 text-lg leading-relaxed">
        Investigating how uncertainty propagates across multi-step reasoning
        and retrieval decisions in LLM-based question answering systems,
        enabling adaptive retrieval triggering, early stopping, answer
        abstention, and more reliable reasoning-aware QA pipelines.
      </p>
    </div>

    {/* Project 3 */}
    <div className="border-t border-border/60 pt-6">
      <h3 className="heading-display text-2xl md:text-3xl font-bold mb-3">
        When LLMs Say "I Don’t Know": An Empirical Study on Uncertainty in LLMs
      </h3>

      <p className="text-foreground/80 text-lg leading-relaxed">
        Studying whether large language models can reliably recognize their own
        uncertainty, understand when to abstain from answering, and quantify
        how uncertainty propagates through complex reasoning chains and
        challenging question-answering tasks.
      </p>
    </div>

    {/* Project 4 */}
    <div className="border-t border-border/60 pt-6">
      <h3 className="heading-display text-2xl md:text-3xl font-bold mb-3">
        Unveiling Bias in Large Language Models: Uncertainty and Fairness Evaluation in LLM-Based Recommendation Systems
      </h3>

      <p className="text-foreground/80 text-lg leading-relaxed">
        Exploring the intersection of uncertainty, fairness, bias, and
        personality-aware recommendation in LLM-driven recommender systems,
        with the goal of building transparent, equitable, and trustworthy AI
        recommendation frameworks for real-world applications.
      </p>
    </div>
  </div>
</div>
  </Section>
);
