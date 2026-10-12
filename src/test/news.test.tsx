import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NewsPage, NewsPreview } from "@/components/NewsComponents";
import { newsItems, newsMonthKey, newsYears } from "@/data/news";

describe("restored historical news", () => {
  it("preserves all 10 original news stories plus one CCS 2026 announcement", () => {
    expect(newsItems).toHaveLength(11);
    expect(newsItems.filter(item => item.provenance === "Original site archive")).toHaveLength(10);
    expect(newsItems.filter(item => item.provenance === "Author-reported 2026 update")).toHaveLength(1);
    expect(newsItems[0].title).toContain("Auditable Uncertainty Control for Secure LLM Agents");
    expect(newsItems[0].article).toMatch(/sole-authored/i);
    expect(newsItems[0].dateDetail).toMatch(/not independently verified/i);
    expect(newsItems[0].link).toBe("https://www.sigsac.org/ccs/CCS2026/");
  });

  it("preserves all original dates, source links, long-form articles and original video", () => {
    expect(newsItems.slice(1).every(item => item.article.length > 150)).toBe(true);
    expect(newsItems.slice(1).every(item => Boolean(item.link || item.links?.length))).toBe(true);
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
    expect(screen.getAllByRole("article")).toHaveLength(11);
    expect(screen.getByText(/My sole-authored paper has been accepted/i)).toBeInTheDocument();
    expect(screen.getAllByText("Read full story")).toHaveLength(11);
    fireEvent.click(screen.getByRole("button", { name: "2025" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.queryByText(/My sole-authored paper has been accepted/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "All years" }));
    expect(screen.getAllByRole("article")).toHaveLength(11);
  });

  it("shows the three newest announcements on the homepage, with full archive link", () => {
    render(<MemoryRouter><NewsPreview /></MemoryRouter>);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "News & announcements" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /All news & archive/ })).toHaveAttribute("href", "/news");
  });
});
