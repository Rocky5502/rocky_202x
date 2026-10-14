import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { translateText, languageFromSearch, languageSharePath } from "@/i18n/LanguageProvider";
import { zhTranslations } from "@/i18n/zh";
import { newsItems } from "@/data/news";
import { awardsArchive } from "@/data/awards";
import { researchAreas } from "@/data/portfolio";
import { researchSkills } from "@/data/cv";
import { publicProjects, ongoingProjects } from "@/data/projects";

beforeEach(() => {
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({}, "", "/rocky_202x/");
  document.documentElement.lang = "en";
});

const renderAt = (path: string) => render(<MemoryRouter initialEntries={[path]}><PortfolioSite/></MemoryRouter>);

describe("professional Simplified Chinese localization", () => {
  it("covers the five primary research themes and ten research skills", () => {
    for (const area of researchAreas) {
      expect(translateText(area.name, "zh-CN")).not.toBe(area.name);
      expect(translateText(area.description, "zh-CN")).not.toBe(area.description);
    }
    for (const skill of researchSkills) {
      expect(translateText(skill.name, "zh-CN")).not.toBe(skill.name);
      expect(translateText(skill.summary, "zh-CN")).not.toBe(skill.summary);
    }
    for (const project of publicProjects) {
      expect(translateText(project.description, "zh-CN")).not.toBe(project.description);
      expect(translateText(project.question, "zh-CN")).not.toBe(project.question);
    }
    for (const project of ongoingProjects) {
      expect(translateText(project.description,"zh-CN")).not.toBe(project.description);
      expect(translateText(project.question,"zh-CN")).not.toBe(project.question);
    }
  });

  it("localizes private research previews and OpenCoder code-release state", async () => {
    renderAt("/projects");
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "科研项目" })).toBeInTheDocument());
    expect(screen.getByRole("heading", { name: "在研项目 · 私有" })).toBeInTheDocument();
    expect(document.querySelectorAll(".ongoing-project-card")).toHaveLength(5);
    expect(document.querySelector(".project-overview")).toHaveTextContent("5项研究预览");
    const coder = screen.getByRole("heading", { name: /^OpenCoder$/ }).closest("article");
    expect(coder).toHaveTextContent("代码整理版即将发布");
    expect(document.querySelector(".ongoing-project-card a")).toBeNull();
    expect(screen.getByRole("heading", {name:"U-FLOW"})).toBeInTheDocument();
    expect(screen.getAllByText("私人研究 · 代码暂不公开")).toHaveLength(5);
  });

  it("provides authored Chinese for all original news narratives and award titles", () => {
    expect(newsItems).toHaveLength(11);
    expect(awardsArchive).toHaveLength(62);
    for (const story of newsItems) {
      expect(zhTranslations[story.title], story.title).toBeTruthy();
      expect(zhTranslations[story.summary], story.title + " summary").toBeTruthy();
      expect(zhTranslations[story.article], story.title + " full article").toBeTruthy();
    }
    for (const award of awardsArchive) expect(zhTranslations[award.title], award.title).toBeTruthy();
  });

  it("switches navigation, metadata and document language and reverses without changing links", async () => {
    renderAt("/research");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByRole("heading", { name: "Research & projects" })).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Switch website to Simplified Chinese" });
    fireEvent.click(button);
    await waitFor(() => expect(document.documentElement.lang).toBe("zh-CN"));
    await waitFor(() => expect(screen.getByRole("heading", { name: "研究方向与项目" })).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "学术成果" })).toHaveAttribute("href", "/publications");
    expect(screen.getByRole("navigation", { name: "主导航" }).querySelector('a[href="/cv"]')).toHaveTextContent("简历");
    expect(document.title).toBe("研究方向｜Chandan Kumar Sah");
    expect(window.localStorage.getItem("portfolio-language")).toBe("zh-CN");

    fireEvent.click(screen.getByRole("button", { name: "切换网站语言为英语" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Research & projects" })).toBeInTheDocument());
    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("portfolio-language")).toBe("en");
    expect(screen.getByRole("link", { name: "Publications" })).toHaveAttribute("href", "/publications");
  });

  it("translates Nepal scholarship biography and the Web of Science link without changing its target", async () => {
    const { unmount } = renderAt("/");
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    await waitFor(() => expect(screen.getByText(/来自尼泊尔 🇳🇵，自2018年4月起在中国学习和生活/)).toBeInTheDocument());
    expect(document.querySelector(".hero-description")).not.toHaveTextContent("Chandan Kumar Sah");
    expect(screen.getByText("以不确定性分析、证据与核验推动可信人工智能研究。")).toBeInTheDocument();
    const record = document.querySelector(".portrait-research-record");
    expect(record).not.toBeNull();
    expect(record).toHaveAttribute("href", "/publications");
    expect(record).toHaveTextContent("13+");
    expect(record).toHaveTextContent("科研成果");
    expect(record).not.toHaveTextContent("预印本");
    expect(record?.querySelector("small")).toBeNull();
    const highlights = document.querySelector(".portrait-highlight-list");
    expect(highlights?.querySelectorAll("li")).toHaveLength(6);
    expect(highlights).toHaveTextContent("ECIR 2026 优秀审稿人");
    expect(highlights).toHaveTextContent("ASE 2025 ACM 学生研究竞赛研究生组二等奖（第二名）");
    expect(highlights).not.toHaveTextContent("†");
    expect(highlights).toHaveTextContent("亚洲大学联盟研究生论坛优秀论文奖");
    expect(highlights).toHaveTextContent("两次中国政府奖学金");
    expect(document.querySelector(".portrait-highlights-note")).toBeNull();
    unmount();

    renderAt("/service");
    await waitFor(() => expect(screen.getAllByRole("link", { name: "Web of Science 作者检索" }).length).toBeGreaterThan(0));
    const links = screen.getAllByRole("link", { name: "Web of Science 作者检索" });
    expect(links.every(link => link.getAttribute("href") ===
      "https://www.webofscience.com/wos/author/author-search?state=%7B%7D")).toBe(true);
    expect(screen.getByText(/并非已经核验的个人学者主页/)).toBeInTheDocument();
  });

  it("provides a Simplified Chinese Recognition tile inside CV without duplicating the archive", async () => {
    renderAt("/cv");
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "学术履历与技能" })).toBeInTheDocument());
    const recognitionTile = document.querySelector<HTMLAnchorElement>('a.cv-layer-card[href="/recognition"]');
    expect(recognitionTile).not.toBeNull();
    expect(recognitionTile).toHaveTextContent("荣誉与交流");
    expect(recognitionTile).toHaveTextContent("学术报告与荣誉档案");
    expect(document.querySelectorAll("a.cv-layer-card")).toHaveLength(5);
    const projectsTile = document.querySelector<HTMLAnchorElement>('a.cv-layer-card[href="/projects"]');
    expect(projectsTile).not.toBeNull();
    expect(projectsTile).toHaveTextContent("科研项目");
    expect(within(screen.getByRole("navigation", { name: "主导航" })).queryByRole("link", { name: "科研项目" })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "主导航" })).queryByRole("link", { name: "荣誉与交流" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "代表性学术报告" })).not.toBeInTheDocument();
  });

  it("provides a translated return-to-CV breadcrumb on the existing Recognition page", async () => {
    renderAt("/recognition");
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "荣誉与学术交流" })).toBeInTheDocument());
    const breadcrumb = screen.getByRole("navigation", { name: "Recognition breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "← 返回简历" })).toHaveAttribute("href", "/cv");
  });

  it("translates education and awards while preserving search and stable category values", async () => {
    const { unmount } = renderAt("/cv/education");
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "暑期与冬季学校" })).toBeInTheDocument());
    expect(screen.getAllByText("北京航空航天大学").length).toBeGreaterThan(0);
    unmount();

    window.localStorage.setItem("portfolio-language","zh-CN");
    renderAt("/awards");
    await waitFor(() => expect(screen.getByRole("heading", { name: "荣誉与表彰" })).toBeInTheDocument());
    const category = screen.getByRole("combobox", { name: "按类别筛选档案" });
    fireEvent.change(category, { target: { value: "Scholarships & fellowships" } });
    await waitFor(() => expect(screen.queryByText("62 条记录")).not.toBeInTheDocument());
    expect((category as HTMLSelectElement).value).toBe("Scholarships & fellowships");
  });

  it("searches the unchanged English publication records using Chinese topic terms", async () => {
    renderAt("/publications");
    fireEvent.click(screen.getByRole("button", { name: "Switch website to Simplified Chinese" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "学术成果" })).toBeInTheDocument());
    const before = screen.getAllByRole("article").length;
    const search = screen.getByRole("textbox", { name: "搜索学术成果" });
    fireEvent.change(search, { target: { value: "公平性" } });
    await waitFor(() => expect(screen.getAllByRole("article").length).toBeLessThan(before));
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
    expect(search).toHaveValue("公平性");
  });

  it("accepts shareable locale URLs and preserves the hash and unrelated query parameters", () => {
    expect(languageFromSearch("?lang=zh-CN")).toBe("zh-CN");
    expect(languageFromSearch("?audit=1&lang=en")).toBe("en");
    expect(languageFromSearch("?lang=unsupported")).toBeNull();
    expect(languageFromSearch("")).toBeNull();
    const route = "https://rocky5502.github.io/rocky_202x/?v=20261013#/cv/education";
    expect(languageSharePath(route, "zh-CN")).toBe("/rocky_202x/?v=20261013&lang=zh-CN#/cv/education");
    expect(languageSharePath(route, "en")).toBe("/rocky_202x/?v=20261013&lang=en#/cv/education");
  });

  it("prioritizes an explicit Mandarin link over English preference and keeps route in share URL", async () => {
    window.localStorage.setItem("portfolio-language", "en");
    window.history.replaceState({}, "", "/rocky_202x/?campaign=academic&lang=zh-CN#/research");
    renderAt("/research");
    await waitFor(() => expect(screen.getByRole("heading", { name: "研究方向与项目" })).toBeInTheDocument());
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(window.localStorage.getItem("portfolio-language")).toBe("zh-CN");
    fireEvent.click(screen.getByRole("button", { name: "切换网站语言为英语" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Research & projects" })).toBeInTheDocument());
    expect(window.location.search).toContain("campaign=academic");
    expect(window.location.search).toContain("lang=en");
    expect(window.location.hash).toBe("#/research");
    expect(window.localStorage.getItem("portfolio-language")).toBe("en");
  });

  it("preserves exact English sources and identifiers through translation", () => {
    expect(translateText("0009-0002-4017-7970", "zh-CN")).toBe("0009-0002-4017-7970");
    expect(translateText("sahchandan98@gmail.com", "zh-CN")).toBe("sahchandan98@gmail.com");
    expect(translateText("ACM CCS", "zh-CN")).toBe("ACM CCS");
    expect(translateText("News", "en")).toBe("News");
  });
});
