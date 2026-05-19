import { useState } from "react";
import { Calendar, ExternalLink, Flame, X } from "lucide-react";

const newsItems = [
  {
  date: "Mar 2026",
  location: "Delft, Netherlands 🇳🇱",
  tag: "Outstanding Reviewer",
  title: "Recognized with the Outstanding Reviewer Award at ECIR 2026",
  summary:
    "Honored to be recognized as an Outstanding Reviewer for the 48th European Conference on Information Retrieval (ECIR 2026).",
  article:
    "I am truly honored to be recognized with the Outstanding Reviewer Award at ECIR 2026, the 48th European Conference on Information Retrieval, held in Delft, The Netherlands. As part of the main conference reviewing community, I contributed to the peer-review process by evaluating research submissions and supporting the academic quality of one of the leading conferences in information retrieval. This recognition is meaningful to me because peer review is not only a service responsibility, but also a way to help strengthen research integrity, academic dialogue, and the global AI/IR community.",
  link:
    "https://www.linkedin.com/posts/ecir2026-informationretrieval-peerreview-ugcPost-7444362976096194561-mBcj",
  conferenceLink: "https://ecir2026.eu/",
},
  {
    date: "Apr 2026",
    location: "Seoul, South Korea 🇰🇷",
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
    location: "Beijing, China 🇨🇳",
    tag: "Graduation Honor",
    title: "Excellent International Graduate 2025",
    summary:
      "Graduated as an Outstanding / Excellent International Graduate at Beihang University, representing a proud milestone as a Nepalese student.",
    article:
      "In June 2025, I graduated from Beihang University as an Excellent International Graduate. This achievement was not only a personal academic milestone, but also a meaningful moment for Nepalese students at Beihang. It represents years of research, leadership, community service, and persistence as an international student working in China’s world-class academic environment.",
    link: "https://ev.buaa.edu.cn/",
  },
  {
  date: "Mar 2025",
  location: "Las Vegas, USA 🇺🇸",
  tag: "ICCV / AI World",
  title:
    "Our ICCV Research on Autonomous Vehicles Recognized by AI World",
  summary:
    "Our multimodal AI research on autonomous vehicle intelligence and traffic understanding was recognized among notable AI research papers.",
  article:
    "In March 2025, our research on AI for Autonomous Vehicles was recognized by AI World as one of the week's notable AI research papers. In this work, we proposed a deep learning and multimodal LLM-based framework for traffic sign recognition with 99.8% accuracy and robust lane detection with 99.6% accuracy under diverse real-world conditions. This project reflects our broader vision of building trustworthy and intelligent multimodal AI systems for future transportation. Huge thanks to my collaborators Ankit Kumar Shaw, Dr. Xiaoli Lian, Arsalan Baig, Dr. Tuopu Wen, Dr. Kun Jiang, Dr. Mengmeng Yang, and Dr. Diange Yang, along with support from Beihang University and Tsinghua University.",
  link:
    "https://www.linkedin.com/posts/%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B6%F0%9D%98%80-%F0%9D%97%AA%F0%9D%97%B2%F0%9D%97%B2%F0%9D%97%B8%F0%9D%98%80-%F0%9D%9F%AD%F0%9D%9F%AC-%F0%9D%97%A1%F0%9D%97%BC%F0%9D%98%81%F0%9D%97%AE%F0%9D%97%AF%F0%9D%97%B9-share-7305970124585328640-N1CT",
},
  {
  date: "Jan 2025",
  location: "Bangkok, Thailand 🇹🇭",
  tag: "Global Peace Summit",
  title:
    "First Nepalese & International Student from Beihang University to Present at the 4th Global Peace Summit 2025",
  summary:
    "Represented Beihang University and Nepal at the Humanitarian Affairs Peace Ambassador – 4th Global Peace Summit 2025 in Bangkok, Thailand.",
  article:
    "In January 2025, I had the honor of becoming the very first Nepalese and international student from Beihang University, Beijing, China, to present at the Humanitarian Affairs Peace Ambassador – 4th Global Peace Summit 2025 in Bangkok, Thailand. As a student from Nepal — the birthplace of Lord Buddha — it was deeply meaningful to share my thoughts on peace, humanity, education, global collaboration, and compassionate leadership. This experience reminded me that technology, education, and humanity must move together toward a more peaceful world. One quote that deeply inspired me during the summit was: 'If we have no peace, it is because we have forgotten that we belong to each other.'",
  link: "https://www.humanitarianaffairs.asia/",
  video: "https://www.youtube.com/watch?v=Jx1RHekcpkk",
},
  {
    date: "Dec 2024",
    location: "Beijing, China 🇨🇳",
    tag: "Scholarship Ceremony",
    title:
      "Two First Prizes at Beihang Foreign Students Scholarship Awarding Ceremony",
    summary:
      "Received First Prize for Outstanding Behavior and First Prize for Excellent Study at Beihang University.",
    article:
      "In December 2024, I received two First Prize honors at the Awarding Ceremony of Beijing Government Scholarship and Beihang University Foreign Students Scholarship in Beijing, China: First Prize for Outstanding Behavior and First Prize for Excellent Study. This recognition reflects my commitment to academic excellence, leadership, community service, and international student engagement at Beihang University.",
    link: "https://mp.weixin.qq.com/s/4r20vM7lkoOD4Oeaz2z79w",
  },
  {
    date: "Nov 2024",
    location: "Beijing, China 🇨🇳",
    tag: "Global Beihang",
    title: "Excellent Student Sharing by Global Beihang",
    summary:
      "Featured by Global Beihang as an excellent student sharing story at Beihang University, Beijing, China.",
    article:
      "In November 2024, I was featured in an Excellent Student Sharing story by Global Beihang, Beihang University, Beijing, China. This feature highlighted my academic journey, international student experience, research ambition, and commitment to contributing to the Beihang community and global AI research ecosystem.",
    link: "https://mp.weixin.qq.com/s/YC6sWWiat3WbJjGlf3hi-w",
  },
  {
    date: "Mar 2024",
    location: "St. Gallen, Switzerland 🇨🇭",
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
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-2 text-sm font-semibold text-orange-500 dark:text-orange-300">
            <Flame size={18} />
            Rocky News / Hot News
          </div>

          <h2 className="mb-4 text-4xl font-bold md:text-6xl text-foreground">
            🔥 Rocky’s Good News
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Selected milestones, global recognitions, academic breakthroughs,
            and personal stories from my research and leadership journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="group rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-orange-300/60 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="mb-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                    <Calendar size={16} />
                    {item.date}
                  </span>

                  <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-500 dark:text-orange-300">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm font-medium text-muted-foreground">
                  📍 {item.location}
                </p>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground">
                {item.title}
              </h3>

              <p className="mb-6 text-muted-foreground">{item.summary}</p>

              <div className="flex flex-wrap gap-3">
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
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground transition hover:bg-muted"
                >
                  Source <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-background p-8 text-foreground shadow-2xl">
            <button
              onClick={() => setActiveNews(null)}
              className="absolute right-5 top-5 rounded-full bg-muted p-2 transition hover:bg-muted/80"
              aria-label="Close news story"
            >
              <X size={20} />
            </button>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
              {activeNews.date} · {activeNews.location} · {activeNews.tag}
            </p>

            <h3 className="mb-5 text-3xl font-bold text-foreground">
              {activeNews.title}
            </h3>

            <p className="mb-6 text-lg leading-8 text-muted-foreground">
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
