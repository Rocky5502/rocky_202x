import { ArrowRight, BookOpen, Github, Mail, GraduationCap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import portrait from "@/assets/portrait.jpg";
import { Button } from "@/components/ui/button";
import { profile, links } from "@/data/site";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
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

      <div className="container-narrow w-full grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            PhD Researcher · {profile.affiliation}
          </div>
          <h1 className="heading-display text-5xl md:text-7xl lg:text-[5.25rem] font-bold leading-[1.02] tracking-tight mb-6">
            {profile.name}
            <br />
            <span className="text-gradient">{profile.altName}</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 mb-3 max-w-2xl font-medium">
            Reliable, uncertainty-aware AI for the next generation of software intelligence.
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            LLMs · AI for Software Engineering · Fair &amp; Personality-Aware Recommenders · Multimodal AI ·{" "}
            <span className="text-foreground/80">Beijing, China</span>
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild size="lg" className="bg-gradient-accent text-white hover:opacity-90 rounded-full glow">
              <a href="#publications">
                <BookOpen className="mr-2 h-4 w-4" /> Publications
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full glass">
              <a href={links.scholar} target="_blank" rel="noreferrer">
                <GraduationCap className="mr-2 h-4 w-4" /> Google Scholar
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full glass">
              <a href={links.github} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full">
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" /> Contact <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xl border-t border-border/60 pt-6">
            <div>
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">10+</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Research papers</div>
            </div>
            <div>
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">6+</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Top-tier reviewer roles</div>
            </div>
            <div>
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">ECIR'26</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Outstanding Reviewer</div>
            </div>
          </div>
        </div>
        <div>
  <div className="font-display text-2xl md:text-3xl font-bold text-gradient">
    Open
  </div>

  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
    Open to Academic & AI Research Opportunities
  </div>
</div>

        <div className="relative mx-auto lg:mx-0 animate-scale-in">
          <div className="absolute -inset-4 rounded-full bg-gradient-accent blur-3xl opacity-40 animate-pulse-glow" />
          <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 border-2 border-primary/30 glow animate-float">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={768}
              height={768}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
