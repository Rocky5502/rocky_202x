import { useState } from "react";
import { ExternalLink } from "lucide-react";

const awardsData = {
  2026: [
    {
      title: "Outstanding Reviewer Award – ECIR 2026",
      image: `${import.meta.env.BASE_URL}awards/ecir2026.png`,
      link: "https://ecir2026.eu/",
      issuedBy: "48th European Conference on Information Retrieval",
    },
    {
      title: "Bronze Prize – 2026 Alliance Students' Venture Forum",
      image: `${import.meta.env.BASE_URL}awards/alliance2026.png`,
      link: "https://www.hankyung.com/",
      issuedBy: "The Korea Economic Daily · Seoul, South Korea",
    },
    {
      title: "Certificate of Completion – KTG Alliance Students' Venture Forum",
      image: `${import.meta.env.BASE_URL}awards/alliance-completion2026.png`,
      link: "https://www.hankyung.com/",
      issuedBy: "The Korea Economic Daily / KT&G",
    },
    {
      title: "Community Choice Award – 18th APNG Camp",
      image: `${import.meta.env.BASE_URL}awards/apng-community2026.png`,
      link: "https://apngcamp.asia/",
      issuedBy: "APNG Camp · Tangerang, Indonesia",
    },
    {
      title: "Certificate of Fellowship – 18th APNG Camp",
      image: `${import.meta.env.BASE_URL}awards/apng-fellowship2026.png`,
      link: "https://apngcamp.asia/",
      issuedBy: "Asia Pacific Next Generation",
    },
    {
      title: "IASEAI’26 Presentation Certificate",
      image: `${import.meta.env.BASE_URL}awards/iaseai2026.png`,
      link: "https://arxiv.org/abs/2602.02582",
      issuedBy: "International Association for Safe & Ethical AI",
    },
    {
      title: "Chapter Acceptance – AI in Education",
      image: `${import.meta.env.BASE_URL}awards/intechopen2026.png`,
      link: "https://www.intechopen.com/chapters/1230310",
      issuedBy: "IntechOpen · London",
    },
  ],

  2025: [
    {
      title: "AI and Digital Transformation in Government",
      image: `${import.meta.env.BASE_URL}awards/oxford-unesco2025.png`,
      link: "https://www.sbs.ox.ac.uk/",
      issuedBy: "Oxford Saïd Business School / UNESCO",
    },
    {
      title: "ACM Europe School on Recommender Systems 2025",
      image: `${import.meta.env.BASE_URL}awards/acm-recsys-school2025.png`,
      link: "https://recsys-lab.at/rsss2025/",
      issuedBy: "TU Wien · Vienna, Austria",
    },
    {
      title: "ASE 2025 Conference Attendance",
      image: `${import.meta.env.BASE_URL}awards/ase-attendance2025.png`,
      link: "https://conf.researchr.org/home/ase-2025",
      issuedBy: "IEEE/ACM ASE 2025 · Seoul, South Korea",
    },
    {
      title: "ACM SRC Recognition – ASE 2025",
      image: `${import.meta.env.BASE_URL}awards/ase-src-recognition2025.png`,
      link: "https://conf.researchr.org/home/ase-2025",
      issuedBy: "Association for Computing Machinery",
    },
    {
      title: "ASE 2025 Student Research Competition – Second Place",
      image: `${import.meta.env.BASE_URL}awards/ase-src-second2025.png`,
      link: "https://conf.researchr.org/home/ase-2025",
      issuedBy: "ACM Student Research Competition",
    },
    {
      title: "First Prize – Belt and Road Ambassador Scholarship 2025",
      image: `${import.meta.env.BASE_URL}awards/beltroad2025.png`,
      link: "https://np.china-embassy.gov.cn/",
      issuedBy: "Embassy of Nepal in Beijing / OCCFC",
    },
    {
      title: "SEG Winter School on Hybrid and Generative Intelligence",
      image: `${import.meta.env.BASE_URL}awards/seg-winter-school2025.png`,
      link: "https://innoguard-winter-school-2025.inf.unibe.ch/",
      issuedBy: "University of Bern · Switzerland",
    },
    {
      title: "Reviewer Certificate – Complex & Intelligent Systems",
      image: `${import.meta.env.BASE_URL}awards/springer-reviewer2025.png`,
      link: "https://link.springer.com/journal/40747",
      issuedBy: "Springer Nature",
    },
    {
      title: "Excellent Paper Award – AUA Postgraduate Forum",
      image: `${import.meta.env.BASE_URL}awards/aua-paper2025.png`,
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua SIGS / Asian Universities Alliance",
    },
    {
      title: "Excellent Poster Award – AUA Postgraduate Forum",
      image: `${import.meta.env.BASE_URL}awards/aua-poster2025.png`,
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua SIGS / Asian Universities Alliance",
    },
    {
      title: "National AI Application Innovation Competition – Second Prize",
      image: `${import.meta.env.BASE_URL}awards/aiinnovation2025.png`,
      link: "https://www.baidu.com/",
      issuedBy: "China Society of Technology Economics",
    },
    {
      title: "AI Photonics Summer School Completion Certificate",
      image: `${import.meta.env.BASE_URL}awards/ai-photonics2025.png`,
      link: "https://biss.buaa.edu.cn/",
      issuedBy: "Beihang International Summer School",
    },
    {
      title: "Empowering Electronic Information with Digital Intelligence",
      image: `${import.meta.env.BASE_URL}awards/electronic-info-forum2025.png`,
      link: "https://www.buaa.edu.cn/",
      issuedBy: "PGSU · School of Electronic Information Engineering",
    },
    {
      title: "Excellent International Graduate 2025",
      image: `${import.meta.env.BASE_URL}awards/internationalgraduate2025.png`,
      link: "https://ev.buaa.edu.cn/",
      issuedBy: "Beihang University",
    },
    {
      title: "Chinese Government Scholarship – PhD",
      image: `${import.meta.env.BASE_URL}awards/cscphd2025.png`,
      link: "https://www.campuschina.org/",
      issuedBy: "Chinese Government Scholarship",
    },
  ],

  2024: [
    {
      title: "Two First Prizes – Excellent Study & Outstanding Behavior",
      image: `${import.meta.env.BASE_URL}awards/foreignstudent2024.png`,
      link: "https://mp.weixin.qq.com/s/4r20vM7lkoOD4Oeaz2z79w",
      issuedBy: "Beihang University Foreign Students Scholarship",
    },
    {
      title: "National Innovation Competition – Second Prize",
      image: `${import.meta.env.BASE_URL}awards/innovation2024.png`,
      link: "https://mp.weixin.qq.com/s/BCkFELXLxtA6as1DB_tmBw",
      issuedBy: "National College Student Innovation and Invention Competition",
    },
    {
      title: "Best Researcher Award",
      image: `${import.meta.env.BASE_URL}awards/bestresearcher2024.png`,
      link: "https://worldscienceawards.com/chandan-kumar-sah-computer-science-best-researcher-award-13440/",
      issuedBy: "ScienceFather",
    },
    {
      title: "1st Prize – IS Academic Forum for Outstanding International Students",
      image: `${import.meta.env.BASE_URL}awards/isforum2024.png`,
      link: "https://mp.weixin.qq.com/s/YsV-IkwAHGJ4LvGc14rUvg",
      issuedBy: "University of Science and Technology Beijing",
    },
    {
      title: "Best Oral Presentation Award – Terahertz Summer School",
      image: `${import.meta.env.BASE_URL}awards/terahertz2024.png`,
      link: "https://www.buaa.edu.cn/",
      issuedBy: "1st International Terahertz Summer School",
    },
    {
      title: "Excellent Poster Award",
      image: `${import.meta.env.BASE_URL}awards/poster2024.png`,
      link: "https://www.buaa.edu.cn/",
      issuedBy: "Beihang University",
    },
    {
      title: "Champion – 1st Robot Competition for International Students in Beijing",
      image: `${import.meta.env.BASE_URL}awards/robot2024.png`,
      link: "https://news.buaa.edu.cn/info/1002/62507.htm",
      issuedBy: "China University Robotics Committee",
    },
    {
      title: "Winner – St. Gallen Symposium Global Essay Competition",
      image: `${import.meta.env.BASE_URL}awards/stgallenwinner2024.png`,
      link: "https://symposium.org/",
      issuedBy: "St. Gallen Symposium",
    },
    {
      title: "Leader of Tomorrow – 53rd St. Gallen Symposium",
      image: `${import.meta.env.BASE_URL}awards/leaderoftomorrow2024.png`,
      link: "https://symposium.org/community/young-community/53-sgs-lot/",
      issuedBy: "St. Gallen Symposium",
    },
    {
      title: "Innovative Development Award",
      image: `${import.meta.env.BASE_URL}awards/innovationaward2024.png`,
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua University",
    },
    {
      title: "Distinguished Speaker – World Green Science Day",
      image: `${import.meta.env.BASE_URL}awards/wgsd2024.png`,
      link: "https://journalasc.org/2024/12/10/wgsd2024/",
      issuedBy: "World Green Science Day",
    },
    {
      title: "Delegate – Yenching Global Symposium",
      image: `${import.meta.env.BASE_URL}awards/yenching2024.png`,
      link: "https://www.pku.edu.cn/",
      issuedBy: "Peking University",
    },
  ],

  "2023–2018": [
    {
      title: "AI Teacher Training Seminar – Peking University",
      image: `${import.meta.env.BASE_URL}awards/pkuai2023.png`,
      link: "https://www.pku.edu.cn/",
      issuedBy: "Peking University / Ministry of Education",
    },
    {
      title: "Best Delegate – XI Model SCO",
      image: `${import.meta.env.BASE_URL}awards/sco2023.png`,
      link: "https://mp.weixin.qq.com/s/G-6LVI4xpmf5qjrSHi3rww",
      issuedBy: "Embassy of Kazakhstan / SCO Secretariat",
    },
    {
      title: "Top Innovator – Huawei Global Impact Sprint",
      image: `${import.meta.env.BASE_URL}awards/huawei2023.png`,
      link: "https://mp.weixin.qq.com/s/L7-qBAcIOlmapQNPBc3gLQ",
      issuedBy: "Huawei Global Impact Sprint",
    },
    {
      title: "Innovator Award – SDG Open Hackathon",
      image: `${import.meta.env.BASE_URL}awards/sdg2023.png`,
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua University",
    },
    {
      title: "Chinese Government Scholarship – Master's",
      image: `${import.meta.env.BASE_URL}awards/csc2022.png`,
      link: "https://www.campuschina.org/",
      issuedBy: "China Scholarship Council",
    },
    {
      title: "Officially Licensed Software Engineer",
      image: `${import.meta.env.BASE_URL}awards/nec2022.png`,
      link: "https://nec.gov.np/",
      issuedBy: "Nepal Engineering Council",
    },
    {
      title: "Critical Thinking in English Language Teaching",
      image: `${import.meta.env.BASE_URL}awards/relo2021.png`,
      link: "https://regionalenglishlanguagenetwork.org/",
      issuedBy: "Regional English Language Office",
    },
    {
      title: "Full Belt and Road Scholarship – Bachelor",
      image: `${import.meta.env.BASE_URL}awards/beltroad2018.png`,
      link: "https://www.scu.edu.cn/",
      issuedBy: "China Government / Sichuan University",
    },
  ],
};

const years = Object.keys(awardsData);

const AwardsGalaxy = () => {
  const [selectedYear, setSelectedYear] = useState("2026");

  const selectedAwards =
    awardsData[selectedYear as keyof typeof awardsData] || [];

  return (
    <section
      id="awards"
      className="relative overflow-hidden bg-background px-6 py-24 text-foreground"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_35%)]" />

      <div className="pointer-events-none absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-300">
            Awards · Certificates · Milestones
          </p>

          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-6xl">
            🌌 Welcome to Rocky’s Planet
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
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
                  : "border-border bg-card/70 text-foreground hover:bg-muted"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-300">
            {selectedYear} Galaxy
          </h3>

          <p className="text-muted-foreground">
            {selectedAwards.length} award
            {selectedAwards.length > 1 ? "s" : ""} / certificate
            {selectedAwards.length > 1 ? "s" : ""} in this orbit
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {selectedAwards.map((award, index) => (
            <a
              key={`${selectedYear}-${index}`}
              href={award.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/70 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              <div className="overflow-hidden bg-muted">
                <img
                  src={award.image}
                  alt={award.title}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="p-3">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug text-foreground">
                    {award.title}
                  </h3>

                  <ExternalLink
                    className="mt-1 shrink-0 text-cyan-600 dark:text-cyan-300"
                    size={14}
                  />
                </div>

                <p className="text-[11px] font-medium text-cyan-600 dark:text-cyan-300">
                  Issued by: {award.issuedBy}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsGalaxy;
