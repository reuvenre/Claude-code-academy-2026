# BUILD_PLAN.md — תוכנית בנייה (שלב נוכחי: ללא סוכנים)

עובדים שלב‑שלב: **Explore → Plan (אישור) → Implement → Commit**.
הפרומפטים מוכנים להעתקה ישירה ל‑Claude Code. שכבת הסוכנים תתווסף בשלב 9 (בהמשך).

**סדר הביצוע:** ‎-1 → 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 8.5 → 10 → 11 → 12 → 13 → 14. שלב 9 מושהה.

## החלטות שהתקבלו
- הפרויקט יושב ב-`C:\dev\claude-code-academy`, מחוץ ל-OneDrive ובנתיב ASCII. ריפו:
  `https://github.com/reuvenre/Claude-code-academy-2026` (branch `main`). OneDrive נשאר גיבוי בלבד.
- הערכה שוטחה לשורש הפרויקט.
- היקף: כל 68 השיעורים, בלוג/מחקרים ופריסה. בלי שכבת הסוכנים (שלב 9).
- **ה-frontmatter הוא מקור האמת של מסגרת העמוד.** תבנית הדף מרנדרת ממנו H1, badges, FAQ, CanDo, Quiz,
  LastVerified ו-JSON-LD. גוף ה-MDX מכיל תוכן בלבד (ראה `templates/frontmatter.schema.md`).
- ערכי `level` תואמים לראוטים: `beginner | beginner-plus | advanced | pro | product-family | fluency | enterprise`.
- URLs: `/<level>/<slug>` (baseUrl `/`, לא `/docs`).

---

## שלב ‎-1 — הכנת סביבה ✅ הושלם
Node ו-Git הותקנו, הריפו שוכפל ל-`C:\dev\claude-code-academy`, הערכה יובאה ונדחפה
(`chore: import learning-platform-kit`).

## שלב 0 — תיקוני ערכה ✅ הושלם
- `templates/frontmatter.schema.md`: הורחב ה-enum של `level`; H1 מגיע מ-`title` בלבד; רכיבי מסגרת מרונדרים מה-frontmatter.
- `templates/lesson.mdx`: הוסרו `#` ורכיבי המסגרת מהגוף; `lastVerified` הוא placeholder.
- `.claude/commands/new-lesson.md` ו-`.claude/skills/lesson-authoring`: יושרו לתבנית.
- `BUILD_PLAN.md`: עודכן לתוכנית הזו.

קומיט: `docs: align kit templates`

## שלב 1 — Scaffold ✅ הושלם
נבנה עם `create-fumadocs-app` (template `+next+fuma-docs-mdx`), Next 16.3, Fumadocs 16.15 (Base UI),
Tailwind 4, shadcn/ui (`base-nova`, `--rtl`). הערות להמשך:
- `typescript` ננעל ל-`~6.0`, כי typescript-eslint עדיין לא תומך ב-TS 7 (בלעדיו `npm run lint` נכשל).
- ה-template כלל `proxy.ts` (content negotiation: `Accept: text/markdown` → Markdown של השיעור).
  לא הועבר, כי הדפוס שלו מניח `/docs` ולא שורש. **להחזיר בשלב 3** מותאם ל-baseUrl `/`.
- `llms.txt`, `llms-full.txt`, `/llms.mdx/lessons/.../content.md` ו-OG (`/og/lessons/...`) כבר פעילים מה-template.
  בשלב 3 מעשירים אותם לפי SEO_AEO_GEO.md.
- מנוע החיפוש המובנה של Fumadocs הוא כיום ZBSearch (לא Orama). בשלב 4 בודקים תמיכה בעברית מול `/docs/search/orama`.
- `next dev` מוסיף ל-CLAUDE.md בלוק `nextjs-agent-rules` כשסוכן מריץ אותו. משאירים אותו בקומיט.

```text
הקם פרויקט Next.js (App Router) + Fumadocs + Tailwind + shadcn/ui, מוגדר RTL עברי.
חשוב: אמת מול התיעוד העדכני של Fumadocs ו-Next לפני שתריץ פקודות (create-fumadocs-app או התקנה
ידנית) — אל תניח API מהזיכרון.
- <html dir="rtl" lang="he">, פונט עברי (Heebo/Assistant/Rubik) עם display:swap
- logical CSS properties בלבד (margin-inline-*), קוד/פקודות נשארים LTR
- מבנה תיקיות: content/lessons, content/blog, content/research
- baseUrl ל-"/" וראוטינג לפי רמה: /<level>/<slug> (לא /docs)
- .gitignore תקין, .env.local.example עם NEXT_PUBLIC_SITE_URL (במקום <domain> קבוע)
ודא ש-npm run dev ו-npm run build רצים נקי. עצור לפני תוכן והצג סיכום.
```
קומיט: `chore: scaffold next.js + fumadocs (rtl)`

## שלב 2 — רכיבי ליבה + תבנית שיעור + progressStore
```text
ממש את רכיבי השיעור ב-components/lesson/: CommandBlock (עם כפתור העתקה), Callout (tip/warning/note),
StepList, FAQ (מייצר FAQPage schema), Quiz (אינטראקטיבי - אבל הטקסט חייב להיות ב-HTML
המרונדר), CanDo, SourceBadge, LevelBadge, ReadingTime, LastVerified.
- תבנית הדף מרנדרת את H1, LevelBadge, ReadingTime, SourceBadge, FAQ, CanDo, Quiz ו-LastVerified
  מתוך ה-frontmatter (אמת מול תיעוד Fumadocs איך לגשת ל-frontmatter בדף). Quiz ו-FAQ ב-SSR;
  ה-client אחראי רק על האינטראקציה.
- סכמת frontmatter ב-zod (דרך schema של fumadocs-mdx) לפי templates/frontmatter.schema.md,
  כך שה-build נכשל אם שדה חובה חסר.
- lib/progress/progressStore.ts: ממשק (getProgress, markComplete, saveQuizResult) עם מימוש
  localStorage. ללא התחברות.
חבר את templates/lesson.mdx כתבנית לכל שיעור חדש. הוסף עמוד דמו שמציג את כל הרכיבים.
```
קומיט: `feat: lesson components + mdx template`

## שלב 3 — שכבת SEO/AEO/GEO
```text
ממש את SEO_AEO_GEO.md:
- יצירת llms.txt ו-llms-full.txt אוטומטית מה-frontmatter בזמן build (route handlers סטטיים;
  בדוק קודם אם ל-Fumadocs יש תמיכה מובנית ב-llms)
- robots.ts שמאשר ClaudeBot, OAI-SearchBot, PerplexityBot, Google-Extended + sitemap.ts
- JSON-LD ב-lib/seo/: Organization (שורש), TechArticle (שיעור), Course/LearningResource (עמוד רמה),
  FAQPage (שו"ת), BreadcrumbList — לפי templates/schema-jsonld.md
- generateMetadata משותף: helper שמזריק metadata + schema מ-frontmatter לכל עמוד
```
קומיט: `feat: seo/aeo/geo layer`

## שלב 4 — שלד ניווט ועמודי שער
```text
בנה את ה-IA: דף בית עם בורר רמה ומסלול למידה, עמודי שער לכל רמה
(/beginner, /beginner-plus, /advanced, /pro, /enterprise), /fluency, /reference, /product-family.
סיידבר RTL + breadcrumb + חיפוש. ודא שהחיפוש עובד בעברית (Orama tokenizer).
עמודי השער יציגו רשימת שיעורים וזמני קריאה.
```
קומיט: `feat: navigation shell + level hubs`

## שלב 5 — תוכן רמה 0
```text
באמצעות /new-lesson <slug> וסוכן המשנה content-writer, כתוב את שיעורי רמה 0 (1-9 ב-CONTENT_OUTLINE),
שיעור-שיעור. לכל שיעור: אמת מול המקור הרשמי, תשובה-קודם ≤50 מילים, frontmatter מלא
(כולל source ו-lastVerified אמיתי), faq, ו-canDo. הרץ /seo-audit ו-/rtl-check אחרי כל שיעור.
עצור כל 3 שיעורים לאישור. בשיעור האחרון הוסף quiz לרמה.
```
קומיט לכל שיעור: `content(beginner): <slug>`

## שלב 6 — תוכן רמה 1
```text
אותו תהליך לשיעורים 10-20. דגש: workflow (10), CLAUDE.md (11), ומצבי הרשאות (14) —
אמת מול המקור מהו מצב ברירת המחדל הנוכחי (הערכה מציינת auto mode). סיים ב-quiz לרמה.
```
קומיט לכל שיעור: `content(beginner-plus): <slug>`

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

## שלב 8.5 — בלוג ומחקרים
```text
בנה ראוטים /blog ו-/research: עמוד רשימה ועמוד פוסט לפי templates/post.mdx.
רק status: published מוצג ונכנס ל-sitemap ול-llms.txt; draft מוסתר בפרודקשן.
JSON-LD מסוג BlogPosting. הוסף פוסט דמו אחד.
```
קומיט: `feat: blog & research`

## שלבים 10–13 — שאר התוכן
אותו תהליך בדיוק כמו בשלבים 5–6 (`/new-lesson` → `content-writer` → `/seo-audit` + `/rtl-check`,
עצירה כל 3 שיעורים, קומיט לכל שיעור, quiz בסוף כל רמה):
- **10:** רמה 2 מתקדמים (21–35).
- **11:** רמה 3 מקצוענים (36–57). פריטים רבים מסומנים 🆕 — הרץ `/sync-docs` לפני שמתחילים.
- **12:** משפחת המוצר (58–60) ו-Fluency (61). בשיעור 59 (Cowork) לאמת את ה-URL כפי שמסומן בערכה.
- **13:** ארגוני (62–68), אופציונלי.

## שלב 14 — פריסה ל-Vercel (רק באישור מפורש)
חיבור הריפו ב-GitHub, פרויקט ב-Vercel, דומיין (`NEXT_PUBLIC_SITE_URL`), ואימות JSON-LD
ב-Rich Results Test על ה-URL החי.

---

## שלב 9 — שכבת הסוכנים  ⏸️ בהמשך
לא בונים עכשיו. הקרקע מוכנה: `content/blog`, `content/research`, `.github/workflows/`,
ושדה `status` ב‑frontmatter. כשנגיע — נוסיף:
- `docs-syncer` (שבועי) — drift מול התיעוד → PR מאוחד.
- `research-writer` (שבועי) — טיוטות בלוג/מחקרים → PR.
- `seo-auditor` (על כל PR) — חוסם מיזוג בממצא 🔴.
**מדיניות: הסוכן פותח PR, אתה ממזג. שום פרסום אוטומטי.**

---

## אימות לאורך הדרך
- בכל שלב: `npm run build` נקי.
- View Source (`curl` על הדף): כל התוכן, כולל Quiz ו-FAQ, נמצא ב-HTML.
- בדיקה חזותית של RTL ב-browser pane.
- `/seo-audit` ו-`/rtl-check` לכל שיעור, ללא ממצאי 🔴.
- בסוף: Lighthouse ≥90 ו-Rich Results Test.

### תזכורות לעבודה נכונה
- `/clear` בין משימות לא קשורות — שומר על חלון הקשר נקי.
- קומיטים קטנים ותכופים; checkpointing כדי לחזור אחורה.
- אל תאשר "Accept all" בעיוורון, במיוחד בפקודות מחיקה/גיט.
