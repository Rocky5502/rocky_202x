import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PortfolioSite from "@/components/PortfolioSite";
import { publications, academicService } from "@/data/portfolio";

Object.defineProperty(window,"scrollTo",{configurable:true,writable:true,value:vi.fn()});

const avTitle="Advancing Autonomous Vehicle Intelligence: Deep Learning and Multimodal LLM for Traffic Sign Recognition and Robust Lane Detection";

describe("October 22 academic profile completion", () => {
  it("highlights four real academic records, including the autonomous-vehicle paper, on the homepage", () => {
    const {unmount}=render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const rows=Array.from(document.querySelectorAll(".publication-list .publication-row"));
    expect(rows).toHaveLength(4);
    const titles=rows.map(row=>row.querySelector("h3")?.textContent||"");
    expect(titles.some(t=>t.includes(avTitle))).toBe(true);
    expect(rows[3]).toHaveTextContent("arXiv:2503.06313");
    expect(within(rows[3] as HTMLElement).getByRole("link",{name:new RegExp("Advancing Autonomous Vehicle Intelligence")})).toHaveAttribute("href","https://arxiv.org/abs/2503.06313");
    unmount();
  });

  it("shows author-requested supervisor profile title and reliable institutional destination", () => {
    const {unmount}=render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const supervisor=screen.getByRole("link",{name:/Xiaoli Lian Assistant Professor/});
    expect(supervisor).toHaveAttribute("href","https://scse.buaa.edu.cn/info/1389/10618.htm");
    expect(supervisor).not.toHaveTextContent("Lecturer");
    unmount();
  });

  it("preserves official arXiv author order and preprint classification", () => {
    const av=publications.find(p=>p.url==="https://arxiv.org/abs/2503.06313");
    expect(av?.title).toBe(avTitle);
    expect(av?.authors).toBe("Chandan Kumar Sah, Ankit Kumar Shaw, Xiaoli Lian, Arsalan Shahid Baig, Tuopu Wen, Kun Jiang, Mengmeng Yang, Diange Yang");
    expect(av?.type).toBe("Preprint");
  });

  it("uses concise ICCV and CVPR card labels while retaining accurate underlying types", () => {
    const ase=publications.find(p=>p.title==="Understanding Uncertainty in LLMs");
    expect(ase?.venue).toBe("ASE 2025 — Student Research Competition");
    const special=publications.filter(p=>p.venue==="CVPR 2025"||p.venue==="ICCV 2025");
    expect(special).toHaveLength(3);
    expect(special.every(p=>p.type==="Workshop" && p.rankingScope==="host-only")).toBe(true);

    const {unmount}=render(<MemoryRouter initialEntries={["/publications"]}><PortfolioSite /></MemoryRouter>);
    const rows=Array.from(document.querySelectorAll(".publication-row"));
    const cardFor=(title:string)=>rows.find(r=>r.querySelector("h3")?.textContent?.includes(title));
    const aseRow=cardFor("Understanding Uncertainty in LLMs");
    expect(aseRow).toHaveTextContent("Academic paper");
    expect(aseRow).toHaveTextContent("ASE 2025 — Student Research Competition");
    for(const p of special){
      const row=cardFor(p.title);
      expect(row).toBeTruthy();
      expect(row).toHaveTextContent("Academic paper");
      expect(row).not.toHaveTextContent("Workshop paper");
    }
    unmount();
  });

  it("removes ASE solely from reviewer roles, without deleting the genuine ASE publication or award", () => {
    expect(academicService.conferences).not.toContain("ASE");
    for(const label of ["ACL ARR","AAMAS","IASEAI"]){
      expect(academicService.conferences).toContain(label);
    }
    const {unmount}=render(<MemoryRouter initialEntries={["/service"]}><PortfolioSite /></MemoryRouter>);
    const conferenceList=document.querySelector(".service-columns .quiet-list");
    expect(conferenceList).not.toBeNull();
    expect(Array.from(conferenceList?.querySelectorAll("li")??[]).some(li=>li.textContent?.trim()==="ASE")).toBe(false);
    expect(conferenceList).toHaveTextContent("ACL ARR");
    expect(conferenceList).toHaveTextContent("AAMAS");
    expect(conferenceList).toHaveTextContent("IASEAI");
    unmount();
  });
});
