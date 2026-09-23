import type { InferPageType } from 'fumadocs-core/source';
import type { Metadata } from 'next';
import { getPageImageUrl } from '@/lib/shared';
import type { source } from '@/lib/source';
import { site } from './site';

// metadata לשיעור: title/description ייחודיים, canonical, Open Graph ו-Twitter card
export function createLessonMetadata(page: InferPageType<typeof source>): Metadata {
  const { title, description, keywords, lastVerified } = page.data;
  const image = getPageImageUrl(page).url;

  return {
    // הכותרת כבר בנויה כשאלה של 50-60 תווים, ולכן בלי סיומת שם האתר
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      url: page.url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      modifiedTime: lastVerified,
      images: image,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image,
    },
  };
}
