import { Section } from "@/components/Section";
import { talks } from "@/data/site";
import { Mic } from "lucide-react";

export const Talks = () => (
  <Section
    id="talks"
    eyebrow="06 · TALKS & CONFERENCES"
    title="Speaking & academic presence."
  >
    <div className="space-y-5">
      {talks.map((talk) => (
        <a
          key={talk.title}
          href={talk.link}
          target="_blank"
          rel="noreferrer"
          className="card-elegant group block p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent text-white">
                <Mic className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold transition group-hover:text-cyan-300">
                  {talk.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {talk.venue}
                </p>

                <p className="mt-2 text-sm text-cyan-300">
                  {talk.location}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {talk.eventDate}
                </p>

                <div className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {talk.type}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-primary">
                {talk.year}
              </div>

              <div className="mt-3 text-xs text-cyan-300 opacity-0 transition group-hover:opacity-100">
                Open Conference ↗
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  </Section>
);
