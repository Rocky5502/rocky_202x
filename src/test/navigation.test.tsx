import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { publications, researchAreas } from "@/data/portfolio";
import App from "@/App";
import PortfolioSite from "@/components/PortfolioSite";

Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });

describe("research agenda", () => {
  it("covers five author-selected directions including SE for AI and trustworthy AI", () => {
    expect(researchAreas).toHaveLength(5);
    expect(new Set(researchAreas.map(area => area.name)).size).toBe(5);
    expect(researchAreas.some(area => area.name === "Software engineering for AI")).toBe(true);
    expect(researchAreas.some(area => area.name === "Trustworthy AI & agent safety")).toBe(true);
    expect(researchAreas.find(area => area.name === "AI for software engineering")).toBeDefined();
  });

  it("renders all five homepage research areas in the intended order", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Research directions" })).toBeInTheDocument();
    const headings = researchAreas.map(area => screen.getByRole("heading", { name: area.name }));
    expect(headings).toHaveLength(5);
    expect(screen.getAllByRole("link", { name: "Opportunities" }).length).toBeGreaterThan(0);
  });
});

describe("Projects directory, privacy and release status", () => {
  it("keeps private research previews distinct from public repository cards", () => {
    render(<MemoryRouter initialEntries={["/projects"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Research projects", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Public research & code" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ongoing research · private" })).toBeInTheDocument();
    expect(document.querySelectorAll(".public-project-card:not(.ongoing-project-card)")).toHaveLength(9);
    expect(document.querySelectorAll(".ongoing-project-card")).toHaveLength(5);
    for (const card of Array.from(document.querySelectorAll(".ongoing-project-card"))) {
      expect(card.querySelector("a")).toBeNull();
      expect(card).toHaveTextContent("Private research · Code not public");
    }
    expect(screen.getByRole("heading", { name: "U-SMASH" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "UOpenAI / U-PROVE" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "NMI · Epistemic Conservation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "TrajUQ" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "U-FLOW" })).toBeInTheDocument();
  });
  it("replaces OpenCoder repository link with a non-clickable coming-soon notice", () => {
    render(<MemoryRouter initialEntries={["/projects"]}><PortfolioSite /></MemoryRouter>);
    const card = screen.getByRole("heading", { name: /^OpenCoder$/ }).closest("article");
    expect(card).not.toBeNull();
    expect(card).toHaveTextContent("Code release coming soon");
    expect(card?.querySelector('a[href*="/OpenCoder"]')).toBeNull();
    expect(document.querySelectorAll('a.project-repo-link')).toHaveLength(8);
    fireEvent.click(screen.getByRole("button", { name: "Trustworthy AI" }));
    expect(document.querySelectorAll(".ongoing-project-card")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "NMI · Epistemic Conservation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "U-FLOW" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "TrajUQ" })).not.toBeInTheDocument();
  });
});

describe("academic introduction and Web of Science ResearcherID", () => {
  const researcherProfile = "https://www.webofscience.com/wos/author/record/JVY-7383-2024";

  it("presents the short Nepal and Chinese Government Scholarship introduction", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByText(/Originally from Nepal 🇳🇵 and based in China since April 2018/)).toBeInTheDocument();
    expect(screen.getByText(/His research examines uncertainty in language models/)).toBeInTheDocument();
    expect(document.querySelector(".hero-description")).not.toHaveTextContent("Chandan Kumar Sah");
    expect(screen.getByText("Advancing reliable AI through uncertainty, evidence, and verification.")).toBeInTheDocument();
    const record = document.querySelector(".portrait-research-record");
    expect(record).not.toBeNull();
    expect(record).toHaveAttribute("href", "/publications");
    expect(record).toHaveTextContent(`${publications.length}+`);
    expect(record).toHaveTextContent("Research works");
    expect(record).not.toHaveTextContent("preprints");
    expect(record?.querySelector("small")).toBeNull();
    expect(publications).toHaveLength(13);
    expect(publications.some(p => p.type === "Preprint")).toBe(true);
    expect(publications.some(p => p.type === "Book chapter")).toBe(true);
    expect(publications.some(p => p.status?.includes("author-reported"))).toBe(true);
    const highlightList = document.querySelector(".portrait-highlight-list");
    expect(highlightList).not.toBeNull();
    expect(highlightList?.querySelectorAll("li")).toHaveLength(6);
    expect(highlightList).toHaveTextContent("Outstanding Reviewer · ECIR 2026");
    expect(highlightList).toHaveTextContent("Senior PC · ECIR 2027");
    expect(highlightList).toHaveTextContent("2nd Place (Graduate) · ACM SRC, ASE 2025");
    expect(highlightList).not.toHaveTextContent("†");
    expect(highlightList).toHaveTextContent("Excellent Paper · AUA Postgraduate Forum");
    expect(highlightList).toHaveTextContent("Scholarships · 2 CSC + Belt and Road");
    expect(highlightList).toHaveTextContent("Excellent International Graduate · Beihang");
    expect(document.querySelector(".portrait-highlights-note")).toBeNull();
    expect(screen.getByRole("link", { name: "Recognition details" })).toHaveAttribute("href", "/recognition");
  });

  it("links the author-supplied ResearcherID to a direct Web of Science profile", () => {
    render(<MemoryRouter initialEntries={["/service"]}><PortfolioSite /></MemoryRouter>);
    const links = screen.getAllByRole("link", { name: "Web of Science Researcher Profile" });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links.every(link => link.getAttribute("href") === researcherProfile)).toBe(true);
    expect(screen.getByText("Web of Science ResearcherID: JVY-7383-2024")).toBeInTheDocument();
  });
});

describe("academic service redesign", () => {
  it("presents one non-duplicated reviewing figure, AIES service and professional memberships", () => {
    render(<MemoryRouter initialEntries={["/service"]}><PortfolioSite /></MemoryRouter>);
    const review = document.querySelector(".review-evidence");
    expect(review).not.toBeNull();
    expect(review?.querySelectorAll(".review-value")).toHaveLength(1);
    expect(review).toHaveTextContent("5");
    expect(review).toHaveTextContent("Distinct manuscripts reviewed");
    expect(screen.getByText("AAAI/ACM AIES 2025")).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("Review rounds reported in Web of Science");
    expect(document.body).not.toHaveTextContent("These researcher-supplied records may overlap");
    expect(document.body).not.toHaveTextContent("Venue names below describe reviewing service");
    expect(document.body).not.toHaveTextContent("Reviewing venues are listed for professional recognition only");
    expect(screen.getByRole("heading", { name: "Memberships" })).toBeInTheDocument();
    const serviceText = document.querySelector("main")?.textContent ?? "";
    expect(serviceText.indexOf("Memberships")).toBeLessThan(serviceText.indexOf("Reviewer roles"));
    const membershipCards = document.querySelectorAll(".membership-item");
    expect(membershipCards).toHaveLength(2);
    expect(membershipCards[0]).toHaveTextContent("International Association for Safe & Ethical AI");
    expect(membershipCards[1]).toHaveTextContent("Association for Computing Machinery");
    const logos = document.querySelectorAll<HTMLImageElement>(".membership-logo img");
    expect(logos).toHaveLength(2);
    expect(Array.from(logos).every(img=>{
      const src=img.getAttribute("src")??"";
      return src.includes("/associations/") || src.startsWith("data:image/svg+xml,") || src.startsWith("data:image/png;base64,");
    })).toBe(true);
    expect(Array.from(logos).every(img=>!img.src.includes("google.com"))).toBe(true);
    expect(document.querySelectorAll(".membership-actions a")).toHaveLength(4);
    expect(document.body).toHaveTextContent("Nov 2025 – Present");
    expect(document.body).toHaveTextContent("Jul 2024 – Present");
  });
});

describe("navigation usability", () => {
  it("keeps Projects and Recognition inside the five-card CV overview, not the main menu", () => {
    render(<MemoryRouter initialEntries={["/cv"]}><PortfolioSite /></MemoryRouter>);
    const primary = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(within(primary).queryByRole("link", { name: "Recognition" })).not.toBeInTheDocument();
    expect(within(primary).queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
    expect(within(primary).getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv");
    const card = document.querySelector<HTMLAnchorElement>('a.cv-layer-card[href="/recognition"]');
    expect(card).not.toBeNull();
    expect(card).toHaveTextContent("Recognition");
    const projectsCard = document.querySelector<HTMLAnchorElement>('a.cv-layer-card[href="/projects"]');
    expect(projectsCard).not.toBeNull();
    expect(projectsCard).toHaveTextContent("Projects");
  });

  it("updates document titles and descriptions for each section", () => {
    const titleBefore = document.title;
    const { unmount } = render(<MemoryRouter initialEntries={["/research"]}><PortfolioSite /></MemoryRouter>);
    expect(document.title).toBe("Research Directions | Chandan Kumar Sah");
    unmount();
    render(<MemoryRouter initialEntries={["/publications"]}><PortfolioSite /></MemoryRouter>);
    expect(document.title).toBe("Publications | Chandan Kumar Sah");
    expect(document.title).not.toBe(titleBefore);
  });

  it("opens the mobile menu by keyboard and closes it with Escape, restoring focus", () => {
    render(<MemoryRouter initialEntries={["/"]}><PortfolioSite /></MemoryRouter>);
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    trigger.focus();
    fireEvent.click(trigger);
    const mobile = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(mobile).toBeInTheDocument();
    expect(within(mobile).queryByRole("link", { name: "Recognition" })).not.toBeInTheDocument();
    expect(within(mobile).queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
    expect(within(mobile).getByRole("link", { name: "Home" })).toHaveFocus();
    const close = screen.getByRole("button", { name: "Close navigation" });
    expect(close).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveFocus();
  });

  it("does not show an unrelated personal ORCID in researcher identity", () => {
    const { unmount } = render(<MemoryRouter initialEntries={["/service"]}><PortfolioSite /></MemoryRouter>);
    const orcidLinks = screen.getAllByRole("link", { name: "ORCID" });
    expect(orcidLinks.every(link => link.getAttribute("href") === "https://orcid.org/0009-0002-4017-7970")).toBe(true);
    unmount();
  });
});

describe("GitHub Pages routes", () => {
  it("keyboard skip-to-content preserves hash-router navigation and focuses main", () => {
    window.history.replaceState({}, "", "/rocky_202x/#/cv/education");
    render(<App />);
    const skip = screen.getByRole("link", { name: "Skip to content" });
    expect(skip).toHaveAttribute("href", "#main-content");
    fireEvent.click(skip);
    expect(window.location.hash).toBe("#/cv/education");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(screen.getByRole("heading", { name: "Education", level: 1 })).toBeInTheDocument();
  });


  it("renders the actual #/connect address without a 404", () => {
    window.history.replaceState({}, "", "/rocky_202x/#/connect");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Opportunities & support" })).toBeInTheDocument();
    const supportSummary = screen.getByText("Support open, responsible AI research").closest("summary");
    expect(supportSummary).not.toBeNull();
    const supportDetails = supportSummary?.closest("details");
    expect(supportDetails).not.toHaveAttribute("open");
    // JSDOM exposes descendants of a closed native <details>; real Chromium
    // verifies the payment controls are not visually/accessibility-visible.
    fireEvent.click(supportSummary!);
    expect(supportDetails).toHaveAttribute("open");
    expect(screen.getByRole("textbox", { name: /PayPal support email address/ })).toHaveValue("sahchandan98@gmail.com");
    expect(screen.getByRole("textbox", { name: /Google Pay contact email address/ })).toHaveValue("sahchandan98@gmail.com");
    expect(screen.getByText(/An email address is not a universal Google Pay transfer ID/i)).toBeInTheDocument();
    const wechatQr = screen.getByRole("img", { name: "WeChat Pay receiving QR code supplied by the researcher" });
    expect(wechatQr.tagName.toLowerCase()).toBe("svg");
    expect(wechatQr).toHaveAttribute("viewBox", "0 0 45 45");
    expect(wechatQr.querySelector("path")?.getAttribute("d")?.length).toBeGreaterThan(1500);
    expect(screen.getByText("Rocky 文浩 (***R)")).toBeInTheDocument();
    expect(screen.getByText(/Check the recipient shown inside WeChat Pay/)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Page not found" })).not.toBeInTheDocument();
  });

  it("recovers the older /opportunities route", async () => {
    render(<MemoryRouter initialEntries={["/opportunities"]}><PortfolioSite /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "Opportunities & support" })).toBeInTheDocument();
  });

  it("recovers /contact, /support and /research-areas aliases", async () => {
    for (const [path, expected] of [
      ["/contact", "Opportunities & support"],
      ["/support", "Opportunities & support"],
      ["/research-areas", "Research & projects"],
    ] as const) {
      const { unmount } = render(<MemoryRouter initialEntries={[path]}><PortfolioSite /></MemoryRouter>);
      expect(await screen.findByRole("heading", { name: expected })).toBeInTheDocument();
      unmount();
    }
  });

  it("replaces the dead-end 404 with working navigation to live sections", () => {
    render(<MemoryRouter initialEntries={["/unknown-page"]}><PortfolioSite /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Let's get you to the right page" })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Alternative pages" });
    expect(within(nav).getByRole("link", { name: "Opportunities" })).toHaveAttribute("href", "/connect");
    expect(within(nav).getByRole("link", { name: "Research" })).toHaveAttribute("href", "/research");
  });
});
