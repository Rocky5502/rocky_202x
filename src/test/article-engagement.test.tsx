import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { notesCatalog } from "@/data/notesCatalog";
import { giscusSettings, giscusTerm } from "@/data/giscusSettings";

Object.defineProperty(window,"scrollTo",{configurable:true,writable:true,value:vi.fn()});
beforeEach(()=>{
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({},"","/rocky_202x/");
  document.documentElement.lang="en";
});

describe("Embedded article likes and comments",()=>{
  it.each(notesCatalog.map(item=>[item.path] as const))(
    "shows in-page likes/comments for %s, never links to GitHub issue controls",
    path=>{
      const {unmount}=render(<MemoryRouter initialEntries={[path]}><PortfolioSite /></MemoryRouter>);
      const section=screen.getByRole("region",{name:"Likes and comments"});
      const script=section.querySelector<HTMLScriptElement>("script[src='https://giscus.app/client.js']");
      expect(script).not.toBeNull();
      expect(script?.getAttribute("data-term")).toBe(giscusTerm(path));
      expect(script?.getAttribute("data-reactions-enabled")).toBe("1");
      expect(script?.getAttribute("data-category-id")).toBe(giscusSettings.categoryId);
      expect(section.querySelector("a[href*='github.com']")).toBeNull();
      expect(section.textContent).not.toContain("Like this article on GitHub");
      expect(section.textContent).not.toContain("Write a comment");
      unmount();
    }
  );
  it("keeps one discussion during Chinese language change",()=>{
    render(<MemoryRouter initialEntries={["/notes/are-we-asking-the-right-questions"]}><PortfolioSite /></MemoryRouter>);
    const initial=document.querySelector(".onpage-discussion-frame script")?.getAttribute("data-term");
    fireEvent.click(screen.getByRole("button",{name:"Switch website to Simplified Chinese"}));
    expect(screen.getByRole("region",{name:"点赞与评论"})).toBeInTheDocument();
    expect(document.querySelector(".onpage-discussion-frame script")?.getAttribute("data-term")).toBe(initial);
  });
});
