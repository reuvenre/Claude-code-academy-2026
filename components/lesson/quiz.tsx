'use client';

import { useId, useState } from 'react';
import type { QuizItem } from '@/lib/lesson-schema';
import { progressStore } from '@/lib/progress/progressStore';
import { cn } from '@/lib/cn';

// הרכיב מרונדר ב-SSR: כל השאלות והאפשרויות נמצאות ב-HTML. הצד-לקוח אחראי רק על הבדיקה והשמירה.
export function Quiz({ items, lessonId }: { items: QuizItem[]; lessonId: string }) {
  const baseId = useId();
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => items.map(() => undefined));
  const [checked, setChecked] = useState(false);

  const score = items.reduce((sum, item, i) => sum + (answers[i] === item.answer ? 1 : 0), 0);
  const allAnswered = answers.every((a) => a !== undefined);

  async function check() {
    setChecked(true);
    await progressStore.saveQuizResult(lessonId, score, items.length);
  }

  function reset() {
    setAnswers(items.map(() => undefined));
    setChecked(false);
  }

  return (
    <section aria-labelledby={`${baseId}-title`} className="not-prose mt-12 rounded-lg border p-5">
      <h2 id={`${baseId}-title`} className="text-xl font-semibold">
        מבחן קצר לסיום הרמה
      </h2>
      <ol className="mt-4 space-y-6">
        {items.map((item, qi) => (
          <li key={item.q}>
            <fieldset>
              <legend className="font-medium">
                {qi + 1}. {item.q}
              </legend>
              <div className="mt-2 space-y-1.5">
                {item.options.map((option, oi) => {
                  const isCorrect = oi === item.answer;
                  const isChosen = answers[qi] === oi;
                  return (
                    <label
                      key={option}
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm',
                        checked && isCorrect && 'border-emerald-500/60 bg-emerald-500/10',
                        checked && isChosen && !isCorrect && 'border-red-500/60 bg-red-500/10',
                      )}
                    >
                      <input
                        type="radio"
                        name={`${baseId}-q${qi}`}
                        value={oi}
                        checked={isChosen}
                        disabled={checked}
                        onChange={() =>
                          setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))
                        }
                      />
                      {/* dir=auto: אפשרות שהיא פקודה (לטינית) מוצגת LTR ולא מתהפכת */}
                      <span dir="auto">{option}</span>
                      {checked && isCorrect && <span className="ms-auto text-xs">תשובה נכונה</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center gap-3" aria-live="polite">
        {checked ? (
          <>
            <p className="font-medium">
              ענית נכון על {score} מתוך {items.length}.
            </p>
            <button
              type="button"
              onClick={reset}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
            >
              נסה שוב
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={check}
            disabled={!allAnswered}
            className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50"
          >
            בדוק תשובות
          </button>
        )}
      </div>
    </section>
  );
}
