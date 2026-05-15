import { useState } from "react";
import { ExternalLink } from "lucide-react";

const awardsData = {
  2026: [
    {
      title: "Future AI Research Excellence",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "GitHub",
    },
  ],

  2025: [
    {
      title: "ASE 2025",
      image:
        "image: "/awards/ase2025.png",
      link: "https://conf.researchr.org/profile/ase-2025/chandankumarsah",
      source: "ASE 2025",
    },

    {
      title: "AIware 2025 Research Contributor",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
      link: "https://2025.aiwareconf.org/profile/chandankumarsah",
      source: "AIware",
    },
  ],

  2024: [
    {
      title: "Terahertz Summer School Presenter",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "Beihang University",
    },

    {
      title: "International Student Ambassador",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "Beihang University",
    },
  ],

  2023: [
    {
      title: "AI Research & Innovation Activities",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "Research",
    },
  ],

  2022: [
    {
      title: "Graduate Research Journey Begins",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "Academic",
    },
  ],

  2021: [
    {
      title: "Software Engineering Academic Milestone",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "University",
    },
  ],

  2020: [
    {
      title: "Beginning the Rocky Planet Journey",
      image:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
      link: "https://github.com/Rocky5502",
      source: "Rocky Planet",
    },
  ],
};

const years = Object.keys(awardsData).sort((a, b) => Number(b) - Number(a));

const AwardsGalaxy = () => {
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <section
      id="awards"
      className="relative py-24 px-6 bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050816] to-black opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold mb-4">
            🌌 Welcome to Rocky’s Planet
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A galaxy of awards, certificates, milestones, research journeys,
            and academic adventures across time.
          </p>
        </div>

        {/* YEAR SELECTOR */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedYear === year
                  ? "bg-cyan-400 text-black border-cyan-300 scale-110"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* AWARDS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awardsData[selectedYear as keyof typeof awardsData].map(
            (award, index) => (
              <a
                key={index}
                href={award.link}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:scale-[1.03] transition-all duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">
                      {award.title}
                    </h3>

                    <ExternalLink size={18} />
                  </div>

                  <p className="text-cyan-300 text-sm">
                    Source: {award.source}
                  </p>
                </div>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AwardsGalaxy;
