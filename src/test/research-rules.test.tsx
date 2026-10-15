import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { researchRulesPath } from "@/components/ResearchRulesArticle";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

beforeEach(() => {
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({}, "", "/rocky_202x/");
  document.documentElement.lang = "en";
});

describe("Research manifesto – 15 October 2026", () => {
  it("publishes ten complete illustrated rules on a shareable route", () => {
    render(<MemoryRouter initialEntries={[researchRulesPath]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "In Love with the Unknown", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("My 10 Rules for PhD Research in the Age of AI")).toBeInTheDocument();
    expect(screen.getByText("October 15, 2026")).toBeInTheDocument();
    expect(screen.getByText("Beijing, China")).toBeInTheDocument();
    expect(screen.getByText(/I love uncertainty. It makes me excited about my future./)).toBeInTheDocument();
    expect(document.querySelectorAll(".manifesto-rule")).toHaveLength(10);
    expect(document.querySelectorAll(".manifesto-illustration svg")).toHaveLength(10);
    expect(screen.getByRole("heading", { name: "Chase discovery, never just a logo" })).toBeInTheDocument();
    expect(screen.getByText(/assisted with structure, wording, and grammar/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Portrait of Chandan Kumar Sah" })).toHaveAttribute("src");
    expect(document.title).toContain("In Love with the Unknown");
  });

  it("exposes the article through both homepage and primary navigation", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(within(nav).getByRole("link", { name: "Notes" })).toHaveAttribute("href","/notes");
    expect(screen.getByRole("link", { name: "Explore the essays" })).toHaveAttribute("href","/notes");
  });

  it("supports the existing Simplified Chinese language switch", () => {
    render(<MemoryRouter initialEntries={[researchRulesPath]}><PortfolioSite /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    expect(screen.getByRole("heading", { name: "热爱未知", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("2026年10月15日")).toBeInTheDocument();
    expect(screen.getByText("中国·北京")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "追求发现，而不是期刊标志" })).toBeInTheDocument();
    expect(document.querySelectorAll(".manifesto-rule")).toHaveLength(10);
  });
});
