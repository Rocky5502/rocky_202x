import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AwardsInvitation, AwardsPage } from "@/components/AwardsComponents";
import { awardCountByYear, awardsArchive, awardYears, awardCategory } from "@/data/awards";
import PortfolioSite from "@/components/PortfolioSite";

describe("historical awards restoration", () => {
  it("preserves all 62 original records without silently discarding participation or training", () => {
    expect(awardsArchive).toHaveLength(62);
    expect(awardYears).toEqual(["2026", "2025", "2024", "2023–2018"]);
    expect(Object.values(awardCountByYear).reduce((a,b) => a+b, 0)).toBe(62);
    expect(awardsArchive.every(a => a.provenance === "Original website archive")).toBe(true);
    expect(awardsArchive.every(a => /^https:\/\//.test(a.link))).toBe(true);
    expect(awardsArchive.every(a => a.originalAssetName.endsWith(".png"))).toBe(true);
    expect(awardsArchive.some(a => a.title === "Outstanding Reviewer Award – ECIR 2026")).toBe(true);
    expect(awardsArchive.some(a => a.title === "Chinese Government Scholarship – PhD")).toBe(true);
    expect(awardsArchive.some(a => a.title === "Champion – 1st Robot Competition for International Students in Beijing")).toBe(true);
    expect(awardsArchive.some(a => a.title === "Full Belt and Road Scholarship – Bachelor")).toBe(true);
  });

  it("does not portray attendance certificates as competitive awards", () => {
    expect(awardCategory("Participant – ECIR 2025")).toBe("Participation & certificates");
    expect(awardCategory("ACM Europe School on Recommender Systems 2025")).toBe("Participation & certificates");
    expect(awardCategory("First Prize – Excellent Study")).toBe("Prizes & distinctions");
    expect(awardCategory("Certificate of Fellowship – 18th APNG Camp")).toBe("Scholarships & fellowships");
  });

  it("shows only a small gateway on Recognition, never the complete 62-item awards wall", () => {
    render(<MemoryRouter initialEntries={["/recognition"]}><PortfolioSite/></MemoryRouter>);
    expect(screen.getByRole("link", { name: "Explore the Awards & Appreciation archive" })).toHaveAttribute("href", "/awards");
    expect(screen.queryByText("ICSE 2026 Student Mentoring Workshop (SMeW)")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Selected talks" })).toBeInTheDocument();
  });

  it("renders the full archive only on /awards, with original categories and metadata", () => {
    render(<MemoryRouter><AwardsPage /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Awards & Appreciation" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(62);
    expect(screen.getByText("62 records shown")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Awards breadcrumb" })).toBeInTheDocument();
  });

  it("filters awards by year, category and keyword, then clears empty searches", () => {
    render(<MemoryRouter><AwardsPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: /2026/ }));
    expect(screen.getAllByRole("article")).toHaveLength(awardCountByYear["2026"]);
    fireEvent.change(screen.getByRole("combobox", { name: "Filter archive by category" }),
      { target: { value: "Scholarships & fellowships" } });
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
    fireEvent.change(screen.getByRole("searchbox", { name: "Search archived awards" }),
      { target: { value: "never-a-real-title-zzz" } });
    expect(screen.getByRole("heading", { name: "No records match these filters." })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Clear all filters/ }));
    expect(screen.getAllByRole("article")).toHaveLength(62);
  });

  it("does not use broken historical certificate images or invented replacements", () => {
    render(<MemoryRouter><AwardsInvitation/></MemoryRouter>);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
