import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

describe("Beihang PhD supervision on the academic homepage", () => {
  it("shows the two user-specified names linked only to their official institutional profiles", () => {
    window.localStorage.removeItem("portfolio-language");
    window.history.replaceState({}, "", "/rocky_202x/");
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const region = screen.getByRole("region", { name: "PhD supervision" });
    expect(within(region).getByText("Current doctoral studies")).toBeInTheDocument();
    expect(within(region).getByText("Beihang University · School of Computer Science and Engineering · Institute of Software Engineering · Beijing, China")).toBeInTheDocument();
    const links = within(region).getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Li Zhang");
    expect(links[0]).toHaveAttribute("href", "https://scse.buaa.edu.cn/info/1387/10317.htm");
    expect(links[1]).toHaveTextContent("Xiaoli Lian");
    expect(links[1]).toHaveAttribute("href", "https://scse.buaa.edu.cn/info/1389/10618.htm");
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.getAttribute("href")).toMatch(/^https:\/\/scse\.buaa\.edu\.cn\/info\//);
    }
    expect(region.querySelectorAll(".supervisor-name")).toHaveLength(2);
    expect(links[0]).toHaveClass("supervisor-profile-blue");
    expect(links[1]).toHaveClass("supervisor-profile-green");
    expect(region.textContent).not.toMatch(/@buaa\.edu\.cn|mailto:/);
    expect(region.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it("shows source-backed Chinese professor names and full institute while preserving profile URLs", () => {
    window.localStorage.removeItem("portfolio-language");
    window.history.replaceState({}, "", "/rocky_202x/");
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    const region = screen.getByRole("region", { name: "博士研究指导" });
    expect(within(region).getByText("目前的博士研究")).toBeInTheDocument();
    expect(within(region).getByText("北京航空航天大学 · 计算机学院 · 软件工程研究所 · 中国北京")).toBeInTheDocument();
    expect(within(region).getByText("张莉")).toBeInTheDocument();
    expect(within(region).getByText("连小利")).toBeInTheDocument();
    expect(within(region).getAllByRole("link")).toHaveLength(2);
  });
});
