import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const sections = [
  ["about", "About"],
  ["research", "Research"],
  ["publications", "Publications"],
  ["projects", "Projects"],
  ["honors", "Honors"],
  ["talks", "Talks"],
  ["timeline", "CV"],
  ["contact", "Contact"],
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "container-narrow flex items-center justify-between px-6 md:px-10 transition-all duration-500",
          scrolled && "glass rounded-full !px-5 !py-2 max-w-5xl"
        )}
      >
        <a href="#home" className="font-display font-bold text-base md:text-lg">
          <span className="text-gradient">Rocky_202X</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
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
