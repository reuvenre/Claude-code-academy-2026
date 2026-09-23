import type { InferPageType } from 'fumadocs-core/source';
import { DocsBody, DocsPage, DocsTitle, MarkdownCopyButton } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { getReadingMinutes } from '@/lib/reading-time';
import type { source } from '@/lib/source';
import { CanDo } from './can-do';
import { FAQ } from './faq';
import { LastVerified, LevelBadge, ReadingTime, SourceBadge } from './badges';
import { MarkComplete } from './mark-complete';
import { Quiz } from './quiz';

type LessonSource = typeof source;
type LessonPageData = InferPageType<LessonSource>;

// תבנית שיעור: המסגרת (H1, badges, שו"ת, CanDo, Quiz, LastVerified) נבנית מה-frontmatter.
// גוף ה-MDX מכיל תוכן בלבד — ראה templates/frontmatter.schema.md
export async function LessonPage({
  page,
  source,
  markdownUrl,
}: {
  page: LessonPageData;
  source: LessonSource;
  markdownUrl?: string;
}) {
  const data = page.data;
  const MDX = data.body;
  const minutes = getReadingMinutes(await data.getText('processed'));
  // מזהה יציב להתקדמות: ה-URL של השיעור
  const lessonId = page.url;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <div className="flex flex-wrap items-center gap-2 border-b pb-6">
        <LevelBadge level={data.level} />
        <ReadingTime minutes={minutes} />
        <SourceBadge href={data.source} />
        {markdownUrl && <MarkdownCopyButton markdownUrl={markdownUrl} />}
      </div>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
        {data.faq && <FAQ items={data.faq} />}
        {data.canDo && (
          <CanDo action={<MarkComplete lessonId={lessonId} />}>{data.canDo}</CanDo>
        )}
        {data.quiz && <Quiz items={data.quiz} lessonId={lessonId} />}
        <LastVerified date={data.lastVerified} />
      </DocsBody>
    </DocsPage>
  );
}
