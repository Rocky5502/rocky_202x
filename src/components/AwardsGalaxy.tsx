import { useState } from "react";
import { ExternalLink } from "lucide-react";

const awardsData = {
  2026: [
    {
      title: "Outstanding Reviewer Award (ECIR 2026)",
      image: `${import.meta.env.BASE_URL}awards/ecir2026.png`,
      link: "https://ecir2026.eu/",
      source: "ECIR 2026 · Delft, Netherlands",
    },
    {
      title: "Bronze Prize – 2026 Alliance Students' Venture Forum",
      image: `${import.meta.env.BASE_URL}awards/alliance2026.png`,
      link: "https://www.hankyung.com/",
      source: "The Korea Economic Daily",
    },
    {
      title: "Community Choice Award 2026",
      image: `${import.meta.env.BASE_URL}awards/apng-community2026.png`,
      link: "https://apngcamp.asia/",
      source: "18th APNG Camp · Indonesia",
    },
    {
      title: "Fellowship Awardee – APNG Camp 2026",
      image: `${import.meta.env.BASE_URL}awards/apng-fellowship2026.png`,
      link: "https://apngcamp.asia/",
      source: "Asia Pacific Next Generation",
    },
  ],

  2025: [
    {
      title: "Excellent Paper Award & Excellent Poster Award",
      image: `${import.meta.env.BASE_URL}awards/tsinghua2025.png`,
      link: "https://www.tsinghua.edu.cn/en/",
      source: "Tsinghua University",
    },
    {
      title: "First Prize – Belt and Road Ambassador's Scholarship",
      image: `${import.meta.env.BASE_URL}awards/beltroad2025.png`,
      link: "https://np.china-embassy.gov.cn/",
      source: "Embassy of Nepal in Beijing / OCCFC",
    },
    {
      title: "ASE 2025 Student Research Competition – Second Place",
      image: `${import.meta.env.BASE_URL}awards/ase2025.png`,
      link: "https://conf.researchr.org/home/ase-2025",
      source: "ACM / IEEE ASE 2025",
    },
    {
      title: "Excellent International Graduate 2025",
      image: `${import.meta.env.BASE_URL}awards/internationalgraduate2025.png`,
      link: "https://ev.buaa.edu.cn/",
      source: "Beihang University",
    },
    {
      title: "National AI Application Innovation Competition – Second Prize",
      image: `${import.meta.env.BASE_URL}awards/aiinnovation2025.png`,
      link: "https://www.baidu.com/",
      source: "National AI Application Innovation Competition",
    },
    {
      title: "Chinese Government Scholarship – PhD",
      image: `${import.meta.env.BASE_URL}awards/cscphd2025.png`,
      link: "https://www.campuschina.org/",
      source: "Chinese Government Scholarship",
    },
    {
      title: "Distinguished Foreign Student Scholarship – First Prize",
      image: `${import.meta.env.BASE_URL}awards/buaa2025scholarship.png`,
      link: "https://ev.buaa.edu.cn/",
      source: "Beihang University",
    },
  ],

  2024: [
    {
      title: "National Innovation Competition – Second Prize",
      image: `${import.meta.env.BASE_URL}awards/innovation2024.png`,
      link: "https://mp.weixin.qq.com/s/BCkFELXLxtA6as1DB_tmBw",
      source: "National College Student Innovation and Invention Competition",
    },
    {
      title: "Best Researcher Award",
      image: `${import.meta.env.BASE_URL}awards/bestresearcher2024.png`,
      link: "https://worldscienceawards.com/chandan-kumar-sah-computer-science-best-researcher-award-13440/",
      source: "ScienceFather",
    },
    {
      title: "1st Prize – IS Academic Forum for Outstanding International Students",
      image: `${import.meta.env.BASE_URL}awards/isforum2024.png`,
      link: "https://mp.weixin.qq.com/s/YsV-IkwAHGJ4LvGc14rUvg",
      source: "University of Science and Technology Beijing",
    },
    {
      title: "Best Oral Presentation Award",
      image: `${import.meta.env.BASE_URL}awards/terahertz2024.png`,
      link: "https://www.buaa.edu.cn/",
      source: "1st International Terahertz Summer School",
    },
    {
      title: "Excellent Poster Award",
      image: `${import.meta.env.BASE_URL}awards/poster2024.png`,
      link: "https://www.buaa.edu.cn/",
      source: "Beihang University",
    },
    {
      title: "Champion – 1st Robot Competition for International Students in Beijing",
      image: `${import.meta.env.BASE_URL}awards/robot2024.png`,
      link: "https://www.baidu.com/",
      source: "China University Robotics Committee",
    },
    {
      title: "Winner – St. Gallen Symposium Global Essay Competition",
      image: `${import.meta.env.BASE_URL}awards/stgallenwinner2024.png`,
      link: "https://symposium.org/",
      source: "St. Gallen Symposium",
    },
    {
      title: "Leader of Tomorrow – 53rd St. Gallen Symposium",
      image: `${import.meta.env.BASE_URL}awards/leaderoftomorrow2024.png`,
      link: "https://symposium.org/",
      source: "St. Gallen Symposium",
    },
    {
      title: "Innovative Development Award",
      image: `${import.meta.env.BASE_URL}awards/innovationaward2024.png`,
      link: "https://www.tsinghua.edu.cn/en/",
      source: "Tsinghua University",
    },
    {
      title: "Distinguished Foreign Student Scholarship – First Prize",
      image: `${import.meta.env.BASE_URL}awards/foreignstudent2024.png`,
      link: "https://ev.buaa.edu.cn/",
      source: "Beihang University",
    },
  ],

  2023: [
    {
      title: "AI Teacher Training Seminar – Peking University",
      image: `${import.meta.env.BASE_URL}awards/pkuai2023.png`,
      link: "https://www.pku.edu.cn/",
      source: "Peking University / Ministry of Education",
    },
    {
      title: "Best Delegate – XI Model SCO",
      image: `${import.meta.env.BASE_URL}awards/sco2023.png`,
      link: "https://mp.weixin.qq.com/s/G-6LVI4xpmf5qjrSHi3rww",
      source: "Embassy of Kazakhstan / SCO Secretariat",
    },
  ],

  2022: [
    {
      title: "Chinese Government Scholarship – Master's",
      image: `${import.meta.env.BASE_URL}awards/csc2022.png`,
      link: "https://www.campuschina.org/",
      source: "China Scholarship Council",
    },
    {
      title: "Officially Licensed Software Engineer",
      image: `${import.meta.env.BASE_URL}awards/nec2022.png`,
      link: "https://nec.gov.np/",
      source: "Nepal Engineering Council",
    },
  ],

  2021: [
    {
      title: "Critical Thinking in English Language Teaching",
      image: `${import.meta.env.BASE_URL}awards/relo2021.png`,
      link: "https://regionalenglishlanguagenetwork.org/",
      source: "Regional English Language Office",
    },
  ],

  2018: [
    {
      title: "Full Belt and Road Scholarship – Bachelor",
      image: `${import.meta.env.BASE_URL}awards/beltroad2018.png`,
      link: "https://www.scu.edu.cn/",
      source: "China Government / Sichuan University",
    },
  ],
};

const years = Object.keys(awardsData).sort((a, b) => Number(b) - Number(a));

const AwardsGalaxy = () => {
  const [selectedYear, setSelectedYear] = useState("2026");

  const selectedAwards =
    awardsData[selectedYear as keyof typeof awardsData] || [];

  return (
    <section
      id="awards"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050816] to-black opacity-95" />

      <div className="pointer-events-none absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Awards · Certificates · Milestones
          </p>

          <h2 className="mb-4 text-4xl font-bold md:text-6xl">
            🌌 Welcome to Rocky’s Planet
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            A galaxy of awards, certificates, scholarships, research honors,
            leadership recognitions, and academic adventures across time.
          </p>
        </div>

        <div className="mb-14 flex flex-wrap justify-center gap-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-full border px-6 py-3 font-semibold transition-all duration-300 ${
                selectedYear === year
                  ? "scale-110 border-cyan-300 bg-cyan-400 text-black shadow-lg shadow-cyan-400/30"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-cyan-300">
            {selectedYear} Galaxy
          </h3>
          <p className="text-gray-400">
            {selectedAwards.length} award
            {selectedAwards.length > 1 ? "s" : ""} / certificate
            {selectedAwards.length > 1 ? "s" : ""} in this orbit
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {selectedAwards.map((award, index) => (
            <a
              key={`${selectedYear}-${index}`}
              href={award.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              <div className="overflow-hidden bg-white/5">
                <img
                  src={award.image}
                  alt={award.title}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold leading-snug">
                    {award.title}
                  </h3>

                  <ExternalLink className="mt-1 shrink-0 text-cyan-300" size={18} />
                </div>

                <p className="text-sm text-cyan-300">Source: {award.source}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsGalaxy;
