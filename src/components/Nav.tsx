import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const sections = [
  ["about", "About"],
  ["rocky-news", "News"],
  ["research", "Research"],
  ["lectures", "Lectures"],
  ["publications", "Publications"],
  ["projects", "Projects"],
  ["awards", "Awards"],
  ["talks", "Talks"],
  ["timeline", "CV"],
  ["contact", "Contact"],
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-4 transition-all duration-500",
        scrolled ? "py-3" : "py-4"
      )}
    >
      <div
        className={cn(
          "container-narrow glass mx-auto flex items-center justify-between rounded-full border border-primary/20 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500",
          scrolled && "max-w-5xl py-2"
        )}
      >
        <a
          href="#home"
          className="font-display text-base font-bold md:text-lg"
          aria-label="Go to homepage"
        >
          <span className="text-gradient">Rocky_202X</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
