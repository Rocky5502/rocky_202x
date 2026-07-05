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

const EMAIL = "sahchandan98@buaa.edu.cn";

const GOOGLE_SCHOLAR_URL =
  "https://scholar.google.com/citations?user=PyH-zqygdCYC&hl=en";

const OPENREVIEW_URL =
  "https://openreview.net/profile?id=%7EChandan_Kumar_Sah1";

const ORCID_URL =
  "https://orcid.org/0009-0002-4017-7970";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/chandan-sah-rocky-%E6%96%87%E6%B5%A9-5803bb1b4/";

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
    name: "Google Scholar",
    href: GOOGLE_SCHOLAR_URL,
    icon: GraduationCap,
  },
  {
    name: "OpenReview",
    href: OPENREVIEW_URL,
    icon: ExternalLink,
  },
  {
    name: "ORCID",
    href: ORCID_URL,
    icon: OrcidIcon,
  },
  {
    // LinkedIn remains the final item.
    name: "LinkedIn",
    href: LINKEDIN_URL,
    icon: Linkedin,
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
      <div className="mx-auto w-full max-w-6xl text-center">
        {/* Email button */}
        <div className="mb-10 flex w-full justify-center">
          <a
            href={`mailto:${EMAIL}`}
            className="glow inline-flex items-center justify-center gap-3 rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
          >
            <Mail className="h-5 w-5" />
            Get in touch
          </a>
        </div>

        {/* Entire card group is centered */}
       <<div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-4">">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.name}`}
                className="card-elegant group flex h-[145px] w-[155px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-xl hover:shadow-cyan-500/10 sm:h-[150px] sm:w-[165px]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent text-white shadow-lg shadow-cyan-500/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>

                <span className="text-sm font-semibold leading-snug text-foreground">
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-7 text-xs text-muted-foreground">
          Academic inquiries and research collaborations are welcome.
        </p>
      </div>
    </Section>
  );
};
```
