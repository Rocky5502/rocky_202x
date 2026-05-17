import {
  ArrowRight,
  BookOpen,
  Github,
  Mail,
  GraduationCap,
  MapPin,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import portrait from "@/assets/portrait.jpg";
import { Button } from "@/components/ui/button";
import { SiteReactions } from "@/components/SiteReactions";
import { profile, links } from "@/data/site";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-40 pb-20 md:pt-44 lg:pt-36"
    >
      <div
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-60"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <div className="absolute inset-0 -z-10 neural-bg" />

      <div className="container-narrow grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-in max-w-3xl">
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
            PhD Researcher · {profile.affiliation}
          </div>

          <h1 className="heading-display mb-5 text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[3.25rem] xl:text-[3.5rem]">
            {profile.name}
            <br />
            <span className="text-gradient inline-block mt-2 md:mt-3">{profile.altName}</span>
          </h1>

          <p className="mb-3 max-w-2xl text-lg font-medium text-foreground/90 md:text-xl">
            Reliable, uncertainty-aware AI for the next generation of software
            intelligence.
          </p>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
            LLMs · AI for Software Engineering · Fair &amp;
            Personality-Aware Recommenders · Multimodal AI ·{" "}
            <span className="text-foreground/80">Beijing, China</span>
          </p>

          <div className="mb-9 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="glow rounded-full bg-gradient-accent text-white hover:opacity-90"
            >
              <a href="#publications">
                <BookOpen className="mr-2 h-4 w-4" />
                Publications
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass rounded-full"
            >
              <a href={links.scholar} target="_blank" rel="noreferrer">
                <GraduationCap className="mr-2 h-4 w-4" />
                Google Scholar
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass rounded-full"
            >
              <a href={links.github} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full"
            >
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid max-w-2xl grid-cols-2 gap-4 border-t border-border/60 pt-6 md:grid-cols-4">
            <div>
              <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                10+
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                Research Papers
              </div>
            </div>

            <div>
              <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                6+
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                Top-Tier Reviewer Roles
              </div>
            </div>

            <div>
              <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                ECIR&apos;26
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                Outstanding Reviewer
              </div>
            </div>

            <div>
              <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                Open
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                Academia &amp; Industry
              </div>
            </div>
          </div>

        </div>

        <div className="relative mx-auto flex animate-scale-in flex-col items-center lg:mx-0">
          <div className="absolute -inset-4 animate-pulse-glow rounded-full bg-gradient-accent opacity-40 blur-3xl" />

          <div className="glow animate-float relative h-64 w-64 overflow-hidden rounded-full border-2 border-primary/30 md:h-80 md:w-80">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={768}
              height={768}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href="mailto:sahchandan98@buaa.edu.cn"
              className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/80 transition hover:text-cyan-300"
            >
              <Mail className="h-4 w-4" />
              sahchandan98@buaa.edu.cn
            </a>

            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/70">
              <MapPin className="h-4 w-4" />
              Beijing, China 🇨🇳
            </div>

            <div className="mt-2 border-t border-border/40 pt-4">
              <SiteReactions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
