import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { LevelQuiz, type DiagnosisQuestion, type Recommendation } from '@/components/site/level-quiz';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: { absolute: 'מאיפה להתחיל ללמוד Claude Code? אבחון רמה בשלוש שאלות' },
  description:
    'שלוש שאלות קצרות על הניסיון שלך עם הטרמינל ועם Claude Code, והמטרה שלך. בסוף תקבל המלצה מאיזו רמה בקורס להתחיל: מאפס, עבודה יומיומית, הרחבות או סוכנים.',
  alternates: { canonical: '/start' },
};

const questions: DiagnosisQuestion[] = [
  {
    q: 'עבדת פעם בטרמינל (שורת פקודה)?',
    options: ['לא, אף פעם', 'כן, לפעמים או באופן קבוע'],
  },
  {
    q: 'כבר התקנת והרצת את Claude Code?',
    options: ['עוד לא', 'כן, ניסיתי קצת', 'כן, אני עובד איתו באופן קבוע'],
  },
  {
    q: 'מה הכי חשוב לך עכשיו?',
    options: [
      'להבין מה זה ולהתחיל',
      'לעבוד נכון ומהר ביום-יום',
      'להרחיב ולאוטמט: Skills,‏ Hooks,‏ MCP',
      'להריץ כמה סוכנים במקביל, בענן וב-CI',
    ],
  },
];

const recommendations: Recommendation[] = [
  {
    id: 'terminal',
    title: 'מתחילים מהטרמינל',
    text: 'רמה 0, שיעור 3: מה זה טרמינל, איך פותחים אותו ומה צריך לדעת כדי לעבוד בו.',
    href: '/beginner/terminal-basics',
  },
  {
    id: 'beginner',
    title: 'רמה 0 · מתחילים לחלוטין',
    text: 'מה זה Claude Code, התקנה, התחברות, הסשן הראשון והשינוי הראשון בקוד.',
    href: '/beginner',
  },
  {
    id: 'beginner-plus',
    title: 'רמה 1 · מתחילים פלוס',
    text: 'ה-workflow הנכון, CLAUDE.md, ניהול סשנים, מצבי הרשאות ועלויות.',
    href: '/beginner-plus',
  },
  {
    id: 'advanced',
    title: 'רמה 2 · מתקדמים',
    text: 'Skills,‏ Subagents,‏ Hooks,‏ MCP,‏ Plugins, הגדרות ואבטחה.',
    href: '/advanced',
  },
  {
    id: 'pro',
    title: 'רמה 3 · מקצוענים',
    text: 'סוכנים במקביל, worktrees, ענן, אוטומציה ו-CI/CD.',
    href: '/pro',
  },
];

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <JsonLd data={breadcrumbJsonLd([{ name: 'מאיפה להתחיל' }])} />
      <h1 className="text-3xl font-extrabold md:text-4xl">
        מאיפה להתחיל ללמוד <span className="text-brand-gradient whitespace-nowrap">Claude Code</span>?
      </h1>
      {/* תשובה-קודם */}
      <p className="mt-4 text-lg text-muted-foreground">
        ענה על שלוש שאלות קצרות, ונמליץ מאיזו רמה להתחיל. אין תשובות נכונות: כל רמה פתוחה, ואפשר לקפוץ
        קדימה או לחזור אחורה בכל רגע.
      </p>
      <div className="mt-10">
        <LevelQuiz questions={questions} recommendations={recommendations} />
      </div>
    </div>
  );
}
