import { useState } from "react";

import {
  PlayCircle,
  Clock,
  Youtube,
  Sparkles,
  Brain,
  ShieldCheck,
  Code2,
  Cpu,
  X,
  ExternalLink,
  BookOpen,
  Target,
  Layers,
  CheckCircle2,
} from "lucide-react";

const uncertaintyCourse = {
  title: "Uncertainty in Large Language Models",
  subtitle:
    "A PhD-level mini-course on calibration, abstention, retrieval decisions, uncertainty propagation, and reliable LLM reasoning.",
  level: "Graduate / PhD Research Level",
  status: "Coming Soon",
  format: "10–12 Lectures · Research-Oriented · YouTube Series",
  outcome:
    "By the end of this course, learners will understand how to measure, interpret, propagate, and mitigate uncertainty in modern large language models.",
  lectures: [
    {
      no: "01",
      title: "Why Uncertainty Matters in Large Language Models",
      description:
        "A high-level introduction to uncertainty, hallucination, overconfidence, reliability, and why modern LLM systems must know when they do not know.",
      youtube:
        "https://www.youtube.com/results?search_query=Uncertainty+in+Large+Language+Models+Lecture+1",
    },
    {
      no: "02",
      title: "Epistemic vs. Aleatoric Uncertainty in AI Systems",
      description:
        "Understanding model uncertainty, data uncertainty, distribution shift, ambiguity, and why different uncertainty types require different mitigation strategies.",
      youtube:
        "https://www.youtube.com/results?search_query=Epistemic+Aleatoric+Uncertainty+LLMs",
    },
    {
      no: "03",
      title: "Confidence, Calibration, and the Illusion of Knowing",
      description:
        "How to evaluate whether model confidence matches correctness using calibration error, reliability diagrams, confidence scoring, and uncertainty-aware metrics.",
      youtube:
        "https://www.youtube.com/results?search_query=LLM+Calibration+Confidence+Reliability",
    },
    {
      no: "04",
      title: "When Should LLMs Say ‘I Don’t Know’?",
      description:
        "A deep dive into abstention, refusal, selective prediction, answer withholding, and how uncertainty-aware models can improve trust and safety.",
      youtube:
        "https://www.youtube.com/results?search_query=LLM+Abstention+I+Don't+Know+Uncertainty",
    },
    {
      no: "05",
      title: "Uncertainty in Multi-Step Reasoning",
      description:
        "How uncertainty accumulates, amplifies, or disappears across chain-of-thought reasoning, decomposed QA, mathematical reasoning, and planning tasks.",
      youtube:
        "https://www.youtube.com/results?search_query=Uncertainty+Propagation+LLM+Reasoning",
    },
    {
      no: "06",
      title: "Retrieval-Augmented Generation Under Uncertainty",
      description:
        "How retrieval quality, context relevance, missing evidence, noisy documents, and retrieval confidence influence final LLM answers.",
      youtube:
        "https://www.youtube.com/results?search_query=Uncertainty+Retrieval+Augmented+Generation+RAG",
    },
    {
      no: "07",
      title: "Uncertainty-Aware Retrieval Decisions",
      description:
        "Designing systems that decide when to retrieve, what to retrieve, when to stop retrieval, and when retrieved evidence is insufficient.",
      youtube:
        "https://www.youtube.com/results?search_query=Uncertainty+Aware+Retrieval+LLMs",
    },
    {
      no: "08",
      title: "Uncertainty Propagation Across Reasoning and Retrieval",
      description:
        "Connecting step-level uncertainty, retrieval triggering, answer revision, early stopping, and adaptive reasoning pipelines for reliable QA systems.",
      youtube:
        "https://www.youtube.com/results?search_query=Uncertainty+Propagation+RAG+Question+Answering",
    },
    {
      no: "09",
      title: "Metrics for Reliable and Uncertainty-Aware LLMs",
      description:
        "Evaluation beyond accuracy: calibration, selective accuracy, abstention quality, risk-coverage curves, cost-aware reliability, and retrieval efficiency.",
      youtube:
        "https://www.youtube.com/results?search_query=Metrics+for+Uncertainty+Aware+LLMs",
    },
    {
      no: "10",
      title: "Uncertainty in Code Generation and Software Engineering",
      description:
        "Applying uncertainty to repository-level code generation, AI coding agents, retrieved code snippets, API knowledge, and OpenCoder-style systems.",
      youtube:
        "https://www.youtube.com/results?search_query=Uncertainty+in+LLM+Code+Generation",
    },
    {
      no: "11",
      title: "Fairness, Bias, and Uncertainty in LLM Recommendations",
      description:
        "How uncertainty interacts with fairness, personality-aware recommendation, user modeling, and trustworthy evaluation in LLM-based recommender systems.",
      youtube:
        "https://www.youtube.com/results?search_query=Fairness+Uncertainty+LLM+Recommendation+Systems",
    },
    {
      no: "12",
      title: "Building the Future: Reliable AI That Knows Its Limits",
      description:
        "A final synthesis lecture connecting uncertainty-aware LLMs, AI for software engineering, responsible AI, governance, and future research directions.",
      youtube:
        "https://www.youtube.com/results?search_query=Reliable+AI+Uncertainty+Aware+LLMs",
    },
  ],
};

const lectures = [
  {
    title: "Uncertainty in Large Language Models",
    description:
      "A future lecture series on calibration, self-knowledge, uncertainty propagation, retrieval decisions, and answer abstention in LLMs.",
    status: "Coming Soon",
    category: "LLMs & Uncertainty",
    icon: Brain,
    featured: true,
    course: uncertaintyCourse,
  },

  {
    title: "AI for Software Engineering",
    description:
      "Repository-level code generation, retrieval-augmented coding, AI coding agents, uncertainty-aware OpenCoder, and reliable software intelligence.",
    status: "Coming Soon",
    category: "Software Engineering",
    icon: Code2,
  },

  {
    title: "Deep Learning Fundamentals",
    description:
      "Neural networks, transformers, representation learning, optimization, and practical deep learning systems for modern AI applications.",
    status: "Coming Soon",
    category: "Deep Learning",
    icon: Cpu,
  },

  {
    title: "AI Governance & Responsible AI",
    description:
      "AI policy, governance frameworks, safety, fairness, ethics, and the future regulation of intelligent systems.",
    status: "Coming Soon",
    category: "AI Governance",
    icon: ShieldCheck,
  },

  {
    title: "Research Paper Writing for AI PhD Students",
    description:
      "How to design research questions, build experiments, write strong papers, and target top AI and software engineering conferences.",
    status: "Coming Soon",
    category: "PhD Research",
    icon: Sparkles,
  },

  {
    title: "Fairness and Personality-Aware Recommender Systems",
    description:
      "A course-style lecture on fairness, LLM-based recommendation, personality modeling, and trustworthy evaluation.",
    status: "Coming Soon",
    category: "Responsible AI",
    icon: Brain,
  },
];

const youtubeChannel = "https://www.youtube.com/";

const RockyLectures = () => {
  const [selectedCourse, setSelectedCourse] =
    useState<typeof uncertaintyCourse | null>(null);

  return (
    <section
      id="lectures"
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-500 dark:text-red-300">
            <Youtube size={18} />
            Rocky Lectures / AI Courses
          </div>

          <h2 className="mb-5 text-4xl font-bold text-foreground md:text-6xl">
            🎥 My Lectures Are Coming
          </h2>

          <p className="mx-auto max-w-4xl text-xl font-semibold text-cyan-600 dark:text-cyan-300">
            We’re building something that no one has built before.
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-muted-foreground">
            Future YouTube lectures, AI courses, research tutorials, and
            PhD-level learning resources on uncertainty, software engineering,
            deep learning, AI governance, and reliable AI systems.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lectures.map((lecture, index) => {
            const Icon = lecture.icon;

            const cardContent = (
              <>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                  <Icon size={34} />
                </div>

                <span className="mb-4 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                  {lecture.category}
                </span>

                <h3 className="mb-4 text-left text-2xl font-bold leading-tight text-foreground transition group-hover:text-cyan-500 dark:group-hover:text-cyan-300">
                  {lecture.title}
                </h3>

                <p className="mb-6 text-left text-sm leading-6 text-muted-foreground">
                  {lecture.description}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 dark:text-orange-300">
                    <Clock size={16} />
                    {lecture.status}
                  </span>

                  {lecture.featured ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                      View Outline
                      <ExternalLink size={14} />
                    </span>
                  ) : (
                    <Sparkles
                      className="text-cyan-600 dark:text-cyan-300"
                      size={18}
                    />
                  )}
                </div>
              </>
            );

            if (lecture.course) {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedCourse(lecture.course)}
                  className="group rounded-3xl border border-border bg-card/70 p-6 text-left backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <div
                key={index}
                className="group rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href={youtubeChannel}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-red-500 px-8 py-4 font-bold text-white transition hover:bg-red-400"
          >
            <Youtube size={22} />
            YouTube Channel Coming Soon
          </a>
        </div>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-border bg-background p-6 text-foreground shadow-2xl md:p-10">
            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="absolute right-5 top-5 rounded-full bg-muted p-2 transition hover:bg-muted/80"
              aria-label="Close course outline"
            >
              <X size={20} />
            </button>

            <div className="mb-10 pr-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                <BookOpen size={16} />
                Rocky AI Course Contract
              </div>

              <h3 className="mb-4 text-3xl font-bold md:text-5xl">
                {selectedCourse.title}
              </h3>

              <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
                {selectedCourse.subtitle}
              </p>
            </div>

            <div className="mb-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                  <Target size={22} />
                </div>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  Level
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedCourse.level}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                  <Layers size={22} />
                </div>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  Format
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedCourse.format}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                  <CheckCircle2 size={22} />
                </div>
                <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                  Outcome
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedCourse.outcome}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {selectedCourse.lectures.map((chapter) => (
                <a
                  key={chapter.no}
                  href={chapter.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-border bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:shadow-xl"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-300">
                      Lecture {chapter.no}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
                      YouTube
                      <Youtube size={14} />
                    </span>
                  </div>

                  <h4 className="mb-3 text-lg font-bold leading-snug text-foreground transition group-hover:text-cyan-500 dark:group-hover:text-cyan-300">
                    {chapter.title}
                  </h4>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {chapter.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 text-center">
              <p className="text-lg font-semibold text-foreground">
                Course philosophy: not just “how LLMs work,” but how to build AI
                systems that know their limits.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Replace each YouTube search URL with your real lecture video
                link once you publish the chapter.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RockyLectures;
