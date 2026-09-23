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
