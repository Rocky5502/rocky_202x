import {
  PlayCircle,
  Clock,
  Youtube,
  Sparkles,
  Brain,
  ShieldCheck,
  Code2,
  Cpu,
} from "lucide-react";

const lectures = [
  {
    title: "Uncertainty in Large Language Models",
    description:
      "A future lecture series on calibration, self-knowledge, uncertainty propagation, retrieval decisions, and answer abstention in LLMs.",
    status: "Coming Soon",
    category: "LLMs & Uncertainty",
    icon: Brain,
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

const RockyLectures = () => {
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

          <h2 className="mb-5 text-4xl font-bold md:text-6xl text-foreground">
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

            return (
              <div
                key={index}
                className="group rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                  <Icon size={34} />
                </div>

                <span className="mb-4 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                  {lecture.category}
                </span>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground">
                  {lecture.title}
                </h3>

                <p className="mb-6 text-sm leading-6 text-muted-foreground">
                  {lecture.description}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 dark:text-orange-300">
                    <Clock size={16} />
                    {lecture.status}
                  </span>

                  <Sparkles
                    className="text-cyan-600 dark:text-cyan-300"
                    size={18}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-red-500 px-8 py-4 font-bold text-white transition hover:bg-red-400"
          >
            <Youtube size={22} />
            YouTube Channel Coming Soon
          </a>
        </div>
      </div>
    </section>
  );
};

export default RockyLectures;
