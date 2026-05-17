import { Section } from "@/components/Section";
import { timeline } from "@/data/site";

export const Timeline = () => (
  <Section
    id="timeline"
    eyebrow="07 · Education & Experience"
    title="The path so far."
  >
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-4" />

      <div className="space-y-10">
        {timeline.map((t) => (
          <div key={t.title} className="relative">
            <div className="glow absolute -left-7 top-2 h-3 w-3 rounded-full bg-gradient-accent md:-left-[2.6rem]" />

            <div className="mb-1 font-mono text-xs text-primary">
              {t.when}
            </div>

            <h3 className="font-display text-xl font-semibold">
              {t.title}
            </h3>

            <p className="mb-2 text-sm text-muted-foreground">
              {t.link ? (
                <a
                  href={t.link}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-cyan-300 hover:underline"
                >
                  {t.where}
                </a>
              ) : (
                t.where
              )}
            </p>

            <p className="leading-relaxed text-foreground/80">
              {t.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);
