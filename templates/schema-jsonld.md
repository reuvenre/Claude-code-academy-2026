# סניפטים של JSON-LD (Schema)

מזריקים כ-`<script type="application/ld+json">` בצד שרת. מייצרים מתוך frontmatter.

## 1. Organization (בשורש האתר / layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Claude Code Academy",
  "url": "https://<domain>",
  "description": "אתר לימוד עברי לעבודה ב-Claude Code, מאפס למאה.",
  "inLanguage": "he"
}
```

## 2. TechArticle (כל שיעור)
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "{frontmatter.title}",
  "description": "{frontmatter.description}",
  "inLanguage": "he",
  "dateModified": "{frontmatter.lastVerified}",
  "keywords": "{frontmatter.keywords.join(', ')}",
  "isBasedOn": "{frontmatter.source}",
  "author": { "@type": "Organization", "name": "Claude Code Academy" },
  "publisher": { "@type": "Organization", "name": "Claude Code Academy" }
}
```
> `isBasedOn` מצביע למקור הרשמי — שקיפות מקור שמחזקת אמון ו-E-E-A-T.

## 3. FAQPage (עמוד עם שו"ת)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{faq[i].q}",
      "acceptedAnswer": { "@type": "Answer", "text": "{faq[i].a}" }
    }
  ]
}
```
> זו אחת הטקטיקות בעלות התשואה הגבוהה ל-AEO — שאלה→תשובה ממופה ישירות לשאילתות.

## 4. BreadcrumbList (ניווט)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "בית", "item": "https://<domain>" },
    { "@type": "ListItem", "position": 2, "name": "{levelName}", "item": "https://<domain>/{level}" },
    { "@type": "ListItem", "position": 3, "name": "{frontmatter.title}" }
  ]
}
```

## 5. Course / LearningResource (עמוד רמה / הקורס)
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Claude Code — {levelName} (מאפס למאה)",
  "description": "{levelDescription}",
  "inLanguage": "he",
  "provider": { "@type": "Organization", "name": "Claude Code Academy" },
  "isAccessibleForFree": true,
  "teaches": "{can-do של הרמה: מה הלומד יוכל לעשות בסיומה}"
}
```
> משתמשים ב‑`Course` לעמוד הרמה/הקורס, ו‑`TechArticle` לשיעור בודד. שניהם יכולים לחיות באותו אתר.

## אימות
לאחר בנייה, בדוק כל סוג schema ב-Google Rich Results Test ו-Schema Markup Validator.
ודא שאין שגיאות חוסמות לפני פרסום.
