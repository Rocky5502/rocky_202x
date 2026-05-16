import { Section } from "@/components/Section";
import { links, profile } from "@/data/site";

import {
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  BookOpen,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const gmailLink =
  "https://mail.google.com/mail/?view=cm&fs=1&to=sahchandan98@buaa.edu.cn";

const cards = [
  {
    name: "Google Scholar",
    href: links.scholar,
    icon: GraduationCap,
  },

  {
    name: "LinkedIn",
    href: links.linkedin,
    icon: Linkedin,
  },

  {
    name: "GitHub",
    href: links.github,
    icon: Github,
  },

  {
    name: "X (Twitter)",
    href: links.x,
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.844l-5.36-7.012L4.2 22H1l8.04-9.183L1.5 2h7.02l4.847 6.4L18.244 2zm-1.2 18h1.873L7.06 4H5.05l11.994 16z" />
      </svg>
    ),
  },

  {
    name: "WeChat",
    href: `${import.meta.env.BASE_URL}wechat.jpg`,
    icon: MessageCircle,
  },

  {
    name: "ResearchGate",
    href: links.researchgate,
    icon: BookOpen,
  },

  {
    name: "OpenReview",
    href: "https://openreview.net/profile?id=%7EChandan_Kumar_Sah1",
    icon: ExternalLink,
  },

  {
    name: "ORCID",
    href: "https://orcid.org/0009-0002-4017-7970",
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M12 0C5.371 0 0 5.372 0 12s5.371 12 12 12 12-5.372 12-12S18.629 0 12 0zm-5.449 5.25a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm1.05 13.2H5.5V9.15h2.101v9.3zm8.399 0h-2.85l-3.149-5.1v5.1H8.1V9.15h3.6c2.699 0 4.349 1.35 4.349 3.75 0 1.95-1.05 3.15-2.85 3.45L16 18.45zm-4.2-7.5h-1.8v3.3h1.8c1.2 0 1.95-.6 1.95-1.65s-.75-1.65-1.95-1.65z" />
      </svg>
    ),
  },
];

export const Contact = () => (
  <Section
    id="contact"
    eyebrow="09 · Contact"
    title="Let’s collaborate."
    subtitle="Open to research collaborations, talks, mentorship, AI education, and meaningful conversations about reliable and uncertainty-aware AI."
  >
    <div className="card-elegant relative mb-10 overflow-hidden p-8 text-center md:p-14">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-accent opacity-20 blur-3xl" />

      <p className="font-display mb-3 text-3xl font-semibold md:text-5xl">
        {profile.name} ·{" "}
        <span className="text-gradient">{profile.altName}</span>
      </p>

      <p className="mb-8 text-lg text-muted-foreground">
        Software Engineering Institute, Beihang University · Beijing, China
      </p>

      <div className="mb-8">
        <p className="mx-auto max-w-3xl text-2xl font-semibold text-white leading-relaxed">
          Building AI systems that know when they don’t know.
        </p>

        <p className="mt-4 text-xl font-semibold text-cyan-300">
          AI for Good
        </p>
      </div>
    </div>

    <div className="mb-12 flex justify-center">
      <a
        href={gmailLink}
        target="_blank"
        rel="noreferrer"
        className="glow inline-flex items-center rounded-full bg-gradient-accent px-10 py-5 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
      >
        <Mail className="mr-3 h-5 w-5" />
        Get in touch
      </a>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
      {cards.map((c) => {
        const Icon = c.icon as any;

        return (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="card-elegant group flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-accent text-white transition-transform duration-300 group-hover:scale-110">
              <Icon />
            </div>

            <span className="text-sm font-medium leading-snug">
              {c.name}
            </span>
          </a>
        );
      })}
    </div>
  </Section>
);
