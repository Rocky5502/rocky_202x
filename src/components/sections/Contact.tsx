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

import { Button } from "@/components/ui/button";

const contactEmail = "sahchandan98@buaa.edu.cn";

const mailtoLink = `mailto:${contactEmail}?subject=Research Collaboration Inquiry&body=Dear Chandan,%0D%0A%0D%0AI am interested in connecting with you about...%0D%0A%0D%0ABest regards,`;

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
];

export const Contact = () => (
  <Section
    id="contact"
    eyebrow="09 · Contact"
    title="Let's collaborate."
    subtitle="Open to research collaborations, talks, mentorship, AI education, and meaningful conversations about reliable and uncertainty-aware AI."
  >
    <div className="card-elegant relative mb-8 overflow-hidden p-8 text-center md:p-12">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-accent opacity-20 blur-3xl" />

      <p className="font-display mb-2 text-2xl font-semibold md:text-3xl">
        {profile.name} ·{" "}
        <span className="text-gradient">{profile.altName}</span>
      </p>

      <p className="mb-3 text-muted-foreground">
        Software Engineering Institute, Beihang University · Beijing, China
      </p>

      <a
        href={mailtoLink}
        className="mb-6 inline-block text-sm text-cyan-300 transition hover:text-cyan-200 md:text-base"
      >
        {contactEmail}
      </a>

      <div className="mb-6">
        <p className="mx-auto max-w-2xl text-lg font-medium text-white">
          Building AI systems that know when they don’t know.
        </p>

        <p className="mt-2 text-muted-foreground">
          Reliable AI · Uncertainty-Aware LLMs · Software Intelligence ·
          AI for Software Engineering
        </p>
      </div>

      <Button
        asChild
        size="lg"
        className="glow rounded-full bg-gradient-accent text-white hover:opacity-90"
      >
        <a href={mailtoLink}>
          <Mail className="mr-2 h-4 w-4" />
          Get in touch
        </a>
      </Button>
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
      {cards.map((c) => {
        const Icon = c.icon as any;

        return (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="card-elegant group flex flex-col items-center justify-center gap-3 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent text-white transition-transform group-hover:scale-110">
              <Icon />
            </div>

            <span className="text-sm font-medium">{c.name}</span>
          </a>
        );
      })}
    </div>
  </Section>
);
