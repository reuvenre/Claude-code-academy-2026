# .github/workflows — שמור לשכבת הסוכנים (שלב 9)

התיקייה הזו **ריקה בכוונה**. שכבת האוטומציה תתווסף אחרי שיהיה תוכן באתר —
אין טעם בסוכן שמתחזק אתר ריק, וזה רק שורף API credits.

## מה ייכנס לכאן בהמשך

| קובץ | מתי רץ | מה עושה |
|---|---|---|
| `sync-docs.yml` | שבועי (ראשון) | `docs-syncer` — משווה שיעורים מול התיעוד הרשמי + What's New; פותח **PR מאוחד** עם טבלת drift |
| `research-watch.yml` | שבועי (חמישי) | `research-writer` — מזהה פרסומים חדשים של Anthropic; כותב טיוטות ל‑`content/blog`; פותח PR |
| `seo-check.yml` | על כל PR | `seo-auditor` — בקרת איכות; חוסם מיזוג בממצא 🔴 |

## מדיניות (לא משתנה)
**הסוכן פותח PR. אתה ממזג.** שום פרסום אוטומטי לאתר.

## נקודות טכניות לזכור כשנבנה
- `anthropics/claude-code-action@v1` עם `prompt` = מצב automation (בלי @claude mention).
- אירועי `schedule` מדלגים על בדיקת ההרשאות של המשתמש המפעיל — מתאים לסוכן מתוזמן.
- `permissions:` חייב `contents: write` + `pull-requests: write`, אחרת פתיחת ה‑PR נכשלת.
- ה‑API key **תמיד** ב‑GitHub Secrets (`${{ secrets.ANTHROPIC_API_KEY }}`), לעולם לא ב‑YAML.
- תנאי `if` שמדלג על PR של בוטים — מניעת לולאות אינסופיות.
- לשקול **Routines** (פיצ'ר ענן של Claude Code) כחלופה/תוספת ל‑Actions.

הקרקע כבר מוכנה: `content/blog/`, `content/research/`, שדה `status: draft` ב‑frontmatter
(`templates/post.mdx`), וסוכני `docs-syncer`/`seo-auditor` קיימים תחת `.claude/agents/`.
