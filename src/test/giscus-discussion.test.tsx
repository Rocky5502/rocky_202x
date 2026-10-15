import { beforeEach,describe,expect,it } from "vitest";
import { render,screen,fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import GiscusDiscussion from "@/components/GiscusDiscussion";
import { giscusReady,giscusSettings,giscusTerm } from "@/data/giscusSettings";
import { notesCatalog } from "@/data/notesCatalog";

beforeEach(()=>{ document.documentElement.classList.remove("dark");window.localStorage.removeItem("portfolio-language"); });

describe("In-page discussions and reactions",()=>{
  it("has a real Announcements category instead of a missing/guessed ID",()=>{
    expect(giscusReady).toBe(true);
    expect(giscusSettings.repo).toBe("Rocky5502/rocky_202x");
    expect(giscusSettings.repoId).toBe("R_kgDOSeIGfg");
    expect(giscusSettings.categoryId).toBe("DIC_kwDOSeIGfs4DIhO6");
  });
  it("maps every article to a unique stable discussion term",()=>{
    expect(new Set(notesCatalog.map(n=>giscusTerm(n.path))).size).toBe(8);
    expect(()=>giscusTerm("/notes/../secrets")).toThrow();
  });
  it("automatically inserts giscus iframe script with reactions and no redirects",()=>{
    const path="/notes/essays/when-ai-says-i-know";
    const view=render(<LanguageProvider><MemoryRouter><GiscusDiscussion articlePath={path}/></MemoryRouter></LanguageProvider>);
    const region=screen.getByRole("region",{name:"Likes and comments"});
    const script=region.querySelector<HTMLScriptElement>("script")!;
    expect(script).not.toBeNull();
    expect(script.src).toBe("https://giscus.app/client.js");
    expect(script.getAttribute("data-category-id")).toBe("DIC_kwDOSeIGfs4DIhO6");
    expect(script.getAttribute("data-reactions-enabled")).toBe("1");
    expect(script.getAttribute("data-mapping")).toBe("specific");
    expect(script.getAttribute("data-term")).toBe(giscusTerm(path));
    expect(script.getAttribute("data-lang")).toBe("en");
    expect(region.querySelector("a[href*='github.com']")).toBeNull();
    view.unmount();
    expect(document.querySelector(".onpage-discussion-frame script")).toBeNull();
  });
  it("hides the raw giscus installation failure and offers an in-page retry",()=>{
    const view=render(<LanguageProvider><MemoryRouter>
      <GiscusDiscussion articlePath="/notes/essays/when-ai-says-i-know"/>
    </MemoryRouter></LanguageProvider>);
    fireEvent(window,new MessageEvent("message",{
      origin:"https://giscus.app",
      data:{giscus:{error:"giscus is not installed on this repository"}}
    }));
    expect(screen.getByText(/Reader comments and reactions are temporarily unavailable/)).toBeInTheDocument();
    expect(screen.getByRole("button",{name:"Try again"})).toBeInTheDocument();
    expect(document.querySelector(".onpage-discussion-frame")).toHaveAttribute("hidden");
    expect(document.body.textContent).not.toContain("giscus is not installed on this repository");
    fireEvent.click(screen.getByRole("button",{name:"Try again"}));
    expect(document.querySelector(".onpage-discussion-frame")).not.toHaveAttribute("hidden");
    view.unmount();
  });
  it("ignores error events from untrusted origins",()=>{
    const view=render(<LanguageProvider><MemoryRouter><GiscusDiscussion articlePath="/notes/ten-rules-phd-research-ai"/></MemoryRouter></LanguageProvider>);
    fireEvent(window,new MessageEvent("message",{origin:"https://untrusted.invalid",data:{giscus:{error:"error"}}}));
    expect(screen.queryByRole("button",{name:"Try again"})).toBeNull();
    view.unmount();
  });
  it("loads the dark theme when the website is in dark mode",()=>{
    document.documentElement.classList.add("dark");
    const view=render(<LanguageProvider><MemoryRouter><GiscusDiscussion articlePath="/notes/ten-rules-phd-research-ai"/></MemoryRouter></LanguageProvider>);
    expect(document.querySelector(".onpage-discussion-frame script")?.getAttribute("data-theme")).toBe("dark");
    view.unmount();
    document.documentElement.classList.remove("dark");
  });
});
