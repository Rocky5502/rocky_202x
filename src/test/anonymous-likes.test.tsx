import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import ArticleEngagement, { validAnonymousApiUrl } from "@/components/ArticleEngagement";

const endpoint="https://rocky-research-anonymous-likes.example.workers.dev";
const path="/notes/ten-rules-phd-research-ai";
const uuid="f9c6e6ef-6348-448d-9644-cd9629312c46";
const json=(data:unknown,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data} as Response);

beforeEach(()=>{
  window.localStorage.removeItem("rocky-anonymous-reaction-visitor-v1");
  window.localStorage.removeItem("portfolio-language");
  Object.defineProperty(window.crypto,"randomUUID",{configurable:true,value:()=>uuid});
});
afterEach(()=>{vi.unstubAllGlobals();});

describe("Real anonymous engagement, without fictitious counts",()=>{
  it("rejects arbitrary / unsafe backends",()=>{
    expect(validAnonymousApiUrl(endpoint)).toBe(true);
    for(const url of [
      "http://unsafe.workers.dev/",
      "https://bad.workers.dev.evil.example/",
      "https://user:pass@bad.workers.dev/",
      "https://bad.workers.dev/secret",
      "https://bad.workers.dev/?token=secret",
      null, ""
    ]) expect(validAnonymousApiUrl(url)).toBe(false);
  });
  it("leaves current GitHub Discussions fully functional when service is not deployed",async()=>{
    const fetchMock=vi.fn(async()=>json({apiBaseUrl:null}));
    vi.stubGlobal("fetch",fetchMock);
    const {unmount}=render(<LanguageProvider><MemoryRouter>
      <ArticleEngagement articlePath={path}/>
    </MemoryRouter></LanguageProvider>);
    await waitFor(()=>expect(fetchMock).toHaveBeenCalledOnce());
    expect(screen.getByRole("region",{name:"Likes and comments"})).toBeInTheDocument();
    expect(screen.queryByRole("button",{name:"Like article anonymously"})).toBeNull();
    expect(document.querySelector("script[data-reactions-enabled='1']")).not.toBeNull();
    unmount();
  });
  it("fetches a real shared count, likes once, and keeps GitHub login only for comments",async()=>{
    const fetchMock=vi.fn(async (url:string,init?:RequestInit)=>{
      if(url.includes("anonymous-likes-config.json")) return json({apiBaseUrl:endpoint});
      if(init?.method==="POST") {
        expect(JSON.parse(init.body as string)).toEqual({visitorId:uuid,liked:true});
        return json({article:"ten-rules-phd-research-ai",count:8,liked:true});
      }
      return json({article:"ten-rules-phd-research-ai",count:7,liked:false});
    });
    vi.stubGlobal("fetch",fetchMock);
    const {unmount}=render(<LanguageProvider><MemoryRouter>
      <ArticleEngagement articlePath={path}/>
    </MemoryRouter></LanguageProvider>);
    const button=await screen.findByRole("button",{name:"Like article anonymously"});
    await waitFor(()=>expect(button).not.toBeDisabled());
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(document.querySelector("script[data-reactions-enabled='0']")).not.toBeNull();
    expect(screen.getByRole("region",{name:"Reader comments"})).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(()=>expect(screen.getByRole("button",{name:"Remove anonymous like"})).toHaveAttribute("aria-pressed","true"));
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(window.localStorage.getItem("rocky-anonymous-reaction-visitor-v1")).toBe(uuid);
    unmount();
  });
  it("never invents a reaction total if backend is offline",async()=>{
    vi.stubGlobal("fetch",vi.fn(async (url:string)=>{
      if(url.includes("anonymous-likes-config.json")) return json({apiBaseUrl:endpoint});
      throw new Error("backend unreachable");
    }));
    const {unmount}=render(<LanguageProvider><MemoryRouter>
      <ArticleEngagement articlePath={path}/>
    </MemoryRouter></LanguageProvider>);
    await screen.findByRole("button",{name:"Like article anonymously"});
    await waitFor(()=>expect(screen.getByRole("status")).toHaveTextContent("temporarily unavailable"));
    expect(screen.getByRole("button",{name:"Like article anonymously"})).toBeDisabled();
    expect(screen.getByText("—")).toBeInTheDocument();
    unmount();
  });
});
