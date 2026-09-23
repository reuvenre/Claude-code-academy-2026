import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { curriculum } from '@/lib/curriculum';
import { levelInfo, levels, type Level } from '@/lib/levels';
import { getLevelLessons } from '@/lib/navigation';

export const metadata: Metadata = {
  title: { absolute: 'לומדים Claude Code בעברית: קורס מלא מאפס ועד מקצוענים' },
  description:
    'קורס Claude Code בעברית, מאפס למאה: התקנה, עבודה יומיומית, Skills, Hooks, MCP וסוכנים במקביל. כל שיעור מאומת מול התיעוד הרשמי של Anthropic.',
  alternates: { canonical: '/' },
};

const coreLevels = levels.filter((level) => levelInfo[level].track === 'core');
const sideLevels = levels.filter((level) => levelInfo[level].track === 'side');

function LevelCard({ level, step }: { level: Level; step?: number }) {
  const info = levelInfo[level];
  const total = curriculum[level].length;
  const available = getLevelLessons(level).length;

  return (
    <li>
      <Link
        href={info.href}
        className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-muted/40"
      >
        <span className="flex items-center justify-between gap-2">
          <span className="font-semibold">{info.label}</span>
          <ArrowLeft
            aria-hidden
            className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1"
          />
        </span>
        <span className="flex-1 text-sm text-muted-foreground">{info.description}</span>
        <span className="text-xs text-muted-foreground">
          {step !== undefined && `שלב ${step} · `}
          {available > 0 ? `${available} מתוך ${total} שיעורים זמינים` : `${total} שיעורים · בקרוב`}
        </span>
      </Link>
    </li>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:py-20">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">
          לומדים Claude Code בעברית, מאפס ועד מקצוענים
        </h1>
        {/* תשובה-קודם: מה האתר ולמי */}
        <p className="mt-5 text-lg text-muted-foreground">
          מסלול לימוד מסודר ל-Claude Code של Anthropic: מהתקנה והסשן הראשון, דרך עבודה יומיומית נכונה, ועד
          הרחבות, אוטומציה וסוכנים במקביל. כל שיעור מאומת מול התיעוד הרשמי ומציין את המקור.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/beginner"
            className="rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
          >
            מתחילים מרמה 0
          </Link>
          <Link href="/reference" className="rounded-lg border px-5 py-2.5 font-medium hover:bg-muted">
            <BookMarked aria-hidden className="me-2 inline size-4" />
            מרכז הרפרנס
          </Link>
        </div>
      </section>

      <section aria-labelledby="path" className="mt-16">
        <h2 id="path" className="text-2xl font-semibold">
          מסלול הלמידה
        </h2>
        <p className="mt-2 text-muted-foreground">
          ארבע רמות לפי הסדר. כבר מכירים את הבסיס? אפשר לקפוץ ישר לרמה שמתאימה לכם.
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreLevels.map((level, i) => (
            <LevelCard key={level} level={level} step={i} />
          ))}
        </ol>
      </section>

      <section aria-labelledby="tracks" className="mt-14">
        <h2 id="tracks" className="text-2xl font-semibold">
          מסלולים משלימים
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {sideLevels.map((level) => (
            <LevelCard key={level} level={level} />
          ))}
        </ul>
      </section>
    </div>
  );
}
