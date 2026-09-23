import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/seo/site';

// שיעורים שפורסמו בלבד (drafts מסוננים כבר ב-source). עמודי השער יתווספו בשלב 4.
export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = source.getPages().map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: page.data.lastVerified,
  }));

  return [{ url: absoluteUrl('/') }, ...lessons];
}
