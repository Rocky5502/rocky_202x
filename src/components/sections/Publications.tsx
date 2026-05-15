import { useState } from "react";
import { Section } from "@/components/Section";
import { publications, type Publication } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Link2, Code, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "LLMs", "Fairness", "Multimodal", "SE & AI", "Theory"] as const;

export const Publications = () => {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered =
    filter === "All" ? publications : publications.filter((p) => p.category === filter);

  return (
    <Section
      id="publications"
      eyebrow="03 · Publications"
      title="Selected papers & research."
      subtitle="Filter by topic. Links and BibTeX appear once formal venues / records become public."
    >
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all border",
              filter === c
                ? "bg-gradient-accent text-white border-transparent glow"
                : "glass border-border hover:border-primary/40"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((p: Publication) => (
          <article key={p.title} className="card-elegant p-6 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                {p.category}
              </Badge>
              {p.status && (
                <span className="text-xs font-mono text-primary">{p.status}</span>
              )}
            </div>
            <h3 className="font-display text-lg md:text-xl font-semibold leading-snug mb-2">
              {p.title}
            </h3>
            {p.venue && (
              <p className="text-sm text-muted-foreground mb-4">{p.venue}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" disabled className="rounded-full">
                <FileText className="h-3.5 w-3.5 mr-1.5" /> PDF
              </Button>
              <Button size="sm" variant="outline" disabled className="rounded-full">
                <Link2 className="h-3.5 w-3.5 mr-1.5" /> DOI
              </Button>
              <Button size="sm" variant="outline" disabled className="rounded-full">
                <Code className="h-3.5 w-3.5 mr-1.5" /> Code
              </Button>
              <Button size="sm" variant="outline" disabled className="rounded-full">
                <BookMarked className="h-3.5 w-3.5 mr-1.5" /> BibTeX
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
