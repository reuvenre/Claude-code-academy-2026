---
description: יוצר שיעור חדש מתוך CONTENT_OUTLINE עם אימות מקור, תשובה-קודם, frontmatter ושו"ת
argument-hint: <slug של השיעור מתוך CONTENT_OUTLINE.md>
allowed-tools: Read, Write, Edit, WebFetch, Task
---

צור את השיעור עבור ה-slug: **$ARGUMENTS**

תהליך מחייב:
1. אתר את השורה של ה-slug ב-`CONTENT_OUTLINE.md` — קח ממנה את הכותרת, השאלה שהעמוד עונה
   עליה, ואת **המקור הרשמי**.
2. **אמת מול המקור** ב-`https://code.claude.com/docs/en/<source>` (WebFetch). אם עובדה
   לא מופיעה שם — אל תכתוב אותה.
3. השתמש בסקיל `lesson-authoring` ובתבנית `templates/lesson.mdx`.
4. הפעל את סוכן המשנה `content-writer` לכתיבה בעברית (תשובה-קודם ≤50 מילים, ואז הרחבה).
5. מלא frontmatter מלא לפי `templates/frontmatter.schema.md`, כולל `source` (ה-URL הרשמי)
   ו-`lastVerified` (תאריך היום).
6. מלא `frontmatter.faq` (3-5 שו"ת בפורמט שאלה→תשובה). התבנית מרנדרת את הסקשן ואת FAQPage.
7. מלא `frontmatter.canDo` — משפט "עכשיו אתה יכול…" (התבנית מרנדרת `<CanDo>`).
8. אם זה השיעור האחרון ברמה — מלא `frontmatter.quiz` (5-8 שאלות).
   אל תכתוב בגוף H1 (`#`), FAQ, CanDo, Quiz או badges. הם מגיעים מה-frontmatter.
9. הוסף קישורי "הצעד הבא" + 2-3 שיעורים קשורים.

בסיום: הרץ `/seo-audit $ARGUMENTS` ו-`/rtl-check $ARGUMENTS`, תקן אזהרות חוסמות,
והצג לי תקציר לאישור לפני קומיט.
