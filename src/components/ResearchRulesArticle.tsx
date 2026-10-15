import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Compass,
  FlaskConical, HeartPulse, MessageCircle, NotebookPen, PenLine,
  Printer, Target, type LucideIcon,
} from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { useLanguage } from "@/i18n/LanguageProvider";
import NotesNavigation from "@/components/NotesNavigation";
import ArticleEngagement from "@/components/ArticleEngagement";
import "@/research-rules.css";

type Rule = {
  title: string;
  text: string;
  practice: string;
  visual: string;
  Icon: LucideIcon;
};

const icons = [Target, Clock3, PenLine, BookOpen, FlaskConical, NotebookPen, MessageCircle, CheckCircle2, HeartPulse, Compass] as const;

const english = {
  section: "Personal research manifesto · 2026",
  title: "In Love with the Unknown",
  subtitle: "My 10 Rules for PhD Research in the Age of AI",
  date: "October 15, 2026",
  place: "Beijing, China",
  quote: "I love uncertainty. It makes me excited about my future.",
  introduction: "I wrote these rules as a promise to myself: to pursue meaningful discoveries without confusing activity with progress, or prestige with scientific truth. They guide my work through December 2026—and, I hope, for the decades that follow.",
  daily: "My daily practice",
  noteTitle: "A promise to my future self",
  note: "Do work that survives scrutiny. Ask better questions. Welcome evidence that proves me wrong. Protect my health, my curiosity, and the people around me. The goal is not to look like a scientist; the goal is to become a better one.",
  acknowledgement: "Editorial acknowledgment",
  thanks: "These principles grew out of a personal reflection and conversation with ChatGPT, which assisted with structure, wording, and grammar. The final article was reviewed and approved by Chandan Kumar Sah.",
  photoAlt: "Portrait of Chandan Kumar Sah",
  photoCaption: "Chandan Kumar Sah · PhD researcher",
  back: "Back to homepage",
  print: "Print or save as PDF",
  reminder: "To reread when the work gets difficult.",
  rules: [
    { title: "Commit to one important question", text: "A meaningful scientific question deserves time and depth. I will choose work for its significance, not its glamorous destination, and resist scattering my best thinking across too many projects.", practice: "Name the single question that deserves my best attention today.", visual: "Target: concentrated research direction" },
    { title: "Defend four hours of deep work", text: "More hours do not guarantee more insight. I will protect two uninterrupted sessions for reasoning, experiments, and analysis, with distractions and notifications put aside.", practice: "Schedule two focused blocks; measure understanding rather than busyness.", visual: "Clock: protected deep work" },
    { title: "Think independently in the age of AI", text: "AI can accelerate code, writing, and exploration, but it cannot take responsibility for my scientific judgment. I must understand, derive, verify, and defend the claims bearing my name.", practice: "Spend time solving one hard problem without an AI assistant.", visual: "Pen: independent reasoning" },
    { title: "Read deeply, not endlessly", text: "I would rather understand one foundational paper than skim twenty titles. I will reconstruct its question, assumptions, strongest evidence, shortcomings, and opportunities to go further.", practice: "Write a short critical reading note about one important paper.", visual: "Open book: careful scholarship" },
    { title: "Try to falsify my favorite idea", text: "The strongest experiment is not the one that flatters my hypothesis. I will test hard alternatives, reproduce solid baselines, examine failures, and be willing to report negative or inconclusive results.", practice: "Ask what observation would prove my current explanation wrong.", visual: "Flask: scientific falsification" },
    { title: "Keep a dated discovery log", text: "A busy repository is not a record of knowledge. I will document predictions, methods, evidence, errors, and what actually changed in my understanding—so another researcher can follow the reasoning.", practice: "Record today's prediction, observation, and next test.", visual: "Notebook: traceable evidence" },
    { title: "Invite difficult criticism", text: "A serious researcher needs people who challenge assumptions, not just people who applaud ambition. I will present my strongest claim clearly and actively seek the objection I most need to hear.", practice: "Write down one weakness I would ask a skeptical reviewer to investigate.", visual: "Conversation: honest feedback" },
    { title: "Finish a milestone before expanding", text: "New ideas will keep arriving; time will not. I will maintain an idea parking lot and finish defined, independently checked milestones before opening another substantial research front.", practice: "Advance one verifiable milestone before adding a new commitment.", visual: "Check mark: complete and verify" },
    { title: "Protect the mind doing the research", text: "Sleep, movement, relationships, and recovery are not rewards after success. They are the conditions that make careful, original thinking possible over a long research career.", practice: "Move, eat, rest, and make room for a life beyond the lab.", visual: "Heart: long-term wellbeing" },
    { title: "Chase discovery, never just a logo", text: "A prestigious venue may recognize a contribution, but it does not create one. I will ask whether my work changes understanding, withstands skeptical scrutiny, and matters beyond a narrow benchmark.", practice: "Explain the real-world importance of my question in two honest sentences.", visual: "Compass: scientific purpose" },
  ] satisfies Array<Omit<Rule, "Icon">>,
};

const chinese = {
  section: "个人科研宣言 · 2026",
  title: "热爱未知",
  subtitle: "人工智能时代，我的十条博士科研准则",
  date: "2026年10月15日",
  place: "中国·北京",
  quote: "我热爱不确定性，因为它让我对未来充满期待。",
  introduction: "我写下这些准则，是给自己的承诺：追求有意义的发现，不把忙碌误当成进展，不把名望误当成科学真理。它们将指引我走过2026年12月，并希望陪伴我之后数十年的科研道路。",
  daily: "我的每日行动",
  noteTitle: "写给未来自己的承诺",
  note: "做经得起检验的研究，提出更好的问题，欢迎推翻自己观点的证据。照顾好健康、好奇心以及身边的人。目标不是看起来像科学家，而是真正成长为更好的科学家。",
  acknowledgement: "编辑致谢",
  thanks: "这些准则源于个人反思和与 ChatGPT 的交流。ChatGPT 协助整理结构、润色表达和修改语法。最终内容由 Chandan Kumar Sah 审阅并认可。",
  photoAlt: "Chandan Kumar Sah 的照片",
  photoCaption: "Chandan Kumar Sah · 博士研究生",
  back: "返回首页",
  print: "打印或保存为 PDF",
  reminder: "在研究最困难的时候，重新读一遍。",
  rules: [
    { title: "专注一个重要的科学问题", text: "重要的科学问题值得时间和深度。我将根据研究意义而非目标期刊的光环选择课题，避免把最宝贵的思考分散在过多项目中。", practice: "说清今天最值得投入精力的那个问题。", visual: "靶心：聚焦研究方向" },
    { title: "每天守住四小时深度工作", text: "更长的工作时间不等于更多洞见。我会保留两段不受打扰的时间，用于推理、实验与分析，暂时放下通知和分心。", practice: "安排两段专注时间，用理解的深度而非忙碌程度衡量成果。", visual: "时钟：深度工作" },
    { title: "在 AI 时代保持独立思考", text: "AI 可以加快编程、写作和探索，但不能替我承担科学判断的责任。署有我名字的每项主张，我都应能理解、推导、验证和捍卫。", practice: "每天留出时间，不借助 AI 独立解决一个困难问题。", visual: "钢笔：独立推理" },
    { title: "深度阅读，而非无限浏览", text: "与其浏览二十篇文章的标题，不如真正读懂一篇关键论文。我将梳理其问题、假设、证据、局限，以及可以继续突破的地方。", practice: "针对一篇重要论文写简短的批判性阅读笔记。", visual: "书本：严谨阅读" },
    { title: "主动尝试推翻自己的假设", text: "最好的实验不是让假设看起来漂亮，而是能够严格检验它。我会测试竞争性解释、复现可靠基线、分析失败，并坦然报告否定或不确定的结果。", practice: "问自己：出现什么证据，才会证明当前解释是错的？", visual: "烧瓶：证伪精神" },
    { title: "记录有日期的发现日志", text: "大量代码提交不等于知识积累。我会记录预测、方法、证据、错误与理解上的真实变化，让其他研究者能够追溯推理过程。", practice: "写下今天的预测、观察与下一项检验。", visual: "笔记本：可追溯的证据" },
    { title: "主动邀请严厉的批评", text: "认真做科研，需要挑战假设的人，而不仅是赞美雄心的人。我会清楚展示最强的论点，主动寻找最需要面对的反对意见。", practice: "列出一处值得审稿人深入质疑的薄弱环节。", visual: "对话：真诚反馈" },
    { title: "完成一个里程碑，再扩展项目", text: "新想法永远不会缺少，但时间有限。我会建立想法清单，在开启新的重要研究方向之前，先完成有明确标准并经过检验的阶段性目标。", practice: "在增加新任务前，推进一个可验证的里程碑。", visual: "对勾：完成与验证" },
    { title: "保护做科研的身心", text: "睡眠、运动、人际关系和休息，并不是成功之后的奖赏，而是长期保持严谨思考和原创能力的基础。", practice: "运动、吃好、休息，也为实验室外的生活留出空间。", visual: "爱心：身心健康" },
    { title: "追求发现，而不是期刊标志", text: "重要期刊可以认可贡献，却无法凭空制造贡献。我会追问：研究是否真正改变认知，是否经得起质疑，是否超越狭窄的基准测试而具有意义？", practice: "用两句诚实的话解释这个问题为什么对现实世界重要。", visual: "指南针：科研初心" },
  ] satisfies Array<Omit<Rule, "Icon">>,
};

export const researchRulesPath = "/notes/ten-rules-phd-research-ai";

export default function ResearchRulesArticle() {
  const { language } = useLanguage();
  const c = language === "zh-CN" ? chinese : english;
  const rules: Rule[] = c.rules.map((r, i) => ({ ...r, Icon: icons[i] }));

  return (
    <article className="manifesto-page" data-no-translate>
      <div className="manifesto-container">
        <div className="manifesto-return"><Link to="/"><ArrowLeft size={15} aria-hidden="true" /> {c.back}</Link></div>
        <header className="manifesto-hero">
          <div className="manifesto-hero-copy">
            <p className="manifesto-eyebrow">{c.section}</p>
            <h1>{c.title}</h1>
            <p className="manifesto-subtitle">{c.subtitle}</p>
            <div className="manifesto-dateline">
              <time dateTime="2026-10-15">{c.date}</time><span aria-hidden="true">·</span><span>{c.place}</span>
            </div>
            <blockquote className="manifesto-quote">
              <p>“{c.quote}”</p>
              <cite>— Chandan Kumar Sah</cite>
            </blockquote>
          </div>
          <figure className="manifesto-portrait">
            <img src={portrait} alt={c.photoAlt} width="520" height="650" decoding="async" />
            <figcaption>{c.photoCaption}</figcaption>
          </figure>
        </header>
        <div className="manifesto-intro">
          <p>{c.introduction}</p>
          <button type="button" className="manifesto-print" onClick={() => window.print()}>
            <Printer size={16} aria-hidden="true" /> {c.print}
          </button>
        </div>
        <section className="manifesto-rules" aria-label={c.subtitle}>
          {rules.map((rule, i) => {
            const Icon = rule.Icon;
            return (
              <section className="manifesto-rule" key={i} id={`research-rule-${i+1}`} aria-labelledby={`rule-heading-${i+1}`}>
                <figure className={`manifesto-illustration manifesto-illustration-${i % 5}`} role="img" aria-label={rule.visual}>
                  <span className="manifesto-illustration-number" aria-hidden="true">{String(i+1).padStart(2, "0")}</span>
                  <span className="manifesto-orbit" aria-hidden="true" />
                  <Icon size={74} strokeWidth={1.15} aria-hidden="true" />
                  <span className="manifesto-illustration-caption" aria-hidden="true">RESEARCH / {String(i+1).padStart(2,"0")}</span>
                </figure>
                <div className="manifesto-rule-copy">
                  <span className="manifesto-rule-label">{String(i+1).padStart(2,"0")} / 10</span>
                  <h2 id={`rule-heading-${i+1}`}>{rule.title}</h2>
                  <p>{rule.text}</p>
                  <div className="manifesto-practice"><span className="manifesto-practice-heading">{c.daily}</span><p>{rule.practice}</p></div>
                </div>
              </section>
            );
          })}
        </section>
        <aside className="manifesto-conclusion">
          <p className="manifesto-eyebrow">{c.reminder}</p>
          <h2>{c.noteTitle}</h2>
          <p>{c.note}</p>
        </aside>
        <footer className="manifesto-colophon">
          <div><strong>{c.acknowledgement}</strong><p>{c.thanks}</p></div>
          <Link to="/">{c.back} <ArrowRight size={17} aria-hidden="true" /></Link>
        </footer>
        <ArticleEngagement articlePath={researchRulesPath} />
        <NotesNavigation currentPath={researchRulesPath}/>
      </div>
    </article>
  );
}
