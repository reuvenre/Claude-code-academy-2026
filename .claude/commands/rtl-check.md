---
description: בודק תקינות RTL/עברית בעמוד או ברכיב
argument-hint: <slug | נתיב לקובץ>
allowed-tools: Read, Grep, Bash
---

בדוק תקינות RTL ועברית עבור: **$ARGUMENTS**

בדוק והחזר 🔴/🟡/✅:
- אין שימוש ב-`margin-left/right`, `padding-left/right`, `left/right`, `text-align: left/right`
  במקום שבו צריך logical properties (`*-inline-start/end`, `text-align: start/end`).
- כיווניות נכונה: עברית RTL, אך בלוקי קוד/פקודות/נתיבים נשארים LTR
  (עטוף ב-`dir="ltr"` או `unicode-bidi: isolate` כדי שלא יתהפכו).
- מספרים, סלאשים בנתיבים, וכתובות URL לא נשברים בכיוון.
- אייקונים/חצים שאמורים להתהפך ב-RTL אכן מתהפכים (חץ "הבא" פונה שמאלה).
- פונט עברי נטען ומיושם; אין fallback מכוער.
- מרווחים והזחות עקביים בכיוון RTL.

החזר רשימת תיקונים קונקרטיים לכל ממצא 🔴.
