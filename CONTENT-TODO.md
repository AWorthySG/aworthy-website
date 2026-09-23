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
