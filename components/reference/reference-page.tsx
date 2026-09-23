import type { InferPageType } from 'fumadocs-core/source';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { BookMarked } from 'lucide-react';
import { getMDXComponents } from '@/components/mdx';
import { JsonLd } from '@/components/seo/json-ld';
import { FAQ } from '@/components/lesson/faq';
import { LastVerified, SourceBadge } from '@/components/lesson/badges';
import type { referenceSource } from '@/lib/source';
import { absoluteUrl, site } from '@/lib/seo/site';
import { breadcrumbJsonLd, faqPageJsonLd, isoDateTime } from '@/lib/seo/jsonld';

type ReferencePageData = InferPageType<typeof referenceSource>;

// תבנית עמוד רפרנס: כותרת, מקור רשמי, תוכן (טבלאות), שו"ת ותאריך אימות
export function ReferencePage({
  page,
  source,
}: {
  page: ReferencePageData;
  source: typeof referenceSource;
}) {
  const data = page.data;
  const MDX = data.body;
  const url = absoluteUrl(page.url);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: data.title,
      description: data.description,
      url,
      mainEntityOfPage: url,
      inLanguage: site.language,
      dateModified: isoDateTime(data.lastVerified),
      keywords: data.keywords.join(', '),
      isBasedOn: data.source,
      author: { '@type': 'Organization', name: site.name, url: site.url },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
    },
    breadcrumbJsonLd([{ name: 'מרכז הרפרנס', url: '/reference' }, { name: data.title }]),
    ...(data.faq?.length ? [faqPageJsonLd(data.faq)] : []),
  ];

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <JsonLd data={jsonLd} />
      <DocsTitle>{data.title}</DocsTitle>
      <div className="flex flex-wrap items-center gap-2 border-b pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
          <BookMarked aria-hidden className="size-3.5" />
          מרכז הרפרנס
        </span>
        <SourceBadge href={data.source} />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
        {data.faq && <FAQ items={data.faq} />}
        <LastVerified date={data.lastVerified} />
      </DocsBody>
    </DocsPage>
  );
}
