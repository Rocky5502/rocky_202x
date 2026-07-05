```tsx
import type { ElementType } from "react";
import { Section } from "@/components/Section";

import {
  ExternalLink,
  GraduationCap,
  Linkedin,
  Mail,
} from "lucide-react";

type ContactItem = {
  name: string;
  href: string;
  icon: ElementType;
};

const OrcidIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.371 0 0 5.372 0 12s5.371 12 12 12 12-5.372 12-12S18.629 0 12 0zm-5.449 5.25a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm1.05 13.2H5.5V9.15h2.101v9.3zm8.399 0h-2.85l-3.149-5.1v5.1H8.1V9.15h3.6c2.699 0 4.349 1.35 4.349 3.75 0 1.95-1.05 3.15-2.85 3.45L16 18.45zm-4.2-7.5h-1.8v3.3h1.8c1.2 0 1.95-.6 1.95-1.65s-.75-1.65-1.95-1.65z" />
  </svg>
);

const contactItems: ContactItem[] = [
  {
    name: "Email",
    href: "mailto:sahchandan98@buaa.edu.cn",
    icon: Mail,
  },
  {
    name: "Google Scholar",
    href: "https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en",
    icon: GraduationCap,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chandan-sah-rocky-%E6%96%87%E6%B5%A9-5803bb1b4/",
    icon: Linkedin,
  },
  {
    name: "OpenReview",
    href: "https://openreview.net/profile?id=%7EChandan_Kumar_Sah1",
    icon: ExternalLink,
  },
  {
    name: "ORCID",
    href: "https://orcid.org/0009-0002-4017-7970",
    icon: OrcidIcon,
  },
];

export const Contact = () => {
  return (
    <Section
      id="contact"
      eyebrow="09 · Contact"
      title="Let’s connect."
      subtitle="Open to research collaborations and meaningful conversations about trustworthy and uncertainty-aware AI."
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Compact profile card */}
        <div className="card-elegant relative mx-auto mb-7 max-w-xl overflow-hidden rounded-3xl border border-white/10 px-5 py-6 md:px-8 md:py-7">
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-accent opacity-15 blur-3xl" />

          <div className="relative z-10">
            <h3 className="font-display text-xl font-semibold md:text-2xl">
              Chandan Kumar Sah
              <span className="mx-2 text-muted-foreground">·</span>
              <span className="text-gradient">Rocky 文浩</span>
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              PhD Researcher in AI and Software Engineering
              <br />
              Beihang University · Beijing, China
            </p>

            <p className="mt-4 text-base font-semibold text-foreground">
              Building AI systems that know when they do not know.
            </p>

            <a
              href="mailto:sahchandan98@buaa.edu.cn"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              <Mail className="h-4 w-4" />
              sahchandan98@buaa.edu.cn
            </a>
          </div>
        </div>

        {/* Centered contact links */}
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const isEmail = item.name === "Email";

            return (
              <a
                key={item.name}
                href={item.href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noreferrer"}
                aria-label={`Open ${item.name}`}
                className="card-elegant group flex min-w-[120px] items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent text-white transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-4 w-4" />
                </span>

                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Academic inquiries and research collaborations are welcome.
        </p>
      </div>
    </Section>
  );
};
```
