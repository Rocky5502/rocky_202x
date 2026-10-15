import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { essayPrefix, publishedOn, researchEssays } from "@/data/researchEssays";
import { essayThumbSprite } from "@/assets/essayThumbSprite";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });
beforeEach(() => {
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({}, "", "/rocky_202x/");
  document.documentElement.lang = "en";
});

describe("six-image research essays collection", () => {
  it("has six independent longform essays, distinct dates and no fake historical publication", () => {
    expect(researchEssays).toHaveLength(6);
    expect(new Set(researchEssays.map(e => e.slug)).size).toBe(6);
    expect(new Set(researchEssays.map(e => e.thumbnail)).size).toBe(6);
    expect(researchEssays.map(e=>e.retrospective)).toEqual([
      "October 2026", "January 2025", "May 2025", "September 2025", "January 2026", "June 2026",
    ]);
    expect(publishedOn).toBe("2026-10-15");
    for (const essay of researchEssays) {
      expect(essay.opening.length).toBeGreaterThan(240);
      expect(essay.sections.length).toBeGreaterThanOrEqual(5);
      expect(essay.closing.length).toBeGreaterThan(100);
      expect(essay.zh.sections.length).toBe(essay.sections.length);
    }
    expect(essayThumbSprite.startsWith("data:image/webp;base64,UklG")).toBe(true);
    expect(essayThumbSprite.length).toBeGreaterThan(5000);
  });

  it("keeps the prior two Notes while adding six visible linked articles", () => {
    render(<MemoryRouter initialEntries={["/notes"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading",{name:"Notes from the Unknown",level:1})).toBeInTheDocument();
    expect(document.querySelectorAll(".essay-series-card")).toHaveLength(6);
    expect(document.querySelectorAll(".essay-series-card .essay-thumb")).toHaveLength(6);
    for (const essay of researchEssays) {
      expect(screen.getAllByRole("link",{name:essay.title}).some(link=>link.getAttribute("href")===essayPrefix+essay.slug)).toBe(true);
    }
    expect(screen.getAllByRole("link",{name:"In Love with the Unknown"}).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link",{name:"Are We Asking the Right Questions?"}).length).toBeGreaterThan(0);
    expect(screen.getByText(/every essay was written and published on October 15, 2026/)).toBeInTheDocument();
  });

  it("renders each essay with a meaningful H1, actual publication date, and source links where needed", () => {
    for (const essay of researchEssays) {
      const {unmount}=render(<MemoryRouter initialEntries={[essayPrefix+essay.slug]}><PortfolioSite/></MemoryRouter>);
      expect(screen.getByRole("heading",{name:essay.title,level:1})).toBeInTheDocument();
      expect(screen.getByText("Published October 15, 2026")).toBeInTheDocument();
      expect(screen.getByText("Retrospective theme: "+essay.retrospective)).toBeInTheDocument();
      expect(document.querySelectorAll(".essay-reader-chapter")).toHaveLength(essay.sections.length);
      expect(screen.getByText(/thematic date does not imply earlier publication/)).toBeInTheDocument();
      expect(document.title).toContain("Chandan Kumar Sah");
      if (essay.references) expect(document.querySelectorAll(".essay-reader-references li")).toHaveLength(essay.references.length);
      unmount();
    }
  });

  it("supports Chinese text in the full article while preserving dates", () => {
    const essay=researchEssays[0];
    render(<MemoryRouter initialEntries={[essayPrefix+essay.slug]}><PortfolioSite /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button",{name:"Switch website to Simplified Chinese"}));
    expect(screen.getByRole("heading",{name:essay.zh.title,level:1})).toBeInTheDocument();
    expect(screen.getByText("发表于2026年10月15日")).toBeInTheDocument();
    expect(screen.getByText("回望："+essay.zh.retrospective)).toBeInTheDocument();
    expect(document.querySelectorAll(".essay-reader-chapter")).toHaveLength(essay.zh.sections.length);
  });
});
