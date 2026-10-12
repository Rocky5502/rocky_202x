import { describe, expect, it } from "vitest";
import { publications, conferenceRankings } from "@/data/portfolio";
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
    expect(conferenceRankings.ASE).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.CVPR).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.ICCV).toMatchObject({ ccf: "A", icore: "A*" });
    expect(conferenceRankings.CSEET).toMatchObject({ icore: "C" });
    expect(conferenceRankings.CSEET.ccf).toBeUndefined();
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
