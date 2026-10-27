import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

describe("Beihang PhD supervision on the academic homepage", () => {
  it("shows faculty names and roles without links to their personal webpages", () => {
    window.localStorage.removeItem("portfolio-language");
    window.history.replaceState({}, "", "/rocky_202x/");
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const region = screen.getByRole("region", { name: "PhD supervision" });
    expect(within(region).getByText("Current doctoral studies")).toBeInTheDocument();
    expect(within(region).getByText("Beihang University · School of Computer Science and Engineering · Institute of Software Engineering · Beijing, China")).toBeInTheDocument();
    expect(within(region).getByText("Li Zhang")).toBeInTheDocument();
    expect(within(region).getByText("Xiaoli Lian")).toBeInTheDocument();
    expect(within(region).getByText("Professor")).toBeInTheDocument();
    expect(within(region).getByText("Assistant Professor")).toBeInTheDocument();
    expect(within(region).queryAllByRole("link")).toHaveLength(0);
    expect(region.querySelectorAll(".supervisor-profile")).toHaveLength(2);
    expect(region.querySelectorAll(".supervisor-name")).toHaveLength(2);
    expect(region.querySelectorAll("a, button, [role='link'], [role='button'], [tabindex]")).toHaveLength(0);
    expect(region.innerHTML).not.toContain("scse.buaa.edu.cn/info/");
    expect(region.querySelector(".supervisor-profile-blue")).toHaveTextContent("Li Zhang");
    expect(region.querySelector(".supervisor-profile-green")).toHaveTextContent("Xiaoli Lian");
    expect(region.textContent).not.toMatch(/@buaa\.edu\.cn|mailto:/);
    expect(region.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it("shows Chinese faculty names and positions without outbound links", () => {
    window.localStorage.removeItem("portfolio-language");
    window.history.replaceState({}, "", "/rocky_202x/");
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    const region = screen.getByRole("region", { name: "博士研究指导" });
    expect(within(region).getByText("目前的博士研究")).toBeInTheDocument();
    expect(within(region).getByText("北京航空航天大学 · 计算机学院 · 软件工程研究所 · 中国北京")).toBeInTheDocument();
    expect(within(region).getByText("张莉")).toBeInTheDocument();
    expect(within(region).getByText("连小利")).toBeInTheDocument();
    expect(within(region).getByText("教授")).toBeInTheDocument();
    expect(within(region).getByText("助理研究员")).toBeInTheDocument();
    expect(within(region).queryAllByRole("link")).toHaveLength(0);
  });
});
