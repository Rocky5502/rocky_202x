import AwardsGalaxy from "@/components/AwardsGalaxy";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Research } from "@/components/sections/Research";
import { Publications } from "@/components/sections/Publications";
import { Projects } from "@/components/sections/Projects";
import { Honors } from "@/components/sections/Honors";
import { Talks } from "@/components/sections/Talks";
import { Timeline } from "@/components/sections/Timeline";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const Index = () => (
  <main className="min-h-screen bg-background text-foreground">
    <AwardsGalaxy />
    <Nav />
    <Hero />
    <About />
    <Research />
    <Publications />
    <Projects />
    <Honors />
    <Talks />
    <Timeline />
    <Gallery />
    <Contact />
    <Footer />
  </main>
);

export default Index;
