import { source } from '@/lib/source';
import { levelInfo } from '@/lib/levels';
import { createFromSource } from 'fumadocs-core/search/server';

// אותיות סופיות → רגילות, בזמן אינדוקס ובזמן חיפוש. בלי זה חיפוש-קידומת "מתקין" (ן סופית)
// לא מוצא את "מתקינים" (נ רגילה). אין כאן stemming עברי מלא — אין ניתוח מורפולוגי.
const finals: Record<string, string> = { ך: 'כ', ם: 'מ', ן: 'נ', ף: 'פ', ץ: 'צ' };
const normalizeHebrewFinals = (word: string) => word.replace(/[ךםןףץ]/g, (c) => finals[c]);

export const { GET } = createFromSource(source, {
  tokenizer: {
    language: 'multilingual',
    stemming: true,
    stemmer: normalizeHebrewFinals,
  },
  buildIndex: (page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    structuredData: {
      ...page.data.structuredData,
      // keywords מה-frontmatter נכנסים לאינדקס — פיצוי חלקי על היעדר stemming עברי
      contents: [
        ...page.data.structuredData.contents,
        { heading: undefined, content: page.data.keywords.join(' · ') },
      ],
    },
    breadcrumbs: [levelInfo[page.data.level].label],
  }),
});
