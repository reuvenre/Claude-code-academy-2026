// רמות הקורס — מקור יחיד לערכי `level` ב-frontmatter, לתוויות ולראוטים (לפי CONTENT_OUTLINE.md)
export const levels = [
  'beginner',
  'beginner-plus',
  'advanced',
  'pro',
  'product-family',
  'fluency',
  'enterprise',
] as const;

export type Level = (typeof levels)[number];

export const levelInfo: Record<Level, { label: string; href: `/${Level}` }> = {
  beginner: { label: 'רמה 0 · מתחילים לחלוטין', href: '/beginner' },
  'beginner-plus': { label: 'רמה 1 · מתחילים פלוס', href: '/beginner-plus' },
  advanced: { label: 'רמה 2 · מתקדמים', href: '/advanced' },
  pro: { label: 'רמה 3 · מקצוענים', href: '/pro' },
  'product-family': { label: 'משפחת המוצר', href: '/product-family' },
  fluency: { label: 'AI Fluency', href: '/fluency' },
  enterprise: { label: 'ארגוני', href: '/enterprise' },
};
