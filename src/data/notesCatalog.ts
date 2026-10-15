import { essayPrefix, researchEssays } from "@/data/researchEssays";

type CatalogItem = {
  path: string;
  title: string;
  subtitle: string;
  titleZh: string;
  subtitleZh: string;
  label: string;
  labelZh: string;
  category: string;
  categoryZh: string;
  visual: { kind: "cover"; index: number } | { kind: "portrait" | "collage" };
};
const bySlug = (slug: string) => {
  const essay = researchEssays.find(item => item.slug === slug);
  if (!essay) throw new Error("Missing research essay: " + slug);
  return essay;
};
function essayEntry(slug: string): CatalogItem {
  const essay = bySlug(slug);
  return {
    path: essayPrefix + slug,
    title: essay.title, titleZh: essay.zh.title,
    subtitle: essay.subtitle, subtitleZh: essay.zh.subtitle,
    label: "Looking back · " + essay.retrospective,
    labelZh: "回望 · " + essay.zh.retrospective,
    category: essay.category, categoryZh: essay.zh.category,
    visual: { kind: "cover", index: essay.thumbnail },
  };
}
/** One clearly authored reading order, newest period first. Existing stable deep links are retained.
 * For new essays, dated periods are subjects reflected upon; page metadata retains
 * the real October 15, 2026 publication date.
 */
export const notesCatalog: CatalogItem[] = [
  essayEntry("when-ai-says-i-know"),
  {
    path: "/notes/ten-rules-phd-research-ai",
    title: "In Love with the Unknown", subtitle: "My 10 Rules for PhD Research in the Age of AI",
    titleZh: "热爱未知", subtitleZh: "人工智能时代，我的十条博士科研准则",
    label: "October 15, 2026", labelZh: "2026年10月15日",
    category: "Research philosophy", categoryZh: "科研理念",
    visual: {kind:"portrait"},
  },
  essayEntry("dear-younger-me-success-is-not-what-you-think"),
  {
    path: "/notes/are-we-asking-the-right-questions",
    title: "Are We Asking the Right Questions?",
    subtitle: "A kid from Nepal, Nobel laureate encounters, and the value of curiosity.",
    titleZh: "我们是否提出了正确的问题？",
    subtitleZh: "从尼泊尔的孩子到与诺贝尔奖得主相遇：关于好奇心的思考。",
    label: "March 25, 2026", labelZh: "2026年3月25日",
    category: "Personal perspective", categoryZh: "个人感想",
    visual: {kind:"collage"},
  },
  essayEntry("why-i-choose-to-study-uncertainty"),
  essayEntry("what-does-it-mean-to-be-a-scientist-in-the-age-of-ai"),
  essayEntry("the-experiments-that-failed"),
  essayEntry("the-boy-from-nepal-who-refused-to-stop-dreaming"),
];

export function getAdjacentNotes(path: string) {
  const i = notesCatalog.findIndex(item => item.path === path);
  if (i < 0) return {newer: undefined, older: undefined};
  return {newer: i > 0 ? notesCatalog[i-1] : undefined, older: i + 1 < notesCatalog.length ? notesCatalog[i+1] : undefined};
}
