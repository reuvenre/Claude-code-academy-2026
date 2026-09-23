import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/site';

// מאשרים במפורש את בוטי ה-AI והחיפוש (SEO_AEO_GEO.md §1). עמוד הדמו לא לאינדוקס.
const aiBots = ['ClaudeBot', 'OAI-SearchBot', 'PerplexityBot', 'Google-Extended'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...aiBots.map((userAgent) => ({ userAgent, allow: '/', disallow: '/demo/' })),
      { userAgent: '*', allow: '/', disallow: '/demo/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
