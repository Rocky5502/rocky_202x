import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { education, programmingLanguages, researchSkills, spokenLanguages } from "@/data/cv";

describe("curated academic web CV", () => {
  it("restores the three original education records without unverified graduation dates", () => {
    expect(education).toHaveLength(3);
    expect(education.map(e => e.institution)).toEqual(["Beihang University", "Beihang University", "Sichuan University"]);
    expect(education[0].period).toBe("2025–present");
    expect(education.slice(1).every(e => e.period === "Previous degree")).toBe(true);
    expect(education.slice(1).every(e => e.sourceNote.includes("not been verified as a graduation date"))).toBe(true);
  });

  it("displays exactly ten diverse research competencies with real public GitHub evidence URLs", () => {
    expect(researchSkills).toHaveLength(10);
    expect(new Set(researchSkills.map(s => s.name)).size).toBe(10);
    expect(new Set(researchSkills.map(s => s.id)).size).toBe(10);
    expect(researchSkills.every(s => s.evidenceRepo && s.evidence.length && s.methods.length >= 3)).toBe(true);
    expect(researchSkills.find(s => s.name === "Open-weight LLM ecosystems")?.methods).toContain("Llama (configured)");
    expect(researchSkills.find(s => s.name === "GPU experiment engineering")?.evidenceType).toBe("Public research plan / tooling");
  });

  it("lists all researcher-described programming and communication languages without fake skill scores", () => {
    expect(programmingLanguages.map(x => x.name)).toEqual(["Python","TypeScript","Java","C++","C","R"]);
    expect(spokenLanguages).toEqual(["Nepali","English","Chinese","Hindi","Urdu","French"]);
    expect(programmingLanguages.find(x => x.name === "R")?.basis).toBe("Researcher-listed");
  });

  it("renders CV and Skills as an independent route accessible from the top navigation", () => {
    render(<MemoryRouter initialEntries={["/cv"]}><PortfolioSite/></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "CV & Skills" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "10 research & engineering competencies" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Programming languages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Languages" })).toBeInTheDocument();
    expect(screen.getByText("Sichuan University")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.getAllByRole("article").length).toBeGreaterThanOrEqual(13);
    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(within(nav).getByRole("link", { name: "CV & Skills" })).toHaveAttribute("href", "/cv");
    const links = within(nav).getAllByRole("link").map(node => node.textContent);
    expect(links.indexOf("CV & Skills")).toBeLessThan(links.indexOf("News"));
    expect(links.indexOf("News")).toBeLessThan(links.indexOf("Opportunities"));
  });

  it("redirects older skill and resume links to the academic CV", async () => {
    render(<MemoryRouter initialEntries={["/skills"]}><PortfolioSite/></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "CV & Skills" })).toBeInTheDocument();
  });
});
