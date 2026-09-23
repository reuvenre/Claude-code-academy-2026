---
description: בודק עמוד מול דרישות SEO/AEO/GEO ומחזיר ממצאים לפי חומרה
argument-hint: <slug או נתיב לעמוד>
allowed-tools: Read, Bash, Grep
---

בצע audit של SEO/AEO/GEO על: **$ARGUMENTS** מול `SEO_AEO_GEO.md`.

בדוק והחזר ממצאים מסומנים 🔴 חוסם / 🟡 מומלץ / ✅ תקין:
- תשובה-קודם: פסקה ראשונה ≤50 מילים שעונה ישירות על שאלת העמוד.
- כותרת בנוסח שאלה אמיתית; H1 יחיד; היררכיית H2/H3 נקייה.
- frontmatter מלא: title (50-60 תווים), description (140-160), source, lastVerified, keywords.
- סקשן שו"ת קיים + ייצור JSON-LD מסוג FAQPage.
- JSON-LD TechArticle תקין לעמוד.
- כל התוכן server-rendered (אין תוכן קריטי שמסתתר מאחורי JS).
- קישוריות פנימית: "הצעד הבא" + 2-3 קישורים קשורים.
- `<SourceBadge>` עם קישור למקור הרשמי.

החזר רשימה ממוקדת + תיקונים קונקרטיים לכל ממצא 🔴.
