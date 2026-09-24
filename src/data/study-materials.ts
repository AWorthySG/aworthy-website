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
  /** Dot / border colour — the LMS subject token (it swaps for dark mode by itself). */
  accent: string;
  /** AA-safe text colour for the card chip and "Open" label — the subject's matching `-text` token. */
  accentText: string;
  /** Subject page this material supports, if any. */
  href?: string;
}

export const studySubjects: StudySubject[] = [
  // Accents are the LMS subject tokens from global.css (they already swap for dark mode):
  // `accent` is the dot / border colour, `accentText` its AA text pair (GP and coaching dots fail 4.5:1 as text on white).
  { id: 'english', label: 'O-Level English', short: 'English', accent: 'var(--subject-english)', accentText: 'var(--subject-english-text)', href: '/o-level-english/' },
  { id: 'gp', label: 'H1 General Paper', short: 'GP', accent: 'var(--subject-gp)', accentText: 'var(--subject-gp-text)', href: '/h1-general-paper/' },
  { id: 'econs', label: 'H2 Economics', short: 'Economics', accent: 'var(--subject-econ)', accentText: 'var(--subject-econ-text)', href: '/h2-economics/' },
  { id: 'maths', label: 'O-Level Mathematics', short: 'Maths', accent: 'var(--subject-maths)', accentText: 'var(--subject-maths-text)', href: '/o-level-mathematics/' },
  { id: 'pre-ib', label: 'Pre-IB Mathematics', short: 'Pre-IB', accent: 'var(--subject-preib)', accentText: 'var(--subject-preib-text)', href: '/pre-ib-mathematics/' },
  { id: 'general', label: 'Study Skills', short: 'Study Skills', accent: 'var(--subject-coaching)', accentText: 'var(--subject-coaching-text)' },
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
  'o-level-english-editing-notes': {
    title: 'Editing: the STAMP CARD framework',
    subject: 'english',
    description:
      'Everything you need for the editing question. Start with a 50-sentence check that shows which error types trip you up. Then work through all nine error types with worked examples, a full exam passage marked up line by line and a cheat strip of commonly confused words. Your answers save as you type.',
    level: 'Paper 1 · Sec 3–4',
    order: 1,
  },
  'sharp-method-quick-reference': {
    title: 'The SHARP Method: quick reference',
    subject: 'general',
    description:
      'The five steps of the SHARP Method on one screen, with the question each step answers. Keep it open next to your practice paper and work down the list.',
    level: 'All subjects',
    order: 2,
  },
};
