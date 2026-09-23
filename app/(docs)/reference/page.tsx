import type { Metadata } from 'next';
import Link from 'next/link';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { JsonLd } from '@/components/seo/json-ld';
import { referencePlan } from '@/lib/reference-plan';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { referenceSource } from '@/lib/source';

const written = () => new Map(referenceSource.getPages().map((page) => [page.slugs[0], page]));

export function generateMetadata(): Metadata {
  const live = referenceSource.getPages().length > 0;
  return {
    title: 'מרכז הרפרנס של Claude Code',
    description:
      'רפרנס חי בעברית ל-Claude Code: פקודות, דגלי CLI, משתני סביבה, הגדרות, hooks ו-changelog. טבלאות קצרות לסריקה מהירה, כל עמוד עם מקור רשמי ותאריך אימות.',
    alternates: { canonical: '/reference' },
    // עד שיש לפחות עמוד רפרנס אחד — לא לאינדוקס
    robots: live ? undefined : { index: false, follow: true },
  };
}

export default function ReferenceHub() {
  const pages = written();

  return (
    <DocsPage toc={[]} tableOfContent={{ enabled: false }}>
      <JsonLd data={breadcrumbJsonLd([{ name: 'מרכז הרפרנס' }])} />
      <DocsTitle>מרכז הרפרנס</DocsTitle>
      <DocsBody>
        <p className="text-lg">
          רפרנס חי ל-Claude Code: טבלאות קצרות לסריקה מהירה, כל עמוד עם קישור למקור הרשמי ותאריך אימות.
          השיעורים מסבירים איך ולמה. כאן מוצאים במהירות את השם המדויק של פקודה, דגל או הגדרה.
        </p>
        <ul className="not-prose mt-6 grid gap-3 sm:grid-cols-2">
          {referencePlan.map((item) => {
            const page = pages.get(item.slug);
            return (
              <li key={item.slug}>
                {page ? (
                  <Link
                    href={page.url}
                    className="flex h-full flex-col gap-1 rounded-xl border bg-card p-4 transition-colors hover:border-brand/60"
                  >
                    <span className="font-semibold">{page.data.title}</span>
                    <span className="text-sm text-muted-foreground">{page.data.description}</span>
                  </Link>
                ) : (
                  <span className="flex h-full items-center justify-between gap-2 rounded-xl border border-dashed p-4 text-muted-foreground">
                    <span>{item.title}</span>
                    <span className="rounded-full border px-2 py-0.5 text-xs">בקרוב</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </DocsBody>
    </DocsPage>
  );
}
