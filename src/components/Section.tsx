import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Section = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={cn("section-pad relative", className)}>
    <div className="container-narrow">
      <div className="mb-14 max-w-3xl">
        {eyebrow && (
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
            {eyebrow}
          </div>
        )}
        <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);
