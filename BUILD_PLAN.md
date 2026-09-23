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

**✅ הושלם.** מה נבנה, והערות להמשך:
- סכמה: `lib/lesson-schema.ts` (zod). `source` מוגבל לדומיינים `claude.com` / `anthropic.com`. ערכי `level`: `lib/levels.ts`.
- תבנית: `components/lesson/lesson-page.tsx`, משמשת גם את השיעורים וגם את הדמו.
- דמו: `content/demo/components.mdx` → `/demo/components`. collection נפרד (`demoSource`) עם `noindex`, מחוץ לניווט, לחיפוש ול-llms.txt.
- `draft: true` מוסתר בפרודקשן בעמוד השיעור בלבד. **בשלב 3:** לסנן drafts גם מ-llms.txt, מ-sitemap ומהחיפוש.
- FAQ מייצר JSON-LD בעצמו. **בשלב 3:** להעביר ל-`lib/seo/` יחד עם שאר ה-schemas.
- `ReadingTime`: לפי ~200 מילים לדקה (`lib/reading-time.ts`).
- אין עדיין שיעורים ב-`content/lessons`. `/beginner` יחזור בשלב 4 כעמוד שער.

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

**✅ הושלם.** מה נבנה, והערות להמשך:
- `lib/seo/`: `site.ts` (זהות + `absoluteUrl`), `jsonld.ts` (Organization, TechArticle, FAQPage,
  BreadcrumbList, Course), `metadata.ts` (`createLessonMetadata`), `llms.ts`. רכיב `components/seo/json-ld.tsx`.
- Organization ב-layout השורש. TechArticle + BreadcrumbList + FAQPage בכל שיעור.
- **drafts מסוננים במקור** (`lib/source.ts`), ולכן נעלמים מכל מקום: עמוד, סיידבר, חיפוש, llms, sitemap ו-OG.
- `llms.txt` / `llms-full.txt` נבנים לפי `templates/llms-txt.example.txt`, ממוינים לפי רמה ו-`order`.
- Markdown לשיעור: `/<level>/<slug>.md`, או אותו URL עם `Accept: text/markdown` (`proxy.ts`, עם `Vary: Accept`).
- תמונות OG: **Takumi** במקום `next/og`, כי Satori לא תומך ב-RTL והפך את האותיות. הגופן Heebo נטען מקומית מ-`@fontsource/heebo`.
- `NEXT_PUBLIC_SITE_URL` נקרא בזמן build. בפריסה מגדירים אותו בסביבת ה-build.
- נבדק עם שיעורי בדיקה זמניים (נמחקו): כל ה-schemas, ה-metadata, סינון ה-drafts והחיפוש בעברית.
- **פתוח:** אימות ב-Rich Results Test אפשרי רק על URL ציבורי (שלבים 8/14).

## שלב 4 — שלד ניווט ועמודי שער
```text
בנה את ה-IA: דף בית עם בורר רמה ומסלול למידה, עמודי שער לכל רמה
(/beginner, /beginner-plus, /advanced, /pro, /enterprise), /fluency, /reference, /product-family.
סיידבר RTL + breadcrumb + חיפוש. החיפוש המובנה (tokenizer multilingual) כבר עובד בעברית (נבדק בשלב 3).
עמודי השער יציגו רשימת שיעורים וזמני קריאה, ויקבלו JSON-LD מסוג Course (courseJsonLd ב-lib/seo/jsonld.ts)
ו-BreadcrumbList, וייכנסו ל-sitemap.
כותרות תיקיות בעברית ב-meta.json לכל רמה (כרגע ה-breadcrumbs בחיפוש מציגים "Docs / Beginner").
```
קומיט: `feat: navigation shell + level hubs`

**✅ הושלם.** מה נבנה, והערות להמשך:
- `lib/levels.ts`: לכל רמה תווית, מסלול (ליבה/צד), תיאור ו-`teaches`. `lib/curriculum.ts`: הסילבוס מ-CONTENT_OUTLINE
  (מספר, slug וכותרת בלבד). **slug של שיעור חדש חייב להתאים לסילבוס**, אחרת הוא יוצג בסוף הרשימה בלי מספר.
- עמודי שער: `/<level>` מטופל ב-`app/(docs)/[...slug]` (`components/hub/level-hub.tsx`). מציג את כל הסילבוס:
  שיעורים זמינים עם קישור וזמן קריאה, והשאר "בקרוב". יש בו JSON-LD מסוג Course ו-BreadcrumbList.
- רמה בלי שיעורים שפורסמו מקבלת `noindex` ולא נכנסת ל-sitemap או ל-llms.txt. `/reference` הוא שלד עם `noindex` עד שלב 7.
- סיידבר: עץ מפורש (`getSidebarTree` ב-`lib/navigation.ts`) לפי סדר הרמות ו-`order`, ולא לפי שמות תיקיות.
  לכן **אין צורך ב-meta.json**. Breadcrumb ו"הבא/הקודם" נגזרים ממנו.
- ממשק Fumadocs בעברית: `lib/ui-translations.ts`. המפתחות כוללים את ה-note של כל רכיב. **לבדוק מחדש אחרי שדרוג fumadocs-ui.**
- חיפוש: breadcrumbs בעברית, ונרמול אותיות סופיות (ך→כ וכו') באינדוקס ובשאילתה, כדי שחיפוש-קידומת יעבוד.
  **אין stemming עברי:** "התקנה" לא מוצא "מתקינים" בטקסט. לכן `keywords` מה-frontmatter נכנסים לאינדקס — לכלול בהם צורות נפוצות.
- דף הבית: תשובה-קודם, מסלול ליבה (רמות 0-3), מסלולים משלימים. הלינק ל-`/start` יתווסף בשלב 8.

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
