import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import GiscusDiscussion from "@/components/GiscusDiscussion";
import { giscusReady, giscusSettings, giscusTerm } from "@/data/giscusSettings";
import { notesCatalog } from "@/data/notesCatalog";

beforeEach(() => {
  document.documentElement.classList.remove("dark");
  window.localStorage.removeItem("portfolio-language");
});

describe("On-page GitHub Discussions comments and likes", () => {
  it("requires the owner's valid category before enabling the live widget", () => {
    expect(giscusReady).toBe(false);
    expect(giscusSettings.repo).toBe("Rocky5502/rocky_202x");
    expect(giscusSettings.repoId).toBe("R_kgDOSeIGfg");
    expect(giscusSettings.categoryId).toBe("");
  });

  it("uses unique explicit terms instead of HashRouter's shared pathname", () => {
    const terms = notesCatalog.map(item=>giscusTerm(item.path));
    expect(new Set(terms).size).toBe(8);
    expect(terms.every(term=>term.startsWith("Rocky Research Notes: /notes/"))).toBe(true);
    expect(()=>giscusTerm("https://untrusted.example/script")).toThrow("Invalid article route");
    expect(()=>giscusTerm("/notes/../secrets")).toThrow("Invalid article route");
  });

  it("embeds on the same article after click, enables reactions, and preserves canonical identity", async () => {
    const path="/notes/essays/when-ai-says-i-know";
    render(<LanguageProvider><MemoryRouter>
      <GiscusDiscussion articlePath={path} categoryId="DIC_ExampleCategory01234" />
    </MemoryRouter></LanguageProvider>);
    expect(screen.getByRole("region",{name:"Likes and comments"})).toBeInTheDocument();
    expect(document.querySelector(".onpage-discussion-frame script")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:"Show comments and reactions"}));
    await waitFor(()=>expect(document.querySelector(".onpage-discussion-frame script")).not.toBeNull());
    const script=document.querySelector<HTMLScriptElement>(".onpage-discussion-frame script")!;
    expect(script.src).toBe("https://giscus.app/client.js");
    expect(script.getAttribute("data-reactions-enabled")).toBe("1");
    expect(script.getAttribute("data-input-position")).toBe("top");
    expect(script.getAttribute("data-mapping")).toBe("specific");
    expect(script.getAttribute("data-term")).toBe(giscusTerm(path));
    expect(script.getAttribute("data-category-id")).toBe("DIC_ExampleCategory01234");
    expect(script.getAttribute("data-theme")).toBe("light");
    expect(script.getAttribute("data-lang")).toBe("en");
    expect(document.querySelector(".onpage-discussion a[href*='github.com']")).toBeNull();
  });

  it("adjusts theme to the current site theme", async () => {
    const view=render(<LanguageProvider><MemoryRouter>
      <GiscusDiscussion articlePath="/notes/ten-rules-phd-research-ai" categoryId="DIC_ExampleCategory01234" />
    </MemoryRouter></LanguageProvider>);
    fireEvent.click(screen.getByRole("button",{name:"Show comments and reactions"}));
    document.documentElement.classList.add("dark");
    await waitFor(()=>expect(document.querySelector(".onpage-discussion-frame script")?.getAttribute("data-term"))
      .toBe("Rocky Research Notes: /notes/ten-rules-phd-research-ai"));
    view.unmount();
    expect(document.querySelector(".onpage-discussion-frame script")).toBeNull();
  });
});
