import { Clock } from 'lucide-react';
import Link from 'next/link';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { JsonLd } from '@/components/seo/json-ld';
import { levelInfo, levels, type Level } from '@/lib/levels';
import { getHubEntries } from '@/lib/navigation';
import { breadcrumbJsonLd, courseJsonLd } from '@/lib/seo/jsonld';
import { LessonStatus } from './lesson-status';

// עמוד שער לרמה: תיאור, מה תדע בסוף, והסילבוס המלא (שיעורים זמינים + מתוכננים)
export async function LevelHub({ level }: { level: Level }) {
  const info = levelInfo[level];
  const entries = await getHubEntries(level);
  const available = entries.filter((entry) => entry.url).length;
  const next = levels[levels.indexOf(level) + 1];

  return (
    <DocsPage toc={[]} tableOfContent={{ enabled: false }}>
      <JsonLd
        data={[
          courseJsonLd({ level, description: info.description, teaches: info.teaches }),
          breadcrumbJsonLd([{ name: info.label }]),
        ]}
      />
      <DocsTitle>{info.label}</DocsTitle>
      <DocsBody>
        <p className="text-lg">{info.description}</p>
        <p>
          <strong>בסוף הרמה תוכל:</strong> {info.teaches}
        </p>

        <h2>השיעורים ברמה</h2>
        <p className="text-sm text-muted-foreground">
          {available} מתוך {entries.length} שיעורים זמינים
        </p>
        <ol className="not-prose mt-4 divide-y rounded-lg border">
          {entries.map((entry) => (
            <li key={entry.slug} className="flex gap-4 p-4">
              <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
                {entry.n ?? '•'}
              </span>
              <div className="min-w-0 flex-1">
                {entry.url ? (
                  <Link href={entry.url} className="font-medium hover:underline">
                    {entry.title}
                  </Link>
                ) : (
                  <span className="font-medium text-muted-foreground">{entry.title}</span>
                )}
                {entry.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground">
                {entry.url ? (
                  <>
                    {entry.minutes && (
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden className="size-3.5" />
                        {entry.minutes === 1 ? 'דקה' : `${entry.minutes} דק׳`}
                      </span>
                    )}
                    <LessonStatus lessonId={entry.url} />
                  </>
                ) : (
                  <span className="rounded-full border px-2 py-0.5">בקרוב</span>
                )}
              </div>
            </li>
          ))}
        </ol>

        {next && (
          <p className="mt-8">
            הרמה הבאה: <Link href={levelInfo[next].href}>{levelInfo[next].label}</Link>
          </p>
        )}
      </DocsBody>
    </DocsPage>
  );
}
