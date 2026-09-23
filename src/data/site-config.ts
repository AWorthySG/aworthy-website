// Date-sensitive constants that need a yearly refresh.
// Update these in ONE place when the academic year rolls over —
// then `npm run build` and re-deploy.
//
// See CLAUDE.md → "Annual content freshness" for the full checklist.

export const academicYear = 2026;

// Google Business Profile links. Leave a link empty until you have the real one:
// every Google review button checks its link and hides itself while it is empty,
// so no button can send a visitor to a dead or wrong page.
//   googleReviewsUrl     — the profile's reviews (Google Maps → your profile → Reviews → Share)
//   googleWriteReviewUrl — the "write a review" link (Business Profile → Ask for reviews)
export const googleReviewsUrl = '';
export const googleWriteReviewUrl = '';

export const exams = [
  { name: 'O-Level English', date: '2026-10-19' },
  { name: 'O-Level Mathematics', date: '2026-10-20' },
  { name: 'A-Level GP', date: '2026-11-09' },
  { name: 'A-Level H2 Economics', date: '2026-11-18' },
];
