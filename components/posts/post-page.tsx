import type { InferPageType } from 'fumadocs-core/source';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { CalendarDays, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getMDXComponents } from '@/components/mdx';
import { JsonLd } from '@/components/seo/json-ld';
import { FAQ } from '@/components/lesson/faq';
import { SourceBadge } from '@/components/lesson/badges';
import type { blogSource } from '@/lib/source';
import { breadcrumbJsonLd, faqPageJsonLd, postJsonLd } from '@/lib/seo/jsonld';
import { postSections, formatHebrewDate } from './sections';

type PostSource = typeof blogSource;
type PostPageData = InferPageType<PostSource>;

// תבנית פוסט (בלוג / מחקר): כותרת, תאריך, מקור רשמי, גוף, מקורות נוספים ושו"ת
export function PostPage({ page, source }: { page: PostPageData; source: PostSource }) {
  const data = page.data;
  const MDX = data.body;
  const section = postSections[data.type];

  const jsonLd = [
    postJsonLd({
      url: page.url,
      type: data.type,
      title: data.title,
      description: data.description,
      date: data.date,
      keywords: data.keywords,
      source: data.source,
      author: data.author,
    }),
    breadcrumbJsonLd([{ name: section.label, url: section.href }, { name: data.title }]),
    ...(data.faq?.length ? [faqPageJsonLd(data.faq)] : []),
  ];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <JsonLd data={jsonLd} />
      <nav aria-label="פירורי לחם" className="text-sm text-muted-foreground">
        <Link href={section.href} className="hover:text-foreground">
          {section.label}
        </Link>
      </nav>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">{data.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-b pb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
          <CalendarDays aria-hidden className="size-3.5" />
          <time dateTime={data.date}>{formatHebrewDate(data.date)}</time>
        </span>
        <SourceBadge href={data.source} />
        {data.status === 'draft' && (
          <span className="rounded-full border border-dashed px-2.5 py-1 text-xs text-muted-foreground">
            טיוטה (לא מתפרסמת)
          </span>
        )}
      </div>
      <DocsBody className="mt-8">
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
        {data.sources && data.sources.length > 0 && (
          <section aria-labelledby="more-sources">
            <h2 id="more-sources">מקורות נוספים</h2>
            <ul>
              {data.sources.map((href) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-1">
                    <span dir="ltr">{href}</span>
                    <ExternalLink aria-hidden className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {data.faq && <FAQ items={data.faq} />}
      </DocsBody>
    </article>
  );
}
