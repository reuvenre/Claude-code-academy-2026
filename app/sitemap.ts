import type { MetadataRoute } from 'next';
import { levelInfo, levels } from '@/lib/levels';
import { isLevelLive } from '@/lib/navigation';
import { source } from '@/lib/source';
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

  return [{ url: absoluteUrl('/') }, ...hubs, ...lessons];
}
