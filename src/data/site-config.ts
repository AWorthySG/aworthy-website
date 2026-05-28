// Date-sensitive constants that need a yearly refresh.
// Update these in ONE place when the academic year rolls over —
// then `npm run build` and re-deploy.
//
// See CLAUDE.md → "Annual content freshness" for the full checklist.

export const academicYear = 2026;

export const nextIntakeLabel = 'Term 3, July 2026';

export const exams = [
  { name: 'O-Level English', date: '2026-10-19' },
  { name: 'O-Level Mathematics', date: '2026-10-20' },
  { name: 'A-Level GP', date: '2026-11-09' },
  { name: 'A-Level H2 Economics', date: '2026-11-18' },
];
