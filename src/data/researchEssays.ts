/**
 * Six original first-person essays published as one collection on 15 October 2026.
 * Retrospective anchors are editorial themes, NOT fabricated historical publication dates.
 * Examples are explicitly illustrative; do not imply experiment results or personal events.
 */
export type EssaySection = { heading: string; paragraphs: string[] };
export type EssayReference = { label: string; href: string; note: string };
export type ResearchEssay = {
  slug: string; title: string; subtitle: string; category: string;
  retrospective: string; retrospectiveDescription: string;
  opening: string; sections: EssaySection[]; closing: string;
  takeaway: string; references?: EssayReference[]; thumbnail: number;
  zh: { title: string; subtitle: string; category: string; retrospective: string; retrospectiveDescription: string;
    opening: string; sections: EssaySection[]; closing: string; takeaway: string };
};
export const publishedOn = "2026-10-15";
export const publishedLabel = "October 15, 2026";
export const essayPrefix = "/notes/essays/";

export const researchEssays: ResearchEssay[] = [
  {
    slug: "when-ai-says-i-know",
    title: "When AI Says “I Know,” Should We Believe It?",
    subtitle: "The hidden danger of confident machines—and why knowing what we don't know matters.",
    category: "Scientific perspective", retrospective: "October 2026",
    retrospectiveDescription: "A question for the AI systems we are building",
    thumbnail: 0,
    opening: "Imagine asking an AI assistant a difficult question. Within seconds, it offers a beautifully structured explanation. The language is fluent. The reasoning sounds convincing. There is no visible hesitation. And yet one central fact may be false. I study uncertainty in language models because I believe this gap—between an answer that sounds trustworthy and one that deserves our trust—is among the most important problems in modern AI.",
    sections: [
      {heading:"The performance of knowing", paragraphs:[
        "A confident voice is persuasive. Human beings are influenced by fluency, and computer-generated fluency can be especially disarming: an answer arrives at astonishing speed, formatted as though the problem were already settled. But convincing expression and reliable evidence are different things. The model can produce a correct sentence, an incorrect sentence, and a plausible invention in strikingly similar prose.",
        "In technical settings, the distinction matters. A program may compile but violate a security assumption. A purported scholarly citation may have the shape of a real paper and still not exist. An explanation may describe the right general theory while reversing a crucial condition. We should not confuse the ease of generating an answer with the work required to justify it."
      ]},
      {heading:"What does confidence actually measure?", paragraphs:[
        "Calibration gives us one way to investigate this problem. If a system assigns 80% confidence to many comparable answers, roughly 80% of those answers should be correct for that confidence to be well calibrated. An isolated confidence number has little meaning until the procedure that produced it has been evaluated under relevant conditions.",
        "Research has shown that models can sometimes estimate the correctness of their answers or express uncertainty in words under specific training and evaluation settings. Kadavath and colleagues reported encouraging results on self-evaluation, alongside difficulties with generalizing knowledge estimates to new tasks. Lin, Hilton, and Evans found that uncertainty expressed in ordinary language could be trained to correspond to observed accuracy. These are important scientific findings, but they are not a universal guarantee that a confident model is correct."
      ]},
      {heading:"When five answers mean one thing", paragraphs:[
        "Suppose a model answers the same question repeatedly: 'Paris is the capital of France', 'France's capital is Paris', and 'The capital city is Paris'. The words vary, but the meaning does not. In a 2024 Nature paper, Farquhar and colleagues developed semantic entropy, examining uncertainty across the meanings of generated responses rather than merely their wording. Their method helped detect certain hallucinations in the tasks they tested.",
        "That insight is powerful precisely because it is limited. A model could repeat the same wrong answer every time. Agreement among its samples would not turn an unsupported claim into a fact. Consistency, calibration, correctness, and evidential grounding must be investigated separately."
      ]},
      {heading:"Evidence has a history", paragraphs:[
        "My own questions increasingly concern what happens after a system encounters new evidence. Imagine it retrieves six webpages supporting one claim. Does it have six independent reasons to believe the claim—or six copies of a single underlying source? This is an illustrative research problem, not a published result from my experiments. It asks whether systems can reason about where information came from, not merely how often it appears.",
        "Retrieval can improve an answer when it brings relevant, reliable information into view. Research such as Self-RAG shows why selective retrieval and critical assessment of passages can be useful. Yet documents can be irrelevant, contradictory, outdated, or mutually dependent. More material is not automatically more independent evidence."
      ]},
      {heading:"Uncertainty should change the next action", paragraphs:[
        "If an AI assistant is uncertain about a software library, perhaps it should inspect the documentation or run a test. If two scientific sources disagree, perhaps it should trace their methods and provenance. If a question is ambiguous, perhaps it should ask for clarification. And if important evidence is missing, perhaps it should abstain from making a definitive claim.",
        "But an assistant that refuses every difficult question is not useful either. The real research challenge is to decide when to answer, search, verify, defer, or say 'I don't know'. My aspiration is to contribute to systems whose uncertainty informs these decisions, not merely decorates the end of a response with a confidence score."
      ]},
      {heading:"The standard I want to apply to myself", paragraphs:[
        "Scientific research carries a similar responsibility. A beautiful figure can hide a confounder. A plausible hypothesis can collapse under a strong baseline. A polished manuscript can make an unsupported conclusion appear inevitable. I do not want to demand intellectual humility of machines while excusing its absence in my own work.",
        "What I hope to build, and what I hope to become, are not finished achievements. They are commitments to better questions, careful measurement, and a willingness to follow evidence even when it disagrees with an appealing idea."
      ]}
    ],
    closing:"When AI says 'I know', my first question is not whether it sounds convincing. It is: what supports that claim, what remains uncertain, and what evidence would change the answer? Perhaps trustworthy intelligence begins there.",
    takeaway:"Confidence is not evidence. Reliable AI must know when to verify, retrieve, and refrain.",
    references:[
      {label:"Kadavath et al. (2022), Language Models (Mostly) Know What They Know",href:"https://arxiv.org/abs/2207.05221",note:"Self-evaluation and limits of cross-task calibration."},
      {label:"Lin, Hilton & Evans (2022), Teaching Models to Express Their Uncertainty in Words",href:"https://mlanthology.org/tmlr/2022/lin2022tmlr-teaching/",note:"Empirical work on verbalized calibration."},
      {label:"Farquhar et al. (2024), Detecting Hallucinations in Large Language Models Using Semantic Entropy",href:"https://doi.org/10.1038/s41586-024-07421-0",note:"Nature paper on semantic entropy under evaluated settings."},
      {label:"Asai et al. (2024), Self-RAG",href:"https://proceedings.iclr.cc/paper_files/paper/2024/file/25f7be9694d7b32d5cc670927b8091e1-Paper-Conference.pdf",note:"Retrieval and self-reflection approach."},
      {label:"Kalai et al. (2025), Why Language Models Hallucinate",href:"https://arxiv.org/abs/2509.04664",note:"Analysis of training and evaluation incentives to guess."}
    ],
    zh:{
      title:"当 AI 说“我知道”，我们应该相信吗？",
      subtitle:"自信的机器背后的风险：为什么知道自己的局限同样重要。",
      category:"科学观点",retrospective:"2026年10月",retrospectiveDescription:"关于我们正在构建的人工智能系统",
      opening:"想象你向 AI 提出一个困难的问题。几秒钟后，它给出流畅、完整而自信的解释。但其中一个关键事实可能是错误的。我研究语言模型的不确定性，正是因为“听起来可信”和“值得信任”之间的差距，是当代人工智能的重要挑战。",
      sections:[
        {heading:"表现得像知道，不等于真的知道",paragraphs:["流畅的语言容易让人产生信任。然而正确的答案、错误的答案和貌似合理的编造，可能以近乎相同的语气出现。程序能编译并不代表没有安全问题；看似完整的引文也可能不存在。","提出答案是一项任务，验证答案又是另一项。我们不能把表达能力误认为证据质量。"]},
        {heading:"信心究竟意味着什么？",paragraphs:["校准关注置信度和实际正确率之间的关系。如果系统对许多同类答案给出80%的置信度，理想情况下约80%的答案应该正确。孤立的置信度数字如果未经验证，其意义非常有限。","Kadavath 等人以及 Lin、Hilton 和 Evans 的研究表明，模型在特定条件下能够一定程度地评估或表达自身的不确定性。但这些发现并不代表任何模型在所有任务上都可靠。"]},
        {heading:"不同措辞可能是相同含义",paragraphs:["“巴黎是法国首都”和“法国的首都是巴黎”在表达上不同，意义却相同。Farquhar 等人在2024年的 Nature 论文中提出语义熵方法，研究回答含义层面的变化，并在特定任务中帮助识别幻觉。","然而，模型也可能每次都重复同一个错误答案。回答一致不等于事实正确，校准与证据支持仍需单独验证。"]},
        {heading:"证据也有自己的来源历史",paragraphs:["假设 AI 检索到六个支持同一说法的网页：这是六个独立证据，还是同一来源被转载了六次？这是我关心的研究问题，并非已经证实的个人实验结果。","检索可能提供有帮助的信息，但材料也可能无关、过时、相互矛盾或彼此依赖。Self-RAG 等研究展示了选择性检索和自我反思的价值，而非说明“检索越多越好”。"]},
        {heading:"不确定性应当改变下一步行动",paragraphs:["当 AI 不确定一个 API 的用法时，可能应该查看文档或运行测试；当证据冲突时，可能需要追查来源；当问题含糊时，可能应该请求澄清。无法获得可靠信息时，谨慎地拒绝作出确定判断也是一种能力。","但对任何问题都说“不知道”也没有帮助。真正困难的是在回答、检索、验证、询问和暂缓判断之间作出合适选择。"]},
        {heading:"我也希望用同样的标准要求自己",paragraphs:["漂亮的图表不能代替严格的实验，精美的论文不能代替经得起反驳的论证。我不希望只要求机器谦逊，却放松对自己科研工作的审视。","我追求的是持续提出更好的问题、认真测量、愿意修正错误。这是尚在努力实现的方向，而非已经完成的成就。"]}
      ],closing:"当 AI 说“我知道”时，我更想问：有什么证据？仍有哪些未知？什么新发现会改变答案？也许可信赖的智能就从这里开始。",
      takeaway:"自信不是证据。可靠的 AI 应该知道何时验证、检索与保留判断。"
    }
  },
  {
    slug:"the-boy-from-nepal-who-refused-to-stop-dreaming",
    title:"The Boy from Nepal Who Refused to Stop Dreaming",
    subtitle:"A journey across borders, classrooms, setbacks, and possibilities.",
    category:"Personal journey", retrospective:"January 2025",
    retrospectiveDescription:"Looking back at where ambition began", thumbnail:1,
    opening:"When I think of where my academic journey began, I don't first think of universities, conference badges, or publication lists. I think of Nepal. I think of the gap between the small world a child can see and the extraordinary world he slowly learns exists beyond it. I cannot point to a single dramatic moment when I decided to become a scientist. What I remember is a persistent belief that learning could carry me somewhere new.",
    sections:[
      {heading:"The horizon is not a boundary",paragraphs:[
        "Growing up in Nepal gave me a place to belong before I knew where my work might take me. Mountains are often used as easy metaphors for ambition, but the important part of my story is simpler: I was curious about places and ideas outside my immediate experience. I wanted to understand a world larger than the one I could see.",
        "I did not have a detailed map of an academic future. I could not have predicted which questions would interest me or which people I would encounter. There is a quiet freedom in admitting that. A journey can be meaningful long before its destination is visible."
      ]},
      {heading:"Learning to live between places",paragraphs:[
        "In April 2018, my life brought me to China. Learning and living in another country meant adapting to different expectations, languages, routines, and ways of thinking. An international academic journey may look elegant when summarized in a short biography. In reality, it consists of countless ordinary adjustments.",
        "At times I have felt far from home. At other times, I have felt grateful for the possibilities that distance created. Both feelings can be true. Moving forward has never required me to stop caring about where I came from."
      ]},
      {heading:"A doctoral path is not a straight line",paragraphs:[
        "Today I pursue doctoral research in Beijing on uncertainty and reliable AI. The description fits neatly in a single sentence; the work does not. Some days bring a useful idea or an experiment that clarifies a question. Other days involve revising assumptions, repeating tests, or realizing that a promising direction is not yet supported by evidence.",
        "I have learned that academic growth is not measured only by what is visible to the outside world. It can also be the afternoon when I finally understand a proof, the uncomfortable discussion that exposes a weak argument, or the decision to discard a result I no longer trust."
      ]},
      {heading:"What the dream has become",paragraphs:[
        "The younger version of me might have imagined success mainly through destinations: a university, a conference, a paper, a respected position. Those things matter, but they cannot be the whole purpose. I want to contribute knowledge that other people can use and test. I want to earn confidence in my own judgment rather than borrow it from a title.",
        "That ambition remains difficult. It should. A scientific life asks for patience, discipline, and integrity over many years. I am not writing from the other side of the story. I am writing from inside it."
      ]},
      {heading:"A message to the child who started",paragraphs:[
        "I would tell him that being from Nepal is not something to outgrow. It is part of the perspective he brings into new classrooms and scientific conversations. I would tell him to meet people with curiosity rather than comparison, and to learn without being ashamed of what he does not yet know.",
        "Most of all, I would tell him that dreaming is only the beginning. The more important skill is returning to the work, even on an ordinary day when there is no audience to applaud it."
      ]}
    ],
    closing:"The boy from Nepal did not need to know exactly how far he would travel. He needed to keep asking what might be possible—and then do the work required to find out. That is still my task.",
    takeaway:"A dream can open the door. Curiosity, discipline, and persistence carry you through it.",
    zh:{title:"那个不愿停止梦想的尼泊尔男孩",subtitle:"跨越国界、课堂、挫折与可能性的成长旅程。",category:"个人经历",
      retrospective:"2025年1月",retrospectiveDescription:"回望梦想开始的地方",
      opening:"回想学术旅程的起点，我首先想到的不是大学、会议证件或论文列表，而是尼泊尔。一个孩子眼前的世界很小，但好奇心会让他逐渐看见更远的可能。",
      sections:[
        {heading:"远方不是边界",paragraphs:["尼泊尔是我最早理解归属感的地方。我对自己尚未见过的世界充满好奇，却没有一张精确的学术生涯地图。","回头看，成长的意义不是从一开始就知道目的地，而是愿意朝未知迈出一步。"]},
        {heading:"学习在不同地方生活",paragraphs:["2018年4月，我来到中国。新的语言、习惯和期待，让所谓国际学术道路变成无数日常的适应。","有时会想家，有时也深深感激这段经历打开的可能。两种感受并不矛盾。"]},
        {heading:"博士之路并非直线",paragraphs:["如今，我在北京开展人工智能不确定性与可靠性研究。有些日子带来启发，有些日子则要重新检查假设、重复实验，甚至承认原来的想法不成立。","真正的成长不只是外界看见的奖项或成果，也包括独立理解难题和勇于舍弃不可靠结论。"]},
        {heading:"梦想正在变成什么",paragraphs:["年轻时可能更容易用学校、职位和论文衡量成功。现在我越来越重视研究是否真实、能否经得起检验、能否帮助他人。","我还在故事的中途，而不是站在终点回顾。"]},
        {heading:"对童年的自己说",paragraphs:["来自尼泊尔的身份不需要被抛在身后，它也是我看待世界的视角。无须因为不知道而羞愧，重要的是愿意学习。","梦想是起点，坚持在没有掌声的普通日子里认真工作，才是更难的部分。"]}
      ],closing:"那个尼泊尔男孩无须预知未来会走多远。他只需要保持好奇，并一步步去努力。我今天仍在这样做。",
      takeaway:"梦想打开一扇门，好奇心、纪律和坚持才能让我们走下去。"}
  },
  {
    slug:"the-experiments-that-failed",
    title:"The Experiments That Failed—and What They Taught Me",
    subtitle:"Why disappointment can be one of the most productive moments in science.",
    category:"Research practice",retrospective:"May 2025",retrospectiveDescription:"A reflection on setbacks and scientific discipline",thumbnail:2,
    opening:"We like to tell scientific stories from the end backward. First comes the discovery, then the clean figure, then the elegant explanation of why the result was inevitable. But research rarely feels inevitable while we are doing it. A large part of my life as a doctoral researcher is learning to be less frightened of a result that refuses to agree with my expectations.",
    sections:[
      {heading:"A failed prediction is not wasted time",paragraphs:[
        "Imagine designing an uncertainty-aware retrieval method because you expect it to improve accuracy. The pilot runs, the code completes, and the improvement is absent. The result is disappointing, but it is not empty. It tells you that some combination of assumptions, implementation choices, data, and measurement needs closer examination. This is an illustrative example—not a report of a particular experiment I have completed.",
        "There is an important difference between a hypothesis failing and an experiment being invalid. An unsuccessful hypothesis can teach us something when the test itself is rigorous. An invalid experiment tells us less, no matter how exciting its outcome might have been."
      ]},
      {heading:"The dangerous desire for a beautiful graph",paragraphs:[
        "A research deadline can tempt us to look for the run that confirms the story we already want to tell. Perhaps another seed will produce a cleaner curve. Perhaps a different baseline will make the improvement look larger. Perhaps we can quietly omit the uncomfortable case.",
        "These temptations are understandable, but they are precisely why science needs pre-specified questions, transparent analysis, strong baselines, and honest records. Selecting only the most flattering evidence creates a narrative, not trustworthy knowledge."
      ]},
      {heading:"Debugging is part of epistemology",paragraphs:[
        "A model may underperform because the scientific idea is weak. It may also underperform because an evaluation script uses the wrong split, a data preprocessing rule changes the target distribution, or a metric is calculated incorrectly. Conversely, a surprisingly strong result may be caused by leakage or an accidental shortcut.",
        "Before interpreting a result, I want to ask: can I reproduce it? Could another implementation produce the same pattern? What happens when I remove the new component? What would a skeptic check first? Those questions turn debugging into an essential part of discovering what is true."
      ]},
      {heading:"Learn to separate ego from evidence",paragraphs:[
        "It can feel personal when a beloved idea does not work. I may have spent weeks reading, designing, or coding. I may have imagined the paper already. But nature does not owe a researcher a positive result because the researcher worked hard.",
        "The discipline I aspire to is to let evidence change my belief without interpreting that change as a defeat of my identity. If an approach does not work, the task is to understand why. If I cannot tell why, that uncertainty is itself part of the result."
      ]},
      {heading:"What I want to celebrate instead",paragraphs:[
        "I want to value a clean replication, a carefully characterized failure mode, or a negative finding that rules out a popular explanation. I want experiment logs that make it possible to reconstruct decisions, not only plots that make a paper attractive.",
        "The next time an experiment disappoints me, I hope to begin with a better question: what exactly did the evidence eliminate, and which explanation remains standing?"
      ]}
    ],
    closing:"A failed experiment is not automatically a scientific contribution. But an honestly designed, reproducible, well-interpreted negative result can become one. I hope I always have the courage to recognize the difference.",
    takeaway:"A disappointing result can still be valuable—if the experiment is trustworthy and the interpretation is honest.",
    zh:{title:"那些失败的实验，以及它们教会我的事",subtitle:"为什么失望有时是科学研究中最有价值的时刻。",category:"科研实践",
      retrospective:"2025年5月",retrospectiveDescription:"关于挫折与科学纪律的反思",
      opening:"我们习惯从成功的结果倒叙科学故事：发现、漂亮的图、看似必然的解释。但在真正做研究时，答案往往并不明确。读博让我不断练习：面对不符合预期的结果，不急于害怕。",
      sections:[
        {heading:"预测失败不等于时间浪费",paragraphs:["假设一种新的检索方法没有提高准确率，令人失望，却提示我们重新检查假设、数据、实现和指标。这里是说明性的假设情境，而非我已完成的某次实验记录。","必须区分假设不成立与实验本身无效。严谨的否定结果可能有价值，设计错误的实验则很难告诉我们真相。"]},
        {heading:"警惕漂亮图表的诱惑",paragraphs:["截止日期可能让人只挑选最漂亮的随机种子或基线。那样得到的是想讲述的故事，而非完整证据。","预先明确问题、保留真实记录、公开强基线和局限，才有可能得到可信的结论。"]},
        {heading:"调试也是认识世界的一部分",paragraphs:["结果异常可能源于研究想法，也可能来自数据泄漏、错误切分或指标实现。惊人的提升不一定是科学突破。","我希望先问能否复现、独立实现是否一致、移除新模块会如何变化，以及审稿人最可能质疑什么。"]},
        {heading:"把自我价值与证据分开",paragraphs:["自己喜欢的想法失败时，难免失落。但努力了很久并不能保证假设为真。","真正的科研训练，是让证据修正信念，而不是把每个负面结果都当作对自我身份的否定。"]},
        {heading:"重新定义值得庆祝的时刻",paragraphs:["可靠复现、清楚的失败分析、能排除一个错误解释的否定发现，都值得尊重。","下一次实验令人失望时，我想先问：它到底排除了什么？还有哪些解释需要检验？"]}
      ],closing:"失败的实验不一定构成贡献，但设计严谨、可复现且解释诚实的否定结果可能构成贡献。我希望永远有勇气分辨二者。",
      takeaway:"令人失望的结果也可能有价值，前提是实验可信、解释诚实。"}
  },
  {
    slug:"what-does-it-mean-to-be-a-scientist-in-the-age-of-ai",
    title:"In the Age of AI, What Does It Mean to Be a Scientist?",
    subtitle:"When machines can draft code and papers, where does human scientific responsibility begin?",
    category:"Science & society",retrospective:"September 2025",
    retrospectiveDescription:"Thinking about responsibility in AI-assisted research",thumbnail:3,
    opening:"AI can help me write code, outline a manuscript, summarize unfamiliar work, and explore a research idea at remarkable speed. I am grateful for those capabilities. Yet the more powerful these tools become, the more strongly I feel that we need to distinguish producing research-shaped material from producing reliable scientific knowledge.",
    sections:[
      {heading:"Speed is not understanding",paragraphs:[
        "An assistant might generate a page of mathematical notation in moments. But does the theorem actually follow from its assumptions? It might produce a benchmark runner. But does that runner evaluate the intended task without leakage? It might suggest a research gap. But has the relevant prior literature genuinely been reviewed?",
        "These questions can feel slower than generating the artifact. They are also what make the artifact scientifically meaningful. The existence of a polished output is evidence of production, not of understanding."
      ]},
      {heading:"What responsibility cannot be delegated",paragraphs:[
        "I can ask AI for help finding an error, but I remain responsible for deciding whether the correction is valid. I can ask it to draft a paragraph, but I must inspect the references, the boundaries of the claims, and the logical argument. I can ask it to propose experiments, but I must know what hypothesis each experiment tests and what would falsify it.",
        "This is not a claim that human researchers are immune to error. We are not. Scientific communities developed replication, review, and open criticism precisely because individual judgment is fallible. AI assistance should deepen those practices, not bypass them."
      ]},
      {heading:"The temptation to confuse motion with progress",paragraphs:[
        "There is a strange feeling that comes from watching a large project expand quickly: a repository fills with files, a manuscript grows longer, and a dashboard turns green. It can be deeply satisfying. Yet if I cannot explain what new fact we have learned, the activity may still be unfinished work.",
        "I want to ask myself what a careful scientist would ask after every major milestone: what did this test establish? Against which alternative explanation? How much of the result would survive independent reproduction? What remains unknown?"
      ]},
      {heading:"A more valuable relationship with AI",paragraphs:[
        "I do not see the choice as being 'use AI' or 'be a real researcher'. Instead, I want to use tools in ways that make my judgment more demanding. Let an assistant generate competing explanations, but require me to choose how to test them. Let it scan for missing citations, but require me to read the paper. Let it challenge my argument, but require me to decide whether the criticism is sound.",
        "The best scientific tool is not necessarily the one that removes the most thinking. Sometimes it is the one that helps us notice what we still need to think about."
      ]},
      {heading:"What kind of scientist do I hope to become?",paragraphs:[
        "I hope future researchers are judged not by how many pages or lines of code they can generate, but by the clarity of their questions, the care of their methods, and the reliability of their conclusions. I hope we teach students how to use AI without surrendering intellectual ownership.",
        "And I hope I am willing to demonstrate that standard in my own work, including when the result is modest, the experiment is difficult, or the correct conclusion is simply that I do not yet know."
      ]}
    ],
    closing:"AI may change the tools of science profoundly. It does not remove the scientist's obligation to be curious, critical, honest, and accountable. If anything, it makes those obligations more important.",
    takeaway:"AI can accelerate research artifacts. Scientific responsibility still belongs to the researcher.",
    zh:{title:"在 AI 时代，成为科学家意味着什么？",subtitle:"当机器能写代码和论文，人类科学责任从哪里开始？",category:"科学与社会",
      retrospective:"2025年9月",retrospectiveDescription:"反思 AI 辅助研究中的责任",
      opening:"AI 能快速帮我写代码、整理文稿、探索思路。我很感激这些能力，但工具越强大，我越觉得需要区分“产生像研究的内容”和“创造可靠科学知识”。",
      sections:[
        {heading:"速度不是理解",paragraphs:["AI 可以瞬间生成数学符号，但定理是否真的成立？可以写出测试代码，但评估是否泄漏数据？可以提议研究空白，但是否充分查阅先前工作？","这些问题很费时间，却正是科研成果真正有意义的前提。"]},
        {heading:"什么责任不能委托",paragraphs:["AI 可以帮助找错误，但修正是否有效仍应由研究者判断；可以协助起草，但文献与主张需要亲自核实；可以设计实验，但我们必须知道实验在检验什么。","人类同样会犯错，这也是学术共同体需要复现、同行评议和公开批判的原因。"]},
        {heading:"别把忙碌误认为进步",paragraphs:["仓库文件增长、论文越来越长、仪表盘全绿，都让人满足。但若无法回答我们究竟发现了什么，忙碌不一定意味着科研进展。","每个里程碑之后，我想追问：它排除了哪些解释？别人能复现吗？我们仍然不知道什么？"]},
        {heading:"与 AI 建立更有价值的关系",paragraphs:["关键不是用不用 AI，而是怎样使用。让 AI 提出竞争性解释，我负责验证；让 AI 发现引文遗漏，我负责读原文；让 AI 反驳观点，我负责判断批评是否成立。","好的科学工具，不一定替我们省掉最多思考，有时恰恰是让我们看见仍需认真思考的地方。"]},
        {heading:"我希望成为什么样的科学家",paragraphs:["我希望未来衡量科研质量的标准是问题的清晰度、方法的严谨性与结论的可靠性，而非生成了多少页面或代码。","也希望自己能践行这个标准，哪怕结果平凡、实验困难，或最诚实的回答仍然是“不知道”。"]}
      ],closing:"AI 会改变科研工具，却不会取消科学家的好奇心、批判精神、诚实与责任。相反，这些品质会更加重要。",
      takeaway:"AI 可以加速生成成果材料，但科学责任仍属于研究者。"}
  },
  {
    slug:"why-i-choose-to-study-uncertainty",
    title:"Why I Choose to Study Uncertainty",
    subtitle:"Because knowing what we don't know may be the beginning of more dependable intelligence.",
    category:"Research motivation",retrospective:"January 2026",
    retrospectiveDescription:"The question at the center of my research",thumbnail:4,
    opening:"People sometimes ask what I work on. I tell them that I study uncertainty in artificial intelligence. It is a technical answer, but the reason behind it is personal: I have become increasingly interested in the limits of knowing, and in what responsible decisions should look like when information is incomplete.",
    sections:[
      {heading:"Uncertainty is not the enemy",paragraphs:[
        "Many systems are evaluated primarily by whether they return an answer. But a useful system may sometimes need to say, 'I do not have enough evidence.' That does not necessarily make it less capable. In a context where an incorrect confident action has real costs, recognizing uncertainty can be part of competence.",
        "This is not the same as saying that every kind of uncertainty can be measured accurately. Even defining what we mean by uncertainty can be difficult: is the model unsure because the world is ambiguous, because training data is missing, because multiple answers are plausible, or because its output-generation process is unstable?"
      ]},
      {heading:"From a number to a decision",paragraphs:[
        "A confidence value can be useful, but it is not a goal on its own. If the model is uncertain, should it ask a question, inspect a document, retrieve an independent source, run a test, or stop? A good decision depends on the task, the available evidence, the cost of additional work, and the consequences of being wrong.",
        "Software engineering offers concrete examples. A coding assistant should not treat an undocumented API as safe merely because its output compiles. Testing, context inspection, and verification can be more valuable than another fluent explanation."
      ]},
      {heading:"Reasoning and retrieval have histories",paragraphs:[
        "I am particularly interested in uncertainty that changes across steps. A system begins with a question, forms an intermediate explanation, reads a document, and revises its conclusion. At which step does it become more certain? Was that change justified? Could an error introduced early contaminate later reasoning?",
        "Now imagine evidence that is repeated across documents but traces back to one source. How should the system weigh it against an independently observed contradiction? I see this as a promising scientific question, not a phenomenon I can claim to have conclusively demonstrated."
      ]},
      {heading:"Reliability requires being willing to be wrong",paragraphs:[
        "Part of my motivation comes from the discipline research asks of us. I may love an idea, but I cannot call it true simply because it is exciting. A failed replication should matter. A strong baseline should matter. An uncomfortable alternative explanation should matter.",
        "That attitude is closely related to what I want from AI: not a performance of humility, but mechanisms and evidence that help it act appropriately when its assumptions are unreliable."
      ]},
      {heading:"A research direction, not a finished promise",paragraphs:[
        "I hope to contribute methods that make uncertainty more useful for intelligent systems, especially where AI intersects with software engineering and evidence-based reasoning. I also expect the direction to change as experiments reveal weaknesses in the hypotheses.",
        "I cannot promise a single technique will solve hallucinations, calibration, or safety. What I can promise myself is to keep treating uncertainty as something to understand, not something to hide."
      ]}
    ],
    closing:"I love uncertainty. Not because I enjoy confusion, but because uncertainty reminds me that a better explanation might still be waiting. For a scientist, that possibility is reason enough to keep working.",
    takeaway:"The goal is not to eliminate every unknown. It is to respond to unknowns more intelligently.",
    references:[
      {label:"Farquhar et al. (2024), Detecting Hallucinations Using Semantic Entropy",href:"https://doi.org/10.1038/s41586-024-07421-0",note:"Research on semantic-level uncertainty in language model responses."},
      {label:"Asai et al. (2024), Self-RAG",href:"https://proceedings.iclr.cc/paper_files/paper/2024/file/25f7be9694d7b32d5cc670927b8091e1-Paper-Conference.pdf",note:"Example of selective retrieval and critical generation."}
    ],
    zh:{title:"我为什么选择研究不确定性",subtitle:"因为知道自己不知道什么，可能正是构建可靠智能的开始。",category:"研究动机",
      retrospective:"2026年1月",retrospectiveDescription:"我研究方向的核心问题",
      opening:"有人问我研究什么，我会回答：人工智能中的不确定性。这听起来很技术化，但背后的原因很个人——我越来越想理解知识的边界，以及信息不足时怎样作出负责任的决策。",
      sections:[
        {heading:"不确定性不是敌人",paragraphs:["很多系统主要根据是否给出答案来评价，但在错误决定有代价的场景里，承认证据不足也可能是能力的一部分。","我们甚至需要区分不确定性来自世界本身的模糊、知识缺失，还是模型生成的随机变化。这并不容易。"]},
        {heading:"从数字到行动",paragraphs:["置信度不是终点。当模型不确定时，应该提问、检索、测试、核实，还是暂缓判断？答案取决于任务、成本和错误的后果。","例如，编码助手不应仅因为程序能编译就相信自己理解了陌生 API，必要时应检查文档和运行测试。"]},
        {heading:"推理和检索都有历史",paragraphs:["AI 在多步推理、查阅文档、修正结论的过程中，何时变得更确定？变化是否合理？早期错误是否会污染后续步骤？","如果多个网页来自同一个原始来源，它们是否真的构成独立证据？这对我来说是值得研究的问题，而非我已确定证明的现象。"]},
        {heading:"可靠性离不开承认错误的勇气",paragraphs:["我可以热爱一个想法，却不能仅凭热爱就认定它正确。失败的复现、强大的基线和不舒服的替代解释，都应认真对待。","我也希望 AI 能做到这一点：不是表演谦逊，而是在假设不可靠时有机制帮助作出更好的决定。"]},
        {heading:"研究方向不是已经兑现的承诺",paragraphs:["我希望为不确定性感知的智能系统贡献方法，尤其是在软件工程和证据推理领域。","我不能承诺一种方法解决所有幻觉或安全问题，但希望始终把未知当作需要理解的对象，而不是需要掩盖的缺点。"]}
      ],closing:"我热爱不确定性，不是因为喜欢困惑，而是因为它提醒我：更好的解释也许仍在前方。对科学家而言，这足以让人继续探索。",
      takeaway:"目标不是消灭所有未知，而是更明智地应对未知。"}
  },
  {
    slug:"dear-younger-me-success-is-not-what-you-think",
    title:"Dear Younger Me: Success Is Not What You Think",
    subtitle:"A letter to the student who dreamed of a bigger world.",
    category:"A personal letter",retrospective:"June 2026",
    retrospectiveDescription:"A quieter definition of progress",thumbnail:5,
    opening:"Dear younger me, if you could see the notebooks, airports, classrooms, and unfinished research questions that fill my life now, you might think that I have arrived somewhere extraordinary. I want to tell you something that would have surprised us both: I am still learning what it means to succeed.",
    sections:[
      {heading:"I know why you wanted to go far",paragraphs:[
        "You wanted to see more of the world than the one directly in front of you. You imagined education as a way to create possibilities—for yourself, for the people you love, and perhaps for people you have never met. Hold on to that generosity. It matters more than any line on a résumé.",
        "But do not confuse going far with becoming more valuable. Crossing a border, joining a university, or meeting someone accomplished can enrich a life. None of those things determines what a human being is worth."
      ]},
      {heading:"There will be days nobody applauds",paragraphs:[
        "The world will sometimes measure you in awards, citations, deadlines, and titles. Those can serve useful purposes, but they are incomplete measures. Some important days will be almost invisible: reading a difficult paper again, correcting a mistake you made, sending an apology, getting enough sleep, or telling someone you care about them.",
        "I wish I could promise that the road will always feel rewarding. I cannot. Work worth doing can be slow, and uncertainty is not always exciting. On such days, let 'keep going' mean doing one meaningful thing with care—not punishing yourself for being human."
      ]},
      {heading:"Be proud of Nepal, wherever you live",paragraphs:[
        "You will carry home with you even when you are physically far away. The place you came from does not become smaller because your world becomes larger. Remember the people whose hopes travel with you, and make room for them in the life you build.",
        "There may be expectations you cannot satisfy all at once. Do not interpret every delay as a moral failure. Ambition and responsibility require decisions, patience, and sometimes honest conversations about limits."
      ]},
      {heading:"Learn to love questions more than applause",paragraphs:[
        "I know how tempting it will be to want recognition—to see a prestigious name on a paper and take it as proof that the struggle meant something. Aim high if you want to. But let the central measure of your work be its honesty and usefulness.",
        "A negative experiment can be a good day in science. A well-explained limitation can be a sign of strength. The people worth learning from are not only the most famous; they are also those who ask difficult questions and treat others with respect."
      ]},
      {heading:"You are allowed a life outside work",paragraphs:[
        "Please protect your curiosity, your health, your friendships, and your capacity for joy. Research is something you do, not the totality of who you are. Rest is not a betrayal of ambition. A long scientific life needs room for ordinary happiness.",
        "I hope that if we ever achieve something remarkable, it will not be because we abandoned everything that made the journey worthwhile."
      ]}
    ],
    closing:"So keep dreaming, younger me. Just remember: success is not arriving at the perfect destination. It is becoming someone you can respect along the way, whatever the world decides to call your achievements. With care, your future self.",
    takeaway:"Do ambitious work. But never let the world's scoreboard become the measure of your worth.",
    zh:{title:"致年少的自己：成功并不是你想象的那样",subtitle:"写给那个梦想着更大世界的学生的一封信。",category:"给自己的信",
      retrospective:"2026年6月",retrospectiveDescription:"重新定义进步",
      opening:"亲爱的年少的我：如果你看到我今天的笔记、旅程、课堂和未完成的科研问题，或许会以为我已经到达某个特别的地方。但我想告诉你：我仍然在学习成功究竟意味着什么。",
      sections:[
        {heading:"我知道你为什么想走得更远",paragraphs:["你想看见眼前之外的世界，希望教育能为自己、家人和他人创造更多可能。请保留这份善意。","但不要把走得更远等同于拥有更高的价值。跨越边界、进入大学或遇见杰出的人，都不能定义一个人的全部价值。"]},
        {heading:"有些日子不会有人鼓掌",paragraphs:["世界可能用奖项、论文、截止日期和头衔衡量你，但很多重要的日子是安静的：再次读懂一篇难论文、纠正错误、好好睡觉、关心亲近的人。","我无法保证前路轻松。感到疲惫时，继续前进可以只是认真完成一件有意义的小事，而不是惩罚自己。"]},
        {heading:"无论身在何处，都为尼泊尔感到骄傲",paragraphs:["世界变得更大，不代表故乡变得更小。请记住那些陪伴你希望的人。","有些责任无法一夜完成，限制也值得诚实沟通。耐心不代表不负责任。"]},
        {heading:"爱上问题，而不只是掌声",paragraphs:["渴望得到认可并不丢人，但研究应以诚实和价值为中心。否定结果可能是科学进步，坦诚承认局限也是力量。","值得学习的人，不只包括最有名的人，也包括认真提问、尊重他人的人。"]},
        {heading:"你可以拥有科研之外的生活",paragraphs:["请保护好奇心、健康、友谊和快乐。科研是人生的一部分，不是人的全部。休息不会背叛梦想。","如果有一天我们做成一件很重要的事，我希望那不是以失去所有珍贵的生活为代价。"]}
      ],closing:"继续梦想吧，年少的我。只是别忘了，成功不是到达一个完美终点，而是无论世界怎样评价，都成为自己愿意尊重的人。来自未来的你。",
      takeaway:"可以追求伟大的目标，但不要让外界的评分表定义你的价值。"}
  },
];

export const researchEssayRoutes: Record<string, ResearchEssay> = Object.fromEntries(
  researchEssays.map(essay => [essayPrefix + essay.slug, essay])
);
