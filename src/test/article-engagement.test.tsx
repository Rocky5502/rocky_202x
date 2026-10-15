import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { articleThreads, discussionUrl, commentUrl } from "@/data/articleThreads";
import { notesCatalog } from "@/data/notesCatalog";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

const response = (body: unknown, ok = true, status = 200) => ({
  ok, status, json: async () => body,
});

beforeEach(() => {
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({}, "", "/rocky_202x/");
  document.documentElement.lang = "en";
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    if (url.endsWith("/comments?per_page=100")) return response([
      {
        id: 99001, body: "Thoughtful note about uncertainty.", created_at: "2026-10-15T12:00:00Z",
        html_url: "https://github.com/Rocky5502/rocky_202x/issues/31#issuecomment-99001",
        user: {login: "CarefulReader", avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4"},
      },
      {
        id: 99002, body: "<script>alert('xss')</script>", created_at: "2026-10-15T13:00:00Z",
        html_url: "https://malicious.example.com/evil",
        user: {login: "AnotherReader", avatar_url: "https://evil.example.com/avatar.png"},
      },
    ]);
    const match = url.match(/\/issues\/(\d+)$/);
    return response({number: Number(match?.[1]), comments:2, reactions: { "+1":3, heart:2 }});
  }));
});
afterEach(() => vi.unstubAllGlobals());

describe("GitHub-backed article reader engagement", () => {
  it("gives each of the eight archived essays a unique, stable thread", () => {
    expect(Object.keys(articleThreads)).toHaveLength(8);
    expect(notesCatalog.map(p => p.path).sort()).toEqual(Object.keys(articleThreads).sort());
    expect(new Set(Object.values(articleThreads)).size).toBe(8);
    expect(discussionUrl(31)).toBe("https://github.com/Rocky5502/rocky_202x/issues/31");
    expect(commentUrl(31)).toBe("https://github.com/Rocky5502/rocky_202x/issues/31#new_comment_field");
  });
  it("renders persistent reaction counts and safely escaped public comments, not fabricated likes", async () => {
    render(<MemoryRouter initialEntries={["/notes/essays/when-ai-says-i-know"]}><PortfolioSite /></MemoryRouter>);
    const section = screen.getByRole("region", {name:"Thoughts, questions & reactions"});
    expect(within(section).getByText(/Loading reader responses/)).toBeInTheDocument();
    await waitFor(() => expect(within(section).getByText("Thoughtful note about uncertainty.")).toBeInTheDocument());
    expect(within(section).getByText("5")).toBeInTheDocument();
    expect(within(section).getByText("2")).toBeInTheDocument();
    expect(within(section).getByText("<script>alert('xss')</script>")).toBeInTheDocument();
    expect(section.querySelector("script")).toBeNull();
    expect(section.querySelector("img[src*='evil.example']")).toBeNull();
    expect(within(section).getByRole("link",{name:/Like this article on GitHub/})).toHaveAttribute("href",discussionUrl(31));
    expect(within(section).getByRole("link",{name:/Write a comment/})).toHaveAttribute("href",commentUrl(31));
    expect(section.querySelectorAll(".article-engagement-entry")).toHaveLength(2);
    fireEvent.click(within(section).getByRole("button",{name:/Refresh responses/}));
    await waitFor(() => expect(section.querySelectorAll(".article-engagement-entry")).toHaveLength(2));
    expect(vi.mocked(fetch).mock.calls.some(([url])=>String(url).includes("/issues/31"))).toBe(true);
  });
  it("shows a helpful direct-link fallback when GitHub public API is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => response({}, false, 403)));
    render(<MemoryRouter initialEntries={["/notes/ten-rules-phd-research-ai"]}><PortfolioSite /></MemoryRouter>);
    const section=screen.getByRole("region",{name:"Thoughts, questions & reactions"});
    await waitFor(() => expect(within(section).getByText(/Live counts are temporarily unavailable/)).toBeInTheDocument());
    expect(within(section).getByRole("link",{name:/Write a comment/})).toHaveAttribute("href",commentUrl(32));
    expect(within(section).getByText("—")).toBeInTheDocument();
  });
  it("adapts text to Chinese without creating a second discussion thread", async () => {
    render(<MemoryRouter initialEntries={["/notes/are-we-asking-the-right-questions"]}><PortfolioSite /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button",{name:"Switch website to Simplified Chinese"}));
    const section=screen.getByRole("region",{name:"想法、提问与回应"});
    expect(within(section).getByRole("link",{name:/发表评论/})).toHaveAttribute("href",commentUrl(34));
    await waitFor(() => expect(within(section).getByText("Thoughtful note about uncertainty.")).toBeInTheDocument());
  });
  it.each(notesCatalog.map(item => [item.path,articleThreads[item.path]] as const))(
    "links the article %s to its matching discussion, not a shared global thread",async (path,issue) => {
      render(<MemoryRouter initialEntries={[path]}><PortfolioSite /></MemoryRouter>);
      const section=screen.getByRole("region",{name:"Thoughts, questions & reactions"});
      expect(within(section).getByRole("link",{name:/Write a comment/})).toHaveAttribute("href",commentUrl(issue));
    }
  );
});
