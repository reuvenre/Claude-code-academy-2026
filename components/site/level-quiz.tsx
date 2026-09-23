'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '@/lib/cn';

export interface DiagnosisQuestion {
  q: string;
  options: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  text: string;
  href: string;
}

// כל השאלות וההמלצות מרונדרות בשרת. הצד-לקוח רק בוחר איזו המלצה להדגיש.
export function LevelQuiz({
  questions,
  recommendations,
}: {
  questions: DiagnosisQuestion[];
  recommendations: Recommendation[];
}) {
  const baseId = useId();
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => questions.map(() => undefined));
  const done = answers.every((a) => a !== undefined);

  // לוגיקת ההמלצה: קודם ניסיון עם Claude Code, ואז המטרה
  function pick(): string {
    const [terminal, experience, goal] = answers as number[];
    if (experience === 0) return terminal === 0 ? 'terminal' : 'beginner';
    if (experience === 1) return 'beginner-plus';
    return ['beginner-plus', 'beginner-plus', 'advanced', 'pro'][goal] ?? 'beginner-plus';
  }
  const chosen = done ? pick() : undefined;

  return (
    <div className="space-y-8">
      <ol className="space-y-6">
        {questions.map((question, qi) => (
          <li key={question.q}>
            <fieldset className="rounded-2xl border bg-card/60 p-5">
              <legend className="px-1 font-semibold">
                {qi + 1}. {question.q}
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.options.map((option, oi) => (
                  <label
                    key={option}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors hover:border-brand/50',
                      answers[qi] === oi && 'border-brand bg-brand/10',
                    )}
                  >
                    <input
                      type="radio"
                      name={`${baseId}-q${qi}`}
                      checked={answers[qi] === oi}
                      onChange={() => setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <section aria-labelledby={`${baseId}-rec`} aria-live="polite">
        <h2 id={`${baseId}-rec`} className="text-xl font-bold">
          {done ? 'ההמלצה שלנו' : 'איפה כדאי להתחיל, לפי התשובות'}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {recommendations.map((rec) => (
            <li key={rec.id}>
              <Link
                href={rec.href}
                className={cn(
                  'group flex h-full flex-col gap-1 rounded-2xl border bg-card/60 p-4 transition-all hover:border-brand/60',
                  chosen === rec.id && 'border-brand-gradient shadow-lg shadow-brand/20',
                  chosen && chosen !== rec.id && 'opacity-50',
                )}
              >
                <span className="flex items-center justify-between font-semibold">
                  {rec.title}
                  <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" />
                </span>
                <span className="text-sm text-muted-foreground">{rec.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
