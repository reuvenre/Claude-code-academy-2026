import type { StructuredData } from 'fumadocs-core/mdx-plugins';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { levelInfo } from '@/lib/levels';
import { referenceSource, source } from '@/lib/source';

// אותיות סופיות → רגילות, בזמן אינדוקס ובזמן חיפוש. בלי זה חיפוש-קידומת "מתקין" (ן סופית)
// לא מוצא את "מתקינים" (נ רגילה). אין כאן stemming עברי מלא — אין ניתוח מורפולוגי.
const finals: Record<string, string> = { ך: 'כ', ם: 'מ', ן: 'נ', ף: 'פ', ץ: 'צ' };
const normalizeHebrewFinals = (word: string) => word.replace(/[ךםןףץ]/g, (c) => finals[c]);

// keywords מה-frontmatter נכנסים לאינדקס — פיצוי חלקי על היעדר stemming עברי
function withKeywords(data: StructuredData, keywords: string[]): StructuredData {
  return {
    ...data,
    contents: [...data.contents, { heading: undefined, content: keywords.join(' · ') }],
  };
}

// אינדקס אחד לשיעורים ולעמודי הרפרנס
export const { GET } = createSearchAPI('advanced', {
  tokenizer: {
    language: 'multilingual',
    stemming: true,
    stemmer: normalizeHebrewFinals,
  },
  indexes: () => [
    ...source.getPages().map((page) => ({
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData: withKeywords(page.data.structuredData, page.data.keywords),
      breadcrumbs: [levelInfo[page.data.level].label],
    })),
    ...referenceSource.getPages().map((page) => ({
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData: withKeywords(page.data.structuredData, page.data.keywords),
      breadcrumbs: ['מרכז הרפרנס'],
    })),
  ],
});
