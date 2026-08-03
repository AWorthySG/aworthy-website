/**
 * Study Hub material registry.
 *
 * HOW TO ADD A NEW STUDY MATERIAL
 * ------------------------------------------------------------------
 * 1. Drop the self-contained .html file into `public/study/`.
 *    e.g. public/study/paper2-comprehension-toolkit.html
 * 2. That's it — the file is picked up automatically at build time and
 *    appears on /study/. Its title comes from the file's own <title> tag
 *    and its blurb from <meta name="description">.
 * 3. OPTIONAL: add an entry below, keyed by the filename without `.html`,
 *    to control the subject grouping, wording and ordering on the card.
 *
 * The HTML file is served verbatim and rendered inside an iframe, so it
 * keeps its own CSS and JavaScript entirely — nothing on this site can
 * clash with it, and nothing in it can leak out into the site's styling.
 * Keep files self-contained (inline CSS/JS) so they work offline.
 */

export type StudySubjectId = 'english' | 'gp' | 'econs' | 'maths' | 'pre-ib' | 'general';

export interface StudySubject {
  id: StudySubjectId;
  label: string;
  /** Short label used on the card chip. */
  short: string;
  accent: string;
  accentDark: string;
  /** Subject page this material supports, if any. */
  href?: string;
}

export const studySubjects: StudySubject[] = [
  { id: 'english', label: 'O-Level English', short: 'English', accent: '#3B7DD8', accentDark: '#6FA4E8', href: '/o-level-english/' },
  { id: 'gp', label: 'H1 General Paper', short: 'GP', accent: '#4A8C6F', accentDark: '#77B79A', href: '/h1-general-paper/' },
  { id: 'econs', label: 'H2 Economics', short: 'Economics', accent: '#2B8A8A', accentDark: '#5FB8B8', href: '/h2-economics/' },
  { id: 'maths', label: 'O-Level Mathematics', short: 'Maths', accent: '#7B5EA7', accentDark: '#9B7EC7', href: '/o-level-mathematics/' },
  { id: 'pre-ib', label: 'Pre-IB Mathematics', short: 'Pre-IB', accent: '#B0436A', accentDark: '#D06D91', href: '/pre-ib-mathematics/' },
  { id: 'general', label: 'Study Skills', short: 'Study Skills', accent: '#D4853A', accentDark: '#E09850' },
];

export interface StudyMaterialMeta {
  /** Overrides the file's own <title>. */
  title?: string;
  subject?: StudySubjectId;
  /** Overrides the file's own <meta name="description">. */
  description?: string;
  /** Free-text label, e.g. "Sec 3–4" or "Paper 2". */
  level?: string;
  /** Lower sorts first. Materials without an order follow, alphabetically. */
  order?: number;
}

/** Keyed by the HTML filename in `public/study/`, without the `.html`. */
export const studyMaterialMeta: Record<string, StudyMaterialMeta> = {
  'sharp-method-quick-reference': {
    title: 'The SHARP Method — Quick Reference',
    subject: 'general',
    description:
      'The five steps of the SHARP Method on one screen, with the question every step answers. Open it beside your practice paper and work down the list.',
    level: 'All subjects',
    order: 1,
  },
};
