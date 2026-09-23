import type { MetadataRoute } from 'next';
import { levelInfo, levels } from '@/lib/levels';
import { getReferencePages, isLevelLive } from '@/lib/navigation';
import { blogSource, researchSource, source } from '@/lib/source';
import { absoluteUrl } from '@/lib/seo/site';

// שיעורים שפורסמו (drafts מסוננים כבר ב-source) + עמודי שער של רמות שיש בהן תוכן
export default function sitemap(): MetadataRoute.Sitemap {
  const hubs = levels
    .filter(isLevelLive)
    .map((level) => ({ url: absoluteUrl(levelInfo[level].href) }));

  const lessons = source.getPages().map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: page.data.lastVerified,
  }));

  const reference = getReferencePages().map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: page.data.lastVerified,
  }));
  const referenceHub = reference.length ? [{ url: absoluteUrl('/reference') }] : [];

  // בלוג ומחקרים: רק פוסטים שפורסמו (status: draft מסונן כבר ב-source)
  const posts = (
    [
      ['/blog', blogSource],
      ['/research', researchSource],
    ] as const
  ).flatMap(([hub, postSource]) => {
    const pages = postSource.getPages();
    if (!pages.length) return [];
    return [
      { url: absoluteUrl(hub) },
      ...pages.map((page) => ({ url: absoluteUrl(page.url), lastModified: page.data.date })),
    ];
  });

  return [{ url: absoluteUrl('/') }, ...hubs, ...lessons, ...referenceHub, ...reference, ...posts];
}
