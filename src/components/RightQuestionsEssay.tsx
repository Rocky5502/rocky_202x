import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, MapPin, Printer } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { nobelMeetingsCollage } from "@/assets/nobelMeetingsCollage";
import { useLanguage } from "@/i18n/LanguageProvider";
import "@/questions-essay.css";

export const questionsEssayPath = "/notes/are-we-asking-the-right-questions";
export const originalLinkedInPost = "https://lnkd.in/p/gewSs94Q";

const article = {
  en: {
    category: "Personal essay / Science & curiosity",
    title: "Are We Asking the Right Questions?",
    subtitle: "A kid from Nepal, encounters with Nobel laureates, and the question that stayed with me.",
    date: "March 25, 2026",
    place: "Beijing, China",
    byline: "Chandan Kumar Sah",
    lead: "Long before I knew how to write a research paper, I knew what it felt like to wonder. Somewhere between the child I was in Nepal and the researcher I am becoming, I learned that a good question can quietly change the direction of a life.",
    collageCaption: "Moments from conferences and scientific gatherings. A personal photo collage shared with the original reflection.",
    authorCaption: "Chandan Kumar Sah · Doctoral researcher",
    photoAlt: "The author's collage of photographs from scientific conferences, featuring conversations and gatherings",
    back: "All research notes",
    original: "Original LinkedIn reflection",
    print: "Print / Save",
    sections: [
      {
        heading: "A kid from Nepal",
        paragraphs: [
          "As a child growing up in Nepal, I could not have imagined the many places that curiosity would eventually take me. The great names in scientific textbooks felt distant, and the world of international conferences belonged to a future I could barely picture. Still, questions had a way of making that distance feel smaller.",
          "I did not begin this journey with a Nobel Prize in mind. I began with the simple belief that there was more to understand—and with the hope that learning could open a door I had not yet seen.",
        ],
      },
      {
        heading: "The rooms I once only imagined",
        paragraphs: [
          "Years later, through academic conferences and scientific gatherings, I had opportunities to encounter researchers whose discoveries have changed how we understand the world: Arieh Warshel, Giorgio Parisi, James J. Heckman, Konstantin Novoselov, Svante Pääbo, Serge Haroche, Thomas J. Sargent, Geoffrey Hinton, and Didier Queloz.",
          "Their work spans physics, chemistry, medicine, economics, and artificial intelligence. Mine is a much earlier chapter. I was there as a learner, grateful for the opportunity to listen, exchange a few words when possible, and observe people whose questions had already opened new fields of knowledge.",
          "There are photographs from some of those moments. I treasure them. But a photograph is not a collaboration, nor does meeting an accomplished scientist make me accomplished by association. The real value lies in what I choose to learn afterward.",
        ],
      },
      {
        heading: "What impressed me was not the prize",
        paragraphs: [
          "Of course, the Nobel Prize represents extraordinary scientific achievement. Yet what stayed with me was something less visible than a medal or a title: the mindset behind decades of work.",
          "Curiosity that survives uncertainty. Persistence when the first explanation fails. Creativity to approach an old problem differently. And, perhaps most importantly, the discipline to ask whether the question itself is the right one.",
          "I am not claiming that these scientists all offered me the same advice. This is my own reflection on the encounters and the research careers they brought into view. The deepest lesson I took away was not about recognition. It was about how discovery begins.",
        ],
      },
      {
        heading: "The courage to say, ‘I don't know’",
        paragraphs: [
          "My own research now explores uncertainty in artificial intelligence. I find myself asking: When a language model sounds certain, what does it actually know? When evidence is repeated, are we learning something new—or only hearing the same claim louder? When should an intelligent system seek more evidence, verify, or admit its limits?",
          "The questions are technical, but the principle feels deeply human. Progress sometimes starts with admitting that an answer is incomplete. A scientist's task is not to defend the first idea indefinitely; it is to remain loyal to the evidence, even when the evidence changes the story.",
          "I want to become the kind of researcher who is willing to spend years with a difficult question, and just as willing to change direction when the facts demand it.",
        ],
      },
      {
        heading: "What I would tell my younger self",
        paragraphs: [
          "If I could speak to that younger kid in Nepal, I would not promise him prizes, fame, or an easy road. I would tell him to keep his questions. To read beyond what is assigned. To be patient with slow progress. To meet people with respect, not awe alone. And to remember that the value of a scientific life is measured by what it contributes, not whom it has stood beside.",
          "Some days, a photograph can remind us how far we have travelled. On harder days, the more important reminder is that our journey is not finished.",
        ],
      },
      {
        heading: "So, are we asking the right questions?",
        paragraphs: [
          "I hope I never become too certain of the answer.",
          "The world does not need me to imitate the lives of Nobel laureates. It needs researchers, wherever they come from, who are curious enough to notice a problem, careful enough to test an idea, and courageous enough to be wrong.",
          "From a kid in Nepal to a PhD researcher in Beijing, that is the lesson I want to carry forward: better questions do not guarantee easy answers. They make deeper knowledge possible.",
        ],
      },
    ],
    quote: "A photograph can record whom I met. Only the work I do afterward can reveal what I learned.",
    closing: "Stay curious. Stay humble. Keep asking.",
    footnote: "This is an expanded personal essay based on a LinkedIn reflection dated March 25, 2026. Conference encounters mentioned here do not imply research collaboration, endorsement, or personal mentorship. This account expresses the author's own impressions; it does not attribute quotations or views to the named scientists.",
    more: "Continue reading",
    nextTitle: "In Love with the Unknown",
    nextSubtitle: "My 10 Rules for PhD Research in the Age of AI",
  },
  zh: {
    category: "个人随笔 / 科学与好奇心",
    title: "我们是否提出了正确的问题？",
    subtitle: "从尼泊尔的孩子到与诺贝尔奖得主相遇：那些一直留在我心中的问题。",
    date: "2026年3月25日",
    place: "中国·北京",
    byline: "Chandan Kumar Sah",
    lead: "早在学会写科研论文之前，我就懂得好奇是什么感觉。从尼泊尔的童年，到今天逐渐成长为一名研究者，我越来越相信：一个真正好的问题，可以悄悄改变一个人的人生方向。",
    collageCaption: "学术会议与科研交流活动中的片刻。本文使用作者原始随笔中分享的个人照片拼图。",
    authorCaption: "Chandan Kumar Sah · 博士研究生",
    photoAlt: "作者在不同学术会议和科研交流活动中的照片拼图",
    back: "返回科研随笔",
    original: "阅读原始 LinkedIn 动态",
    print: "打印 / 保存",
    sections: [
      {
        heading: "一个来自尼泊尔的孩子",
        paragraphs: [
          "小时候在尼泊尔成长的我，从未想过好奇心会把我带到那么多地方。教科书里那些伟大科学家的名字似乎遥不可及，国际学术会议更像是一个难以想象的未来。但只要心中还有问题，远方就似乎不再那么遥远。",
          "我的旅程并非始于诺贝尔奖的梦想，而是一个朴素的信念：这个世界还有许多值得理解的事情，学习或许能够打开一扇尚未看见的门。",
        ],
      },
      {
        heading: "曾经只敢想象的会议大厅",
        paragraphs: [
          "多年之后，我有机会在学术会议和科研交流活动中与一些改变了人类认识的科学家相遇，包括 Arieh Warshel、Giorgio Parisi、James J. Heckman、Konstantin Novoselov、Svante Pääbo、Serge Haroche、Thomas J. Sargent、Geoffrey Hinton 和 Didier Queloz。",
          "他们的贡献跨越物理、化学、医学、经济学和人工智能。相比之下，我的科研故事还在开篇。我以学习者的身份参与其中，有机会聆听、在合适的时候交流几句，并观察那些曾以重要问题开启新知识领域的人。",
          "我很珍惜一些现场照片。但合影不等于合作，见过杰出的科学家也不会让我自动变得杰出。真正重要的，是离开会场以后我选择学到什么。",
        ],
      },
      {
        heading: "最令我难忘的不是奖项",
        paragraphs: [
          "诺贝尔奖当然代表了非凡的科学成就。但比起奖牌和头衔，更让我难忘的是那些在漫长科研岁月中形成的品质。",
          "面对未知依然保持好奇；第一次解释失败之后仍坚持探索；用创造力重新审视旧问题；更重要的是，敢于反问：我们提出的问题本身，真的正确吗？",
          "我并不是说这些科学家都亲口给过我同样的建议。这是我从交流经历和他们的科研道路中获得的个人体会。我得到的最深刻的启发，不是如何获得认可，而是如何开始一次真正的发现。",
        ],
      },
      {
        heading: "勇敢地说出“我不知道”",
        paragraphs: [
          "如今，我的研究涉及人工智能系统中的不确定性。我经常思考：当语言模型表现得很确定时，它究竟知道什么？当证据被重复时，我们是真的获得了新知识，还是只是让同一种声音变得更响亮？智能系统又应该在何时寻找更多证据、进行验证，或者坦诚承认自己的局限？",
          "这些问题看起来很技术化，但背后的道理同样属于人类。有时，进步从承认答案尚不完整开始。科学家的职责，不是永远捍卫最初的想法，而是在证据改变故事时，依然忠于证据。",
          "我希望成为一名愿意为困难问题坚持多年、也愿意在事实要求时改变方向的研究者。",
        ],
      },
      {
        heading: "如果我能对童年的自己说句话",
        paragraphs: [
          "如果能和尼泊尔那个年少的自己对话，我不会许诺奖项、名望或一条轻松的道路。我会告诉他：保留你的问题；阅读课本之外的世界；耐心面对缓慢的进步；以尊重而非盲目崇拜去接近他人。更要记住，科研人生的价值在于创造了什么贡献，而不是曾与谁并肩合影。",
          "有些日子，照片能提醒我们已经走过多远。更困难的时候，我们还需要记得：旅程仍在继续。",
        ],
      },
      {
        heading: "所以，我们是否提出了正确的问题？",
        paragraphs: [
          "我希望自己永远不会对答案过于自信。",
          "这个世界不需要我复制诺贝尔奖得主的人生。它需要来自不同地方的研究者：有好奇心发现问题，有严谨态度检验想法，也有勇气承认错误。",
          "从尼泊尔的孩子，到北京的博士研究生，我想把这条信念一直带下去：更好的问题并不保证更容易的答案，但它们让更深刻的知识成为可能。",
        ],
      },
    ],
    quote: "照片能记录我遇见过谁。只有此后的努力，才能说明我真正学到了什么。",
    closing: "保持好奇，保持谦逊，不断追问。",
    footnote: "本文扩写自作者发表于2026年3月25日的 LinkedIn 个人感想。文中所述会议交流并不代表科研合作、背书或私人导师关系；文中观点均为作者个人体会，不应理解为对相关科学家言论的引用。",
    more: "继续阅读",
    nextTitle: "热爱未知",
    nextSubtitle: "人工智能时代，我的十条博士科研准则",
  },
} as const;

export default function RightQuestionsEssay() {
  const { language } = useLanguage();
  const c = language === "zh-CN" ? article.zh : article.en;
  return (
    <article className="questions-page" data-no-translate>
      <div className="questions-wrap">
        <nav className="questions-breadcrumb" aria-label="Research notes breadcrumb">
          <Link to="/notes"><ArrowLeft size={15} aria-hidden="true" />{c.back}</Link>
        </nav>
        <header className="questions-header">
          <p className="eyebrow">{c.category}</p>
          <h1>{c.title}</h1>
          <p className="questions-subtitle">{c.subtitle}</p>
          <div className="questions-meta">
            <span><CalendarDays size={14} aria-hidden="true"/><time dateTime="2026-03-25">{c.date}</time></span>
            <span><MapPin size={14} aria-hidden="true"/>{c.place}</span>
            <span>{c.byline}</span>
          </div>
          <p className="questions-lead">{c.lead}</p>
        </header>
        <figure className="questions-document">
          <div className="questions-montage-frame">
            <img src={nobelMeetingsCollage} alt={c.photoAlt} width={192} height={192} />
          </div>
          <figcaption>{c.collageCaption} <a href={originalLinkedInPost} rel="noopener noreferrer" target="_blank">{c.original}<ArrowUpRight size={13} aria-hidden="true" /></a></figcaption>
        </figure>
        <div className="questions-essay-body">
          {c.sections.map((section, index) => (
            <section key={index} className="questions-chapter">
              <p className="questions-chapter-number">{String(index + 1).padStart(2, "0")} / 06</p>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              {index === 2 && <blockquote className="questions-pullquote"><p>“{c.quote}”</p></blockquote>}
            </section>
          ))}
          <p className="questions-signoff">{c.closing}</p>
          <div className="questions-author"><img src={portrait} alt="" width={52} height={52} loading="lazy" decoding="async"/><div><strong>{c.byline}</strong><span>{c.authorCaption}</span></div></div>
        </div>
        <div className="questions-endmatter">
          <p>{c.footnote}</p>
          <div className="questions-actions">
            <a href={originalLinkedInPost} rel="noopener noreferrer" target="_blank">{c.original}<ArrowUpRight size={15} aria-hidden="true" /></a>
            <button type="button" onClick={() => window.print()}><Printer size={15} aria-hidden="true"/>{c.print}</button>
          </div>
        </div>
        <Link className="questions-next" to="/notes/ten-rules-phd-research-ai">
          <span><span className="eyebrow">{c.more}</span><strong>{c.nextTitle}</strong><span>{c.nextSubtitle}</span></span><ArrowRight size={22} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
