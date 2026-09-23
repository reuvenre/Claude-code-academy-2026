# ערכת בנייה — פלטפורמת הלמידה (Claude Code Academy IL)

אתר למידה מקצועי בעברית (RTL) שמרכז הכול על Claude Code ועולם ה‑AI.
נבנה **בתוך Claude Code**, בתהליך Explore → Plan → Implement → Commit.

> **שלב נוכחי: בנייה ללא סוכני אוטומציה.**
> הקרקע מוכנה להם (`content/blog`, `content/research`, `.github/workflows/`, שדה `status`),
> והם יתווספו בשלב 9. מדיניות שנקבעה: **סוכן פותח PR, אתה ממזג** — שום פרסום אוטומטי.

---

## מה יש בערכה

| קובץ | תפקיד |
|------|-------|
| `CLAUDE.md` | זיכרון הפרויקט. Claude קורא אותו אוטומטית בכל סשן. |
| `BUILD_PLAN.md` | 8 שלבי בנייה + פרומפטים מוכנים להעתקה. (שלב 9 = סוכנים, בהמשך) |
| `CONTENT_OUTLINE.md` | מפת 68 השיעורים: השאלה שכל עמוד עונה עליה + המקור הרשמי. |
| `SEO_AEO_GEO.md` | פלייבוק האופטימיזציה + צ'קליסטים. |
| `.claude/commands/` | `/new-lesson`, `/seo-audit`, `/rtl-check`, `/sync-docs`. |
| `.claude/agents/` | `content-writer`, `seo-auditor`, `docs-syncer`. |
| `.claude/skills/` | `lesson-authoring` (תבנית שיעור + סגנון עברי). |
| `templates/` | `lesson.mdx`, `post.mdx`, סכמת frontmatter, JSON‑LD, `llms.txt`. |
| `.github/workflows/` | ריק בכוונה — שמור לשכבת הסוכנים (ראה ה‑README שם). |

---

## איך מתחילים

1. **התקנת Claude Code** (אם צריך) — מומלץ ה‑native installer:
   - macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`

2. **הרצה:**
   ```bash
   cd learning-platform-kit
   claude
   ```

3. **הדבק את פרומפט שלב 0 מתוך `BUILD_PLAN.md`:**
   ```text
   קרא את CLAUDE.md, CONTENT_OUTLINE.md, SEO_AEO_GEO.md ואת התבניות תחת templates/.
   אל תכתוב קוד עדיין. תן לי סיכום קצר של מה הבנת + תוכנית לשלב 1.
   ```

4. אחרי אישור — **Plan Mode** (`Shift+Tab`) והמשך לפי `BUILD_PLAN.md`.

---

## הסטאק
Next.js (App Router) + Fumadocs + MDX + Tailwind + shadcn/ui · RTL מלא · SSR לכל התוכן ·
`localStorage` להתקדמות (בלי התחברות ב‑v1) · יעד אירוח: Vercel.

## מה שלא מתפשרים עליו
- **מקור אמת:** רק התיעוד הרשמי, ה‑changelog, What's New, ו‑Claude Academy.
- **בלי קיבוע שמות מודלים** — תמיד להפנות ל‑`model-config`.
- **SSR לכל התוכן** — אחרת קוראי AI לא רואים אותו (AEO).
- **תשובה‑קודם** בכל עמוד.
