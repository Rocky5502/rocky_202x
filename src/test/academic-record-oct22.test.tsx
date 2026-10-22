import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { academicService, publications } from "@/data/portfolio";

Object.defineProperty(window,"scrollTo",{configurable:true,writable:true,value:vi.fn()});
beforeEach(()=>{
  window.localStorage.removeItem("portfolio-language");
  window.history.replaceState({},"","/rocky_202x/");
  document.documentElement.lang="en";
});

describe("Owner-requested homepage academic record corrections · October 22, 2026",()=>{
  it("lists the confirmed vehicle paper with primary arXiv provenance, authors and preprint status",()=>{
    const paper=publications.find(p=>p.url==="https://arxiv.org/abs/2503.06313");
    expect(paper).toBeDefined();
    expect(paper?.title).toBe("Advancing Autonomous Vehicle Intelligence: Deep Learning and Multimodal LLM for Traffic Sign Recognition and Robust Lane Detection");
    expect(paper?.type).toBe("Preprint");
    expect(paper?.venue).toBe("arXiv:2503.06313");
    expect(paper?.authors).toBe("Chandan Kumar Sah, Ankit Kumar Shaw, Xiaoli Lian, Arsalan Shahid Baig, Tuopu Wen, Kun Jiang, Mengmeng Yang, Diange Yang");
    expect(paper?.rankingVenue).toBeUndefined();
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading",{name:paper!.title,level:3})).toBeInTheDocument();
    expect(document.querySelectorAll(".publication-list .publication-row")).toHaveLength(4);
  });
  it("uses concise ASE, ICCV and CVPR year labels while keeping official links and publication type",()=>{
    const ase=publications.find(p=>p.title==="Understanding Uncertainty in LLMs");
    expect(ase?.venue).toBe("ASE 2025");
    const iccv=publications.filter(p=>p.url.includes("/ICCV2025W/"));
    const cvpr=publications.filter(p=>p.url.includes("/CVPR2025W/"));
    expect(iccv).toHaveLength(2);
    expect(cvpr).toHaveLength(1);
    for(const p of iccv) {expect(p.venue).toBe("ICCV 2025");expect(p.type).toBe("Workshop");}
    for(const p of cvpr){expect(p.venue).toBe("CVPR 2025");expect(p.type).toBe("Workshop");}
    render(<MemoryRouter initialEntries={["/publications"]}><PortfolioSite /></MemoryRouter>);
    const items=document.querySelectorAll(".publication-row");
    const aseRow=Array.from(items).find(row=>row.textContent?.includes("Understanding Uncertainty in LLMs"));
    expect(aseRow?.textContent).toContain("Academic paper");
    expect(aseRow?.textContent).toContain("ASE 2025");
    expect(aseRow?.textContent).not.toContain("Doctoral Symposium");
    expect(document.querySelectorAll(".rank-caveat")).toHaveLength(0);
  });
  it("removes ASE reviewer venue, adds ACL ARR, AAMAS and linked IASEAI",()=>{
    expect(academicService.conferences).not.toContain("ASE");
    for(const v of ["ACL ARR","AAMAS","IASEAI"])expect(academicService.conferences).toContain(v);
    render(<MemoryRouter initialEntries={["/service"]}><PortfolioSite /></MemoryRouter>);
    const list=screen.getByRole("heading",{name:"Conferences"}).nextElementSibling!;
    expect(within(list as HTMLElement).getByText("ACL ARR")).toBeInTheDocument();
    expect(within(list as HTMLElement).getByText("AAMAS")).toBeInTheDocument();
    expect(within(list as HTMLElement).getByRole("link",{name:/IASEAI/})).toHaveAttribute("href","https://openreview.net/group?id=IASEAI.org/2027/Conference/Reviewers");
    expect(Array.from(list.children).map(item=>item.textContent)).not.toContain("ASE");
  });
  it("uses owner-requested supervisor title",()=>{
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const region=screen.getByRole("region",{name:"PhD supervision"});
    const link=within(region).getByRole("link",{name:/Xiaoli Lian/});
    expect(link).toHaveTextContent("Assistant Professor");
    expect(link).not.toHaveTextContent("Lecturer");
    expect(link).toHaveAttribute("href","https://scse.buaa.edu.cn/info/1389/10618.htm");
  });
  it("keeps archives concise without the old blanket verification disclaimer",()=>{
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    expect(document.body.textContent).not.toContain("have not all been independently reverified");
    expect(document.body.textContent).not.toContain("The archive preserves the researcher's original updates");
  });
});
