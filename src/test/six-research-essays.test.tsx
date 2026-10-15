import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { essayPrefix, publishedOn, researchEssays } from "@/data/researchEssays";
import { essayCovers } from "@/assets/essayCovers";
import { notesCatalog, getAdjacentNotes } from "@/data/notesCatalog";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });
beforeEach(() => {
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({}, "", "/rocky_202x/");
  document.documentElement.lang = "en";
});

describe("Unified newest-first research notes", () => {
  it("uses one eight-article archive ordered by the period discussed, not invented publication dates", () => {
    expect(notesCatalog).toHaveLength(8);
    expect(notesCatalog.map(item=>item.path)).toEqual([
      essayPrefix+"when-ai-says-i-know",
      "/notes/ten-rules-phd-research-ai",
      essayPrefix+"dear-younger-me-success-is-not-what-you-think",
      "/notes/are-we-asking-the-right-questions",
      essayPrefix+"why-i-choose-to-study-uncertainty",
      essayPrefix+"what-does-it-mean-to-be-a-scientist-in-the-age-of-ai",
      essayPrefix+"the-experiments-that-failed",
      essayPrefix+"the-boy-from-nepal-who-refused-to-stop-dreaming",
    ]);
    expect(new Set(notesCatalog.map(item=>item.path)).size).toBe(8);
    expect(researchEssays).toHaveLength(6);
    expect(publishedOn).toBe("2026-10-15");
    for (const e of researchEssays) {
      expect(e.sections.length).toBeGreaterThanOrEqual(5);
      expect(e.zh.sections.length).toBe(e.sections.length);
    }
  });

  it("uses six independent full-HD, vector-scalable editorial covers", () => {
    expect(essayCovers).toHaveLength(6);
    expect(new Set(essayCovers).size).toBe(6);
    for (const src of essayCovers) expect(src.includes(".svg") || src.startsWith("data:image/svg+xml")).toBe(true);
    render(<MemoryRouter initialEntries={[essayPrefix+"when-ai-says-i-know"]}><PortfolioSite /></MemoryRouter>);
    const image=document.querySelector(".essay-reader-figure img");
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("width","1920");
    expect(image).toHaveAttribute("height","1080");
    expect(image).toHaveAttribute("src",essayCovers[0]);
  });

  it("shows exactly eight matching archive cards, with no six-essay preamble or split-off section", () => {
    render(<MemoryRouter initialEntries={["/notes"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading",{name:"Notes from the Unknown",level:1})).toBeInTheDocument();
    const cards=Array.from(document.querySelectorAll(".notes-unified-card"));
    expect(cards).toHaveLength(8);
    expect(document.querySelectorAll(".notes-unified-grid > article")).toHaveLength(8);
    expect(document.querySelectorAll(".essay-series-head")).toHaveLength(0);
    expect(document.querySelectorAll(".notes-index-prior-heading")).toHaveLength(0);
    expect(document.body.textContent).not.toContain("Six essays · Science and a life of curiosity");
    expect(document.body.textContent).not.toContain("every essay was written and published");
    expect(cards.map(card=>card.querySelector("h2 a")?.getAttribute("href"))).toEqual(notesCatalog.map(item=>item.path));
    expect(cards.every(card=>Boolean(card.querySelector(".notes-unified-visual img")))).toBe(true);
  });

  it("keeps all six published essay pages but removes their repeated editorial note", () => {
    for(const essay of researchEssays) {
      const {unmount}=render(<MemoryRouter initialEntries={[essayPrefix+essay.slug]}><PortfolioSite /></MemoryRouter>);
      expect(screen.getByRole("heading",{name:essay.title,level:1})).toBeInTheDocument();
      expect(screen.getByText("Published October 15, 2026")).toBeInTheDocument();
      expect(document.querySelectorAll(".essay-reader-chapter")).toHaveLength(essay.sections.length);
      expect(document.body.textContent).not.toContain("Editorial note:");
      expect(document.querySelectorAll(".essay-reader-figure img")).toHaveLength(1);
      expect(screen.getByRole("navigation",{name:"Article chronology"})).toBeInTheDocument();
      unmount();
    }
  });

  it("provides correct newer/older links for old and new essays without wrapping", () => {
    expect(getAdjacentNotes(notesCatalog[0].path).newer).toBeUndefined();
    expect(getAdjacentNotes(notesCatalog[0].path).older?.path).toBe(notesCatalog[1].path);
    expect(getAdjacentNotes(notesCatalog[3].path).newer?.path).toBe(notesCatalog[2].path);
    expect(getAdjacentNotes(notesCatalog[3].path).older?.path).toBe(notesCatalog[4].path);
    expect(getAdjacentNotes(notesCatalog[7].path).older).toBeUndefined();
  });

  it("renders newest and oldest essays in Chinese", () => {
    render(<MemoryRouter initialEntries={["/notes"]}><PortfolioSite /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button",{name:"Switch website to Simplified Chinese"}));
    expect(screen.getByRole("heading",{name:"关于未知的笔记",level:1})).toBeInTheDocument();
    expect(document.querySelectorAll(".notes-unified-card")).toHaveLength(8);
    expect(screen.getAllByRole("link",{name:"当 AI 说“我知道”，我们应该相信吗？"}).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link",{name:"那个不愿停止梦想的尼泊尔男孩"}).length).toBeGreaterThan(0);
  });
});
