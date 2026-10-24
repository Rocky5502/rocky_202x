import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NewsPage, NewsPreview } from "@/components/NewsComponents";
import { newsItems, newsMonthKey, newsYears } from "@/data/news";

describe("restored historical news", () => {
  it("preserves ten historical stories plus CCS and a photographed Beihang spotlight", () => {
    expect(newsItems).toHaveLength(12);
    expect(newsItems.filter(item => item.provenance === "Original site archive")).toHaveLength(10);
    expect(newsItems.filter(item => item.provenance === "Author-reported 2026 update")).toHaveLength(1);
    expect(newsItems.filter(item => item.provenance === "Photograph supplied by researcher")).toHaveLength(1);
    expect(newsItems[0].title).toContain("Beihang");
    expect(newsItems[0].image?.filename).toBe("beihang-ai-explorer-oct-2026.webp");
    expect(newsItems[0].article).toContain("人工智能探索者的成长之路");
    expect(newsItems[0].dateDetail).toBeUndefined();
    expect(newsItems[0].image?.caption).toBe("Beihang University campus display · October 2026");
    const ccs = newsItems.find(item => item.tag === "Research acceptance")!;
    expect(ccs.article).toMatch(/sole-authored/i);
    expect(ccs.dateDetail).toMatch(/not independently verified/i);
    expect(ccs.link).toBe("https://www.sigsac.org/ccs/CCS2026/");
  });

  it("preserves all original dates, source links, long-form articles and original video", () => {
    expect(newsItems.slice(1).every(item => item.article.length > 150)).toBe(true);
    expect(newsItems.filter(item => item.provenance === "Original site archive").every(item => Boolean(item.link || item.links?.length))).toBe(true);
    expect(newsItems.find(item => item.title.includes("Featured as a CSC Alumni Story"))?.date).toBe("May 2026");
    expect(newsItems.find(item => item.title.includes("Outstanding Reviewer Award ECIR 2026"))?.date).toBe("April 2026");
    expect(newsItems.find(item => item.title.includes("Global Peace Summit 2025"))?.video).toBe("https://www.youtube.com/watch?v=Jx1RHekcpkk");
    expect(newsItems.find(item => item.tag === "Scholarship Ceremony")?.date).toBe("Dec 2024");
    expect(newsYears).toEqual(["2026", "2025", "2024"]);
  });

  it("normalizes different original month spellings without inventing day-level dates", () => {
    expect(newsMonthKey("April 2026")).toBe("2026-04");
    expect(newsMonthKey("Apr 2026")).toBe("2026-04");
    expect(newsMonthKey("Oct 2026")).toBe("2026-10");
    expect(newsMonthKey("Mar 2024")).toBe("2024-03");
    expect(newsItems.map(item => newsMonthKey(item.date))).toEqual(
      [...newsItems.map(item => newsMonthKey(item.date))].sort().reverse()
    );
  });

  it("renders all dated entries and filters the original archive by year", () => {
    render(<MemoryRouter><NewsPage /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "News & milestones" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(screen.getByText(/My sole-authored paper has been accepted/i)).toBeInTheDocument();
    const firstEntry = document.querySelector(".news-entry");
    expect(firstEntry?.querySelector("details")).not.toHaveAttribute("open");
    expect(firstEntry?.querySelector(".news-feature-photo")).not.toBeNull();
    expect(firstEntry?.querySelector("a[aria-label='View original full-resolution Beihang exhibition photograph']")).toHaveAttribute(
      "href", "/assets/beihang-ai-explorer-oct-2026-original.jpg"
    );
    expect(screen.getAllByText("Read full story")).toHaveLength(12);
    fireEvent.click(screen.getByRole("button", { name: "2025" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.queryByText(/My sole-authored paper has been accepted/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "All years" }));
    expect(screen.getAllByRole("article")).toHaveLength(12);
  });

  it("opens the full campus story and its large photo from a shareable news deep link", () => {
    render(<MemoryRouter initialEntries={["/news?story=beihang-ai-explorer"]}><NewsPage /></MemoryRouter>);
    const first = document.querySelector(".news-entry");
    const details = first?.querySelector(".news-story-details");
    expect(details).toHaveAttribute("open");
    const photo = details?.querySelector("img");
    expect(photo).toHaveAttribute("src", "/assets/beihang-ai-explorer-oct-2026.webp");
    expect(photo).toHaveAttribute("alt", expect.stringContaining("Beihang University campus display"));
    expect(first).not.toHaveTextContent("Photograph supplied by the researcher. October 2026 is the reported feature month");
    expect(first).not.toHaveTextContent("no independent online announcement linked");
    expect(first?.querySelector(".news-feature-photo")).toHaveTextContent("Beihang University campus display · October 2026");
  });

  it("shows the three newest announcements on the homepage, with full archive link", () => {
    render(<MemoryRouter><NewsPreview /></MemoryRouter>);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "News & announcements" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /All news & archive/ })).toHaveAttribute("href", "/news");
  });
});
