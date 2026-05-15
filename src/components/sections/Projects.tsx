import { Section } from "@/components/Section";
import { projects } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export const Projects = () => (
  <Section
    id="projects"
    eyebrow="04 · Projects"
    title="Things I'm building."
    subtitle="Active research initiatives, open systems, and entrepreneurial work."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p) => (
        <div key={p.name} className="card-elegant p-7 group">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-xl font-semibold">{p.name}</h3>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);
