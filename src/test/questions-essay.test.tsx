import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { questionsEssayPath, originalLinkedInPost } from "@/components/RightQuestionsEssay";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

beforeEach(() => {
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({}, "", "/rocky_202x/");
  document.documentElement.lang = "en";
});

describe("Nobel laureate reflection and research notes archive", () => {
  it("publishes a dated first-person essay without inventing collaborations", () => {
    render(<MemoryRouter initialEntries={[questionsEssayPath]}><PortfolioSite/></MemoryRouter>);
    expect(screen.getByRole("heading", {name: "Are We Asking the Right Questions?", level: 1})).toBeInTheDocument();
    expect(screen.getByText("March 25, 2026")).toBeInTheDocument();
    expect(screen.getByText("Beijing, China")).toBeInTheDocument();
    expect(screen.getByText(/As a child growing up in Nepal/)).toBeInTheDocument();
    expect(screen.getByText(/Geoffrey Hinton, and Didier Queloz/)).toBeInTheDocument();
    expect(screen.getByText(/a photograph is not a collaboration/)).toBeInTheDocument();
    expect(screen.getByText(/do not imply research collaboration/)).toBeInTheDocument();
    expect(document.querySelectorAll(".questions-chapter")).toHaveLength(6);
    const image = screen.getByRole("img", {name: /author's collage of photographs/});
    expect(image.getAttribute("src")).toMatch(/^data:image\/webp;base64,UklG/);
    expect(screen.getAllByRole("link", {name: /Original LinkedIn reflection/}).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", {name: /Original LinkedIn reflection/})[0]).toHaveAttribute("href",originalLinkedInPost);
    expect(document.title).toContain("Are We Asking the Right Questions?");
  });

  it("lists both permanent essays under Notes, accessible from primary navigation", () => {
    const {unmount} = render(<MemoryRouter initialEntries={["/"]}><PortfolioSite/></MemoryRouter>);
    expect(within(screen.getByRole("navigation", {name:"Primary navigation"})).getByRole("link", {name:"Notes"})).toHaveAttribute("href","/notes");
    expect(screen.getByRole("link", {name:"Read the story"})).toHaveAttribute("href",questionsEssayPath);
    unmount();
    render(<MemoryRouter initialEntries={["/notes"]}><PortfolioSite/></MemoryRouter>);
    expect(screen.getByRole("heading", {name:"Notes from the Unknown", level: 1})).toBeInTheDocument();
    expect(screen.getByRole("link", {name:"Are We Asking the Right Questions?"})).toHaveAttribute("href",questionsEssayPath);
    expect(screen.getByRole("link", {name:"In Love with the Unknown"})).toHaveAttribute("href","/notes/ten-rules-phd-research-ai");
  });

  it("works in Simplified Chinese without affecting the canonical dated citation", () => {
    render(<MemoryRouter initialEntries={[questionsEssayPath]}><PortfolioSite/></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", {name:"Switch website to Simplified Chinese"}));
    expect(screen.getByRole("heading", {name:"我们是否提出了正确的问题？", level: 1})).toBeInTheDocument();
    expect(screen.getByText("2026年3月25日")).toBeInTheDocument();
    expect(document.querySelectorAll(".questions-chapter")).toHaveLength(6);
    expect(screen.getByRole("heading", {name:"一个来自尼泊尔的孩子"})).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("zh-CN");
  });
});
