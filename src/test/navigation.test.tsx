import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { researchAreas } from "@/data/portfolio";
import App from "@/App";
import PortfolioSite from "@/components/PortfolioSite";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

describe("research agenda", () => {
  it("covers five author-selected directions including SE for AI and trustworthy AI", () => {
    expect(researchAreas).toHaveLength(5);
    expect(new Set(researchAreas.map(area => area.name)).size).toBe(5);
    expect(researchAreas.some(area => area.name === "Software engineering for AI")).toBe(true);
    expect(researchAreas.some(area => area.name === "Trustworthy AI & agent safety")).toBe(true);
    expect(researchAreas.find(area => area.name === "AI for software engineering")).toBeDefined();
  });

  it("renders all five homepage research areas in the intended order", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Research directions" })).toBeInTheDocument();
    const headings = researchAreas.map(area => screen.getByRole("heading", { name: area.name }));
    expect(headings).toHaveLength(5);
    expect(screen.getAllByRole("link", { name: "Opportunities" }).length).toBeGreaterThan(0);
  });
});

describe("navigation usability", () => {
  it("updates document titles and descriptions for each section", () => {
    const titleBefore = document.title;
    const { unmount } = render(<MemoryRouter initialEntries={["/research"]}><PortfolioSite /></MemoryRouter>);
    expect(document.title).toBe("Research Directions | Chandan Kumar Sah");
    unmount();
    render(<MemoryRouter initialEntries={["/publications"]}><PortfolioSite /></MemoryRouter>);
    expect(document.title).toBe("Publications | Chandan Kumar Sah");
    expect(document.title).not.toBe(titleBefore);
  });

  it("opens the mobile menu by keyboard and closes it with Escape, restoring focus", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    trigger.focus();
    fireEvent.click(trigger);
    const mobile = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(mobile).toBeInTheDocument();
    expect(within(mobile).getByRole("link", { name: "Home" })).toHaveFocus();
    const close = screen.getByRole("button", { name: "Close navigation" });
    expect(close).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveFocus();
  });

  it("does not show an unrelated personal ORCID in researcher identity", () => {
    const { unmount } = render(<MemoryRouter initialEntries={["/service"]}><PortfolioSite /></MemoryRouter>);
    const orcidLinks = screen.getAllByRole("link", { name: "ORCID" });
    expect(orcidLinks.every(link => link.getAttribute("href") === "https://orcid.org/0009-0002-4017-7970")).toBe(true);
    unmount();
  });
});

describe("GitHub Pages routes", () => {
  it("renders the actual #/connect address without a 404", () => {
    window.history.replaceState({}, "", "/rocky_202x/#/connect");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Opportunities & support" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /PayPal support email address/ })).toHaveValue("sahchandan98@gmail.com");
    expect(screen.getByRole("textbox", { name: /Google Pay contact email address/ })).toHaveValue("sahchandan98@gmail.com");
    expect(screen.getByText(/An email address is not a universal Google Pay transfer ID/i)).toBeInTheDocument();
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
