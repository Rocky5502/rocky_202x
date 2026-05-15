import { Section } from "@/components/Section";
import { talks } from "@/data/site";
import { Mic } from "lucide-react";

export const Talks = () => (
  <Section
    id="talks"
    eyebrow="06 · Talks & Conferences"
    title="Speaking & academic presence."
  >
    <div className="grid gap-4">
      {talks.map((t) => (
        <div key={t.title} className="card-elegant p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">{t.title}</h3>
            <p className="text-sm text-muted-foreground">{t.venue}</p>
          </div>
          <span className="font-mono text-xs text-primary">{t.year}</span>
        </div>
      ))}
    </div>
  </Section>
);
