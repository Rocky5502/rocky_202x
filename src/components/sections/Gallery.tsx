import { Section } from "@/components/Section";
import { Image } from "lucide-react";

const items = [
  "Academic presentation",
  "Summer/Winter School",
  "Conference travel",
  "Research group",
  "Beihang community",
  "Student leadership",
];

export const Gallery = () => (
  <Section
    id="gallery"
    eyebrow="08 · Gallery"
    title="Moments from the journey."
    subtitle="coming soon"
  >
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((label, i) => (
        <div
          key={label}
          className="aspect-[4/3] card-elegant flex flex-col items-center justify-center gap-3 group cursor-pointer"
        >
          <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center opacity-70 group-hover:opacity-100 transition">
            <Image className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {String(i + 1).padStart(2, "0")} · {label}
          </span>
        </div>
      ))}
    </div>
  </Section>
);
