import type { FaqItem } from '@/lib/lesson-schema';
import { levelInfo, type Level } from '@/lib/levels';
import { absoluteUrl, site } from './site';

// בוני JSON-LD לפי templates/schema-jsonld.md. כולם מקבלים נתונים מה-frontmatter.

type JsonLd = Record<string, unknown>;

// Google מצפה ל-datetime מלא עם אזור זמן (ISO 8601), לא לתאריך בלבד
export function isoDateTime(date: string): string {
  return date.includes('T') ? date : `${date}T00:00:00+00:00`;
}

const organizationRef = { '@type': 'Organization', name: site.name, url: site.url };

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    // ל-Organization אין inLanguage ב-schema.org; השדה המתאים הוא knowsLanguage
    knowsLanguage: site.language,
  };
}

export function techArticleJsonLd(lesson: {
  url: string;
  title: string;
  description: string;
  level: Level;
  lastVerified: string;
  keywords: string[];
  source: string;
  image?: string;
}): JsonLd {
  const url = absoluteUrl(lesson.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: lesson.title,
    description: lesson.description,
    url,
    mainEntityOfPage: url,
    inLanguage: site.language,
    dateModified: isoDateTime(lesson.lastVerified),
    ...(lesson.image ? { image: absoluteUrl(lesson.image) } : {}),
    keywords: lesson.keywords.join(', '),
    // המקור הרשמי שממנו אומת השיעור — שקיפות מקור (E-E-A-T)
    isBasedOn: lesson.source,
    educationalLevel: levelInfo[lesson.level].label,
    author: organizationRef,
    publisher: organizationRef,
  };
}

export function faqPageJsonLd(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

// crumbs: מהשורש ועד העמוד הנוכחי. לפריט האחרון אין קישור (לפי ההמלצה של Google)
export function breadcrumbJsonLd(crumbs: { name: string; url?: string }[]): JsonLd {
  const all = [{ name: 'בית', url: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.url && i < all.length - 1 ? { item: absoluteUrl(crumb.url) } : {}),
    })),
  };
}

export function lessonBreadcrumbs(lesson: { title: string; level: Level }) {
  const level = levelInfo[lesson.level];
  return breadcrumbJsonLd([{ name: level.label, url: level.href }, { name: lesson.title }]);
}

// לעמודי שער של רמה (שלב 4)
export function courseJsonLd(course: {
  level: Level;
  description: string;
  teaches: string;
}): JsonLd {
  const level = levelInfo[course.level];
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Claude Code — ${level.label} (מאפס למאה)`,
    description: course.description,
    url: absoluteUrl(level.href),
    inLanguage: site.language,
    provider: organizationRef,
    isAccessibleForFree: true,
    teaches: course.teaches,
  };
}

// פוסט בבלוג (BlogPosting) או סיכום מחקר (Article)
export function postJsonLd(post: {
  url: string;
  type: 'blog' | 'research';
  title: string;
  description: string;
  date: string;
  keywords: string[];
  source: string;
  author: string;
}): JsonLd {
  const url = absoluteUrl(post.url);
  return {
    '@context': 'https://schema.org',
    '@type': post.type === 'blog' ? 'BlogPosting' : 'Article',
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    inLanguage: site.language,
    datePublished: isoDateTime(post.date),
    dateModified: isoDateTime(post.date),
    keywords: post.keywords.join(', '),
    isBasedOn: post.source,
    author: { '@type': 'Organization', name: post.author === 'מערכת' ? site.name : post.author },
    publisher: organizationRef,
  };
}
