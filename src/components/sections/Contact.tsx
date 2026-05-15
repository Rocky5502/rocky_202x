import { Section } from "@/components/Section";
import { links, profile } from "@/data/site";
import { Github, Linkedin, Mail, GraduationCap, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  { name: "Google Scholar", href: links.scholar, icon: GraduationCap },
  { name: "LinkedIn", href: links.linkedin, icon: Linkedin },
  { name: "GitHub", href: links.github, icon: Github },
  {
    name: "X (Twitter)",
    href: links.x,
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.844l-5.36-7.012L4.2 22H1l8.04-9.183L1.5 2h7.02l4.847 6.4L18.244 2zm-1.2 18h1.873L7.06 4H5.05l11.994 16z" />
      </svg>
    ),
  },
  { name: "ResearchGate", href: links.researchgate, icon: BookOpen },
  { name: "ASE 2025", href: links.ase, icon: Calendar },
  { name: "AIware 2025", href: links.aiware, icon: Calendar },
];

export const Contact = () => (
  <Section
    id="contact"
    eyebrow="09 · Contact"
    title="Let's collaborate."
    subtitle="Open to research collaborations, talks, mentorship, and meaningful conversations about reliable AI."
  >
    <div className="card-elegant p-8 md:p-12 text-center mb-8 relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-accent opacity-20 blur-3xl rounded-full" />
      <p className="text-2xl md:text-3xl font-display font-semibold mb-2">
        {profile.name} · <span className="text-gradient">{profile.altName}</span>
      </p>
      <p className="text-muted-foreground mb-6">{profile.affiliation}</p>
      <Button asChild size="lg" className="bg-gradient-accent text-white hover:opacity-90 rounded-full glow">
        <a href={`mailto:${profile.email}`}>
          <Mail className="mr-2 h-4 w-4" /> Get in touch
        </a>
      </Button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((c) => {
        const Icon = c.icon as any;
        return (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="card-elegant p-5 flex flex-col items-center justify-center gap-2 text-center group"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform text-white">
              <Icon />
            </div>
            <span className="text-sm font-medium">{c.name}</span>
          </a>
        );
      })}
    </div>
  </Section>
);
