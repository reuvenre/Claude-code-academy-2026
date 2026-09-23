import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ } from '@/components/lesson/faq';
import { JsonLd } from '@/components/seo/json-ld';
import type { FaqItem } from '@/lib/lesson-schema';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: { absolute: 'שאלות נפוצות על Claude Code Academy IL ועל הקורס בעברית' },
  description:
    'תשובות קצרות על האתר: האם הוא רשמי, איך המידע מאומת, מאיפה להתחיל, איפה נשמרת ההתקדמות, ומה ההבדל בין השיעורים למרכז הרפרנס של Claude Code.',
  alternates: { canonical: '/faq' },
};

// שאלות על האתר עצמו. שאלות על Claude Code נמצאות בשו"ת של כל שיעור.
const items: FaqItem[] = [
  {
    q: 'האם זה האתר הרשמי של Claude Code?',
    a: 'לא. Claude Code Academy IL הוא אתר לימוד עצמאי בעברית שאינו קשור ל-Anthropic. התיעוד הרשמי נמצא ב-code.claude.com/docs, והקורסים הרשמיים ב-Claude Academy בכתובת academy.claude.com.',
  },
  {
    q: 'איך אתם מוודאים שהמידע באתר נכון?',
    a: 'כל שיעור נכתב מתוך דף רשמי בתיעוד של Claude Code, שמופיע בראש השיעור כמקור. כל טענה נבדקת מול המקור לפני פרסום, ובתחתית השיעור מופיע תאריך האימות האחרון. כשיש סתירה, התיעוד הרשמי קובע.',
  },
  {
    q: 'מאיפה כדאי להתחיל?',
    a: 'מי שלא עבד עם Claude Code מתחיל ברמה 0. מי שכבר עובד איתו יכול לקפוץ לרמה שמתאימה לו. עמוד האבחון באתר ממליץ על נקודת התחלה אחרי שלוש שאלות קצרות.',
  },
  {
    q: 'צריך להירשם כדי ללמוד באתר?',
    a: 'לא. כל התוכן פתוח לקריאה בלי הרשמה. ההתקדמות שלך, כמו שיעורים שסימנת כהושלמו ותוצאות מבחנים, נשמרת בדפדפן שלך בלבד.',
  },
  {
    q: 'מה ההבדל בין השיעורים למרכז הרפרנס?',
    a: 'השיעורים מסבירים איך ולמה, צעד אחרי צעד. מרכז הרפרנס מרכז טבלאות קצרות לסריקה מהירה: פקודות, דגלים, משתני סביבה והגדרות, כל עמוד עם קישור למקור הרשמי.',
  },
  {
    q: 'למה האתר לא מציין שמות של מודלים?',
    a: 'שמות ומספרי מודלים מתחלפים לעיתים קרובות. כדי שהמידע לא יתיישן, השיעורים מפנים לפקודה /model ולדף בחירת המודל בתיעוד הרשמי.',
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <JsonLd data={[faqPageJsonLd(items), breadcrumbJsonLd([{ name: 'שאלות נפוצות' }])]} />
      <h1 className="text-3xl font-extrabold md:text-4xl">שאלות נפוצות</h1>
      {/* תשובה-קודם */}
      <p className="mt-4 text-lg text-muted-foreground">
        תשובות קצרות על האתר ועל הקורס. שאלות על Claude Code עצמו מופיעות בסוף כל שיעור, ומילון המונחים נמצא ב
        <Link href="/reference/glossary" className="text-brand underline underline-offset-2">
          מרכז הרפרנס
        </Link>
        .
      </p>
      <FAQ items={items} />
    </div>
  );
}
