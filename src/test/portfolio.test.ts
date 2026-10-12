import { describe, expect, it } from "vitest";
import { publications, conferenceRankings, identity } from "@/data/portfolio";
import { opportunityTracks, researchSupport } from "@/data/opportunities";
import { publicProjects, publicProjectUrl } from "@/data/projects";

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


describe("professional opportunities and optional research support", () => {
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
