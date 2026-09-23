import type { Metadata } from 'next';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  BookMarked,
  Brain,
  Building2,
  Layers,
  Network,
  Puzzle,
  ShieldCheck,
  Sprout,
  SquareTerminal,
  Target,
  Workflow,
} from 'lucide-react';
import { curriculum } from '@/lib/curriculum';
import { levelInfo, levels, type Level } from '@/lib/levels';
import { getLevelLessons } from '@/lib/navigation';

export const metadata: Metadata = {
  title: { absolute: 'לומדים Claude Code בעברית: קורס מלא מאפס ועד מקצוענים' },
  description:
    'קורס Claude Code בעברית, מאפס למאה: התקנה, עבודה יומיומית, Skills, Hooks, MCP וסוכנים במקביל. כל שיעור מאומת מול התיעוד הרשמי של Anthropic.',
  alternates: { canonical: '/' },
};

const levelIcons: Record<Level, LucideIcon> = {
  beginner: Sprout,
  'beginner-plus': Workflow,
  advanced: Puzzle,
  pro: Network,
  'product-family': Layers,
  fluency: Brain,
  enterprise: Building2,
};

const coreLevels = levels.filter((level) => levelInfo[level].track === 'core');
const sideLevels = levels.filter((level) => levelInfo[level].track === 'side');
const totalLessons = levels.reduce((sum, level) => sum + curriculum[level].length, 0);

// פקודות אמיתיות מהשיעורים (מאומתות מול התיעוד הרשמי)
const terminalLines: { prompt: '$' | '>'; code: string; label: string }[] = [
  { prompt: '$', code: 'curl -fsSL https://claude.ai/install.sh | bash', label: 'התקנה' },
  { prompt: '$', code: 'claude', label: 'פותחים סשן' },
  { prompt: '>', code: '/init', label: 'CLAUDE.md לפרויקט' },
  { prompt: '>', code: 'what does this project do?', label: 'השאלה הראשונה' },
];

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: 'מאומת מול המקור',
    text: 'כל עובדה נבדקת מול התיעוד הרשמי. בכל שיעור יש קישור למקור ותאריך אימות.',
  },
  {
    icon: SquareTerminal,
    title: 'לומדים בעשייה',
    text: 'פקודות אמיתיות להעתקה, דוגמאות מהתיעוד וצעדים קצרים שאפשר לבצע מיד.',
  },
  {
    icon: Target,
    title: 'יודעים מה הרווחתם',
    text: 'כל שיעור נסגר ב"עכשיו אתה יכול…", וכל רמה נסגרת במבחן קצר.',
  },
];

function LevelCard({ level, step }: { level: Level; step?: number }) {
  const info = levelInfo[level];
  const Icon = levelIcons[level];
  const total = curriculum[level].length;
  const available = getLevelLessons(level).length;

  return (
    <li className="relative">
      <Link
        href={info.href}
        className="group relative flex h-full flex-col gap-3 rounded-2xl border bg-card/80 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-[0_0_0_1px_var(--brand),0_12px_40px_-12px_var(--brand)]"
      >
        <span className="flex items-center justify-between gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-brand/20">
            <Icon aria-hidden className="size-5" />
          </span>
          {step !== undefined && (
            <span className="font-mono text-xs text-muted-foreground" dir="ltr">
              0{step}
            </span>
          )}
        </span>
        <span className="text-lg font-bold">{info.label}</span>
        <span className="flex-1 text-sm leading-relaxed text-muted-foreground">{info.description}</span>
        <span className="flex items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
          <span>{available > 0 ? `${available} מתוך ${total} שיעורים זמינים` : `${total} שיעורים · בקרוב`}</span>
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform group-hover:-translate-x-1 group-hover:text-brand"
          />
        </span>
      </Link>
    </li>
  );
}

export default function HomePage() {
  const availableTotal = levels.reduce((sum, level) => sum + getLevelLessons(level).length, 0);

  return (
    // הרקע (רשת + זוהר) משותף לכל האתר: components/site/site-background.tsx
    <div className="relative w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-14 md:pt-24">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-brand-2 shadow-[0_0_8px_var(--brand-2)]" />
              קורס בעברית · {totalLessons} שיעורים · מאומת מול התיעוד הרשמי
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] md:text-6xl">
              לומדים <span className="text-brand-gradient whitespace-nowrap" dir="ltr">Claude Code</span>
              <br />
              בעברית, מאפס ועד מקצוענים
            </h1>
            {/* תשובה-קודם: מה האתר ולמי */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              מסלול לימוד מסודר ל-Claude Code של Anthropic: מהתקנה והסשן הראשון, דרך עבודה יומיומית נכונה, ועד
              הרחבות, אוטומציה וסוכנים במקביל. כל שיעור מאומת מול התיעוד הרשמי ומציין את המקור.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/beginner"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5"
              >
                מתחילים מרמה 0
                <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/reference"
                className="inline-flex items-center gap-2 rounded-xl border bg-card/60 px-6 py-3 font-semibold backdrop-blur transition-colors hover:border-brand/50"
              >
                <BookMarked aria-hidden className="size-4" />
                מרכז הרפרנס
              </Link>
            </div>
          </div>

          {/* כרטיס טרמינל: פקודות אמיתיות מהשיעורים הראשונים */}
          <figure className="rounded-2xl border-brand-gradient p-px shadow-2xl shadow-brand/10">
            <div className="overflow-hidden rounded-2xl bg-[#0d0f13] text-[#e6e9ef]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3" dir="ltr">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
                <span className="ms-3 font-mono text-xs text-white/40">~/your-project</span>
              </div>
              <ol className="space-y-3 p-5 font-mono text-sm">
                {terminalLines.map((line) => (
                  <li key={line.code} className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-[#7dd3fc]/70" dir="rtl">
                      {line.label}
                    </span>
                    <span dir="ltr" className="flex gap-2 overflow-x-auto whitespace-nowrap">
                      <span className="select-none text-[#00e5ff]">{line.prompt}</span>
                      <span>{line.code}</span>
                    </span>
                  </li>
                ))}
                <li dir="ltr" className="flex items-center gap-2">
                  <span className="select-none text-[#00e5ff]">&gt;</span>
                  <span className="h-4 w-2 animate-pulse bg-[#00e5ff]/80" />
                </li>
              </ol>
            </div>
            <figcaption className="sr-only">הפקודות הראשונות שלומדים ברמה 0</figcaption>
          </figure>
        </section>

        <section aria-label="מה מיוחד בקורס" className="mt-20 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-card/60 p-5 backdrop-blur">
              <Icon aria-hidden className="size-5 text-brand" />
              <h2 className="mt-3 font-bold">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="path" className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="path" className="text-3xl font-bold">
                מסלול הלמידה
              </h2>
              <p className="mt-2 text-muted-foreground">
                ארבע רמות לפי הסדר. כבר מכירים את הבסיס? אפשר לקפוץ ישר לרמה שמתאימה לכם.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-mono text-brand">{availableTotal}</span> מתוך{' '}
              <span className="font-mono">{totalLessons}</span> שיעורים כבר זמינים
            </p>
          </div>
          <div className="relative mt-8">
            {/* קו המסלול שמחבר בין הרמות */}
            <div
              aria-hidden
              className="absolute inset-x-6 top-10 hidden h-px bg-gradient-to-l from-brand via-brand-2 to-transparent lg:block"
            />
            <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {coreLevels.map((level, i) => (
                <LevelCard key={level} level={level} step={i} />
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="tracks" className="mt-16">
          <h2 id="tracks" className="text-2xl font-bold">
            מסלולים משלימים
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {sideLevels.map((level) => (
              <LevelCard key={level} level={level} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
