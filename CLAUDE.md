# CLAUDE.md — פלטפורמת הלמידה (Claude Code Academy IL)

נטען אוטומטית בכל סשן. מגדיר מי אנחנו, איך עובדים, ומה אסור.

## מה אנחנו בונים
פלטפורמת למידה מקצועית **בעברית (RTL)** שמרכזת הכול על Claude Code ועולם ה‑AI:
1. **מרכז למידה** — קורס מאפס למאה (68 שיעורים; ראה `CONTENT_OUTLINE.md`).
2. **בלוג ומחקרים** — עדכונים על Anthropic ועולם ה‑AI (`content/blog`, `content/research`).
3. **מרכז רפרנס חי** — פקודות, הגדרות, changelog.

> **שלב נוכחי: בנייה ללא סוכני אוטומציה.** הקרקע מוכנה להם (מבנה תיקיות, frontmatter,
> `.github/workflows/`), אבל הם יתווספו בשלב מאוחר יותר. אל תבנה workflows עכשיו.

## כלל-על: מקורות אמת
**כל עובדה טכנית מגיעה מהמקורות הרשמיים בלבד:**
- `https://code.claude.com/docs` + `https://code.claude.com/docs/llms.txt`
- Changelog: `https://code.claude.com/docs/en/changelog`
- **What's New שבועי:** `https://code.claude.com/docs/en/whats-new`
- **Claude Academy:** `https://academy.claude.com`

אסור:
- להמציא פקודות, דגלים או שמות פיצ'רים.
- **לקבע שמות/מספרי מודלים** — תמיד להפנות ל‑`/en/model-config` (הם מתחלפים תדיר).
- להעתיק טענות מבלוגים של צד שלישי (רבים ממציאים פיצ'רים).
- לכתוב "נכון לתאריך X" בלי לאמת מול המקור.

אם פרט לא נמצא במקור — לכתוב שזה לא מאומת, לא להשלים מהדמיון.

## שפה וכתיבה
- תוכן בעברית; מונחים טכניים באנגלית בתוך משפט עברי ("הרץ `/init` כדי לייצר CLAUDE.md").
- טון: ברור, ידידותי, מדויק. בלי סופרלטיבים שיווקיים.
- **תשובה‑קודם:** כל עמוד נפתח ב‑≤50 מילים שעונות ישירות על שאלת העמוד. קריטי ל‑AEO.
- היררכיה נקייה: H1 אחד, נושא אחד לכל H2/H3.
- קוד בבלוקים עם שפה. פקודות אמיתיות בלבד.
- **פדגוגיה (בהשראת Claude Academy):** בעיה‑קודם; למידה בעשייה; כל שיעור נסגר ב‑`<CanDo>`
  ("עכשיו אתה יכול…"); `<Quiz>` בסוף כל רמה; שכבת AI Fluency (4D) רוחבית.

## סטאק
- **Next.js (App Router) + Fumadocs + MDX + Tailwind + shadcn/ui.**
- לפני התקנת תלות — לאמת מול התיעוד העדכני של אותה ספרייה (אל תניח API מהזיכרון).
- **RTL:** `<html dir="rtl" lang="he">`, פונט עברי (Heebo/Assistant/Rubik), **logical properties**
  בלבד (`margin-inline-start`, לא `margin-left`). קוד/פקודות נשארים LTR.
- **כל התוכן server‑rendered.** תוכן שמתגלה רק אחרי JS אינו נראה לקוראי AI — כולל שאלות Quiz
  (האינטראקציה בצד לקוח, הטקסט ב‑HTML).
- **התקדמות/Quiz:** `localStorage` ב‑v1, מאחורי שכבת `progressStore` מופשטת (מעבר עתידי
  ל‑DB יהיה החלפה נקייה, לא שכתוב). **אין התחברות ב‑v1.**

## מבנה תוכן
```
content/lessons/<level>/<slug>.mdx   ← 68 שיעורים לפי CONTENT_OUTLINE.md
content/blog/<slug>.mdx              ← מוכן לסוכן העתידי (status: draft|published)
content/research/<slug>.mdx          ← סיכומי מחקרים
```

## SEO / AEO / GEO (חובה)
- frontmatter מלא לפי `templates/frontmatter.schema.md`.
- JSON‑LD: `Organization` בשורש · `TechArticle` לשיעור · `Course`/`LearningResource` לעמוד רמה ·
  `FAQPage` איפה שיש שו"ת · `BreadcrumbList`.
- `llms.txt` + `llms-full.txt` נוצרים אוטומטית מ‑frontmatter.
- `robots.txt` שמאשר ClaudeBot, OAI‑SearchBot, PerplexityBot, Google‑Extended.
- שו"ת בכל שיעור; כותרות בנוסח שאלה אמיתית.

## תהליך עבודה
1. **Explore** — קרא קבצים והמקור הרשמי לפני כתיבה.
2. **Plan** — למשימה לא טריוויאלית, הצג תוכנית ואשר לפני קוד (Plan Mode).
3. **Implement** — יחידה אחת בכל פעם.
4. **Commit** — קומיט קטן וברור אחרי כל יחידה גמורה.

סוכני משנה זמינים: `content-writer` (שיעורים), `seo-auditor` (בדיקה), `docs-syncer` (אימות מול המקור).
פקודות: `/new-lesson`, `/seo-audit`, `/rtl-check`, `/sync-docs`.

## הגדרת "גמור" לשיעור
- [ ] תשובה‑קודם ≤50 מילים.
- [ ] frontmatter מלא ותקין (כולל `source` + `lastVerified`).
- [ ] כל עובדה מאומתת מול מקור רשמי.
- [ ] שו"ת + `<CanDo>`; `<Quiz>` אם זה סוף רמה.
- [ ] עובר `/seo-audit` ו‑`/rtl-check` ללא ממצא 🔴.

## אסור (Guardrails)
- אל תריץ פקודות הרסניות (`rm -rf`, force‑push, `git reset --hard`) בלי אישור מפורש.
- אל תמחק תוכן קיים בלי לשאול.
- אל תשתול מפתחות/סודות בקוד → `.env.local` (ב‑gitignore).
- אל תבנה את שכבת הסוכנים/workflows בשלב הזה.
