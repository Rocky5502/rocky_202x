/**
 * HISTORICAL AWARDS/CERTIFICATES/ACTIVITIES ARCHIVE
 *
 * The exact original 62 entry titles, event/issuer links, issuer labels,
 * locations, group assignments and image *filenames* were recovered from:
 * https://github.com/Rocky5502/rocky_202x/blob/40677b335ea851d0c6a5dd3fcd774c776c23c97c/src/components/AwardsGalaxy.tsx
 *
 * Most image files referenced by that legacy code were NOT committed to
 * GitHub. Keep filenames for recovery, but DO NOT render broken certificate
 * thumbnails or use stock replacements.
 *
 * This is an owner-authored HISTORICAL ARCHIVE, not independently validated
 * proof for every award/competition/certificate. In particular, event
 * homepages must never be presented as an individual award's proof.
 */
export const awardYears = ["2026", "2025", "2024", "2023–2018"] as const;
export type AwardYear = (typeof awardYears)[number];
export type AwardCategory =
  | "Prizes & distinctions"
  | "Scholarships & fellowships"
  | "Academic service & presentations"
  | "Participation & certificates";
export type ArchivedAward = {
  title: string;
  originalAssetName: string;
  link: string;
  issuedBy: string;
  location: string;
};
export type AwardRecord = ArchivedAward & {
  yearGroup: AwardYear;
  category: AwardCategory;
  /** The source is a self-authored website archive, not a third-party verification. */
  provenance: "Original website archive";
};

/** Classification describes what the record SAYS it is, not an audited claim. */
export function awardCategory(title: string): AwardCategory {
  const s = title.toLowerCase();
  if (/scholarship|fellowship/.test(s)) return "Scholarships & fellowships";
  if (/reviewer certificate|reviewer award|presenter|presentation|speaker|department head/.test(s))
    return /reviewer award/.test(s) ? "Prizes & distinctions" : "Academic service & presentations";
  if (/prize|award|winner|champion|innovator|recognition|excellent|outstanding|best delegate|top innovator|leader of tomorrow|community choice|bronze/.test(s))
    return "Prizes & distinctions";
  return "Participation & certificates";
}

const legacyAwardsByYear: Record<AwardYear, ArchivedAward[]> = {
  2026: [
    {
      title: "Outstanding Reviewer Award – ECIR 2026",
      originalAssetName: "ecir2026.png",
      link: "https://ecir2026.eu/",
      issuedBy: "48th European Conference on Information Retrieval",
      location: "Delft, Netherlands 🇳🇱",
    },
    {
      title: "ICSE 2026 Student Mentoring Workshop (SMeW)",
      originalAssetName: "icse2026-smew.png",
      link: "https://conf.researchr.org/home/icse-2026",
      issuedBy: "48th International Conference on Software Engineering",
      location: "Rio de Janeiro, Brazil 🇧🇷",
    },
    {
      title: "Bronze Prize – 2026 Alliance Students' Venture Forum",
      originalAssetName: "alliance2026.png",
      link: "https://www.hankyung.com/",
      issuedBy: "The Korea Economic Daily",
      location: "Seoul, South Korea 🇰🇷",
    },
    {
      title: "Certificate of Completion – KTG Alliance Students' Venture Forum",
      originalAssetName: "alliance-completion2026.png",
      link: "https://www.hankyung.com/",
      issuedBy: "The Korea Economic Daily / KT&G",
      location: "Seoul, South Korea 🇰🇷",
    },
    {
      title: "Community Choice Award – 18th APNG Camp",
      originalAssetName: "apng-community2026.png",
      link: "https://apngcamp.asia/",
      issuedBy: "Asia Pacific Next Generation",
      location: "Tangerang, Indonesia 🇮🇩",
    },
    {
      title: "Certificate of Fellowship – 18th APNG Camp",
      originalAssetName: "apng-fellowship2026.png",
      link: "https://apngcamp.asia/",
      issuedBy: "Asia Pacific Next Generation",
      location: "Tangerang, Indonesia 🇮🇩",
    },
    {
      title: "IASEAI’26 Presentation Certificate",
      originalAssetName: "iaseai2026.png",
      link: "https://www.iaseai.org/our-programs/iaseai26",
      issuedBy: "The International Association for Safe & Ethical AI (IASEAI)",
      location: "Paris, France 🇫🇷",
    },
    {
      title: "Chapter Acceptance – AI in Education",
      originalAssetName: "intechopen2026.png",
      link: "https://www.intechopen.com/chapters/1230310",
      issuedBy: "IntechOpen",
      location: "London, United Kingdom 🇬🇧",
    },
    {
  title: "Delegate – India AI Impact Summit 2026",
  originalAssetName: "indiaai2026.png",
  link: "https://impact.indiaai.gov.in/",
  issuedBy: "India AI Mission / AI Impact Summit",
  location: "New Delhi, India 🇮🇳",
},
  ],

  2025: [
    {
  title: "Participant – International Conference on AI Scientist (ICAIS 2025)",
  originalAssetName: "icais2025.png",
  link: "https://www.bza.edu.cn/en/detail/b82zccbm09l9xxdccxka4xg9o90jjy60",
  issuedBy: "Zhongguancun Academy · ICAIS 2025",
  location: "Beijing, China 🇨🇳",
},
    {
      title: "AI and Digital Transformation in Government",
      originalAssetName: "oxford-unesco2025.png",
      link: "https://www.sbs.ox.ac.uk/",
      issuedBy: "Oxford Saïd Business School / UNESCO",
      location: "Oxford, United Kingdom 🇬🇧",
    },
    {
      title: "ACM Europe School on Recommender Systems 2025",
      originalAssetName: "acm-recsys-school2025.png",
      link: "https://recsys-lab.at/rsss2025/",
      issuedBy: "TU Wien",
      location: "Vienna, Austria 🇦🇹",
    },
    {
      title: "ASE 2025 Conference Attendance",
      originalAssetName: "ase-attendance2025.png",
      link: "https://conf.researchr.org/home/ase-2025",
      issuedBy: "IEEE/ACM ASE 2025",
      location: "Seoul, South Korea 🇰🇷",
    },
    {
      title: "ACM SRC Recognition – ASE 2025",
      originalAssetName: "ase-src-recognition2025.png",
      link: "https://conf.researchr.org/home/ase-2025",
      issuedBy: "Association for Computing Machinery",
      location: "Seoul, South Korea 🇰🇷",
    },
    {
      title: "ASE 2025 Student Research Competition – Second Place",
      originalAssetName: "ase-src-second2025.png",
      link: "https://conf.researchr.org/home/ase-2025",
      issuedBy: "ACM Student Research Competition",
      location: "Seoul, South Korea 🇰🇷",
    },
    {
      title: "First Prize – Belt and Road Ambassador Scholarship 2025",
      originalAssetName: "beltroad2025.png",
      link: "https://np.china-embassy.gov.cn/",
      issuedBy: "Embassy of Nepal in Beijing / OCCFC",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "SEG Winter School on Hybrid and Generative Intelligence",
      originalAssetName: "seg-winter-school2025.png",
      link: "https://innoguard-winter-school-2025.inf.unibe.ch/",
      issuedBy: "University of Bern",
      location: "Bern, Switzerland 🇨🇭",
    },
    {
      title: "Reviewer Certificate – Complex & Intelligent Systems",
      originalAssetName: "springer-reviewer2025.png",
      link: "https://link.springer.com/journal/40747",
      issuedBy: "Springer Nature",
      location: "Global Academic Review 🌍",
    },
    {
      title: "Excellent Paper Award – AUA Postgraduate Forum",
      originalAssetName: "aua-paper2025.png",
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua SIGS / Asian Universities Alliance",
      location: "Shenzhen, China 🇨🇳",
    },
    {
      title: "Excellent Poster Award – AUA Postgraduate Forum",
      originalAssetName: "aua-poster2025.png",
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua SIGS / Asian Universities Alliance",
      location: "Shenzhen, China 🇨🇳",
    },
    {
      title: "National AI Application Innovation Competition – Second Prize",
      originalAssetName: "aiinnovation2025.png",
      link: "https://www.baidu.com/",
      issuedBy: "China Society of Technology Economics",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Presenter – ICCV 2025 Research Paper",
  originalAssetName: "iccv2025.png",
  link: "https://iccv.thecvf.com/",
  issuedBy: "IEEE/CVF International Conference on Computer Vision (ICCV 2025)",
  location: "Honolulu, Hawaii, USA 🇺🇸",
},
    {
      title: "AI Photonics Summer School Completion Certificate",
      originalAssetName: "ai-photonics2025.png",
      link: "https://biss.buaa.edu.cn/",
      issuedBy: "Beihang International Summer School",
      location: "Hangzhou, China 🇨🇳",
    },
    {
      title: "Empowering Electronic Information with Digital Intelligence",
      originalAssetName: "electronic-info-forum2025.png",
      link: "https://www.buaa.edu.cn/",
      issuedBy: "School of Electronic Information Engineering, Beihang University",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "Excellent International Graduate 2025",
      originalAssetName: "internationalgraduate2025.png",
      link: "https://ev.buaa.edu.cn/",
      issuedBy: "Beihang University",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Participant – ECIR 2025",
  originalAssetName: "ecir2025.png",
  link: "https://ecir2025.eu/",
  issuedBy: "47th European Conference on Information Retrieval",
  location: "Lucca, Italy 🇮🇹",
},
    {
      title: "Chinese Government Scholarship – PhD",
      originalAssetName: "cscphd2025.png",
      link: "https://www.campuschina.org/",
      issuedBy: "Chinese Government Scholarship",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Department Head of Academic & Innovation – PGSU",
  originalAssetName: "pgsu-head2025.png",
  link: "https://is.buaa.edu.cn/",
  issuedBy: "International School, Beihang University",
  location: "Beijing, China 🇨🇳",
},
    {
  title: "4th Global Peace Summit 2025",
  originalAssetName: "globalpeace2025.png",
  link: "https://www.humanitarianaffairs.asia/",
  issuedBy: "Humanitarian Affairs Asia",
  location: "Bangkok, Thailand 🇹🇭",
},
  ],

  2024: [
    {
  title: "Presentation Certificate – CSEE&T 2024",
  originalAssetName: "cseet2024.png",
  link: "https://conf.researchr.org/home/cseet-2024",
  issuedBy: "36th IEEE International Conference on Software Engineering Education and Training",
  location: "Würzburg, Germany 🇩🇪",
},
    {
      title: "First Prize – Excellent Study",
      originalAssetName: "foreignstudent2024.png",
      link: "https://mp.weixin.qq.com/s/4r20vM7lkoOD4Oeaz2z79w",
      issuedBy: "Beihang University Foreign Students Scholarship",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "First Prize – Outstanding Behavior",
      originalAssetName: "foreignstudent2024.png",
      link: "https://mp.weixin.qq.com/s/4r20vM7lkoOD4Oeaz2z79w",
      issuedBy: "Beihang University Foreign Students Scholarship",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "National Innovation Competition – Second Prize",
      originalAssetName: "innovation2024.png",
      link: "https://mp.weixin.qq.com/s/BCkFELXLxtA6as1DB_tmBw",
      issuedBy: "National College Student Innovation and Invention Competition",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "Best Researcher Award",
      originalAssetName: "bestresearcher2024.png",
      link: "https://worldscienceawards.com/chandan-kumar-sah-computer-science-best-researcher-award-13440/",
      issuedBy: "ScienceFather",
      location: "Global Research Community 🌍",
    },
    {
  title: "Journal Publication Certificate – IJISRT",
  originalAssetName: "ijisrt2024.png",
  link: "https://ijisrt.com/",
  issuedBy: "International Journal of Innovative Science and Research Technology",
  location: "Rajasthan, India 🇮🇳",
},
    {
      title: "1st Prize – IS Academic Forum for Outstanding International Students",
      originalAssetName: "isforum2024.png",
      link: "https://mp.weixin.qq.com/s/YsV-IkwAHGJ4LvGc14rUvg",
      issuedBy: "University of Science and Technology Beijing",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "Best Oral Presentation Award – Terahertz Summer School",
      originalAssetName: "terahertz2024.png",
      link: "https://www.buaa.edu.cn/",
      issuedBy: "1st International Terahertz Summer School",
      location: "Hangzhou, China 🇨🇳",
    },
    {
      title: "Excellent Poster Award",
      originalAssetName: "poster2024.png",
      link: "https://www.buaa.edu.cn/",
      issuedBy: "International Aerospace Academic Seminar, Beihang University",
      location: "Hangzhou, China 🇨🇳",
    },
    {
      title: "Champion – 1st Robot Competition for International Students in Beijing",
      originalAssetName: "robot2024.png",
      link: "https://news.buaa.edu.cn/info/1002/62507.htm",
      issuedBy: "China University Robotics Committee",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "Winner – St. Gallen Symposium Global Essay Competition",
      originalAssetName: "stgallenwinner2024.png",
      link: "https://symposium.org/",
      issuedBy: "St. Gallen Symposium",
      location: "St. Gallen, Switzerland 🇨🇭",
    },
    {
      title: "Leader of Tomorrow – 53rd St. Gallen Symposium",
      originalAssetName: "leaderoftomorrow2024.png",
      link: "https://symposium.org/community/young-community/53-sgs-lot/",
      issuedBy: "St. Gallen Symposium",
      location: "St. Gallen, Switzerland 🇨🇭",
    },
    {
      title: "Innovative Development Award",
      originalAssetName: "innovationaward2024.png",
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua University",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "Distinguished Speaker – World Green Science Day",
      originalAssetName: "wgsd2024.png",
      link: "https://journalasc.org/2024/12/10/wgsd2024/",
      issuedBy: "World Green Science Day",
      location: "Global Online 🌍",
    },
    {
  title: "Speaker – Academic Symposium PGSU 2024",
  originalAssetName: "pgsu-speaker2024.png",
  link: "https://is.buaa.edu.cn/",
  issuedBy: "International School, Beihang University",
  location: "Beijing, China 🇨🇳",
},
    {
  title: "Department Head of Academic & Innovation – PGSU",
  originalAssetName: "pgsu-head2024.png",
  link: "https://is.buaa.edu.cn/",
  issuedBy: "International School, Beihang University",
  location: "Beijing, China 🇨🇳",
},
  ],

  "2023–2018": [
    {
      title: "AI Teacher Training Seminar – Peking University",
      originalAssetName: "pkuai2023.png",
      link: "https://www.pku.edu.cn/",
      issuedBy: "Peking University / Ministry of Education",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Department Head of Academic & Innovation – PGSU",
  originalAssetName: "pgsu-head2023.png",
  link: "https://is.buaa.edu.cn/",
  issuedBy: "International School, Beihang University",
  location: "Beijing, China 🇨🇳",
},
    {
      title: "Best Delegate – XI Model SCO",
      originalAssetName: "sco2023.png",
      link: "https://mp.weixin.qq.com/s/G-6LVI4xpmf5qjrSHi3rww",
      issuedBy: "Embassy of Kazakhstan / SCO Secretariat",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Participant – World Chinese Conference",
  originalAssetName: "worldchinese2023.png",
  link: "https://www.chinese.cn/",
  issuedBy: "World Chinese Conference",
  location: "Beijing, China 🇨🇳",
},
    {
  title: "Delegate – National Engineering Pedagogy Alliance Seminar",
  originalAssetName: "pedagogy2023.png",
  link: "https://www.tsinghua.edu.cn/",
  issuedBy: "Tsinghua University",
  location: "Beijing, China 🇨🇳",
},
    {
  title: "Speaker & Participant – SABRI 5th Anniversary",
  originalAssetName: "sabri2023.png",
  link: "https://www.tsinghua.edu.cn/",
  issuedBy: "Student Association of Belt and Road Initiative (SABRI), Tsinghua University",
  location: "Beijing, China 🇨🇳",
},
    {
      title: "Top Innovator – Huawei Global Impact Sprint",
      originalAssetName: "huawei2023.png",
      link: "https://mp.weixin.qq.com/s/L7-qBAcIOlmapQNPBc3gLQ",
      issuedBy: "Huawei Global Impact Sprint",
      location: "Global Innovation Challenge 🌍",
    },
    {
      title: "Innovator Award – SDG Open Hackathon",
      originalAssetName: "sdg2023.png",
      link: "https://www.tsinghua.edu.cn/en/",
      issuedBy: "Tsinghua University",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Delegate – Big Data & AI Software Symposium (BDAISS 2023)",
  originalAssetName: "bdaiss2023.png",
  link: "https://www.tsinghua.edu.cn/",
  issuedBy: "School of Software, Tsinghua University",
  location: "Beijing, China 🇨🇳",
},
    {
      title: "Chinese Government Scholarship – Master's",
      originalAssetName: "csc2022.png",
      link: "https://www.campuschina.org/",
      issuedBy: "China Scholarship Council",
      location: "Beijing, China 🇨🇳",
    },
    {
  title: "Participant – Greening the Shipping Industry in Technology",
  originalAssetName: "shipping2023.png",
  link: "https://www.tsinghua.edu.cn/",
  issuedBy: "School of Environment, Tsinghua University",
  location: "Beijing, China 🇨🇳",
},
    {
  title: "Delegate – China International Supply Chain Expo",
  originalAssetName: "supplychain2023.png",
  link: "https://en.cisce.org.cn/",
  issuedBy: "Global Chain Innovation & Development Forum",
  location: "Beijing, China 🇨🇳",
},
    {
  title: "Participant – China–Southeast Asian Symposium Towards Ecological Civilization",
  originalAssetName: "ecological2023.png",
  link: "https://english.bnu.edu.cn/",
  issuedBy: "Beijing Normal University",
  location: "Beijing, China 🇨🇳",
},
    {
      title: "Delegate – Yenching Global Symposium",
      originalAssetName: "yenching2024.png",
      link: "https://www.pku.edu.cn/",
      issuedBy: "Peking University",
      location: "Beijing, China 🇨🇳",
    },
    {
      title: "Officially Licensed Software Engineer",
      originalAssetName: "nec2022.png",
      link: "https://nec.gov.np/",
      issuedBy: "Nepal Engineering Council",
      location: "Kathmandu, Nepal 🇳🇵",
    },
    {
      title: "Critical Thinking in English Language Teaching",
      originalAssetName: "relo2021.png",
      link: "https://regionalenglishlanguagenetwork.org/",
      issuedBy: "Regional English Language Office",
      location: "South Asia Regional Program 🌏",
    },
    {
      title: "Full Belt and Road Scholarship – Bachelor",
      originalAssetName: "beltroad2018.png",
      link: "https://www.scu.edu.cn/",
      issuedBy: "China Government / Sichuan University",
      location: "Chengdu, China 🇨🇳",
    },
  ],
};


export const awardCategories: AwardCategory[] = [
  "Prizes & distinctions",
  "Scholarships & fellowships",
  "Academic service & presentations",
  "Participation & certificates",
];

export const awardsArchive: AwardRecord[] = awardYears.flatMap(yearGroup =>
  legacyAwardsByYear[yearGroup].map(item => ({
    ...item,
    yearGroup,
    category: awardCategory(item.title),
    provenance: "Original website archive" as const,
  }))
);

/** Original source grouped some entries under a broad 2018–2023 period;
 * keep that grouping rather than inventing precise dates.
 */
export const awardCountByYear: Record<AwardYear, number> = {
  "2026": legacyAwardsByYear["2026"].length,
  "2025": legacyAwardsByYear["2025"].length,
  "2024": legacyAwardsByYear["2024"].length,
  "2023–2018": legacyAwardsByYear["2023–2018"].length,
};
