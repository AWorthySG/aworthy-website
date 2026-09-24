# Outstanding content issues

These issues are recorded but not yet fixed. Each one needs information or material from the owner. Once an item is resolved, delete it from this file.

Last reviewed: 23 September 2026.

## 1. The class timetable is impossible

The site says Jeremy Lim teaches every class, but the subject-page schedules overlap:

| Slot | Classes listed at the same time |
|---|---|
| Saturday 10:00–11:30 am | English Sec 1–2, H2 Economics JC 1 |
| Saturday 2:00–3:30 pm | English Sec 3–4, H1 GP JC 1 |
| Sunday 10:00–11:30 am | English Sunday Revision, H1 GP JC 2 |
| Sunday 2:00–3:30 pm | O-Level Maths Sec 1–2, Pre-IB Year 3, H2 Economics JC 2 |
| Wednesday 7:30–9:00 pm | O-Level Maths Sec 3–4, Pre-IB Year 4 |

The same claim appears in several places:

- The chatbot's "Who is the tutor?" answer (`src/layouts/BaseLayout.astro`).
- The Success Stories case studies, which refer to "his/her tutor".
- The Blog, Resources and L1R5 pages, which refer to "our tutors".

**Needed:** the real timetable, and who teaches each class. Then update the five `.schedule-table` blocks and the chatbot's `schedule` and `tutor` answers. If other tutors teach, name them.

**Status (23 September 2026):** a clash-free 2027 timetable was proposed to the owner (ten groups, all taught by Jeremy, from the week of 4 January 2027; new JC 1 groups from 13–14 February; lessons run on public holidays). Once confirmed, keep it in `src/data/site-config.ts`, render the five tables and the chatbot's `schedule` answer from it, and close this item.

## 2. The founder photo is a placeholder

The initials "JL" stand in for a photograph in three places:

- The homepage "Meet your tutor" band (`src/pages/index.astro`).
- The About page founder letter (`src/pages/about.astro`).
- The About page founder card (`src/pages/about.astro`).

**Needed:** one professional portrait, square crop, at least 800 × 800 px.

## 3. The free resources are mostly empty

- **Missing files:** only 6 of the 17 resources on `/resources/` have a file. The other 11 promise a full version by email "within 24 hours".
- **The 6 samples:** each file in `public/docs/samples/` is a one-page contents list. They carry the old "CASE Method" name and the retired gold colour.
- **Email pop-up:** the 45-second pop-up delivers one of these files, `essay-framework-sample.pdf`.

**Needed:** either real extracts in the current design, or the resource cards reworded to "available to enrolled students". Confirm whether the 11 emailed guides exist.

## 4. The Google review links are empty

The Google review buttons now hide themselves until their links are set in `src/data/site-config.ts`:

- `googleReviewsUrl`: the Google Business Profile reviews page.
- `googleWriteReviewUrl`: the "write a review" link.

Until then, the review page asks for feedback on WhatsApp instead.

**Needed:** both links from the Google Business Profile. Also confirm that the profile's rating is 4.9, since the site still shows that figure.

## 5. The testimonials need consent on file

Each testimonial now has a single wording, used everywhere, and names are shortened to first name plus surname initial.

**Needed:** confirmation that each quoted person agreed to be quoted, especially the students, who are minors.

## 6. Accuracy questions from the September 2026 copy edit

The copy edit changed wording only. These points look wrong or unsupported, and were left as they are because they need your knowledge of the syllabus, the classes or the source.

**O-Level English page**
- "Inside a Lesson" describes a "Tuesday-night" session; no English class runs on Tuesday.
- The warm-up is "five questions, ninety seconds each" (7.5 minutes) in a 0–5 minute slot.
- The syllabus card puts Editing (Paper 1) and Oral (Paper 4) under "Paper 2 — Comprehension", and omits Paper 3 (Listening).
- The FAQ's "four components" leaves out summary and oral, and says English is "the most heavily weighted O-Level subject" (L1R5 weights subjects equally).
- ACED is described as "the four lenses examiners use"; it is A-Worthy's own mnemonic.

**Mathematics pages**
- The O-Level Mathematics (4052) page shows A-Maths (4049) notes and a 4049 marker's report as its samples.
- The READ card says "A percentage can't exceed 100", which is not true in general (a 150% increase).
- The Pre-IB FAQ says calculus comes "earlier than the O-Level syllabus"; O-Level Mathematics (4052) has no calculus.

**H1 GP and H2 Economics pages**
- GP summary practice: the card says one timed summary per session; the playbook says three per week.
- Economics JC 1 card: "18 core microeconomics diagrams", but the list of 18 includes macro diagrams (AD-AS, Phillips curve); the topic list says essays use PEEL, the card teaches DEED; one lesson step says "SEAB mark scheme", elsewhere "Cambridge".
- Economics landing page: case studies are "the component where most marks are won or lost"; the essay paper carries more marks.
- Unsupported lines left in: DEED "consistently scores top marks"; "Cambridge examiners consistently report…"; "the single biggest mark differentiator in GP"; online tuition is "often more effective" (FAQs on all subject pages); "at least three feedback touches"; "180+ past-paper questions per term"; recordings "within 24 hours".

**Blog posts**
- GP essay structure: the sample question is marked "[25 marks]" and the introduction "approximately 2 marks"; GP essays are marked out of 50.
- Exam prep timeline: "AQ … 8 marks in 20 minutes" (the AQ is usually 10 marks); "one full Economics essay in 35 minutes".
- Economics essay diagrams: "diagrams account for up to 30% of your essay marks" (no source); "supply curves should not start from the origin"; confirm the Phillips curve and J-curve are in 9570.
- H2 Economics case study tips: "two questions totalling 40 marks in 90 minutes"; 9570 Paper 1 is longer.
- GP essay examples: statistics inside the model introductions (13.7m renewable jobs in 2024; the top 1% taking 38% of new wealth; Rwanda's arts share of GDP) need a source; datePublished (1 May) differs from the visible date (10 May).
- Cut-off points: "4 points is the gap between CJC and NYJC, or TMJC and TJC" does not match the post's own table.
- IB vs JC: the fee table says $3,000–$6,000 a year, the text $3,000–$3,600; ACS(I) is described as offering both A-Levels and IB.
- Why smart students fail: mentions "a 12-mark 'discuss' question in GP".
- Comprehension techniques: the title promises "10 techniques"; the article walks through five SHARP steps.
- E-Maths vs A-Maths: "dropping A-Maths later is straightforward" depends on the school.

**Site-wide**
- Resources: the title and description promise Maths guides (there are none); "sample any title in full" (6 of 17 have samples); the chatbot says "just an email address" but the form also asks for a phone number; the newsletter's "Join 3,000+ parents and students" has no source.
- Case studies: Aisha's "six months" (end of JC 1 to an A-Level B) and Daniel's "eight months" (JC 1 promos to an A-Level A) look short; the homepage's Aisha quote paraphrases her Success Stories quote.
- Subject-page quotes are credited only as "Parent of Sec 4 student" and similar; confirm consent and source (see item 5).
- The Maths landing page puts A-Worthy's own words in the testimonial slot, credited to "The A-Worthy method".
- The privacy notice says no tracking cookies are used; that stops being true if Microsoft Clarity is switched on.
- The L1R5 calculator says "English and Maths affect every L1R5"; Maths counts only when it is among the best relevant subjects.

## 7. Inconsistencies found while writing the subject guides (September 2026)

The guides use SEAB's syllabus wherever the site disagrees with it. These site points need the owner's decision:

- **ACED** means Audience-Content-Effect-Design on the English page (visual text) but Answer-Cite-Explain-Develop in the comprehension blog post.
- **SWIFT**: the rule says any signal word means Category B, but the site's own example ("explain why the town changed") is Category A.
- **Editing**: the site says the passage has "eight errors, two clean lines"; SEAB gives no count. The English playbook's first step asks "grammar, vocabulary or spelling?", but SEAB does not test spelling in the editing section.
- **Economics figures**: the Economics page and a blog post give different Singapore inflation figures (1.2% to 6.1%, and 1.2% to 4.8%), and neither matches MAS data. The case-study blog calls its framework Claim-Reason-Evidence-Evaluation; the subject page calls it Extract-Link-Apply.
- **IB vs JC post**: "most JC students change their career plans at least once" has no source.
- **Owner's Situational Writing Content Bank** (not on the website): page 4 gives Task Fulfilment 15 and Language and Organisation 15, and calls Paper 1 a two-hour paper. SEAB 1184 gives 10 and 20, and 1 hour 50 minutes. Its footer shows `hello@aworthy.sg`, a domain that does not exist; use `jeremy@a-worthy.com`.

## 8. Questions from the voice and retention rewrite (24 September 2026)

The whole site was rewritten to sound plain and confident, using only facts the site could stand behind. Claims about how lessons run that could not be confirmed were taken out; everything below needs the owner's answer.

**Removed until confirmed. Restore them if they are true.**
- O-Level Maths Sec 3–4: "a mock paper every month, marked against Cambridge mark schemes" (Maths page and the homepage quiz result). English still says it for English.
- A short catch-up summary from Jeremy at the start of the next lesson for a student who missed one (English and Maths FAQs).
- A model answer sent on WhatsApp the morning after a lesson (English lesson walkthrough). The Maths and Pre-IB lesson walkthroughs still say it, along with "at least three rounds of feedback in 30 minutes": confirm both or cut them there too.
- ACS, CHIJ and Victoria School in the chatbot's "schools" answer. Raffles and Hwa Chong stay, as in the About story.
- "Up to 30% of marks depend on diagrams" in the Economics diagrams post (no source).

**Still on the site and needing confirmation**
- The "Most popular" chip on O-Level English (homepage, pricing) needs enrolment figures behind it (Singapore Code of Advertising Practice), or a neutral label.
- The line under the pricing page's final button, "Month-to-month · no lock-in · first-month money-back guarantee", predates the 23 September decision against lines under buttons. Keep it or remove it?
- "500+ students taught since 2020" on the About founder card: is 2020 right?
- The O-Level English A1–B3 figures (78% in 2023, 85% in 2024, 90% in 2025) need cohort sizes.
- The chatbot now says "We reply within 24 hours" for every enquiry, not only assessment requests.
- The opening hours on the contact page and homepage (Mon–Fri 2–9:30 pm, Sat–Sun 9 am–6 pm): lesson hours or reply hours?
- Whether one-to-one lessons are recorded and get the weekly written feedback and the monthly report. Pricing currently claims these for group classes only.
- Whether the sibling and multi-subject discounts combine.
- Descriptions of how classes run, kept but not confirmed: GP "argument bank of 50+ examples across 12 themes" and "timed essays weekly"; "six to eight introductions per session" (GP essay examples post); Pre-IB "25 chapters" and the "120-question calculus set"; the English "Sunday Revision" row in the timetable, which no other part of the page mentions.
- The O-Level Maths (4052) page shows A-Maths (4049) notes and a marker's report as its samples.

**Quotes that clash with the site's rules** (protected, so left word for word)
- Sarah T.'s parent: "C5 to A2 in just one term"; the case study says 3 months.
- Linda T.: comprehension "12/25 to 20/25", a component-level result, quoted on the English landing page. The same applies to Ethan L., Wei Ling and Ryan O. on /testimonials/.
- The Maths landing page's "quote" is our own marketing line credited to "The A-Worthy method". Replace it with a real Maths parent or student quote, or remove it.
- The Economics student's "game changer" is their own words; keep or swap.

**Blog items outside this rewrite** (titles, meta descriptions and JSON-LD were frozen)
- "10 Comprehension Techniques That Top Students Use" covers one inference question; retitle or extend it.
- "H2 Economics Case Study: How to Score L3 Every Time" promises a result in its title.
- The tuition-centre guide's JSON-LD description still says "trial lessons".
- Meta lengths: the cut-off-points title is 62 characters; the o-level-english-tips description is 105; the why-smart-students-fail description is in the old voice.

**Questions a parent asks that the site can't answer yet**
- When the JC 2 fee (SGD 400) starts for a continuing JC 1 student, and whether the group and slot carry over into the next year without re-enrolling.
- How groups are formed: by level only, or by ability too ("my child is at C6; will they keep up?").
- ~~Whether the child joins the free 20-minute assessment call, or only the parent.~~ No longer applies: the assessment is now a written report, with no call (section 10).
- Any parent-facing progress contact besides the monthly email report, such as a short call each term. If it exists, it is the strongest retention line the site could add; the site must not claim it until it does.

## 9. From the warmth and clarity proofread (24 September 2026)

New points only; section 8 still stands.

- **A "should we continue?" FAQ.** Done on 24 September 2026, at the owner's request: each subject page now asks "Should my child continue into Sec 4?" (English, Maths), "…into Year 4?" (Pre-IB) or "…into JC 2?" (GP, Economics), with matching FAQ schema. It tells parents it is the same frameworks and the same tutor, gives the next level's fee, says classes end after the national papers with no fees after the last one (not on Pre-IB), and suggests a WhatsApp message if unsure. Still open: when the JC 2 fee starts for a continuing JC 1 student, and whether the group and slot carry over without re-enrolling (section 8).
- **Testimonial credits** read "JC2 student", "Parent of JC1 student" and "Parent of Sec 4 student". The site style is "JC 2" and "Sec 4". They sit inside protected quote blocks, so they are unchanged until you approve the spacing.
- **GP FAQ "What topics come out for GP 2026?"** (visible text and schema) should become 2027 once this year's A-Levels are over.
- **GP bands.** The GP page's examples mention Band 1–2, Band 3 and Band 4 but never say which is the top band. Please confirm they match the 8881 descriptors you teach to.
- **Economics JC 1 card.** It teaches DEED paragraphs, but its topic list says "paragraph structure (PEEL)". Which is taught?
- **Pre-IB FAQ.** It says calculus and logarithms come "earlier than the O-Level syllabus", but O-Level Additional Mathematics covers both in Sec 3–4. Reword it?
- **Pricing FAQ** calls JC 1 a "foundation year". Please confirm the label.
- **Homepage price tile** "From S$280/mo" is right for Sec 1–2, but a Sec 3 parent pays SGD 320; the English and pricing pages make this clear. Keep it or change it?
- **Review page** heading "Loved learning with A-Worthy?" assumes the answer. Its Google button stays hidden until `googleWriteReviewUrl` is set.
- **Who teaches.** The chatbot says "Every class is taught by Jeremy Lim", and the Pre-IB hero says "taught by Jeremy Lim". Elsewhere the site says "the same tutor". Please confirm Jeremy teaches every class.
- **Homepage quiz.** It ignores the "biggest problem" answer and has no Pre-IB option. Fixing it needs a logic change, not a copy change.
- **The English page's STAND** (oral) has no expansion anywhere on the site. Give one if you want it explained.

## 10. The free assessment is now a written report (24 September 2026)

At the owner's request, the free assessment is no longer a 20-minute Zoom call. The parent sends a photo of a test or exam the child did recently, and Jeremy sends a written feedback report on what went wrong. Every page, the chatbot, the forms' confirmation messages and the five guide PDFs now say this. Two points need your answer:

- **How long the report takes.** Done on 24 September 2026: the report arrives within 48 hours, and a parent with an urgent case can call +65 8991 3181. The contact page, form confirmations, chatbot and the main CTAs say this.
- **The button label.** Done on 24 September 2026: every "Book Free Assessment" button now reads "Get a Free Report", and "Book a free assessment" in running copy reads "Get a free assessment".

