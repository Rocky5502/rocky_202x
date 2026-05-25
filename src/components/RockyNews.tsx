import { useState } from "react";
import { Calendar, ExternalLink, Flame, X } from "lucide-react";

type NewsLink = {
  label: string;
  url: string;
};

type NewsItem = {
  date: string;
  location: string;
  tag: string;
  title: string;
  summary: string;
  article: string;
  link?: string;
  video?: string;
  links?: NewsLink[];
};

const newsItems: NewsItem[] = [
  {
  date: "May 2026",
  location: "Beijing, China 🇨🇳",
  tag: "CSC Alumni Feature",
  title: "Featured as a CSC Alumni Story by China Scholarship Council",
  summary:
    "Featured by CSC Alumni in a story highlighting my journey from Nepal to China and my research path in artificial intelligence at Beihang University.",
  article:
    "In May 2026, I was honored to be featured by CSC Alumni / China Scholarship Council in a story titled 'From Nepal to China: A Young Scholar Building Cultural Bridges through Artificial Intelligence Innovation and Research.' The feature reflects my academic journey from Nepal to Beihang University, where I completed my master’s degree in Software Engineering and began my Ph.D. research in artificial intelligence, large language models, and trustworthy AI. This story is deeply meaningful to me because it connects research, education, culture, and international friendship — showing how scholarship can become a bridge between countries, communities, and future innovation.",
  link: "https://mp.weixin.qq.com/s/owOH16o69CrsGUlIp9TDmQ",
},
{
  date: "May 2026",
  location: "Beijing, China 🇨🇳",
  tag: "Book Feature",
  title: "Featured in Beihang International Students Book Chapter",
  summary:
    "Featured in the Beihang University book 'Study at Beihang, Light the Dream', launched at the 11th Beihang University International Cultural Festival.",
  article:
    "In May 2026, I was proud to be featured in the book 'Study at Beihang, Light the Dream: Inspiring Stories of Outstanding International Students', published by Beihang University Press. The book was launched during the 11th Beihang University International Cultural Festival in Beijing, China. Being included in this book as a Nepalese international student is a very special milestone in my journey. My chapter shares my academic path, research work in large language models, cross-cultural experience in China, and belief that education can connect people across cultures. I am especially proud that my story represents Nepal, Beihang, and the power of international education to light the dreams of future students.",
  link: "https://ev.buaa.edu.cn/",
},
  {
    date: "April 2026",
    location: "Delft, Netherlands 🇳🇱",
    tag: "Reviewer Recognition",
    title: "Outstanding Reviewer Award ECIR 2026",
    summary:
      "Recognized as an Outstanding Reviewer for contributions to the peer-review process of the 48th European Conference on Information Retrieval.",
    article:
      "I am honored to be recognized with the Outstanding Reviewer Award at ECIR 2026, the 48th European Conference on Information Retrieval, held in Delft, The Netherlands. Serving as a reviewer for the main conference was a meaningful opportunity to contribute to the academic community, support rigorous peer review, and help strengthen the quality of research in information retrieval, AI, and related fields. This recognition reflects my continued commitment to research service, academic integrity, and the global scientific community.",
    links: [
      {
        label: "LinkedIn Announcement",
        url: "https://www.linkedin.com/posts/ecir2026-informationretrieval-peerreview-ugcPost-7444362976096194561-mBcj",
      },
      {
        label: "ECIR 2026 Conference",
        url: "https://ecir2026.eu/",
      },
    ],
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
    title: "Our ICCV Research on Autonomous Vehicles Recognized by AI World",
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
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

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

          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-6xl">
            🔥 Rocky’s Good News
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Selected milestones, global recognitions, academic breakthroughs,
            and personal stories from my research and leadership journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => {
            const primarySource = item.links?.[0]?.url || item.link;

            return (
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

                  {primarySource && (
                    <a
                      href={primarySource}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground transition hover:bg-muted"
                    >
                      {item.links ? "Sources" : "Source"}
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
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

            <div className="mt-6 flex flex-wrap gap-3">
              {activeNews.links?.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
                >
                  {item.label}
                  <ExternalLink size={18} />
                </a>
              ))}

              {!activeNews.links && activeNews.link && (
                <a
                  href={activeNews.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
                >
                  Open Source
                  <ExternalLink size={18} />
                </a>
              )}

              {activeNews.video && (
                <a
                  href={activeNews.video}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400"
                >
                  Watch Video
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RockyNews;
