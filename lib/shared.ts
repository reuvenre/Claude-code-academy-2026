import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Claude Code Academy IL';
// שיעורים יושבים בשורש האתר: /<level>/<slug> (לא /docs)
export const docsRoute = '/';
export const docsImageRoute = '/og/lessons';
export const docsContentRoute = '/llms.mdx/lessons';

// כתובת האתר הקנונית (sitemap, canonical, JSON-LD, llms.txt). מוגדרת ב-.env.local
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const gitConfig = {
  user: 'reuvenre',
  repo: 'Claude-code-academy-2026',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
