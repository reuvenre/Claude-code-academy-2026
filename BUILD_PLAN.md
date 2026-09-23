# BUILD_PLAN.md — תוכנית בנייה (שלב נוכחי: ללא סוכנים)

עובדים שלב‑שלב: **Explore → Plan (אישור) → Implement → Commit**.
הפרומפטים מוכנים להעתקה ישירה ל‑Claude Code. שכבת הסוכנים תתווסף בשלב 9 (בהמשך).

---

## שלב 0 — Explore (אל תכתוב קוד)
```text
קרא את CLAUDE.md, CONTENT_OUTLINE.md, SEO_AEO_GEO.md ואת התבניות תחת templates/.
אל תכתוב קוד עדיין. תן לי סיכום קצר של מה הבנת + תוכנית לשלב 1, ושאל כל דבר לא ברור.
```
אחרי אישור — הפעל **Plan Mode** (`Shift+Tab`) להמשך.

## שלב 1 — Scaffold
```text
הקם פרויקט Next.js (App Router) + Fumadocs + Tailwind + shadcn/ui, מוגדר RTL עברי.
חשוב: אמת מול התיעוד העדכני של Fumadocs ו-Next לפני שתריץ פקודות — אל תניח API מהזיכרון.
- <html dir="rtl" lang="he">, פונט עברי (Heebo/Assistant/Rubik) עם display:swap
- logical CSS properties בלבד (margin-inline-*), קוד/פקודות נשארים LTR
- מבנה תיקיות: content/lessons, content/blog, content/research
- .gitignore תקין, .env.local.example ריק
ודא ש-npm run dev ו-npm run build רצים נקי. עצור לפני תוכן והצג סיכום.
```
קומיט: `chore: scaffold next.js + fumadocs (rtl)`

## שלב 2 — רכיבי ליבה + תבנית שיעור
```text
ממש את רכיבי השיעור: CommandBlock (עם כפתור העתקה), Callout (tip/warning/note),
StepList, FAQ (מייצר FAQPage schema), Quiz (אינטראקטיבי - אבל הטקסט חייב להיות ב-HTML
המרונדר), CanDo, SourceBadge, LevelBadge, ReadingTime, LastVerified.
חבר את templates/lesson.mdx כתבנית לכל שיעור חדש. הוסף עמוד דמו שמציג את כל הרכיבים.
```
קומיט: `feat: lesson components + mdx template`

## שלב 3 — שכבת SEO/AEO/GEO
```text
ממש את SEO_AEO_GEO.md:
- יצירת llms.txt ו-llms-full.txt אוטומטית מה-frontmatter בזמן build
- robots.txt שמאשר ClaudeBot, OAI-SearchBot, PerplexityBot, Google-Extended + sitemap
- JSON-LD: Organization (שורש), TechArticle (שיעור), Course/LearningResource (עמוד רמה),
  FAQPage (שו"ת), BreadcrumbList — לפי templates/schema-jsonld.md
- helper שמזריק metadata + schema מ-frontmatter לכל עמוד
```
קומיט: `feat: seo/aeo/geo layer`

## שלב 4 — שלד ניווט ועמודי שער
```text
בנה את ה-IA: דף בית עם בורר רמה ומסלול למידה, עמודי שער לכל רמה
(/beginner, /beginner-plus, /advanced, /pro), /fluency, /reference, /product-family.
סיידבר RTL + breadcrumb + חיפוש. עמודי השער יציגו רשימת שיעורים וזמני קריאה.
```
קומיט: `feat: navigation shell + level hubs`

## שלב 5 — תוכן רמה 0
```text
באמצעות סוכן המשנה content-writer, כתוב את שיעורי רמה 0 (1-9 ב-CONTENT_OUTLINE),
שיעור-שיעור. לכל שיעור: אמת מול המקור הרשמי, תשובה-קודם ≤50 מילים, frontmatter מלא
(כולל source ו-lastVerified), שו"ת, ו-CanDo. הרץ /seo-audit ו-/rtl-check אחרי כל שיעור.
עצור כל 3 שיעורים לאישור. בשיעור האחרון הוסף Quiz לרמה.
```
קומיט לכל שיעור: `content(beginner): <slug>`

## שלב 6 — תוכן רמה 1
```text
אותו תהליך לשיעורים 10-20. דגש: workflow (10), CLAUDE.md (11), ומצבי הרשאות (14) —
שים לב ש-auto mode הוא כיום ברירת המחדל. סיים ב-Quiz לרמה.
```

## שלב 7 — מרכז הרפרנס החי
```text
בנה /reference: CLI reference, כל הפקודות, env vars, tools, settings-reference,
glossary, changelog, ו-What's New. טבלאות סורק-ידידותיות. סמן lastVerified בכל עמוד.
```
קומיט: `content(reference): live reference hub`

## שלב 8 — עמודי תשתית + ליטוש
```text
בנה /start (אבחון רמה ב-3 שאלות), /about (Brand Hub עובדתי ל-AEO), /faq, /glossary.
ואז ליטוש: Lighthouse ≥90 בכל הקטגוריות, Core Web Vitals, נגישות AA, ניווט מקלדת,
ואימות JSON-LD ב-Rich Results Test. אל תפרוס בלי אישור שלי.
```
קומיט: `feat: start, about, faq, glossary` + `chore: polish & a11y`

---

## שלב 9 — שכבת הסוכנים  ⏸️ בהמשך
לא בונים עכשיו. הקרקע מוכנה: `content/blog`, `content/research`, `.github/workflows/`,
ושדה `status` ב‑frontmatter. כשנגיע — נוסיף:
- `docs-syncer` (שבועי) — drift מול התיעוד → PR מאוחד.
- `research-writer` (שבועי) — טיוטות בלוג/מחקרים → PR.
- `seo-auditor` (על כל PR) — חוסם מיזוג בממצא 🔴.
**מדיניות: הסוכן פותח PR, אתה ממזג. שום פרסום אוטומטי.**

---

### תזכורות לעבודה נכונה
- `/clear` בין משימות לא קשורות — שומר על חלון הקשר נקי.
- קומיטים קטנים ותכופים; checkpointing כדי לחזור אחורה.
- אל תאשר "Accept all" בעיוורון, במיוחד בפקודות מחיקה/גיט.
