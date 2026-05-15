import { Section } from "@/components/Section";
import { timeline } from "@/data/site";

export const Timeline = () => (
  <Section
    id="timeline"
    eyebrow="07 · Education & Experience"
    title="The path so far."
  >
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
      <div className="space-y-10">
        {timeline.map((t) => (
          <div key={t.title} className="relative">
            <div className="absolute -left-7 md:-left-[2.6rem] top-2 h-3 w-3 rounded-full bg-gradient-accent glow" />
            <div className="font-mono text-xs text-primary mb-1">{t.when}</div>
            <h3 className="font-display text-xl font-semibold">{t.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">{t.where}</p>
            <p className="text-foreground/80">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
