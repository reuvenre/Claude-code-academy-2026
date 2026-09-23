---
description: משווה שיעור מול המקור הרשמי שלו ומדגיש drift (שינוי/הוספה/הסרה של פיצ'ר)
argument-hint: <slug | "all" לכל השיעורים>
allowed-tools: Read, WebFetch, Grep, Task
---

אמת תוכן מול התיעוד הרשמי עבור: **$ARGUMENTS**
(אם "all" — עבור על כל השיעורים שב-CONTENT_OUTLINE.md לפי הסדר).

לכל שיעור:
1. קרא את ה-`source` מה-frontmatter.
2. WebFetch ל-`https://code.claude.com/docs/en/<source>` והשווה את הטענות בשיעור
   מול הדף החי.
3. דווח כל drift:
   - 🆕 פיצ'ר/פקודה שנוסף ולא מכוסה אצלנו.
   - ✏️ פרט שהשתנה (דגל, שם, התנהגות).
   - ⚠️ טענה אצלנו שלא נמצאת יותר במקור (אולי הוסר/שונה).
4. הצע עדכון מדויק לכל drift, אבל **אל תשנה בלי אישור**.
5. הצע לעדכן `lastVerified` לתאריך היום לשיעורים שעברו אימות נקי.

הפק טבלת סיכום: slug | סטטוס | פעולה מומלצת.
הצלב גם מול ה‑**What's New** השבועי (`https://code.claude.com/docs/en/whats-new`)
ומול ה‑changelog (`https://code.claude.com/docs/en/changelog`) — כדי לתפוס פיצ'רים חדשים
(מודל חדש כברירת מחדל, פקודות/דגלים חדשים, שינויי התנהגות) שעדיין לא כוסו באתר.
