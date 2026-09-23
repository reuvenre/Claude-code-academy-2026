import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { curriculum } from '@/lib/curriculum';
import { levelInfo, levels } from '@/lib/levels';
import { getLevelLessons, getReferencePages } from '@/lib/navigation';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';
import { absoluteUrl, site } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: { absolute: 'אודות Claude Code Academy IL: מה האתר ואיך הוא מאומת' },
  description:
    'Claude Code Academy IL הוא אתר לימוד עצמאי בעברית ל-Claude Code. מה מכוסה, איך כל עובדה נבדקת מול התיעוד הרשמי, ומה הקשר (אין) ל-Anthropic.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const lessons = levels.flatMap((level) => getLevelLessons(level));
  const reference = getReferencePages();
  const total = levels.reduce((sum, level) => sum + curriculum[level].length, 0);
  // תאריך האימות האחרון מתוך ה-frontmatter של כל התוכן
  const lastVerified = [...lessons, ...reference]
    .map((page) => page.data.lastVerified)
    .sort()
    .at(-1);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'אודות Claude Code Academy IL',
      url: absoluteUrl('/about'),
      inLanguage: site.language,
      about: { '@type': 'Organization', name: site.name, url: site.url },
      ...(lastVerified ? { dateModified: lastVerified } : {}),
    },
    breadcrumbJsonLd([{ name: 'אודות' }]),
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-extrabold md:text-4xl">אודות {site.name}</h1>
      {/* תשובה-קודם */}
      <p className="mt-4 text-lg text-muted-foreground">
        {site.name} הוא אתר לימוד עצמאי בעברית ל-Claude Code, כלי הקוד האג׳נטי של Anthropic. הוא מלמד מאפס ועד
        עבודה עם סוכנים במקביל, וכל עובדה בו נבדקת מול התיעוד הרשמי. האתר אינו קשור ל-Anthropic.
      </p>

      <div className="prose-custom mt-10 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold">מה יש באתר?</h2>
          <ul className="mt-4 space-y-2">
            {levels.map((level) => (
              <li key={level} className="flex justify-between gap-4 border-b pb-2">
                <Link href={levelInfo[level].href} className="hover:text-brand">
                  {levelInfo[level].label}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {getLevelLessons(level).length} מתוך {curriculum[level].length} שיעורים
                </span>
              </li>
            ))}
            <li className="flex justify-between gap-4 border-b pb-2">
              <Link href="/reference" className="hover:text-brand">
                מרכז הרפרנס
              </Link>
              <span className="text-sm text-muted-foreground">{reference.length} עמודים</span>
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            סך הכול {lessons.length} שיעורים זמינים מתוך {total} בסילבוס.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">איך מוודאים שהמידע נכון?</h2>
          <ol className="mt-4 list-decimal space-y-2 ps-6">
            <li>כל שיעור נכתב מתוך דף רשמי אחד או יותר ב-code.claude.com/docs, שמופיע בראש השיעור כ&quot;מקור רשמי&quot;.</li>
            <li>עובדה שלא מופיעה במקור הרשמי לא נכנסת לשיעור. לא ממציאים פקודות, דגלים או שמות פיצ׳רים.</li>
            <li>כל שיעור עובר בדיקה נוספת, טענה אחר טענה, מול המקור, לפני שהוא מתפרסם.</li>
            <li>בתחתית כל שיעור מופיע התאריך שבו הוא אומת לאחרונה מול התיעוד.</li>
            <li>שמות ומספרי מודלים מתחלפים לעיתים קרובות, ולכן האתר מפנה לדף בחירת המודל הרשמי במקום לציין אותם.</li>
          </ol>
          {lastVerified && (
            <p className="mt-3 text-sm text-muted-foreground">
              אימות אחרון של תוכן באתר: <time dateTime={lastVerified}>{lastVerified}</time>
            </p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold">מה הקשר ל-Anthropic?</h2>
          <p className="mt-4">
            אין קשר רשמי. {site.name} הוא אתר עצמאי. Claude Code ו-Claude הם מוצרים של Anthropic, והמקורות הרשמיים
            הם{' '}
            <a href="https://code.claude.com/docs" rel="noopener" className="text-brand underline underline-offset-2">
              התיעוד של Claude Code
            </a>{' '}
            ו-
            <a href="https://academy.claude.com" rel="noopener" className="text-brand underline underline-offset-2">
              Claude Academy
            </a>
            . כשיש סתירה בין האתר לבין התיעוד הרשמי, התיעוד הרשמי קובע.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">איך הקורס בנוי?</h2>
          <p className="mt-4">
            כל שיעור נפתח בתשובה קצרה לשאלת העמוד, ממשיך בצעדים ובדוגמאות מהתיעוד, ונסגר ב&quot;עכשיו אתה יכול…&quot; ובשאלות
            נפוצות. בסוף כל רמה יש מבחן קצר. ההתקדמות נשמרת בדפדפן שלך בלבד, בלי הרשמה.
          </p>
          <p className="mt-3">
            לא בטוחים מאיפה להתחיל?{' '}
            <Link href="/start" className="text-brand underline underline-offset-2">
              אבחון רמה בשלוש שאלות
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
