import { describe, expect, it } from "vitest";
import { publications, conferenceRankings, identity, academicService } from "@/data/portfolio";
import { opportunityTracks, researchSupport } from "@/data/opportunities";
import { publicProjects, publicProjectUrl, ongoingProjects } from "@/data/projects";
import { wechatQrPath, wechatQrSize } from "@/data/wechatQr";

describe("public academic record", () => {
  it("uses distinct verified paper titles and public links", () => {
    expect(new Set(publications.map(p => p.title)).size).toBe(publications.length);
    expect(publications.length).toBeGreaterThan(10);
    for (const paper of publications) {
      expect(paper.title.length).toBeGreaterThan(12);
      expect(paper.authors).toMatch(/Chandan Kumar Sah/);
      expect(paper.url).toMatch(/^https:\/\//);
    }
  });

  it("includes the 2025 autonomous-vehicle paper with its verified preprint author list", () => {
    const paper = publications.find(p => p.title.startsWith("Advancing Autonomous Vehicle Intelligence:"));
    expect(paper).toBeDefined();
    expect(paper?.authors).toBe("Chandan Kumar Sah, Ankit Kumar Shaw, Xiaoli Lian, Arsalan Shahid Baig, Tuopu Wen, Kun Jiang, Mengmeng Yang, Diange Yang");
    expect(paper?.venue).toBe("arXiv:2503.06313");
    expect(paper?.type).toBe("Preprint");
    expect(paper?.url).toContain("citation_for_view=PyH-zqygdCYC:zYLM7Y9cAGgC");
  });

  it("lists the requested conferences and omits ASE from reviewer service", () => {
    expect(academicService.conferences).not.toContain("ASE");
    for(const venue of ["ACL ARR","AAMAS","IASEAI 2027"]) expect(academicService.conferences).toContain(venue);
  });

  it("presents requested short venue labels while preserving actual paper types", () => {
    const ase = publications.find(p => p.title === "Understanding Uncertainty in LLMs");
    expect(ase?.venue).toBe("ASE 2025");
    for(const paper of publications.filter(p => p.type === "Workshop")) {
      expect(paper.venue).toMatch(/^(ICCV|CVPR) 2025$/);
      expect(paper.rankingScope).toBe("host-only");
    }
  });

  it("preserves exact official arXiv author order for 2026 research preprints", () => {
    const titles = [
      "Beyond Self-Knowledge: Propagating Uncertainty Across Reasoning and Retrieval in LLMs",
      'Beyond "What to Retrieve": Uncertainty in Retrieval-Augmented Code Generation',
    ];
    for (const title of titles) {
      const paper = publications.find(p => p.title === title);
      expect(paper?.authors).toBe("Chandan Kumar Sah, Li Zhang, Xiaoli Lian");
      expect(paper?.type).toBe("Preprint");
      expect(paper?.url).toMatch(/^https:\/\/arxiv\.org\/abs\/2607\./);
    }
  });

  it("does not mistake preprints or workshops for regular main-track papers", () => {
    for (const paper of publications) {
      if (paper.type === "Preprint") {
        expect(paper.rankingScope).toBeUndefined();
        expect(paper.rankingVenue).toBeUndefined();
      }
      if (paper.type === "Workshop") {
        expect(paper.rankingScope).toBe("host-only");
      }
      if (paper.rankingScope === "host-only") {
        expect(paper.rankingVenue).toBeDefined();
      }
      if (paper.rankingVenue) {
        expect(conferenceRankings[paper.rankingVenue]).toBeDefined();
      }
    }
  });

  it("preserves checked ICORE 2026 and CCF 2026 reference grades", () => {
    expect(conferenceRankings.CCS).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.ASE).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.CVPR).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.ICCV).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.CSEET).toMatchObject({ icore: "C" });
    expect(conferenceRankings.CSEET.ccf).toBeUndefined();
  });
});

describe("authenticated identity and reported service", () => {
  it("keeps author-reported acceptance distinct from public publication evidence", () => {
    const ccs = publications.find(p => p.title === "Auditable Uncertainty Control for Secure LLM Agents");
    expect(ccs).toBeDefined();
    expect(ccs?.authors).toBe("Chandan Kumar Sah");
    expect(ccs?.status).toContain("author-reported");
    expect(ccs?.linkKind).toBe("venue");
    expect(ccs?.rankingScope).toBe("host-only");
    expect(ccs?.year).toBe(2026);
  });
});

describe("public project curation", () => {
  it("links only to separately identified public repositories", () => {
    expect(publicProjects.length).toBeGreaterThanOrEqual(8);
    expect(new Set(publicProjects.map(p => p.repo)).size).toBe(publicProjects.length);
    for (const project of publicProjects) {
      expect(publicProjectUrl(project.repo)).toBe(`https://github.com/Rocky5502/${project.repo}`);
      expect(project.name).toBeTruthy();
      expect(project.description.length).toBeGreaterThan(25);
      expect(["Research artifact", "In development"]).toContain(project.stage);
    }
  });
});


describe("curated private research and OpenCoder release controls", () => {
  it("describes five vetted private research previews without leaking links", () => {
    expect(ongoingProjects.map(p => p.name)).toEqual([
      "U-SMASH", "UOpenAI / U-PROVE", "NMI · Epistemic Conservation", "TrajUQ", "U-FLOW",
    ]);
    for (const project of ongoingProjects) {
      expect(project.stage).toBe("Private research");
      expect(project.description.length).toBeGreaterThan(40);
      expect(project.question.length).toBeGreaterThan(30);
      expect(project).not.toHaveProperty("repo");
      expect(project).not.toHaveProperty("url");
      expect(project).not.toHaveProperty("href");
    }
  });

  it("preserves public OpenCoder identity while withholding its curated code-release action", () => {
    const coder = publicProjects.find(p => p.name === "OpenCoder");
    expect(coder?.repo).toBe("OpenCoder");
    expect(coder?.release).toBe("coming-soon");
    expect(coder?.stage).toBe("In development");
    expect(publicProjects.filter(p => p.release === "coming-soon")).toHaveLength(1);
    expect(publicProjects.length).toBe(9);
  });
});

describe("professional opportunities and optional research support", () => {
  it("includes a scannable-sized owner-provided WeChat QR without external payment checkout", () => {
    expect(wechatQrSize).toBe(45);
    expect(wechatQrPath.startsWith("M")).toBe(true);
    expect(wechatQrPath.length).toBeGreaterThan(1500);
    expect(researchSupport.wechatRecipient).toContain("Rocky 文浩");
    expect(researchSupport.wechatHelp).toContain("Check the recipient");
    expect(researchSupport.disclaimer).toContain("personal");
  });

  it("uses the exact recipient email supplied by the owner without inventing a payment account URL", () => {
    expect(identity.paypalEmail).toBe("sahchandan98@gmail.com");
    expect(identity.email).toBe("sahchandan98@buaa.edu.cn");
    expect(identity.orcid).toBe("https://orcid.org/0009-0002-4017-7970");
    expect(identity.paypalEmail).not.toBe(identity.email);
    expect(researchSupport.paypalLogo).toMatch(/^https:\/\/www\.paypalobjects\.com\//);
    expect(researchSupport.paypalHomepage).toBe("https://www.paypal.com/");
    expect(researchSupport.googlePayMark).toBe("https://developers.google.com/static/pay/api/images/brand-guidelines/google-pay-mark.png");
    expect(researchSupport.googlePayAvailability).toContain("An email address alone is not a universal Google Pay payment identifier");
    expect(researchSupport.disclaimer).toContain("not a tax-deductible");
  });

  it("distinguishes current collaborations from future postdoctoral opportunities", () => {
    expect(opportunityTracks.length).toBe(4);
    expect(new Set(opportunityTracks.map(track => track.title)).size).toBe(opportunityTracks.length);
    expect(opportunityTracks.some(track => track.title.includes("Visiting"))).toBe(true);
    expect(opportunityTracks.some(track => track.title.includes("Industry"))).toBe(true);
    expect(opportunityTracks.some(track => track.title.includes("Future"))).toBe(true);
    for (const track of opportunityTracks) {
      expect(track.summary.length).toBeGreaterThan(45);
    }
  });
});
