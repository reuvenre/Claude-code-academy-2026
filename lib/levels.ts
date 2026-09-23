// רמות הקורס — מקור יחיד לערכי `level` ב-frontmatter, לתוויות, לראוטים ולתיאורי עמודי השער.
// הסדר כאן הוא סדר מסלול הלמידה (לפי CONTENT_OUTLINE.md).
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

export interface LevelInfo {
  label: string;
  href: `/${Level}`;
  /** מסלול ליבה (רמות 0-3) או מסלול צד */
  track: 'core' | 'side';
  /** תיאור קצר לעמוד השער ול-meta description */
  description: string;
  /** "מה תוכל לעשות בסוף הרמה" — משמש גם ל-Course.teaches ב-JSON-LD */
  teaches: string;
}

export const levelInfo: Record<Level, LevelInfo> = {
  beginner: {
    label: 'רמה 0 · מתחילים לחלוטין',
    href: '/beginner',
    track: 'core',
    description:
      'מאפס מוחלט: מה זה Claude Code, התקנה, התחברות, הסשן הראשון והשינוי הראשון בקוד — בלי להניח ידע מוקדם.',
    teaches: 'להתקין את Claude Code, להתחבר, לנהל סשן ראשון ולבקש ממנו לערוך קוד ולעבוד עם Git.',
  },
  'beginner-plus': {
    label: 'רמה 1 · מתחילים פלוס',
    href: '/beginner-plus',
    track: 'core',
    description:
      'עבודה נכונה ויומיומית: ה-workflow המומלץ, CLAUDE.md וזיכרון, ניהול סשנים, מצבי הרשאות, עלויות ופתרון תקלות.',
    teaches: 'לעבוד בזרימה מסודרת, ללמד את Claude את הפרויקט, לשלוט בהרשאות ולפתור תקלות נפוצות.',
  },
  advanced: {
    label: 'רמה 2 · מתקדמים',
    href: '/advanced',
    track: 'core',
    description:
      'הרחבת Claude Code: Skills, Subagents, Hooks, MCP, Plugins, הגדרות, הרשאות ואבטחה.',
    teaches: 'להתאים ולהרחיב את Claude Code לצוות ולפרויקט עם Skills, Hooks, MCP ו-Plugins.',
  },
  pro: {
    label: 'רמה 3 · מקצוענים',
    href: '/pro',
    track: 'core',
    description:
      'עבודה בקנה מידה: סוכנים במקביל, worktrees, ענן ומובייל, אוטומציה, CI/CD ו-Agent SDK.',
    teaches: 'להריץ כמה סוכנים במקביל, לאוטמט עבודה בענן וב-CI, ולבנות על Claude Code בקוד.',
  },
  'product-family': {
    label: 'משפחת המוצר',
    href: '/product-family',
    track: 'side',
    description: 'איפה Claude Code רץ ואיך הוא מתחבר למוצרים המשיקים ול-Claude Academy.',
    teaches: 'לבחור את המשטח המתאים לכל משימה ולהכיר את המוצרים המשיקים.',
  },
  fluency: {
    label: 'AI Fluency',
    href: '/fluency',
    track: 'side',
    description: 'שכבה רוחבית: איך לחשוב על עבודה עם סוכן לפי מסגרת 4D של Claude Academy.',
    teaches: 'להאציל, לתאר, להבחין ולפעול באחריות בעבודה עם סוכן AI.',
  },
  enterprise: {
    label: 'ארגוני',
    href: '/enterprise',
    track: 'side',
    description: 'לאדמינים ולארגונים: הגדרות מנוהלות, gateways, פריסות ענן, ניטור ואימוץ בארגון.',
    teaches: 'לפרוס ולנהל את Claude Code בארגון בצורה מבוקרת.',
  },
};

export function isLevel(value: string): value is Level {
  return (levels as readonly string[]).includes(value);
}
