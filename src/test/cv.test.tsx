import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { awardsArchive } from "@/data/awards";
import {
  education, researchSchools, additionalLearning,
  programmingLanguages, researchSkills, spokenLanguages,
} from "@/data/cv";

const renderAt = (path: string) =>
  render(<MemoryRouter initialEntries={[path]}><PortfolioSite /></MemoryRouter>);

describe("layered academic CV", () => {
  it("restores the three original education records without guessing graduation dates", () => {
    expect(education).toHaveLength(3);
    expect(education.map(e => e.institution)).toEqual(["Beihang University", "Beihang University", "Sichuan University"]);
    expect(education[0].period).toBe("2025–present");
    expect(education.slice(1).every(e => e.period === "Previous degree")).toBe(true);
    expect(education.slice(1).every(e => e.sourceNote.includes("not been verified as a graduation date"))).toBe(true);
  });

  it("recovers all four original schools and preserves their award-archive source titles", () => {
    expect(researchSchools).toHaveLength(4);
    expect(researchSchools.map(s => s.year)).toEqual([2025, 2025, 2025, 2024]);
    expect(researchSchools.filter(s => s.type === "Summer school")).toHaveLength(3);
    expect(researchSchools.filter(s => s.type === "Winter school")).toHaveLength(1);
    for (const school of researchSchools) {
      expect(awardsArchive.some(a => a.title === school.originalArchiveTitle)).toBe(true);
      expect(school.eventUrl).toMatch(/^https:\/\//);
      expect(school.context.length).toBeGreaterThan(30);
    }
    expect(additionalLearning).toHaveLength(1);
    expect(additionalLearning[0].name).toBe("AI and Digital Transformation in Government");
  });

  it("preserves ten source-linked research skills and all researcher-listed languages", () => {
    expect(researchSkills).toHaveLength(10);
    expect(new Set(researchSkills.map(s => s.name)).size).toBe(10);
    expect(new Set(researchSkills.map(s => s.id)).size).toBe(10);
    expect(researchSkills.every(s => s.evidenceRepo && s.methods.length >= 3)).toBe(true);
    expect(researchSkills.find(s => s.name === "Open-weight LLM ecosystems")?.methods).toContain("Llama (configured)");
    expect(researchSkills.find(s => s.name === "GPU experiment engineering")?.evidenceType).toBe("Public research plan / tooling");
    expect(programmingLanguages.map(x => x.name)).toEqual(["Python","TypeScript","Java","C++","C","R"]);
    expect(spokenLanguages).toEqual(["Nepali","English","Chinese","Hindi","Urdu","French"]);
  });

  it("shows only three clear entry cards on /cv, not the entire CV", () => {
    renderAt("/cv");
    expect(screen.getByRole("heading", { name: "CV & Skills" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Choose a section" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /01 \/ 03.*Education/ })).toHaveAttribute("href", "/cv/education");
    expect(screen.getByRole("link", { name: /02 \/ 03.*Research & technical skills/ })).toHaveAttribute("href", "/cv/skills");
    expect(screen.getByRole("link", { name: /03 \/ 03.*Programming & languages/ })).toHaveAttribute("href", "/cv/languages");
    expect(screen.queryByRole("heading", { name: "University degrees" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Summer & winter schools" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "10 research & engineering competencies" })).not.toBeInTheDocument();
    expect(screen.queryByText("Sichuan University")).not.toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    const order = within(nav).getAllByRole("link").map(x => x.textContent);
    expect(order.slice(-3)).toEqual(["News","Opportunities","CV"]);
  });

  it("renders degrees, schools and separate training only after clicking Education", () => {
    renderAt("/cv/education");
    expect(screen.getByRole("heading", { name: "Education", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "University degrees" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Summer & winter schools" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Other short programmes" })).toBeInTheDocument();
    expect(screen.getByText("Sichuan University")).toBeInTheDocument();
    expect(screen.getByText("International Software Engineering Winter School on Hybrid and Generative Intelligence")).toBeInTheDocument();
    expect(screen.getByText("ACM Europe School on Recommender Systems")).toBeInTheDocument();
    expect(screen.getByText("AI Photonics International Summer School")).toBeInTheDocument();
    expect(screen.getByText("International Terahertz Summer School")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(8);
    const breadcrumb = screen.getByRole("navigation", { name: "CV breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "CV & Skills" })).toHaveAttribute("href", "/cv");
    const sections = screen.getByRole("navigation", { name: "CV sections" });
    expect(within(sections).getByRole("link", { name: "Education" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("heading", { name: "10 research & engineering competencies" })).not.toBeInTheDocument();
  });

  it("keeps ten technical cards exclusive to their skills subpage", () => {
    renderAt("/cv/skills");
    expect(screen.getByRole("heading", { name: "Research & technical skills", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "10 research & engineering competencies" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(10);
    expect(screen.queryByRole("heading", { name: "University degrees" })).not.toBeInTheDocument();
    expect(screen.queryByText("Sichuan University")).not.toBeInTheDocument();
  });

  it("keeps programming and spoken languages exclusive to the languages subpage", () => {
    renderAt("/cv/languages");
    expect(screen.getByRole("heading", { name: "Programming & languages", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Programming languages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Spoken languages" })).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "University degrees" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "10 research & engineering competencies" })).not.toBeInTheDocument();
  });

  it("redirects old /skills and /education paths into their exact new inner layers", async () => {
    const initial = renderAt("/skills");
    expect(await screen.findByRole("heading", { name: "Research & technical skills", level: 1 })).toBeInTheDocument();
    initial.unmount();
    renderAt("/education");
    expect(await screen.findByRole("heading", { name: "University degrees" })).toBeInTheDocument();
  });
});
