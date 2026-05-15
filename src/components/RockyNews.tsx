import { useState } from "react";
import { Calendar, ExternalLink, Flame, X } from "lucide-react";

const newsItems = [
  {
    date: "Apr 2026",
    tag: "Global Venture Award",
    title: "Bronze Prize – 2026 Alliance Students' Venture Forum",
    summary:
      "Selected and awarded Bronze Prize at the 2026 Alliance Students' Venture Forum, issued by The Korea Economic Daily in Korea.",
    article:
      "In April 2026, I was selected to participate in the 2026 Alliance Students' Venture Forum in Korea and received the Bronze Prize. This milestone represents one of my proudest international innovation journeys, bringing together entrepreneurship, academic research, leadership, and global collaboration. As a Nepalese student and researcher at Beihang University, this recognition reflects my growing mission to connect AI research with real-world innovation and cross-border impact.",
    link: "https://www.hankyung.com/",
  },
  {
    date: "Jun 2025",
    tag: "Graduation Honor",
    title: "Excellent International Graduate 2025",
    summary:
      "Graduated as an Outstanding / Excellent International Graduate at Beihang University, representing a proud milestone as a Nepalese student.",
    article:
      "In June 2025, I graduated from Beihang University as an Excellent International Graduate. This achievement was not only a personal academic milestone, but also a meaningful moment for Nepalese students at Beihang. It represents years of research, leadership, community service, and persistence as an international student working in China’s world-class academic environment.",
    link: "https://ev.buaa.edu.cn/",
  },
  {
    date: "Mar 2024",
    tag: "Leader of Tomorrow",
    title: "Selected as Leader of Tomorrow by St. Gallen Symposium",
    summary:
      "Selected as a Leader of Tomorrow for the 53rd St. Gallen Symposium in Switzerland.",
    article:
      "In March 2024, I was selected as a Leader of Tomorrow by the St. Gallen Symposium in Switzerland. This recognition connected me with a global community of young leaders, scholars, entrepreneurs, and policymakers discussing the future of society, technology, economics, and leadership. It was a meaningful step in my journey to grow not only as an AI researcher, but also as a global thinker and changemaker.",
    link: "https://symposium.org/",
  },
];

const RockyNews = () => {
  const [activeNews, setActiveNews] = useState<(typeof newsItems)[0] | null>(
    null
  );

  return (
    <section
      id="rocky-news"
      className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-2 text-sm font-semibold text-orange-300">
            <Flame size={18} />
            Rocky News / Hot News
          </div>

          <h2 className="mb-4 text-4xl font-bold md:text-6xl">
            🔥 Rocky’s Good News
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Selected milestones, global recognitions, academic breakthroughs,
            and personal stories from my research and leadership journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-orange-300/60 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                  <Calendar size={16} />
                  {item.date}
                </span>

                <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  {item.tag}
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-tight">
                {item.title}
              </h3>

              <p className="mb-6 text-slate-400">{item.summary}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveNews(item)}
                  className="rounded-full bg-orange-400 px-5 py-2 font-semibold text-black transition hover:bg-orange-300"
                >
                  Read Story
                </button>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 font-semibold text-white transition hover:bg-white/10"
                >
                  Source <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8 text-white shadow-2xl">
            <button
              onClick={() => setActiveNews(null)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              {activeNews.date} · {activeNews.tag}
            </p>

            <h3 className="mb-5 text-3xl font-bold">{activeNews.title}</h3>

            <p className="mb-6 text-lg leading-8 text-slate-300">
              {activeNews.article}
            </p>

            <a
              href={activeNews.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Open Source <ExternalLink size={18} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default RockyNews;
