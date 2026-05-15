import { Section } from "@/components/Section";

export const About = () => (
  <Section
    id="about"
    eyebrow="01 · About"
    title="A researcher building AI you can trust."
  >
    <div className="grid md:grid-cols-3 gap-8 text-base md:text-lg leading-relaxed text-foreground/85">
      <p>
        I am <strong>Chandan Kumar Sah</strong> — known professionally as
        <strong> Rocky 文浩</strong> — a doctoral researcher at the Software
        Engineering Institute, Beihang University. My work sits at the
        intersection of <em>large language models</em>, <em>software
        engineering</em>, and the science of <em>reliable, uncertainty-aware
        AI</em>.
      </p>
      <p>
        I study how language models reason, retrieve, and abstain — building
        retrieval-augmented systems for code generation, calibration methods
        for LLM uncertainty, and AI-assisted tools that engineers can actually
        trust in production.
      </p>
      <p>
        Beyond reliability, I work on <em>fairness</em> and personality-aware
        recommender systems, multimodal AI for autonomy and mapping, and the
        broader question of how generative intelligence should be deployed
        responsibly. I lead and contribute across international academic
        communities, mentor students, and collaborate globally.
      </p>
    </div>
  </Section>
);
