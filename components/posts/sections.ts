import type { PostType } from '@/lib/lesson-schema';

// שני מדורי התוכן המתעדכן: בלוג (עדכונים) ומחקרים (סיכומי מחקרים)
export const postSections: Record<
  PostType,
  { label: string; href: string; title: string; description: string; intro: string }
> = {
  blog: {
    label: 'בלוג',
    href: '/blog',
    title: 'בלוג: עדכוני Claude Code ו-Anthropic בעברית',
    description:
      'עדכונים קצרים בעברית על Claude Code ועל Anthropic: מה חדש, למה זה משנה ומה זה אומר בעבודה היומיומית. כל פוסט מבוסס על מקור רשמי ומקשר אליו.',
    intro:
      'עדכונים קצרים על Claude Code ועל Anthropic. כל פוסט מבוסס על מקור רשמי, מפריד בין עובדות לפרשנות ומסביר מה זה אומר בפועל.',
  },
  research: {
    label: 'מחקרים',
    href: '/research',
    title: 'מחקרים: סיכומי מחקרים של Anthropic בעברית',
    description:
      'סיכומים בעברית של מחקרים ופרסומים רשמיים של Anthropic: מה נבדק, מה נמצא ומה המשמעות למי שעובד עם Claude Code. כל סיכום מקשר למקור המלא.',
    intro:
      'סיכומים בעברית של מחקרים ופרסומים רשמיים של Anthropic. כל סיכום מציין מה נבדק ומה נמצא, ומקשר למקור המלא.',
  },
};

export function formatHebrewDate(date: string): string {
  return new Intl.DateTimeFormat('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
