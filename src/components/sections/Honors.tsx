import { Section } from "@/components/Section";
import { honors, service } from "@/data/site";
import { Award, Heart } from "lucide-react";

export const Honors = () => (
  <Section
    id="honors"
    eyebrow="05 · Honors & Service"
    title="Leadership, ambassadorship, community."
  >
    <div className="grid md:grid-cols-2 gap-5">
      <div className="card-elegant p-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-accent flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-display text-xl font-semibold">Honors & Leadership</h3>
        </div>
        <ul className="space-y-3">
          {honors.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-foreground/85">
              <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-elegant p-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-accent flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-display text-xl font-semibold">Service & Community</h3>
        </div>
        <ul className="space-y-3">
          {service.map((s) => (
            <li key={s} className="flex gap-3 text-sm text-foreground/85">
              <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);
