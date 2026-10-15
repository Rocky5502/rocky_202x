import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { nobelMeetingsCollage } from "@/assets/nobelMeetingsCollage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { questionsEssayPath } from "@/components/RightQuestionsEssay";
import { researchRulesPath } from "@/components/ResearchRulesArticle";
import "@/questions-essay.css";
import { SixEssayCollection } from "@/components/SixResearchEssays";

const copies = {
  en: {
    kicker: "Personal writing / Research notes",
    title: "Notes from the Unknown",
    intro: "Occasional reflections on scientific curiosity, research, uncertainty, and the long road of becoming a better researcher. These are personal essays, not peer-reviewed scientific claims.",
    posts: [
      { title: "In Love with the Unknown", subtitle: "My 10 Rules for PhD Research in the Age of AI", date: "October 15, 2026 · Beijing, China", alt: "Portrait of Chandan Kumar Sah", path: researchRulesPath, src: portrait },
      { title: "Are We Asking the Right Questions?", subtitle: "A kid from Nepal, encounters with Nobel laureates, and what curiosity taught me.", date: "March 25, 2026 · Beijing, China", alt: "Collage of the author's conference photographs", path: questionsEssayPath, src: nobelMeetingsCollage },
    ],
    read: "Read essay",
  },
  zh: {
    kicker: "个人文章 / 科研随笔",
    title: "关于未知的笔记",
    intro: "关于科学好奇心、研究、不确定性，以及如何一步步成长为更好的研究者的个人随笔。它们是个人感想，而非经过同行评议的科研论断。",
    posts: [
      { title: "热爱未知", subtitle: "人工智能时代，我的十条博士科研准则", date: "2026年10月15日 · 中国北京", alt: "Chandan Kumar Sah 的个人肖像", path: researchRulesPath, src: portrait },
      { title: "我们是否提出了正确的问题？", subtitle: "从尼泊尔的孩子到与诺贝尔奖得主相遇，好奇心教会我的事。", date: "2026年3月25日 · 中国北京", alt: "作者在学术会议上的个人照片拼图", path: questionsEssayPath, src: nobelMeetingsCollage },
    ],
    read: "阅读文章",
  },
};

export default function NotesIndex() {
  const { language } = useLanguage();
  const c = language === "zh-CN" ? copies.zh : copies.en;
  return <section className="notes-index content-wrap interior-page" data-no-translate>
    <header className="notes-index-header">
      <p className="eyebrow">{c.kicker}</p>
      <h1>{c.title}</h1>
      <p>{c.intro}</p>
    </header>
    <SixEssayCollection />
    <div className="notes-index-prior-heading"><p className="eyebrow">{language === "zh-CN" ? "此前文章" : "Previously published reflections"}</p></div>
    <div className="notes-index-grid">
      {c.posts.map(item => <article className="notes-index-card" key={item.path}>
        <Link className="notes-index-thumb" to={item.path} aria-label={item.title}><img src={item.src} alt={item.alt} loading="lazy" decoding="async" width={270} height={270}/></Link>
        <div>
          <p className="notes-index-date">{item.date}</p>
          <h2><Link to={item.path}>{item.title}</Link></h2>
          <p className="notes-index-description">{item.subtitle}</p>
          <Link className="notes-index-more" to={item.path}>{c.read}<ArrowRight size={16} aria-hidden="true"/></Link>
        </div>
      </article>)}
    </div>
  </section>;
}
