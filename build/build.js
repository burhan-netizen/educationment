// EducationMent site generator.
// Run: node build/build.js   (from the website folder)
// One time: moves the homepage's inline CSS/JS into assets/site.css and assets/site.js.
// Every run: rebuilds the shared header/footer on the homepage and writes every inner page.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
/* ======================= contact details ======================= */
const WA_NUM = '918849724179';
const WA_DISPLAY = '+91 88497 24179';
const EMAIL = 'educationment.in@gmail.com';
const WA_TEXT = "Hi EducationMent, I'd like a quote for my assignment.";
const WA_URL = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(WA_TEXT)}`;
// swap every placeholder link and label for the real contact details
function finalize(html) {
  // (?:(?!<\/svg>)[\s\S])* can't run past the end of one icon, so each pattern matches a single link only
  html = html.replace(/<a href="#">(<svg(?:(?!<\/svg>)[\s\S])*<\/svg>)Email: add address<\/a>/g, `<a href="mailto:${EMAIL}">$1${EMAIL}</a>`);
  html = html.replace(/<a href="#">(<svg(?:(?!<\/svg>)[\s\S])*<\/svg>)WhatsApp: add number<\/a>/g, `<a href="${WA_URL}" target="_blank" rel="noopener">$1${WA_DISPLAY}</a>`);
  html = html.replace(/<a href="#">(<span class="ci">(?:(?!<\/span>)[\s\S])*?<path d="m22 6-10 7L2 6"\/><\/svg><\/span>)<span><b>Email<\/b><small>Add your email address here<\/small><\/span><\/a>/, `<a href="mailto:${EMAIL}">$1<span><b>Email</b><small>${EMAIL}</small></span></a>`);
  html = html.replace('<small>Add your number here · fastest reply</small>', `<small>${WA_DISPLAY} · fastest reply</small>`);
  html = html.split('[email address]').join(EMAIL).split('[number]').join(WA_DISPLAY);
  html = html.split('href="#"').join(`href="${WA_URL}" target="_blank" rel="noopener"`);
  return html;
}
const W = (rel, s) => { const p = path.join(ROOT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, rel.endsWith('.html') ? finalize(s) : s); };

/* ======================= icons ======================= */
const I = {
  cap: '<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/><path d="M22 9v6"/>',
  doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/>',
  search: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5"/><path d="M14 3v5h5v3"/><circle cx="16.5" cy="16.5" r="3"/><path d="m21 21-2.3-2.3"/>',
  case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/><path d="M15 8h5v5"/>',
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2.5Z"/><path d="M4 19.5A2 2 0 0 0 6 21h13"/><path d="M8 7h7M8 11h5"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  slides: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8"/><path d="m7 12 3-3 2 2 4-4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  pulse: '<path d="M22 12h-4l-3 8-6-16-3 8H2"/>',
  sigma: '<path d="M5 5h14M5 12h14M9 19h6M12 2v6"/>',
  dollar: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  flask: '<path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/><path d="M12 9v6M9 12h6"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0ZM19 7l-3 7a3 3 0 0 0 6 0Z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5ZM14 21c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5Z"/>',
  data: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-5-6.7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
  bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
};
const ic = (k, sw = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;
const ARR = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 6h10M7 2l4 4-4 4"/></svg>';
const CARET = '<svg class="caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m2 4 4 4 4-4"/></svg>';
const WA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z"/></svg>';

/* ======================= content ======================= */
const SERVICES = [
  { slug: 'thesis-dissertation-writing', name: 'Thesis & Dissertation Writing', menu: 'Thesis & Dissertation', icon: 'cap', opt: 'Thesis & Dissertation',
    short: 'Support for every chapter, from proposal to final submission.',
    h1: 'Thesis and dissertation support that <span class="serif">sets you apart.</span>',
    lead: 'From choosing a topic to polishing your final chapter, a specialist with a PhD or Master\'s degree in your field supports every stage of your thesis or dissertation.',
    incl: [
      ['target', 'Topic & proposal', 'Focused, original research questions and a proposal that gets approved first time.'],
      ['book', 'Literature review', 'A critical review of current, credible sources that frames your study clearly.'],
      ['layers', 'Methodology', 'A sound research design, with a clear justification for every choice you make.'],
      ['data', 'Data analysis', 'Quantitative and qualitative analysis using SPSS, NVivo, R, Stata or Excel.'],
      ['chart', 'Results & discussion', 'Findings presented clearly and interpreted against the wider literature.'],
      ['edit', 'Editing & formatting', 'Structure, referencing and formatting that follow your university handbook.'],
    ],
    levels: ['Undergraduate', 'Master\'s', 'MBA', 'PhD', 'Professional doctorate'],
    recv: ['Chapter by chapter delivery, so you can review as you go', 'Original work written from scratch for your brief', 'A full reference list in your required style', 'Changes until the work meets your brief', 'Direct WhatsApp access to your coordinator'],
    faqs: [
      ['Can you help with just one chapter?', 'Yes. You can order a single chapter, such as the literature review or methodology, or support for the full dissertation.'],
      ['Can you analyse data I have already collected?', 'Yes. Share your dataset and our experts will analyse it, then help you present and discuss the findings.'],
      ['How long does a full dissertation take?', 'It depends on the length, level and depth of research. Share your brief and deadline and we will confirm a realistic timeline in your quote.'],
    ] },
  { slug: 'research-papers', name: 'Research Papers', menu: 'Research Papers', icon: 'doc', opt: 'Research Paper',
    short: 'Rigorous papers built on credible, fully referenced sources.',
    h1: 'Research papers built on <span class="serif">solid evidence.</span>',
    lead: 'Clear, rigorous research papers built on credible academic sources and referenced in exactly the style your university requires.',
    incl: [
      ['search', 'Source research', 'Peer reviewed journals, academic books and trusted reports, never random websites.'],
      ['target', 'A clear argument', 'A strong thesis statement, carried through every section of the paper.'],
      ['list', 'Logical structure', 'Abstract, introduction, body and conclusion that flow naturally.'],
      ['chart', 'Data & figures', 'Tables, charts and figures that support your argument and are easy to read.'],
      ['quote', 'Accurate referencing', 'APA, Harvard, MLA, Chicago, IEEE, OSCOLA, Vancouver and more.'],
      ['edit', 'Proofreading', 'Every paper is checked for clarity, grammar and consistency before delivery.'],
    ],
    levels: ['Undergraduate', 'Master\'s', 'PhD', 'Coursework', 'Conference papers'],
    recv: ['A paper written from scratch to your brief', 'Credible, current academic sources', 'Referencing in your required style', 'Changes until the work meets your brief', 'Delivery on or before your deadline'],
    faqs: [
      ['Which referencing styles do you use?', 'All the major ones, including APA, Harvard, MLA, Chicago, IEEE, OSCOLA and Vancouver. Just tell us which one your university uses.'],
      ['Can I share my lecturer\'s guidelines and feedback?', 'Please do. The more we know about your brief, rubric and past feedback, the better we can match what your examiners are looking for.'],
      ['Can you include tables and figures?', 'Yes. Our experts can create tables, charts and figures and present any data clearly.'],
    ] },
  { slug: 'research-proposals', name: 'Research Proposals', menu: 'Research Proposals', icon: 'search', opt: 'Research Proposal',
    short: 'Proposals with clear aims and a sound methodology.',
    h1: 'Research proposals that get <span class="serif">approved.</span>',
    lead: 'A focused research question, a sound methodology and a realistic plan, presented in a proposal that gives your supervisor confidence from the first read.',
    incl: [
      ['target', 'Aims & questions', 'Research questions that are focused, original and answerable.'],
      ['bulb', 'Rationale', 'A clear case for why your research matters and the gap it fills.'],
      ['book', 'Preliminary review', 'A concise review of key literature that positions your study.'],
      ['layers', 'Methodology & ethics', 'Methods, sampling and ethical considerations, clearly justified.'],
      ['clock', 'Timeline & resources', 'A realistic plan with milestones and a Gantt chart if you need one.'],
      ['quote', 'References', 'A complete reference list in the style your institution requires.'],
    ],
    levels: ['Master\'s', 'PhD applications', 'Undergraduate', 'Funding applications', 'Ethics submissions'],
    recv: ['A proposal written from scratch for your topic', 'A clear structure that follows your guidelines', 'Referencing in your required style', 'Changes until the work meets your brief', 'Advice on next steps after approval'],
    faqs: [
      ['Can you help me choose a topic?', 'Yes. Tell us your interests and module, and an expert can suggest focused topics with a clear research gap.'],
      ['Do you write proposals for PhD applications?', 'Yes. Our experts regularly support PhD proposals and can tailor yours to the programme and supervisor you are applying to.'],
      ['Can the proposal lead into the full dissertation?', 'Absolutely. Many students continue with the same expert for the full dissertation, which keeps everything consistent.'],
    ] },
  { slug: 'case-studies', name: 'Case Studies', menu: 'Case Studies', icon: 'case', opt: 'Case Study',
    short: 'Sharp analysis using the right frameworks.',
    h1: 'Case studies with <span class="serif">sharp analysis.</span>',
    lead: 'Business, clinical and legal case studies analysed with the right frameworks, backed by evidence and finished with recommendations that make sense.',
    incl: [
      ['search', 'Problem definition', 'The core issues identified clearly, so the analysis stays focused.'],
      ['layers', 'Proven frameworks', 'SWOT, PESTLE, Porter\'s Five Forces, BCG and more, applied properly.'],
      ['data', 'Evidence & data', 'Every point supported with data, theory and credible sources.'],
      ['heart', 'Clinical & legal cases', 'Specialist support for nursing, medical and law case analysis.'],
      ['target', 'Recommendations', 'Practical, justified recommendations with a clear plan of action.'],
      ['doc', 'Executive summary', 'A crisp summary that gives your reader the whole story at a glance.'],
    ],
    levels: ['Business & MBA', 'Nursing', 'Medical', 'Law', 'Engineering'],
    recv: ['A case study written from scratch for your brief', 'The frameworks your module asks for', 'Referencing in your required style', 'Changes until the work meets your brief', 'Delivery on or before your deadline'],
    faqs: [
      ['Which frameworks can you use?', 'Any your module requires, including SWOT, PESTLE, Porter\'s Five Forces, the BCG matrix, the value chain and clinical models such as Gibbs.'],
      ['Can you work from a case I have been given?', 'Yes. Share your case pack or scenario and our expert will analyse it exactly as set.'],
      ['Do you handle group case studies?', 'Yes. We can support your section or the full group submission, matched to your shared brief.'],
    ] },
  { slug: 'live-sessions', name: 'Live Sessions', menu: 'Live Sessions', icon: 'video', opt: 'Live Session', live: true,
    short: '1:1 video sessions with a subject expert.',
    h1: 'Learn live with a <span class="serif">subject expert.</span>',
    lead: 'Book a 1:1 video session with an expert in your subject. Work through difficult topics, get feedback on your draft or prepare for an exam or presentation.',
    incl: [
      ['bulb', 'Concept clarity', 'Difficult topics explained step by step until they finally click.'],
      ['edit', 'Draft feedback', 'Detailed feedback on your own draft, with clear ways to improve it.'],
      ['award', 'Exam preparation', 'Revision plans, practice questions and exam technique.'],
      ['slides', 'Presentation rehearsal', 'Run through your presentation and get coaching on delivery.'],
      ['data', 'Software walkthroughs', 'SPSS, R, Python, Excel, MATLAB and more, explained on screen.'],
      ['clock', 'Study planning', 'A practical plan to manage deadlines across all your modules.'],
    ],
    levels: ['Undergraduate', 'Master\'s', 'PhD', 'Exam revision', 'Viva preparation'],
    recv: ['Sessions at a time that suits your time zone', 'Screen sharing for your documents, data and slides', 'Single sessions or regular weekly sessions', 'An expert matched to your exact subject', 'Easy booking through WhatsApp'],
    faqs: [
      ['How long is a live session?', 'Sessions can be booked for the length you need. Most students start with a single session and book more if they find it useful.'],
      ['Which platform do you use?', 'We use common video platforms such as Zoom or Google Meet, so you will not need to install anything new.'],
      ['Can I book the same expert again?', 'Yes. Many students book regular sessions with the same expert throughout their module or dissertation.'],
    ] },
  { slug: 'business-plans', name: 'Business Plans', menu: 'Business Plans', icon: 'chart', opt: 'Business Plan',
    short: 'Plans with research, financials and strategy.',
    h1: 'Business plans you could put <span class="serif">in front of investors.</span>',
    lead: 'Market research, financial projections and a clear strategy, brought together in a business plan that is as convincing as it is well researched.',
    incl: [
      ['doc', 'Executive summary', 'A compelling overview of the opportunity, the model and the numbers.'],
      ['search', 'Market research', 'Market size, trends and target customers, backed by real data.'],
      ['target', 'Competitor analysis', 'A clear view of the competition and your unique advantage.'],
      ['bulb', 'Marketing strategy', 'Positioning, pricing, channels and a launch plan that fits the market.'],
      ['chart', 'Financial projections', 'Forecasts, cash flow, break even analysis and key assumptions.'],
      ['shield', 'Operations & risk', 'How the business will run, and how key risks will be managed.'],
    ],
    levels: ['Undergraduate', 'MBA', 'Entrepreneurship modules', 'Start up competitions', 'Feasibility studies'],
    recv: ['A plan written from scratch for your idea', 'Financial projections in Excel on request', 'Referencing in your required style', 'Changes until the work meets your brief', 'Delivery on or before your deadline'],
    faqs: [
      ['Do you include the financial model?', 'Yes. We can provide projections inside the plan and, on request, the supporting Excel model.'],
      ['Can you base the plan on my own idea?', 'Of course. Share your concept and any research you have, and the plan will be built around it.'],
      ['Can you turn the plan into a pitch deck?', 'Yes. Our presentation designers can turn your plan into a professional pitch deck.'],
    ] },
  { slug: 'annotated-bibliography', name: 'Annotated Bibliography', menu: 'Annotated Bibliography', icon: 'book', opt: 'Annotated Bibliography',
    short: 'Sources selected, evaluated and formatted.',
    h1: 'Annotated bibliographies, <span class="serif">perfectly referenced.</span>',
    lead: 'Carefully chosen sources, each summarised and critically evaluated for relevance to your research, then formatted exactly to your required style.',
    incl: [
      ['search', 'Source selection', 'Credible, current and relevant sources chosen for your topic.'],
      ['doc', 'Clear summaries', 'The key argument, method and findings of each source in plain words.'],
      ['target', 'Critical evaluation', 'Strengths, limitations and credibility assessed for every source.'],
      ['layers', 'Relevance', 'How each source connects to your research question.'],
      ['quote', 'Formatting', 'APA, MLA, Harvard, Chicago or any style your module requires.'],
      ['list', 'Any length', 'From five sources to fifty, matched to your word count.'],
    ],
    levels: ['Undergraduate', 'Master\'s', 'PhD', 'Literature reviews', 'Research proposals'],
    recv: ['Sources selected for your exact topic', 'Annotations written from scratch', 'Formatting in your required style', 'Changes until the work meets your brief', 'Delivery on or before your deadline'],
    faqs: [
      ['Can I provide my own sources?', 'Yes. We can annotate sources you have already chosen, find new ones, or combine both.'],
      ['How long is each annotation?', 'Whatever your brief asks for. Most annotations are between 100 and 300 words.'],
      ['Can this feed into my literature review?', 'Yes. Many students use their annotated bibliography as the foundation for a literature review, and we can help with both.'],
    ] },
  { slug: 'content-writing', name: 'Content Writing', menu: 'Content Writing', icon: 'pen', opt: 'Content Writing',
    short: 'Essays, reports and academic content.',
    h1: 'Academic writing in a <span class="serif">clear, natural voice.</span>',
    lead: 'Essays, reports, reflective pieces and academic content, written by subject specialists in a clear and natural voice that reads like it should.',
    incl: [
      ['pen', 'Essays', 'Argumentative, analytical and critical essays at every level.'],
      ['doc', 'Reports', 'Business, technical and lab reports with a professional structure.'],
      ['heart', 'Reflective writing', 'Reflections using models such as Gibbs, Kolb and Driscoll.'],
      ['book', 'Literature summaries', 'Concise summaries of articles, chapters and books.'],
      ['chat', 'Articles & blogs', 'Well researched academic articles and educational content.'],
      ['edit', 'Editing & proofreading', 'Polishing your own writing for clarity, flow and accuracy.'],
    ],
    levels: ['Foundation', 'Undergraduate', 'Master\'s', 'PhD', 'Professional'],
    recv: ['Writing produced from scratch for your brief', 'A clear, natural academic voice', 'Referencing in your required style', 'Changes until the work meets your brief', 'Delivery on or before your deadline'],
    faqs: [
      ['Can you edit my own work instead?', 'Yes. Our editors can improve your own draft for structure, clarity, grammar and referencing.'],
      ['Do you write reflective pieces?', 'Yes. Our experts are familiar with reflective models such as Gibbs, Kolb and Driscoll.'],
      ['Is the writing really done by humans?', 'Always. Every piece is written by a real subject expert, with no AI writing tools at any stage.'],
    ] },
  { slug: 'presentations-posters', name: 'Presentations & Posters', menu: 'Presentations & Posters', icon: 'slides', opt: 'Presentation & Poster',
    short: 'Designed decks and academic posters.',
    h1: 'Presentations and posters that <span class="serif">stand out.</span>',
    lead: 'Professionally designed slide decks and academic posters, with clear content, strong visuals and speaker notes so you can present with confidence.',
    incl: [
      ['slides', 'Slide design', 'Clean, modern slides in PowerPoint, Google Slides or Keynote.'],
      ['chat', 'Speaker notes', 'Notes for every slide, so you know exactly what to say.'],
      ['chart', 'Data visuals', 'Charts, diagrams and infographics that make complex ideas simple.'],
      ['layers', 'Academic posters', 'Conference and research posters, ready to print in A0 or A1.'],
      ['edit', 'Your template', 'Designs that follow your university or company template.'],
      ['video', 'Rehearsal', 'Add a live session to rehearse your delivery with an expert.'],
    ],
    levels: ['Seminars', 'Conferences', 'Viva and defence', 'Group projects', 'Pitch decks'],
    recv: ['A deck or poster designed for your brief', 'Editable source files', 'Speaker notes on every slide', 'Changes until the work meets your brief', 'Delivery on or before your deadline'],
    faqs: [
      ['Which formats do you deliver?', 'PowerPoint, Google Slides, Keynote and PDF, plus print ready files for posters.'],
      ['Can you use my university template?', 'Yes. Send us the template and brand guidelines and we will design within them.'],
      ['Can you help me rehearse?', 'Yes. Add a live session and an expert will help you rehearse your delivery and timing.'],
    ] },
];

const SUBJECTS = [
  { slug: 'international-business-management', name: 'International Business Management', short: 'Global strategy, market entry and more', icon: 'globe', opt: 'Int\'l Business Mgmt',
    lead: 'Work with specialists who combine academic theory with real world business insight, from global strategy to cross cultural management.',
    topics: ['Global strategy', 'Market entry', 'Cross cultural management', 'International marketing', 'Supply chain management', 'Human resource management', 'Organisational behaviour', 'Leadership', 'Corporate social responsibility', 'International trade'],
    styles: ['Harvard', 'APA'] },
  { slug: 'computer-science', name: 'Computer Science', short: 'Algorithms, programming and machine learning', icon: 'code', opt: 'Computer Science',
    lead: 'From algorithms to machine learning, our computer scientists support theory, code and reports with equal confidence.',
    topics: ['Algorithms & data structures', 'Programming in Python, Java and C++', 'Machine learning', 'Artificial intelligence', 'Databases & SQL', 'Software engineering', 'Operating systems', 'Computer networks', 'Web development', 'Theory of computation'],
    styles: ['IEEE', 'ACM', 'APA'] },
  { slug: 'medical', name: 'Medical', short: 'Clinical cases, pharmacology and public health', icon: 'pulse', opt: 'Medical',
    lead: 'Medical specialists who understand clinical evidence, academic rigour and the standards your faculty expects.',
    topics: ['Clinical case reports', 'Anatomy & physiology', 'Pharmacology', 'Pathology', 'Public health', 'Epidemiology', 'Medical ethics', 'Evidence based medicine', 'Systematic reviews', 'Health policy'],
    styles: ['Vancouver', 'AMA', 'APA'] },
  { slug: 'mathematics', name: 'Mathematics', short: 'Statistics, calculus and modelling', icon: 'sigma', opt: 'Mathematics',
    lead: 'Mathematicians and statisticians who show every step clearly, from pure theory to applied modelling and data analysis.',
    topics: ['Calculus', 'Linear algebra', 'Statistics & probability', 'Differential equations', 'Discrete mathematics', 'Numerical methods', 'Real analysis', 'Operations research', 'Financial mathematics', 'Mathematical modelling'],
    styles: ['APA', 'Harvard'] },
  { slug: 'finance', name: 'Finance', short: 'Analysis, valuation and financial modelling', icon: 'dollar', opt: 'Finance',
    lead: 'Finance specialists with academic and industry experience in analysis, valuation, modelling and risk.',
    topics: ['Financial analysis', 'Corporate finance', 'Investment analysis', 'Valuation', 'Financial modelling', 'Risk management', 'Accounting', 'Econometrics', 'Behavioural finance', 'Portfolio management'],
    styles: ['Harvard', 'APA'] },
  { slug: 'sciences', name: 'Sciences', short: 'Biology, chemistry, physics and more', icon: 'flask', opt: 'Sciences',
    lead: 'Scientists who know how to design experiments, interpret results and write them up to a publishable standard.',
    topics: ['Biology', 'Chemistry', 'Physics', 'Biochemistry', 'Microbiology', 'Genetics', 'Environmental science', 'Earth science', 'Lab reports', 'Research methods'],
    styles: ['APA', 'ACS', 'Harvard'] },
  { slug: 'nursing', name: 'Nursing', short: 'Care plans, reflection and evidence', icon: 'heart', opt: 'Nursing',
    lead: 'Registered nurses and nurse educators who understand clinical practice, reflection and the evidence behind patient care.',
    topics: ['Care plans', 'Reflective practice', 'Evidence based practice', 'Patient safety', 'Adult nursing', 'Mental health nursing', 'Paediatric nursing', 'Leadership in nursing', 'Clinical skills', 'Health promotion'],
    styles: ['APA', 'Harvard'] },
  { slug: 'law', name: 'Law', short: 'Case analysis and legal research', icon: 'scale', opt: 'Law',
    lead: 'Law graduates and legal researchers who know how to build an argument, apply the authorities and reference them correctly.',
    topics: ['Contract law', 'Criminal law', 'Tort law', 'Constitutional law', 'Commercial law', 'International law', 'Human rights', 'Legal research', 'Case analysis', 'Law dissertations'],
    styles: ['OSCOLA', 'AGLC', 'Bluebook'] },
  { slug: 'engineering', name: 'Engineering', short: 'Mechanical, civil and electrical', icon: 'gear', opt: 'Engineering',
    lead: 'Chartered and academic engineers who handle calculations, design reports and technical writing with precision.',
    topics: ['Mechanical engineering', 'Civil engineering', 'Electrical & electronic', 'Chemical engineering', 'Structural analysis', 'Thermodynamics', 'Fluid mechanics', 'Control systems', 'CAD & design', 'Engineering project management'],
    styles: ['IEEE', 'Harvard'] },
  { slug: 'it', name: 'IT', disp: 'Information Technology', short: 'Networking, security and cloud', icon: 'monitor', opt: 'IT',
    lead: 'IT specialists covering networks, security, cloud and information systems, in theory and in practice.',
    topics: ['Networking', 'Cybersecurity', 'Cloud computing', 'Information systems', 'Database management', 'Systems analysis', 'IT project management', 'Data analytics', 'Internet of Things', 'Business intelligence'],
    styles: ['IEEE', 'APA', 'Harvard'] },
];

const GENERAL_FAQ = [
  ['Is the work really written by humans, not AI?', 'Yes. Every project is researched and written by a qualified subject expert. We don\'t use AI writing tools at any stage, and every piece is reviewed by our quality team before delivery.'],
  ['Is my information kept confidential?', 'Completely. Your personal details, files and conversations are private and are never shared with anyone.'],
  ['How much does it cost?', 'Pricing depends on the type of work, subject, length and deadline. Share your brief and you\'ll get an instant, fixed quote with no obligation.'],
  ['How should I use the work I receive?', 'Our work is designed as an expert model to guide your own research, writing and understanding. Please use it in line with your university\'s academic integrity policy.'],
];

/* ======================= templates ======================= */
const SVC_OPTS = ['Research Paper', 'Research Proposal', 'Thesis & Dissertation', 'Case Study', 'Business Plan', 'Annotated Bibliography', 'Content Writing', 'Presentation & Poster', 'Live Session', 'Other'];
const SUB_OPTS = [...SUBJECTS.map(s => s.opt), 'Other'];
const esc = s => s.replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;');
const opts = (list, sel) => list.map(o => `<option${o === sel ? ' selected' : ''}>${esc(o)}</option>`).join('');

/* ======================= SEO: site address, structured data ======================= */
const SITE = 'https://educationment.vercel.app';
const AREAS = ['United Kingdom', 'United States', 'Australia', 'United Arab Emirates', 'New Zealand', 'Canada', 'Europe', 'India'];
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const attr = s => strip(s).replace(/"/g, '&quot;');
const ORG_LD = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': SITE + '/#org',
  name: 'EducationMent', url: SITE + '/', logo: SITE + '/assets/icons/icon-512.png', image: SITE + '/assets/og/default.jpg',
  description: 'Expert academic support for university students: dissertations, research papers, case studies, business plans, presentations and live sessions, written by subject specialists.',
  email: EMAIL, telephone: '+' + WA_NUM,
  areaServed: AREAS.map(n => ({ '@type': 'Place', name: n })),
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', telephone: '+' + WA_NUM, email: EMAIL, availableLanguage: ['English'],
    hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' } }],
};
const WEBSITE_LD = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: 'EducationMent', publisher: { '@id': SITE + '/#org' }, inLanguage: 'en' };
const crumbLD = list => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name: strip(name), item: SITE + p })) });
const faqLD = items => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
const serviceLD = (name, desc, p) => ({ '@context': 'https://schema.org', '@type': 'Service', name: strip(name), serviceType: strip(name), description: strip(desc), url: SITE + p,
  provider: { '@id': SITE + '/#org' }, areaServed: AREAS.map(n => ({ '@type': 'Place', name: n })), audience: { '@type': 'EducationalAudience', educationalRole: 'student' } });
const SITEMAP = []; // [path, priority] collected as pages are built

// first visit of a session only: show the homepage preloader (fails safe after 4 seconds)
const LOADER_FLAG = `<script>(function(){var d=document.documentElement;try{if(!sessionStorage.getItem('em-intro'))d.classList.add('show-loader')}catch(e){d.classList.add('show-loader')}setTimeout(function(){d.classList.remove('show-loader')},4000)})();</script>`;

function head(R, title, desc, m = {}) {
  const p = m.path || '/', url = SITE + p, og = `${SITE}/assets/og/${m.og || 'default'}.jpg`;
  if (!m.noindex) SITEMAP.push([p, m.priority || 0.7]);
  const ld = [ORG_LD, ...(m.ld || [])];
  const t = attr(title), d = attr(desc);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${d}">
<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${m.noindex ? '' : `<link rel="canonical" href="${url}">\n`}<meta name="theme-color" content="#050F27">
<meta name="author" content="EducationMent">
<meta property="og:type" content="website">
<meta property="og:site_name" content="EducationMent">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${t}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="${R}assets/educationment-icon-favicon.svg" type="image/svg+xml">
<link rel="icon" href="${R}assets/icons/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${R}assets/icons/apple-touch-icon.png">
<link rel="manifest" href="${R}site.webmanifest">
<link rel="preload" href="${R}assets/fonts/jakarta-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${R}assets/fonts/jakarta-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/site.css">
${m.home ? LOADER_FLAG + '\n' : ''}${ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#top">Skip to content</a>
`;
}

function header(R, active, quoteHref) {
  const megaSvc = SERVICES.map(s => `<a class="mi" href="${R}services/${s.slug}.html"><span class="mic">${ic(s.icon)}</span><span><b>${esc(s.menu)}</b><small>${esc(s.short)}</small></span></a>`).join('');
  const megaSub = SUBJECTS.map(s => `<a class="mi" href="${R}subjects/${s.slug}.html"><span class="mic">${ic(s.icon)}</span><span><b>${esc(s.name)}</b><small>${esc(s.short)}</small></span></a>`).join('');
  const on = k => active === k ? ' class="on"' : '';
  return `<!--HEADER-->
<div class="progress" aria-hidden="true"></div>
<div class="topbar">
  <div class="wrap">
    <div class="regions"><span><i class="dot"></i><b>Experts online now</b></span><span class="hide-s">UK · USA · Australia · Dubai · New Zealand · Canada · Europe · India</span></div>
    <span>Reply on WhatsApp in minutes · <b style="color:#fff">24/7</b></span>
  </div>
</div>
<header class="nav" id="nav">
  <div class="wrap">
    <a href="${R}index.html" class="logo" aria-label="EducationMent home"><img src="${R}assets/educationment-logo-horizontal-reversed.svg" alt="EducationMent"></a>
    <nav aria-label="Main"><ul>
      <li class="has-mega"><a href="${R}services.html"${on('services')}>Services${CARET}</a>
        <div class="mega"><div class="mega-in"><div class="mega-grid">${megaSvc}</div>
          <div class="mega-foot"><span>Not sure which service you need?</span><div><a href="${R}contact.html#quote">Ask an expert ${ARR}</a><a href="${R}services.html">All services ${ARR}</a></div></div></div></div></li>
      <li class="has-mega mega-sub"><a href="${R}subjects.html"${on('subjects')}>Subjects${CARET}</a>
        <div class="mega"><div class="mega-in"><div class="mega-grid">${megaSub}</div>
          <div class="mega-foot"><span>We cover far more than these ten.</span><div><a href="${R}contact.html#quote">Check your subject ${ARR}</a><a href="${R}subjects.html">All subjects ${ARR}</a></div></div></div></div></li>
      <li><a href="${R}index.html#process">How it works</a></li>
      <li><a href="${R}about.html"${on('about')}>About</a></li>
      <li><a href="${R}contact.html"${on('contact')}>Contact</a></li>
    </ul></nav>
    <div class="cta">
      <a href="${quoteHref}" class="btn btn-primary magnetic">Get an instant quote <span class="arr">${ARR}</span></a>
      <button class="burger" aria-label="Open menu"><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="mobile-menu" aria-hidden="true">
  <a href="${R}services.html">Services</a><a href="${R}subjects.html">Subjects</a><a href="${R}index.html#process">How it works</a><a href="${R}about.html">About</a><a href="${R}contact.html">Contact</a>
  <a href="${quoteHref}" class="btn btn-primary">Get an instant quote</a>
</div>
<!--/HEADER-->`;
}

function footer(R) {
  return `<!--FOOTER-->
<footer>
  <div class="wrap">
    <div class="f-grid f5">
      <div>
        <a href="${R}index.html" class="logo"><img src="${R}assets/educationment-logo-horizontal-reversed.svg" alt="EducationMent"></a>
        <p style="max-width:320px">Expert academic support for university students across the UK, USA, Australia, Dubai, New Zealand, Canada, Europe and India.</p>
      </div>
      <div><h4>Services</h4><ul>${SERVICES.map(s => `<li><a href="${R}services/${s.slug}.html">${esc(s.menu)}</a></li>`).join('')}</ul></div>
      <div><h4>Subjects</h4><ul>${SUBJECTS.map(s => `<li><a href="${R}subjects/${s.slug}.html">${esc(s.name === 'International Business Management' ? 'International Business' : s.name)}</a></li>`).join('')}</ul></div>
      <div><h4>Company</h4><ul><li><a href="${R}about.html">About us</a></li><li><a href="${R}index.html#process">How it works</a></li><li><a href="${R}index.html#why">Why us</a></li><li><a href="${R}contact.html">Contact</a></li><li><a href="${R}privacy.html">Privacy policy</a></li><li><a href="${R}terms.html">Terms of service</a></li></ul></div>
      <div class="f-contact"><h4>Talk to us</h4>
        <a href="#">${WA}WhatsApp: add number</a>
        <a href="#">${ic('mail', 2)}Email: add address</a>
        <p style="margin-top:6px">Support available 24/7</p>
      </div>
    </div>
    <p class="f-note">EducationMent provides model work written by experts and academic guidance to support students' own learning. Clients are responsible for using our work in line with their institution's academic integrity policies.</p>
    <div class="f-bottom"><span>© 2026 EducationMent. All rights reserved.</span><a class="credit" href="https://www.magolabs.in" target="_blank" rel="noopener">Website by <b>Mago Labs</b></a></div>
  </div>
</footer>
<a class="wa" href="#" aria-label="Chat on WhatsApp"><span class="tip">Chat with an expert</span>${WA}</a>
<div class="toast" id="toast"></div>
<!--/FOOTER-->`;
}

// all libraries are self hosted; the globe's map code is loaded by site.js only when it is needed
function scripts(R) {
  return `
<script src="${R}assets/vendor/gsap.min.js" defer></script>
<script src="${R}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${R}assets/vendor/lenis.min.js" defer></script>
<script src="${R}assets/site.js" data-root="${R}" defer></script>
</body>
</html>
`;
}

const CHECK_CHIP = t => `<span>${ic('check', 3)}${t}</span>`;

const BRIEF_FIELD = `<div class="field"><label for="q-brief">Your Requirements</label><textarea id="q-brief" name="brief" rows="3" placeholder="Topic, guidelines, referencing style or anything else we should know"></textarea></div>`;

function quoteForm(svc = 'Research Paper', sub = SUB_OPTS[0], title = 'Get an instant quote') {
  return `<form class="quote" id="quote">
        <h3>${title}</h3>
        <p class="qsub">Tell us about your project and an expert will reply with a price.</p>
        <div class="tabs" data-i="${svc === 'Presentation & Poster' ? 1 : 0}" role="tablist"><button type="button"${svc === 'Presentation & Poster' ? '' : ' class="on"'}>${ic('pen', 2)}Writing</button><button type="button"${svc === 'Presentation & Poster' ? ' class="on"' : ''}>${ic('slides', 2)}Presentations</button></div>
        <div class="field"><label for="q-svc">Service</label><select id="q-svc" name="service" data-default="${esc(svc === 'Presentation & Poster' ? 'Research Paper' : svc)}">${opts(SVC_OPTS, svc)}</select></div>
        <div class="row2">
          <div class="field"><label for="q-sub">Subject</label><select id="q-sub" name="subject">${opts(SUB_OPTS, sub)}</select></div>
          <div class="field"><label for="q-words">Word count</label><input id="q-words" name="words" type="number" inputmode="numeric" placeholder="e.g. 3000" min="1"></div>
        </div>
        <div class="row2">
          <div class="field"><label for="q-date">Deadline</label><input id="q-date" name="deadline" type="date"></div>
          <div class="field"><label for="q-contact">WhatsApp / Email</label><input id="q-contact" name="contact" type="text" autocomplete="email" placeholder="Your contact"></div>
        </div>
        ${BRIEF_FIELD}
        <button class="btn btn-primary" type="submit">Get my instant quote <span class="arr">${ARR}</span></button>
        <div class="fine"><span>${ic('check', 2.5)}No obligation</span><span>${ic('check', 2.5)}100% confidential</span><span>${ic('check', 2.5)}Matched to an expert</span></div>
      </form>`;
}

function pageHero({ crumbs, eyebrow, h1, lead, side, solo, ctas = true, R, bg }) {
  const cr = crumbs.map(([t, h]) => h ? `<a href="${h}">${t}</a>` : `<span>${t}</span>`).join('<i>/</i>');
  return `<section class="hero page-hero">
  ${bg ? `<div class="ph-bg" style="background-image:url('${bg}')" aria-hidden="true"></div>` : ''}
  <canvas class="grid" aria-hidden="true"></canvas>
  <div class="orb o1"></div>
  <div class="wrap ph-grid${solo ? ' solo' : ''}">
    <div>
      <nav class="crumbs ph-in" aria-label="Breadcrumb">${cr}</nav>
      <span class="eyebrow ph-in">${eyebrow}</span>
      <h1 class="ph-in" style="margin-top:18px">${h1}</h1>
      <p class="lead ph-in">${lead}</p>
      ${ctas ? `<div class="hero-ctas ph-in">
        <a href="#quote" class="btn btn-primary magnetic">Get my instant quote <span class="arr">${ARR}</span></a>
        <a href="#" class="btn btn-ghost magnetic">${WA.replace('<svg', '<svg width="18" height="18"')}Chat on WhatsApp</a>
      </div>` : ''}
      <div class="ph-chips ph-in">${CHECK_CHIP('Written by humans')}${CHECK_CHIP('Plagiarism free')}${CHECK_CHIP('100% pass guarantee')}${CHECK_CHIP('Confidential')}</div>
    </div>
    ${side ? `<div class="hero-visual">${side}</div>` : ''}
  </div>
</section>`;
}

function photoBand(src, h3, chips) {
  return `<section class="photo-band">
  <div class="wrap">
    <div class="pb-frame reveal">
      <img src="${src}" alt="" loading="lazy" decoding="async">
      <div class="pb-cap">
        <h3>${h3}</h3>
        <div class="chips">${chips.map(c => `<span>${ic('check', 3)}${c}</span>`).join('')}</div>
      </div>
    </div>
  </div>
</section>`;
}

const STATS = `<section class="stats">
  <div class="wrap">
    <div class="stats-grid reveal-group">
      <div class="stat"><div class="num"><span class="count" data-to="5000">0</span><em>+</em></div><p>Students supported</p><small>Over the last 5 years</small></div>
      <div class="stat"><div class="num"><span class="count" data-to="15000">0</span><em>+</em></div><p>Projects completed</p><small>Across 10+ subjects</small></div>
      <div class="stat"><div class="num"><span class="count" data-to="80">0</span><em>%+</em></div><p>Graded distinction</p><small>Of all work delivered</small></div>
      <div class="stat"><div class="num"><span class="count" data-to="100">0</span><em>%</em></div><p>Pass guarantee</p><small>On every project</small></div>
    </div>
  </div>
</section>`;

const STEP = (n, icon, h, p, tag) => `<div class="step"><div class="node">${n}</div><div class="card"><span class="big" aria-hidden="true">${n}</span><span class="sic">${ic(icon)}</span><h3>${h}</h3><p>${p}</p><span class="tag">${ic('check', 3)}${tag}</span></div></div>`;
const PROCESS = `<section class="sec process" id="process">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">How it works</span><h2 class="split">From brief to <span class="serif">brilliant</span> in four steps.</h2></div>
      <p class="lead reveal">No complicated forms and no chasing. Message us, and a dedicated coordinator manages your project from start to finish.</p>
    </div>
    <div class="steps" id="steps">
      <div class="rail"><i></i></div>
      ${STEP('01', 'upload', 'Share your brief', 'Send your topic, guidelines, rubric and deadline through the form or WhatsApp.', 'Takes 2 minutes')}
      ${STEP('02', 'target', 'Get your quote', 'We review your requirements and send a clear, fixed price, with no hidden fees.', 'No obligation')}
      ${STEP('03', 'pen', 'Your expert gets to work', 'A specialist in your subject researches and writes from scratch, with progress updates along the way.', 'Written by humans')}
      ${STEP('04', 'award', 'Review & receive', 'Your work passes a quality and originality check, then lands in your inbox on time.', 'Delivered on time')}
    </div>
  </div>
</section>`;

function faq(items, title = 'Questions? <span class="serif">Answered.</span>', R = '') {
  return `<section class="sec faq" id="faq">
  <div class="wrap faq-grid">
    <div class="faq-left">
      <span class="eyebrow">FAQ</span>
      <h2 class="split" style="margin-top:18px">${title}</h2>
      <p class="lead reveal">Can't find what you're looking for? Our team replies on WhatsApp within minutes, any time of day.</p>
      <a href="#" class="btn btn-dark magnetic reveal">Ask us on WhatsApp <span class="arr">${ARR}</span></a>
    </div>
    <div class="reveal-group">
      ${items.map(([q, a], i) => `<div class="qa${i === 0 ? ' open' : ''}"><button>${q}<i></i></button><div class="a"><p>${a}</p></div></div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function cta(R, h2 = 'Your next grade starts with <span class="serif">one message.</span>', quoteHref = '#quote') {
  return `<section class="cta-sec" style="padding-top:clamp(90px,10vw,130px)">
  <div class="wrap">
    <div class="cta-box">
      <canvas class="cta-lines" aria-hidden="true"></canvas>
      <span class="eyebrow">Ready when you are</span>
      <h2 class="split">${h2}</h2>
      <p class="lead">Share your brief today and get an instant quote from a subject expert. No obligation and no pressure, just work of the highest quality.</p>
      <div class="hero-ctas">
        <a href="${quoteHref}" class="btn btn-primary magnetic">Get my instant quote <span class="arr">${ARR}</span></a>
        <a href="#" class="btn btn-ghost magnetic">Chat on WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;
}

const svcCard = (R, s, i) => `<a class="svc tilt" href="${R}services/${s.slug}.html">
        <span class="idx">${String(i + 1).padStart(2, '0')}</span>${s.live ? '<span class="live-pill">LIVE</span>' : ''}
        <span class="ic">${ic(s.icon)}</span>
        <h3>${s.name}</h3>
        <p>${s.short}</p>
        <span class="more">Learn more <i>${ARR}</i></span>
      </a>`;

const subjChips = R => `<div class="chips reveal-group">${SUBJECTS.map(s => `<a href="${R}subjects/${s.slug}.html">${ic(s.icon)}${esc(s.name)}</a>`).join('')}</div>`;

/* ======================= pages ======================= */
const pages = [];

// service pages
SERVICES.forEach((s, idx) => {
  const R = '../';
  const related = [1, 2, 3].map(k => SERVICES[(idx + k) % SERVICES.length]);
  const body = `${pageHero({ R, crumbs: [['Home', R + 'index.html'], ['Services', R + 'services.html'], [esc(s.menu)]], eyebrow: esc(s.name), h1: s.h1, lead: s.lead, side: quoteForm(s.opt) })}
${STATS}
<section class="sec" style="padding-top:40px">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">What's included</span><h2 class="split">Everything you need, <span class="serif">handled</span> by an expert.</h2></div>
      <p class="lead reveal">Every project is matched to a specialist in your subject and built around your exact brief, rubric and deadline.</p>
    </div>
    <div class="incl-grid reveal-group">
      ${s.incl.map(([k, h, p], i) => `<div class="incl tilt"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="ic">${ic(k)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>
${photoBand(`${R}assets/img/svc-${s.slug}.webp`, 'Built around your brief, <span class="serif">not a template.</span>', ['Written by humans', 'Plagiarism free', 'Delivered on time'])}
<section class="sec" style="background:#fff">
  <div class="wrap split2">
    <div>
      <span class="eyebrow">Who it's for</span>
      <h2 class="split" style="margin-top:18px">Support at <span class="serif">every</span> level.</h2>
      <p class="lead reveal">Whatever stage you're at, you'll work with an expert who has studied at that level or above, in your subject.</p>
      <div class="chips reveal-group">${s.levels.map(l => `<span><i class="dot"></i>${esc(l)}</span>`).join('')}</div>
      <p class="lead reveal" style="margin:34px 0 16px;font-size:15px">Available in every subject we cover:</p>
      ${subjChips(R)}
    </div>
    <div class="recv reveal">
      <h3>What you receive</h3>
      <ul>${s.recv.map(r => `<li><i></i>${esc(r)}</li>`).join('')}</ul>
      <a href="#quote" class="btn btn-primary magnetic">Get my instant quote <span class="arr">${ARR}</span></a>
    </div>
  </div>
</section>
${PROCESS}
${faq([...s.faqs, ...GENERAL_FAQ.slice(0, 3)])}
<section class="sec" style="padding-bottom:0">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Related services</span><h2 class="split">Students also <span class="serif">ask</span> for.</h2></div>
      <p class="lead reveal"><a href="${R}services.html" style="color:var(--orange);font-weight:700">View all services</a></p>
    </div>
    <div class="svc-grid three">
      ${related.map((o) => svcCard(R, o, SERVICES.indexOf(o))).join('\n      ')}
    </div>
  </div>
</section>
${cta(R)}`;
  pages.push([`services/${s.slug}.html`, head(R, `${s.name.replace('&', 'and')} | EducationMent`, esc(s.lead), { path: `/services/${s.slug}`, og: `svc-${s.slug}`, priority: 0.9,
    ld: [serviceLD(s.name, s.lead, `/services/${s.slug}`), crumbLD([['Home', '/'], ['Services', '/services'], [s.menu, `/services/${s.slug}`]]), faqLD([...s.faqs, ...GENERAL_FAQ.slice(0, 3)])] }) + header(R, 'services', '#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
});

// subject pages
SUBJECTS.forEach((s0) => {
  const s = { ...s0, name: s0.disp || s0.name };
  const R = '../';
  const others = SUBJECTS.filter(o => o !== s0);
  const body = `${pageHero({ R, crumbs: [['Home', R + 'index.html'], ['Subjects', R + 'subjects.html'], [esc(s.name)]], eyebrow: `${esc(s.name)} experts`, h1: `${esc(s.name)} support from <span class="serif">real specialists.</span>`, lead: s.lead, side: quoteForm('Research Paper', s.opt), bg: `${R}assets/img/subj-${s0.slug}.webp` })}
${STATS}
<section class="sec" style="padding-top:40px">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Topics we cover</span><h2 class="split">Deep expertise across <span class="serif">${esc(s.name)}.</span></h2></div>
      <p class="lead reveal">These are some of the topics our ${esc(s.name.toLowerCase() === 'it' ? 'IT' : s.name)} experts support most often. If yours isn't listed, just ask.</p>
    </div>
    <div class="topic-grid reveal-group">
      ${s.topics.map((t, i) => `<div class="topic"><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(t)}</b></div>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="sec" style="background:#fff">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Services</span><h2 class="split">Every service, <span class="serif">in ${esc(s.name.toLowerCase() === 'it' ? 'IT' : s.name)}.</span></h2></div>
      <p class="lead reveal">From a single case study to a full doctoral thesis, every service is available with a specialist in your subject.</p>
    </div>
    <div class="svc-grid three">
      ${SERVICES.map((o, i) => svcCard(R, o, i)).join('\n      ')}
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap split2">
    <div>
      <span class="eyebrow">Referencing</span>
      <h2 class="split" style="margin-top:18px">The styles your <span class="serif">faculty</span> expects.</h2>
      <p class="lead reveal">Our ${esc(s.name === 'IT' ? 'IT' : s.name)} experts work in the referencing styles most used in your field, and in any other style your module requires.</p>
      <div class="chips reveal-group">${s.styles.map(l => `<span><i class="dot"></i>${l}</span>`).join('')}<span><i class="dot"></i>Any other style</span></div>
    </div>
    <div class="recv reveal">
      <h3>Why students choose our ${esc(s.name === 'IT' ? 'IT' : s.name)} experts</h3>
      <ul><li><i></i>Specialists with degrees in ${esc(s.name === 'IT' ? 'IT' : s.name)}</li><li><i></i>Every word written by a human, never AI</li><li><i></i>Original work, checked before delivery</li><li><i></i>100% pass guarantee on every project</li><li><i></i>WhatsApp support around the clock</li></ul>
      <a href="#quote" class="btn btn-primary magnetic">Get my instant quote <span class="arr">${ARR}</span></a>
    </div>
  </div>
</section>
${PROCESS}
${faq([[`Who will work on my ${s.name === 'IT' ? 'IT' : s.name} project?`, `A specialist with a degree in ${s.name === 'IT' ? 'IT' : s.name}, usually at Master's or PhD level, who knows the conventions and expectations of your field.`], ...GENERAL_FAQ])}
<section class="sec" style="padding-bottom:0">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Other subjects</span><h2 class="split">Studying <span class="serif">something else?</span></h2></div>
      <p class="lead reveal">We cover far more than ten subjects. These are the most popular.</p>
    </div>
    <div class="chips reveal-group">${others.map(o => `<a href="${R}subjects/${o.slug}.html">${ic(o.icon)}${esc(o.name)}</a>`).join('')}</div>
  </div>
</section>
${cta(R)}`;
  pages.push([`subjects/${s.slug}.html`, head(R, `${s.name} Assignment Help | EducationMent`, esc(s.lead), { path: `/subjects/${s0.slug}`, og: `subj-${s0.slug}`, priority: 0.8,
    ld: [serviceLD(`${s.name} academic support`, s.lead, `/subjects/${s0.slug}`), crumbLD([['Home', '/'], ['Subjects', '/subjects'], [s.name, `/subjects/${s0.slug}`]]),
      faqLD([[`Who will work on my ${s.name} project?`, `A specialist with a degree in ${s.name}, usually at Master's or PhD level, who knows the conventions and expectations of your field.`], ...GENERAL_FAQ])] }) + header(R, 'subjects', '#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
});

// services overview
{
  const R = '';
  const body = `${pageHero({ R, crumbs: [['Home', 'index.html'], ['Services']], eyebrow: 'Our services', h1: 'Every kind of academic work, <span class="serif">handled by a specialist.</span>', lead: 'Nine services, one standard. From a short case study to a full doctoral thesis, you get an expert in your exact subject. Never a generalist, and never a machine.', side: quoteForm() })}
${STATS}
<section class="sec services" style="padding-top:40px">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">All services</span><h2 class="split">Choose the support <span class="serif">you need.</span></h2></div>
      <p class="lead reveal">Every service is available in every subject we cover, at every level from undergraduate to PhD.</p>
    </div>
    <div class="svc-grid three">
      ${SERVICES.map((o, i) => svcCard(R, o, i)).join('\n      ')}
    </div>
  </div>
</section>
${PROCESS}
${faq(GENERAL_FAQ)}
${cta(R)}`;
  pages.push(['services.html', head(R, 'Academic Services | EducationMent', 'Dissertations, research papers, proposals, case studies, live sessions, business plans, annotated bibliographies, content writing, presentations and posters.', { path: '/services', og: 'services', priority: 0.9, ld: [crumbLD([['Home', '/'], ['Services', '/services']]), faqLD(GENERAL_FAQ)] }) + header(R, 'services', '#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
}

// subjects overview
{
  const R = '';
  const body = `${pageHero({ R, crumbs: [['Home', 'index.html'], ['Subjects']], eyebrow: 'Subjects', h1: 'Specialists for <span class="serif">every discipline.</span>', lead: 'Your work is only ever handled by an expert with a degree in your field, who knows its conventions, its sources and what examiners look for.', side: quoteForm() })}
${STATS}
<section class="sec" style="padding-top:40px">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Our subjects</span><h2 class="split">Find your <span class="serif">subject.</span></h2></div>
      <p class="lead reveal">These are our ten most popular subjects. We cover many more, so if yours isn't here, just ask.</p>
    </div>
    <div class="subj-grid reveal-group">
      ${SUBJECTS.map(s => `<a class="subj" href="subjects/${s.slug}.html"><span class="subj-bg" style="background-image:url('assets/img/subj-${s.slug}-sm.webp')" aria-hidden="true"></span><span class="emo">${ic(s.icon)}</span><div><h3>${esc(s.name)}</h3><ul>${s.topics.slice(0, 4).map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><i class="go">${ARR}</i></a>`).join('\n      ')}
    </div>
    <div class="sub-foot reveal">
      <p>Don't see your subject? <b>We cover far more than these ten.</b> Ask us.</p>
      <a href="#quote" class="btn btn-dark">Check your subject <span class="arr">${ARR}</span></a>
    </div>
  </div>
</section>
${PROCESS}
${cta(R)}`;
  pages.push(['subjects.html', head(R, 'Subjects We Cover | EducationMent', 'Expert academic support in International Business Management, Computer Science, Medical, Mathematics, Finance, Sciences, Nursing, Law, Engineering and IT.', { path: '/subjects', og: 'subjects', priority: 0.9, ld: [crumbLD([['Home', '/'], ['Subjects', '/subjects']])] }) + header(R, 'subjects', '#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
}

// about
{
  const R = '';
  const side = `<div class="ph-card">
        <h3>EducationMent at a glance</h3>
        <div class="ph-stats">
          <div><b>5<em>+</em></b><span>Years of experience</span></div>
          <div><b>5k<em>+</em></b><span>Students supported</span></div>
          <div><b>15k<em>+</em></b><span>Projects completed</span></div>
          <div><b>8</b><span>Regions served</span></div>
        </div>
      </div>`;
  const VAL = (k, h, p) => `<div class="incl tilt"><span class="ic">${ic(k)}</span><h3>${h}</h3><p>${p}</p></div>`;
  const body = `${pageHero({ R, crumbs: [['Home', 'index.html'], ['About']], eyebrow: 'About EducationMent', h1: 'Five years of <span class="serif">distinction,</span> one student at a time.', lead: 'We are a global team of subject specialists helping university students reach the grades they are capable of, with expert work, honest guidance and support that never sleeps.', side, ctas: false })}
${STATS}
<section class="sec" style="padding-top:40px">
  <div class="wrap split2">
    <div class="story">
      <span class="eyebrow">Our story</span>
      <h2 class="split" style="margin:18px 0 26px">Built on one simple <span class="serif">belief.</span></h2>
      <p class="reveal">EducationMent began with a simple belief: <b>every student deserves access to a true expert in their subject.</b> Not a generalist, not a template and never a machine.</p>
      <p class="reveal">Over the last five years that belief has grown into a global team of specialists, supporting <b>more than 5,000 students</b> across the UK, USA, Australia, Dubai, New Zealand, Canada, Europe and India.</p>
      <p class="reveal">Together we have completed <b>more than 15,000 projects</b>, and over 80% of our work has been graded at distinction level. We are proud of those numbers, but we are prouder of the students behind them.</p>
    </div>
    <div class="bigquote photo reveal" style="background-image:linear-gradient(10deg,rgba(5,15,39,.95) 25%,rgba(5,15,39,.2) 100%),url('assets/img/about-campus.webp')">
      <blockquote>Our standard has never changed: <span>work good enough for a distinction,</span> written by a human who genuinely knows the subject.</blockquote>
      <cite>The EducationMent team</cite>
    </div>
  </div>
</section>
<section class="sec" style="background:#fff">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">What we stand for</span><h2 class="split">The values behind <span class="serif">every project.</span></h2></div>
      <p class="lead reveal">Four principles guide how we hire experts, take on projects and look after every student who trusts us.</p>
    </div>
    <div class="incl-grid reveal-group">
      ${VAL('award', 'Expertise first', 'Every expert holds a degree in the subject they work on, usually at Master\'s or PhD level.')}
      ${VAL('user', 'Human by design', 'Every word is researched and written by a real person. We never use AI writing tools.')}
      ${VAL('shield', 'Integrity', 'Original work, honest advice and complete confidentiality, every single time.')}
      ${VAL('clock', 'Always on time', 'Deadlines matter to you, so they matter just as much to us.')}
      ${VAL('chat', 'Always available', 'Real people on WhatsApp around the clock, in every time zone we serve.')}
      ${VAL('target', 'Results that last', 'We measure success by your grades and by how much you learn along the way.')}
    </div>
  </div>
</section>
<section class="sec global">
  <div class="wrap global-grid">
    <div>
      <span class="eyebrow">Global reach</span>
      <h2 class="split" style="margin-top:18px">One team. <span class="serif">Eight</span> regions. Every time zone.</h2>
      <p class="lead reveal">We know the marking criteria, referencing styles and academic expectations of universities in every region we serve.</p>
      <div class="regions-list reveal-group" id="regions">
        ${[['UK', 'United Kingdom', 'Harvard · OSCOLA'], ['US', 'United States', 'APA · MLA'], ['AU', 'Australia', 'APA · AGLC'], ['AE', 'Dubai', 'Harvard · APA'], ['NZ', 'New Zealand', 'APA'], ['CA', 'Canada', 'APA · Chicago'], ['EU', 'Europe', 'Harvard · IEEE'], ['IN', 'India', 'APA · IEEE']].map(([c, n, st], i) => `<div class="region" data-i="${i}"><span class="code">${c}</span><span class="rt"><b>${n}</b><small>${st}</small></span><i class="go">${ARR}</i></div>`).join('\n        ')}
      </div>
    </div>
    <div class="globe-wrap"><canvas id="globe" aria-label="Globe showing the eight regions EducationMent serves" role="img"></canvas><span class="globe-hint">Drag to spin · Select a region to fly there</span></div>
  </div>
</section>
${cta(R, 'Join thousands of students who <span class="serif">aim higher.</span>', 'contact.html#quote')}`;
  pages.push(['about.html', head(R, 'About Us | EducationMent', 'Five years, 5,000+ students and 15,000+ projects across eight regions. Meet the team of subject specialists behind EducationMent.', { path: '/about', og: 'about', priority: 0.7, ld: [crumbLD([['Home', '/'], ['About', '/about']])] }) + header(R, 'about', 'contact.html#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R, true)]);
}

// contact
{
  const R = '';
  const side = `<div class="ph-card ph-contact">
        <h3>Talk to a real person</h3>
        <a href="#"><span class="ci">${WA}</span><span><b>WhatsApp</b><small>Add your number here · fastest reply</small></span></a>
        <a href="#"><span class="ci">${ic('mail', 2)}</span><span><b>Email</b><small>Add your email address here</small></span></a>
        <a href="services/live-sessions.html"><span class="ci">${ic('video', 2)}</span><span><b>Book a live session</b><small>1:1 video call with an expert</small></span></a>
        <div class="hours"><i></i>Online now · 24/7, every day of the year</div>
      </div>`;
  const body = `${pageHero({ R, crumbs: [['Home', 'index.html'], ['Contact']], eyebrow: 'Contact us', h1: 'Let\'s talk about your <span class="serif">project.</span>', lead: 'Share your brief for an instant quote, or message us on WhatsApp. A real person replies within minutes, any time of day or night.', side, ctas: false })}
<section class="sec" id="quote" style="padding-top:80px">
  <div class="wrap contact-wrap">
    <form class="contact-form cf">
      <h2>Get an instant quote</h2>
      <p>Tell us about your project. The more detail you share, the more accurate your quote will be.</p>
      <div class="cf-grid">
        <div><label for="c-name">Your name</label><input id="c-name" type="text" placeholder="Full name"></div>
        <div><label for="c-contact">WhatsApp or email</label><input id="c-contact" type="text" placeholder="How should we reach you?"></div>
        <div><label for="c-svc">Service</label><select id="c-svc">${opts(SVC_OPTS, 'Research Paper')}</select></div>
        <div><label for="c-sub">Subject</label><select id="c-sub">${opts(SUB_OPTS, SUB_OPTS[0])}</select></div>
        <div><label for="c-level">Level</label><select id="c-level">${opts(['Undergraduate', 'Master\'s', 'MBA', 'PhD', 'Other'], 'Undergraduate')}</select></div>
        <div><label for="c-country">Country</label><select id="c-country">${opts(['United Kingdom', 'United States', 'Australia', 'Dubai', 'New Zealand', 'Canada', 'Europe', 'India', 'Other'], 'United Kingdom')}</select></div>
        <div><label for="c-words">Word count</label><input id="c-words" type="number" placeholder="e.g. 3000" min="0"></div>
        <div><label for="c-date">Deadline</label><input id="c-date" type="date"></div>
        <div class="full"><label for="c-msg">Project details</label><textarea id="c-msg" placeholder="Topic, requirements, referencing style and anything else we should know"></textarea></div>
        <label class="cf-drop full">${ic('upload', 2)}<span><b style="color:var(--ink)">Attach your brief or rubric</b><br>PDF, Word or images. Optional.</span><input type="file" multiple hidden></label>
      </div>
      <div class="cf-foot">
        <small>${'No obligation · 100% confidential · Matched to an expert'}</small>
        <button class="btn btn-primary" type="submit">Get my instant quote <span class="arr">${ARR}</span></button>
      </div>
    </form>
    <div class="side-stack">
      <div class="side-card dark"><h3>What happens next?</h3><p>Our coordinator reviews your brief, matches you with a specialist in your subject and sends a clear, fixed quote. There is no obligation to go ahead.</p><div class="hours"><i></i>Typical reply in minutes</div></div>
      <div class="side-card"><h3>Every project includes</h3><ul><li>Work written by a human expert</li><li>Original work, checked before delivery</li><li>100% pass guarantee</li><li>Complete confidentiality</li><li>WhatsApp support 24/7</li></ul></div>
      <div class="side-card"><h3>Regions we serve</h3><p>UK · USA · Australia · Dubai · New Zealand · Canada · Europe · India</p></div>
    </div>
  </div>
</section>
${faq(GENERAL_FAQ)}`;
  pages.push(['contact.html', head(R, 'Contact Us | EducationMent', 'Get an instant quote or talk to an expert on WhatsApp, 24/7.', { path: '/contact', og: 'contact', priority: 0.8, ld: [crumbLD([['Home', '/'], ['Contact', '/contact']]), faqLD(GENERAL_FAQ)] }) + header(R, 'contact', '#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
}

// legal drafts
function legal(file, title, intro, sections) {
  const R = '';
  const body = `${pageHero({ R, crumbs: [['Home', 'index.html'], [title]], eyebrow: 'Legal', h1: title, lead: intro, solo: true, ctas: false })}
<section class="sec legal-sec" style="padding-top:80px">
  <div class="wrap legal">
    <div class="draft">${ic('shield', 2).replace('<svg', '<svg width="22" height="22" style="flex:none;color:var(--orange)"')}<span><b>Draft for review.</b> This page is a starting template. Please have it reviewed and completed by a qualified lawyer for each country you operate in before the site goes live.</span></div>
    <p class="updated">Last updated: [date]</p>
    ${sections.map(([h, ps]) => `<h2>${h}</h2>${ps.map(p => Array.isArray(p) ? `<ul>${p.map(li => `<li>${li}</li>`).join('')}</ul>` : `<p>${p}</p>`).join('')}`).join('\n    ')}
  </div>
</section>`;
  const p = '/' + file.replace('.html', '');
  pages.push([file, head(R, `${title} | EducationMent`, intro, { path: p, priority: 0.3, ld: [crumbLD([['Home', '/'], [title, p]])] }) + header(R, '', 'contact.html#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
}
legal('privacy.html', 'Privacy Policy', 'How EducationMent collects, uses and protects your personal information.', [
  ['Who we are', ['EducationMent ("we", "us") provides academic support services to university students. For questions about this policy, contact us at [email address].']],
  ['Information we collect', ['We collect only what we need to deliver your project and support you:', ['Contact details such as your name, email address and WhatsApp number', 'Project details such as your subject, brief, files and deadline', 'Payment confirmation details processed by our payment provider', 'Basic website usage data collected through cookies']]],
  ['How we use your information', ['We use your information to prepare quotes, deliver your project, communicate with you, process payments and improve our service. We never sell your information.']],
  ['Confidentiality', ['Your identity, files and conversations are kept strictly confidential. Experts working on your project see only what they need to complete it.']],
  ['How long we keep it', ['We keep project information only as long as needed to provide the service and meet legal obligations, then delete it securely.']],
  ['Your rights', ['Depending on where you live, you may have the right to access, correct or delete your personal data, and to object to or restrict how we use it. To make a request, contact us at [email address].']],
  ['Cookies', ['We use essential cookies to run the website and optional analytics cookies to understand how it is used. You can control cookies through your browser settings.']],
  ['Changes to this policy', ['We may update this policy from time to time. The latest version will always be available on this page.']],
]);
legal('terms.html', 'Terms of Service', 'The terms that apply when you use EducationMent and our services.', [
  ['Our services', ['EducationMent provides academic support, including model work written by subject experts, editing, guidance and live sessions. All work is provided to support your own learning and research.']],
  ['Academic integrity', ['You agree to use any work we provide as a reference and learning aid, in line with the academic integrity policies of your institution. You are responsible for how you use the work you receive.']],
  ['Orders and quotes', ['Quotes are based on the information you provide, including the type of work, subject, length and deadline. Changes to your brief after an order is confirmed may affect the price or delivery date.']],
  ['Payment', ['Payment terms, accepted methods and any deposit requirements will be confirmed with your quote. [Add your payment terms.]']],
  ['Pass guarantee and revisions', ['If the work does not meet the pass standard set out in your original brief, we will revise it. Requests must be made within [number] days of delivery and must relate to the original brief. [Add the full conditions of your guarantee.]']],
  ['Refunds', ['[Add your refund policy, including when refunds apply and how to request one.]']],
  ['Confidentiality', ['We keep your personal details and project files strictly confidential, as described in our Privacy Policy.']],
  ['Limitation of liability', ['[Add your limitation of liability clause, reviewed by a lawyer.]']],
  ['Contact', ['For any questions about these terms, contact us at [email address] or on WhatsApp at [number].']],
]);

/* ======================= homepage: one time split + shared header/footer ======================= */
let home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const extra = fs.readFileSync(path.join(__dirname, 'pages.css'), 'utf8');
if (home.includes('<style>')) {
  const css = home.slice(home.indexOf('<style>') + 7, home.indexOf('</style>'));
  W('assets/site.css', css.trim() + '\n' + extra);
  home = home.slice(0, home.indexOf('<style>')) + '<link rel="stylesheet" href="assets/site.css">' + home.slice(home.indexOf('</style>') + 8);
  console.log('moved homepage CSS to assets/site.css');
} else {
  // keep site.css in sync with pages.css: replace everything after the marker
  const cssPath = path.join(ROOT, 'assets/site.css');
  let css = fs.readFileSync(cssPath, 'utf8');
  const mark = '/* =================== shared inner page components';
  css = css.slice(0, css.indexOf(mark) >= 0 ? css.indexOf(mark) : css.length).trimEnd() + '\n' + extra.trimStart();
  fs.writeFileSync(cssPath, css);
}
// homepage inline script -> shared file
const inline = home.lastIndexOf('<script>\n');
if (inline > -1) { home = home.slice(0, inline) + '<script src="assets/site.js"></script>\n</body>\n</html>\n'; console.log('moved homepage JS to assets/site.js'); }
// first run: wrap header/footer in markers
if (!home.includes('<!--HEADER-->')) {
  const a = home.indexOf('<div class="progress"'), b = home.indexOf('<main id="top">');
  home = home.slice(0, a) + '<!--HEADER--><!--/HEADER-->\n\n' + home.slice(b);
  const c = home.indexOf('<footer>'), d = home.indexOf('<div class="toast" id="toast"></div>') + '<div class="toast" id="toast"></div>'.length;
  home = home.slice(0, c) + '<!--FOOTER--><!--/FOOTER-->' + home.slice(d);
}
home = home.replace(/<!--HEADER-->[\s\S]*?<!--\/HEADER-->/, header('', '', '#quote'));
home = home.replace(/<!--FOOTER-->[\s\S]*?<!--\/FOOTER-->/, footer(''));
home = home.split('href="index.html#process"').join('href="#process"').split('href="index.html#why"').join('href="#why"');
// homepage: link service cards and subject tiles to their pages, wire form names
SERVICES.forEach(s => {
  const re = new RegExp(`(<h3>${esc(s.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h3>[\\s\\S]*?<a class="more" href=")#quote(")`);
  home = home.replace(re, `$1services/${s.slug}.html$2`);
});
SUBJECTS.forEach(s => {
  const re = new RegExp(`<div class="sub">(<span class="emo">[\\s\\S]*?<h3>${esc(s.name)}</h3>[\\s\\S]*?</ul>)</div>`);
  home = home.replace(re, `<a class="sub" href="subjects/${s.slug}.html">$1</a>`);
});
// homepage photos: subject tile hover images and one wide image band
SUBJECTS.forEach(s => {
  const open = `<a class="sub" href="subjects/${s.slug}.html">`;
  if (home.includes(open) && !home.includes(`subj-${s.slug}-sm.webp`)) home = home.replace(open, `${open}<span class="sub-bg" style="background-image:url('assets/img/subj-${s.slug}-sm.webp')" aria-hidden="true"></span>`);
});
if (!home.includes('class="photo-band"')) {
  home = home.replace('<!-- ================= PROCESS ================= -->', photoBand('assets/img/home-library.webp', 'Real research. Real sources. <span class="serif">Real experts.</span>', ['10+ subjects', '8 regions', '5 years of distinction']) + '\n\n<!-- ================= PROCESS ================= -->');
}
// homepage quote form: requirements box above the submit button
if (!home.includes('name="brief"')) {
  home = home.replace('<button class="btn btn-primary" type="submit">Get my instant quote', BRIEF_FIELD.replace('<label>', '<label for="f-brief">').replace('<textarea ', '<textarea id="f-brief" ') + '\n        <button class="btn btn-primary" type="submit">Get my instant quote');
}
home = home.replace('<select id="f-svc">', '<select id="f-svc" name="service">').replace('<select id="f-sub">', '<select id="f-sub" name="subject">');
home = home.replace(/<form class="quote" onsubmit="[^"]*">/, '<form class="quote">');
home = home.replace('<canvas id="ctaCanvas" aria-hidden="true">', '<canvas class="cta-lines" aria-hidden="true">');
// homepage form fields: names used by validation and autofill
home = home.replace('<input id="f-wa" type="text"', '<input id="f-wa" name="contact" type="text" autocomplete="email"');
home = home.replace('<input id="f-date" type="date">', '<input id="f-date" name="deadline" type="date">');
home = home.replace('<input id="f-words" type="number" placeholder="e.g. 3000" min="0">', '<input id="f-words" name="words" type="number" inputmode="numeric" placeholder="e.g. 3000" min="1">');
// homepage head (SEO, social, structured data) and self hosted scripts, regenerated on every build
const homeFaq = [...home.matchAll(/<div class="qa[^"]*"><button>([\s\S]*?)<i><\/i><\/button><div class="a"><p>([\s\S]*?)<\/p>/g)].map(m => [m[1], m[2]]);
let bodyRest = home.slice(home.indexOf('<body>') + 6).replace(/^\s*<a class="skip"[^>]*>[^<]*<\/a>\s*/, '\n');
bodyRest = bodyRest.slice(0, bodyRest.indexOf('<script src=')).trimEnd() + '\n' + scripts('');
home = head('', 'EducationMent | Expert Academic Support for University Students',
  'Research papers, dissertations, case studies, business plans, presentations and live sessions with subject specialists in 10+ disciplines. Original work, written by humans, for students in the UK, USA, Australia, UAE, New Zealand, Canada, Europe and India.',
  { path: '/', og: 'default', priority: 1.0, home: true, ld: [WEBSITE_LD, faqLD(homeFaq)] }) + bodyRest.replace(/^\n+/, '');
fs.writeFileSync(path.join(ROOT, 'index.html'), finalize(home));

/* ======================= 404 page (served by Vercel for any unknown address) ======================= */
{
  const R = '/';
  const body = `${pageHero({ R, crumbs: [['Home', '/index.html'], ['Page not found']], eyebrow: 'Error 404', h1: 'This page has <span class="serif">moved on.</span>', lead: 'The page you were looking for does not exist or has moved. Here are the most useful places to go next.', solo: true, ctas: false })}
<section class="sec nf">
  <div class="wrap">
    <div class="nf-actions reveal">
      <a href="/index.html" class="btn btn-dark magnetic">Back to the homepage <span class="arr">${ARR}</span></a>
      <a href="/contact.html#quote" class="btn btn-primary magnetic">Get an instant quote <span class="arr">${ARR}</span></a>
    </div>
    <h2 class="nf-h">Popular services</h2>
    <div class="chips reveal-group">${SERVICES.map(s => `<a href="/services/${s.slug}.html">${ic(s.icon)}${esc(s.menu)}</a>`).join('')}</div>
    <h2 class="nf-h">Subjects</h2>
    <div class="chips reveal-group">${SUBJECTS.map(s => `<a href="/subjects/${s.slug}.html">${ic(s.icon)}${esc(s.name)}</a>`).join('')}</div>
  </div>
</section>`;
  pages.push(['404.html', head(R, 'Page not found | EducationMent', 'The page you were looking for does not exist or has moved.', { path: '/404', noindex: true }) + header(R, '', '/contact.html#quote') + `\n<main id="top">\n${body}\n</main>\n` + footer(R) + scripts(R)]);
}

pages.forEach(([f, html]) => W(f, html));
console.log('wrote', pages.length, 'pages');

/* ======================= sitemap, robots, llms.txt, web manifest ======================= */
const today = new Date().toISOString().slice(0, 10);
const urls = [...new Map(SITEMAP.map(([p, pr]) => [p, pr])).entries()].sort((a, b) => b[1] - a[1]);
W('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, pr]) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><priority>${pr.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`);
W('robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
W('llms.txt', `# EducationMent

> EducationMent provides expert academic support for university students. Subject specialists write original work, entirely by humans, across 10+ disciplines, and run live 1:1 sessions. Students are served in the United Kingdom, United States, Australia, Dubai (UAE), New Zealand, Canada, Europe and India.

Key facts:

* 5,000+ students supported over the last 5 years
* 15,000+ projects completed
* More than 80% of work graded at distinction level
* 100% pass guarantee on every project
* Work is written by humans with no AI writing tools, and checked for originality
* Support on WhatsApp 24/7
* Work is provided as an expert model to support each student's own learning, in line with their university's academic integrity policy

## Services

${SERVICES.map(s => `* [${s.name}](${SITE}/services/${s.slug}): ${strip(s.short)}`).join('\n')}

## Subjects

${SUBJECTS.map(s => `* [${s.disp || s.name}](${SITE}/subjects/${s.slug}): ${s.topics.slice(0, 4).join(', ')} and more`).join('\n')}

## Company

* [About EducationMent](${SITE}/about): story, values and the regions served
* [Contact and instant quote](${SITE}/contact): request a quote or message the team
* [Privacy policy](${SITE}/privacy)
* [Terms of service](${SITE}/terms)

## Contact

* WhatsApp: ${WA_DISPLAY} (https://wa.me/${WA_NUM})
* Email: ${EMAIL}
`);
W('site.webmanifest', JSON.stringify({
  name: 'EducationMent', short_name: 'EducationMent', description: 'Expert academic support for university students.',
  start_url: '/', display: 'standalone', background_color: '#050F27', theme_color: '#050F27',
  icons: [{ src: '/assets/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/icons/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/assets/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }],
}, null, 2) + '\n');
console.log('wrote sitemap.xml (' + urls.length + ' urls), robots.txt, llms.txt, site.webmanifest');

/* ======================= social preview images + app icons (run: node build/build.js --og) ======================= */
if (process.argv.includes('--og')) (async () => {
  const LB = path.join(ROOT, '../educationment-logos/final/build/node_modules');
  const sharp = require(path.join(LB, 'sharp'));
  const opentype = require(path.join(LB, 'opentype.js'));
  const FD = path.join(LB, '@fontsource/plus-jakarta-sans/files');
  const F800 = opentype.loadSync(path.join(FD, 'plus-jakarta-sans-latin-800-normal.woff'));
  const F700 = opentype.loadSync(path.join(FD, 'plus-jakarta-sans-latin-700-normal.woff'));
  const rd = p => fs.readFileSync(path.join(ROOT, p));
  const wr = (p, b) => { fs.mkdirSync(path.dirname(path.join(ROOT, p)), { recursive: true }); fs.writeFileSync(path.join(ROOT, p), b); };
  const W0 = 1200, H0 = 630;
  const wrap = (text, font, size, max) => { const out = []; let line = ''; for (const w of text.split(' ')) { const t = line ? line + ' ' + w : w; if (font.getAdvanceWidth(t, size) > max && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out; };
  const textPath = (str, font, x, y, size, fill, track = 0) => { if (!track) return `<path d="${font.getPath(str, x, y, size).toPathData(2)}" fill="${fill}"/>`; let d = '', cx = x; for (const ch of str) { d += font.getPath(ch, cx, y, size).toPathData(2); cx += font.getAdvanceWidth(ch, size) + track; } return `<path d="${d}" fill="${fill}"/>`; };
  const logo = await sharp(rd('assets/educationment-logo-horizontal-reversed.svg'), { density: 300 }).resize({ height: 92 }).png().toBuffer();
  async function card(name, eyebrow, title, photo) {
    let size = 70, lines = wrap(title, F800, size, 760);
    while (lines.length > 3 && size > 50) { size -= 4; lines = wrap(title, F800, size, 760); }
    const lh = size * 1.08, top = 330 - (lines.length * lh) / 2 + size * 0.8;
    let dots = ''; for (let x = 20; x < W0; x += 34) for (let y = 20; y < H0; y += 34) dots += `<circle cx="${x}" cy="${y}" r="1.2" fill="rgba(160,190,240,0.12)"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W0}" height="${H0}">
      <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0.38" stop-color="#050F27" stop-opacity="1"/><stop offset="0.75" stop-color="#050F27" stop-opacity="0.55"/><stop offset="1" stop-color="#050F27" stop-opacity="0.25"/></linearGradient>
      <radialGradient id="glow" cx="0.85" cy="0.1" r="0.7"><stop offset="0" stop-color="#1C4AA0" stop-opacity="0.55"/><stop offset="1" stop-color="#050F27" stop-opacity="0"/></radialGradient></defs>
      <rect width="100%" height="100%" fill="url(#fade)"/><rect width="100%" height="100%" fill="url(#glow)"/>${dots}
      ${textPath(eyebrow.toUpperCase(), F700, 72, top - size - 18, 22, '#F57C1F', 3)}
      ${lines.map((l, i) => textPath(l, F800, 72, top + i * lh, size, '#FFFFFF')).join('')}
      <rect x="72" y="${H0 - 92}" width="300" height="2" fill="rgba(255,255,255,0.15)"/>
      ${textPath('Written by humans  ·  Plagiarism free  ·  100% pass guarantee', F700, 72, H0 - 54, 22, 'rgba(255,255,255,0.75)')}
      <rect x="${W0 - 72 - 282}" y="${H0 - 92}" width="282" height="56" rx="28" fill="#F57C1F"/>
      ${textPath('Get an instant quote', F700, W0 - 72 - 282 + 34, H0 - 56, 22, '#FFFFFF')}
    </svg>`;
    const base = photo
      ? await sharp(rd(photo)).resize(W0, H0, { fit: 'cover' }).modulate({ saturation: 0.6, brightness: 0.75 }).toBuffer()
      : await sharp({ create: { width: W0, height: H0, channels: 3, background: '#050F27' } }).png().toBuffer();
    const out = await sharp(base).composite([{ input: Buffer.from(svg) }, { input: logo, left: 56, top: 40 }]).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    wr(`assets/og/${name}.jpg`, out);
  }
  await card('default', 'Expert academic support', 'Academic work, done to a distinction standard.', 'assets/img/home-library.webp');
  await card('services', 'Our services', 'Every kind of academic work, handled by a specialist.', 'assets/img/svc-research-papers.webp');
  await card('subjects', '10+ subjects', 'Specialists for every discipline.', 'assets/img/subj-mathematics.webp');
  await card('about', 'About EducationMent', 'Five years of distinction, one student at a time.', 'assets/img/about-campus.webp');
  await card('contact', 'Contact us', 'Get an instant quote from a subject expert.', 'assets/img/svc-live-sessions.webp');
  for (const s of SERVICES) await card(`svc-${s.slug}`, s.name, strip(s.h1), `assets/img/svc-${s.slug}.webp`);
  for (const s of SUBJECTS) await card(`subj-${s.slug}`, `${s.disp || s.name} experts`, `${s.disp || s.name} support from real specialists.`, `assets/img/subj-${s.slug}.webp`);
  // app icons from the navy rounded square icon
  const icon = fs.readFileSync(path.join(ROOT, '../educationment-logos/final/png/educationment-icon-app-1024px.png'));
  for (const [f, s] of [['icon-512.png', 512], ['icon-192.png', 192], ['apple-touch-icon.png', 180], ['favicon-32.png', 32]]) wr(`assets/icons/${f}`, await sharp(icon).resize(s, s).png().toBuffer());
  console.log('wrote', 5 + SERVICES.length + SUBJECTS.length, 'social preview images and 4 icons');
})();
