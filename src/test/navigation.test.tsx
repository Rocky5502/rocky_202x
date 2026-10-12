import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { researchAreas } from "@/data/portfolio";
import App from "@/App";
import PortfolioSite from "@/components/PortfolioSite";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

describe("research agenda", () => {
  it("covers six distinct research directions including SE for AI and trustworthy AI", () => {
    expect(researchAreas).toHaveLength(6);
    expect(new Set(researchAreas.map(area => area.name)).size).toBe(6);
    expect(researchAreas.some(area => area.name === "Software engineering for AI")).toBe(true);
    expect(researchAreas.some(area => area.name === "Trustworthy AI & agent safety")).toBe(true);
    expect(researchAreas.find(area => area.name === "AI for software engineering")).toBeDefined();
  });

  it("renders all six homepage areas, not just the first three", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: /Six connected research directions/ })).toBeInTheDocument();
    const headings = researchAreas.map(area => screen.getByRole("heading", { name: area.name }));
    expect(headings).toHaveLength(6);
    expect(screen.getByRole("link", { name: /Opportunities & support/ })).toBeInTheDocument();
  });
});

describe("GitHub Pages routes", () => {
  it("renders the actual #/connect address without a 404", () => {
    window.history.replaceState({}, "", "/rocky_202x/#/connect");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Opportunities & support" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /PayPal support email address/ })).toHaveValue("sahchandan98@gmail.com");
    expect(screen.queryByRole("heading", { name: "Page not found" })).not.toBeInTheDocument();
  });

  it("recovers the older /opportunities route", async () => {
    render(<MemoryRouter initialEntries={["/opportunities"]}><PortfolioSite /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "Opportunities & support" })).toBeInTheDocument();
  });

  it("recovers /contact, /support and /research-areas aliases", async () => {
    for (const [path, expected] of [
      ["/contact", "Opportunities & support"],
      ["/support", "Opportunities & support"],
      ["/research-areas", "Research & projects"],
    ] as const) {
      const { unmount } = render(<MemoryRouter initialEntries={[path]}><PortfolioSite /></MemoryRouter>);
      expect(await screen.findByRole("heading", { name: expected })).toBeInTheDocument();
      unmount();
    }
  });

  it("replaces the dead-end 404 with working navigation to live sections", () => {
    render(<MemoryRouter initialEntries={["/unknown-page"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Let's get you to the right page" })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Alternative pages" });
    expect(within(nav).getByRole("link", { name: "Opportunities" })).toHaveAttribute("href", "/connect");
    expect(within(nav).getByRole("link", { name: "Research" })).toHaveAttribute("href", "/research");
  });
});
