import type { Metadata } from 'next';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';

// שלד מרכז הרפרנס. התוכן עצמו נבנה בשלב 7, אחרי אימות מול התיעוד הרשמי.
const sections = [
  'CLI reference',
  'כל הפקודות',
  'משתני סביבה (env vars)',
  'Tools',
  'Settings reference',
  'Hooks',
  'Plugins',
  'Channels',
  'מילון מונחים',
  'Changelog',
  "What's New שבועי",
];

export const metadata: Metadata = {
  title: 'מרכז הרפרנס של Claude Code',
  description: 'רפרנס חי בעברית ל-Claude Code: פקודות, דגלי CLI, הגדרות, משתני סביבה ו-changelog.',
  alternates: { canonical: '/reference' },
  // עד שהתוכן ייכתב (שלב 7) — לא לאינדוקס
  robots: { index: false, follow: true },
};

export default function ReferencePage() {
  return (
    <DocsPage toc={[]} tableOfContent={{ enabled: false }}>
      <JsonLd data={breadcrumbJsonLd([{ name: 'מרכז הרפרנס' }])} />
      <DocsTitle>מרכז הרפרנס</DocsTitle>
      <DocsBody>
        <p className="text-lg">
          רפרנס חי ל-Claude Code: טבלאות קצרות לסריקה מהירה, כל עמוד עם קישור למקור הרשמי ותאריך אימות.
        </p>
        <h2>מה יהיה כאן</h2>
        <ul>
          {sections.map((section) => (
            <li key={section}>
              {section} <span className="text-xs text-muted-foreground">(בקרוב)</span>
            </li>
          ))}
        </ul>
      </DocsBody>
    </DocsPage>
  );
}
