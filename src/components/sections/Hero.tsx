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
            {profile.affiliation} · {profile.location}
          </div>
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
            {profile.name}
            <br />
            <span className="text-gradient">{profile.altName}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-3 max-w-2xl">
            {profile.role}
          </p>
          <p className="text-base md:text-lg text-foreground/80 mb-10 max-w-2xl leading-relaxed">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
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
