import { useState } from "react";
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
  X,
  Copy,
  ArrowUpRight,
} from "lucide-react";

const gmailLink =
  "https://mail.google.com/mail/?view=cm&fs=1&to=sahchandan98@buaa.edu.cn";

const wechatId = "Rocky_202X";

type ContactCard = {
  name: string;
  href: string;
  icon: any;
  type: "link" | "wechat";
  description: string;
  actionLabel?: string;
};

const cards: ContactCard[] = [
  {
    name: "Google Scholar",
    href: links.scholar,
    icon: GraduationCap,
    type: "link",
    description:
      "View my research papers, citations, academic profile, and publication record.",
    actionLabel: "Open Google Scholar",
  },
  {
    name: "LinkedIn",
    href: links.linkedin,
    icon: Linkedin,
    type: "link",
    description:
      "Connect with me professionally for research, collaborations, and academic updates.",
    actionLabel: "Open LinkedIn",
  },
  {
    name: "GitHub",
    href: links.github,
    icon: Github,
    type: "link",
    description:
      "Explore my research code, AI projects, experiments, and open-source work.",
    actionLabel: "Open GitHub",
  },
  {
    name: "X",
    href: links.x,
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.844l-5.36-7.012L4.2 22H1l8.04-9.183L1.5 2h7.02l4.847 6.4L18.244 2zm-1.2 18h1.873L7.06 4H5.05l11.994 16z" />
      </svg>
    ),
    type: "link",
    description:
      "Follow my short updates on AI, research, software engineering, and academic life.",
    actionLabel: "Open X Profile",
  },
  {
    name: "WeChat",
    href: "#wechat",
    icon: MessageCircle,
    type: "wechat",
    description:
      "Add me on WeChat for academic discussion, Beihang connection, or collaboration.",
  },
  {
    name: "ResearchGate",
    href: links.researchgate,
    icon: BookOpen,
    type: "link",
    description:
      "View and follow my research profile, projects, and academic publications.",
    actionLabel: "Open ResearchGate",
  },
  {
    name: "OpenReview",
    href: "https://openreview.net/profile?id=%7EChandan_Kumar_Sah1",
    icon: ExternalLink,
    type: "link",
    description:
      "Visit my OpenReview profile for research activity, reviews, and academic presence.",
    actionLabel: "Open OpenReview",
  },
  {
    name: "ORCID",
    href: "https://orcid.org/0009-0002-4017-7970",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 0C5.371 0 0 5.372 0 12s5.371 12 12 12 12-5.372 12-12S18.629 0 12 0zm-5.449 5.25a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm1.05 13.2H5.5V9.15h2.101v9.3zm8.399 0h-2.85l-3.149-5.1v5.1H8.1V9.15h3.6c2.699 0 4.349 1.35 4.349 3.75 0 1.95-1.05 3.15-2.85 3.45L16 18.45zm-4.2-7.5h-1.8v3.3h1.8c1.2 0 1.95-.6 1.95-1.65s-.75-1.65-1.95-1.65z" />
      </svg>
    ),
    type: "link",
    description:
      "Open my ORCID researcher identity and verified academic profile.",
    actionLabel: "Open ORCID",
  },
];

export const Contact = () => {
  const [showWechat, setShowWechat] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ContactCard | null>(null);
  const [copied, setCopied] = useState(false);

  const copyWechatId = async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const openCard = (card: ContactCard) => {
    if (card.type === "wechat") {
      setShowWechat(true);
      return;
    }

    setSelectedCard(card);
  };

  return (
    <Section
      id="contact"
      eyebrow="09 · Contact"
      title="Let’s collaborate."
      subtitle="Open to research collaborations, talks, mentorship, AI education, and meaningful conversations about reliable and uncertainty-aware AI."
    >
      <div className="card-elegant relative mb-10 overflow-hidden p-7 text-center md:p-12">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-accent opacity-20 blur-3xl" />

        <p className="font-display mb-3 text-2xl font-semibold md:text-4xl">
          {profile.name} ·{" "}
          <span className="text-gradient text-2xl md:text-3xl">
            {profile.altName}
          </span>
        </p>

        <p className="mb-7 text-base text-muted-foreground md:text-lg">
          Software Engineering Institute, Beihang University · Beijing, China
        </p>

        <div className="mb-6">
          <p className="mx-auto max-w-3xl text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
            Building AI systems that know when they don’t know.
          </p>

          <p className="mt-4 text-lg font-semibold text-cyan-600 dark:text-cyan-300">
            AI for Good
          </p>
        </div>
      </div>

      <div className="mb-12 flex justify-center">
        <a
          href={gmailLink}
          target="_blank"
          rel="noreferrer"
          className="glow inline-flex items-center rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
        >
          <Mail className="mr-3 h-5 w-5" />
          Get in touch
        </a>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {cards.map((c) => {
          const Icon = c.icon as any;

          return (
            <button
              key={c.name}
              type="button"
              onClick={() => openCard(c)}
              className="card-elegant group flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-accent text-white transition-transform duration-300 group-hover:scale-110">
                <Icon />
              </div>

              <span className="text-xs font-semibold leading-snug md:text-sm">
                {c.name}
              </span>

              <span className="text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">
                {c.type === "wechat" ? "Show ID" : "Preview"}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-8 text-center text-white shadow-2xl">
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

            <button
              onClick={() => setSelectedCard(null)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Close profile preview"
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-accent text-white shadow-lg shadow-cyan-500/20">
                {(() => {
                  const Icon = selectedCard.icon as any;
                  return <Icon />;
                })()}
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Rocky Research Network
              </p>

              <h3 className="mb-4 text-3xl font-bold">
                {selectedCard.name}
              </h3>

              <p className="mx-auto mb-7 max-w-sm text-sm leading-6 text-slate-300">
                {selectedCard.description}
              </p>

              <a
                href={selectedCard.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                {selectedCard.actionLabel || "Open Link"}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {showWechat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-8 text-center text-white shadow-2xl">
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

            <button
              onClick={() => setShowWechat(false)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Close WeChat modal"
            >
              <X size={20} />
            </button>

            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-accent text-white shadow-lg shadow-cyan-500/20">
                <MessageCircle size={34} />
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Connect on WeChat
              </p>

              <h3 className="mb-4 text-3xl font-bold">Rocky 文浩</h3>

              <p className="mx-auto mb-6 max-w-sm text-sm leading-6 text-slate-300">
                Search my WeChat ID and add me for academic collaboration,
                research discussion, or Beihang connection.
              </p>

              <div className="mb-6 rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-6 py-5">
                <p className="text-sm text-cyan-300">WeChat ID</p>
                <p className="mt-1 text-2xl font-bold tracking-wide text-white">
                  {wechatId}
                </p>
              </div>

              <button
                onClick={copyWechatId}
                className="inline-flex items-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied!" : "Copy WeChat ID"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
