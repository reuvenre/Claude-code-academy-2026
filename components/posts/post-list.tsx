import type { InferPageType } from 'fumadocs-core/source';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import type { PostType } from '@/lib/lesson-schema';
import type { blogSource } from '@/lib/source';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { absoluteUrl, site } from '@/lib/seo/site';
import { formatHebrewDate, postSections } from './sections';

type PostPageData = InferPageType<typeof blogSource>;

// עמוד שער של מדור: רשימת פוסטים מהחדש לישן
export function PostList({ type, posts }: { type: PostType; posts: PostPageData[] }) {
  const section = postSections[type];
  const sorted = [...posts].sort((a, b) => b.data.date.localeCompare(a.data.date));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': type === 'blog' ? 'Blog' : 'CollectionPage',
      name: section.title,
      description: section.description,
      url: absoluteUrl(section.href),
      inLanguage: site.language,
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
    },
    breadcrumbJsonLd([{ name: section.label }]),
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-extrabold md:text-4xl">{section.label}</h1>
      {/* תשובה-קודם */}
      <p className="mt-4 text-lg text-muted-foreground">{section.intro}</p>

      {sorted.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed p-6 text-muted-foreground">
          עדיין אין פוסטים במדור הזה. בינתיים אפשר{' '}
          <Link href="/beginner" className="text-brand underline underline-offset-2">
            להתחיל את הקורס
          </Link>
          .
        </p>
      ) : (
        <ol className="mt-10 space-y-4">
          {sorted.map((post) => (
            <li key={post.url}>
              <Link
                href={post.url}
                className="group block rounded-2xl border bg-card/60 p-5 backdrop-blur transition-colors hover:border-brand/50"
              >
                <time dateTime={post.data.date} className="text-xs text-muted-foreground">
                  {formatHebrewDate(post.data.date)}
                </time>
                <h2 className="mt-1 text-lg font-bold group-hover:text-brand">{post.data.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.data.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-brand">
                  לקריאה
                  <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
