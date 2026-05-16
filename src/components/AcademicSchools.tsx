import { Section } from "@/components/Section";
import {
  ExternalLink,
  Globe,
  Sparkles,
  Snowflake,
  Sun,
} from "lucide-react";

const schools = [
  {
    when: "September 2025",
    title: "ACM Europe School on Recommender Systems",
    where: "Technische Universität Wien · Vienna, Austria",
    desc: "Advanced academic school focused on recommender systems, personalization, evaluation, responsible recommendation, and the future of human-centered AI systems.",
    link: "https://recsys-lab.at/rsss2025/",
    type: "summer",
  },

  {
    when: "November 2025",
    title: "The International Software Engineering Winter School on Hybrid and Generative Intelligence",
    where: "University of Bern · Bern, Switzerland",
    desc: "Research-intensive winter school exploring hybrid intelligence, generative AI, human-AI collaboration, and next-generation intelligent systems.",
    link: "https://innoguard-winter-school-2025.inf.unibe.ch/",
    type: "winter",
  },

  {
    when: "July 2025",
    title: "AI Summer School",
    where: "Beihang University · Hangzhou, China",
    desc: "International AI summer school focused on cutting-edge artificial intelligence, interdisciplinary collaboration, academic exchange, and global research training.",
    link: "https://biss.buaa.edu.cn/",
    type: "summer",
  },

  {
    when: "August 2024",
    title: "International Terahertz Summer School",
    where: "Beihang University · Hangzhou, China",
    desc: "Advanced summer school on terahertz technology, AI applications, intelligent sensing, imaging systems, and emerging interdisciplinary technologies.",
    link: "https://biss.buaa.edu.cn/",
    type: "summer",
  },
];

export const AcademicSchools = () => (
  <Section
    id="academic-schools"
    eyebrow="05 · Global Academic Training"
    title="Summer & Winter Schools."
    subtitle="International academic schools, global research programs, and interdisciplinary learning experiences across AI, recommender systems, hybrid intelligence, and emerging technologies."
  >
    <div className="relative">
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 lg:block" />

      <div className="space-y-10">
        {schools.map((school, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={school.title}
              className={`relative grid items-center gap-6 lg:grid-cols-2 ${
                !isLeft ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="hidden lg:flex justify-center">
                <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 shadow-2xl shadow-cyan-500/20">
                  {school.type === "winter" ? (
                    <Snowflake className="h-7 w-7 text-cyan-300" />
                  ) : (
                    <Sun className="h-7 w-7 text-orange-300" />
                  )}
                </div>
              </div>

              <a
                href={school.link}
                target="_blank"
                rel="noreferrer"
                className="card-elegant group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-accent opacity-10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                      <Globe className="h-4 w-4" />
                      {school.when}
                    </span>

                    <div className="flex items-center gap-2 text-cyan-300">
                      <Sparkles className="h-4 w-4" />

                      <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                        {school.type} school
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold leading-tight text-white">
                    {school.title}
                  </h3>

                  <p className="mb-3 text-lg font-medium text-cyan-300">
                    {school.where}
                  </p>

                  <p className="mb-6 leading-7 text-muted-foreground">
                    {school.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-cyan-300">
                    Visit Program
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </Section>
);
