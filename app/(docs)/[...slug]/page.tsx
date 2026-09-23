import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LevelHub } from '@/components/hub/level-hub';
import { LessonPage } from '@/components/lesson/lesson-page';
import { isLevel, levelInfo, levels } from '@/lib/levels';
import { isLevelLive } from '@/lib/navigation';
import { getPageMarkdownUrl } from '@/lib/shared';
import { createLessonMetadata } from '@/lib/seo/metadata';

// /<level> → עמוד שער של רמה · /<level>/<slug> → שיעור
function getHubLevel(slug: string[]) {
  return slug.length === 1 && isLevel(slug[0]) ? slug[0] : undefined;
}

export default async function Page(props: PageProps<'/[...slug]'>) {
  const { slug } = await props.params;

  const hubLevel = getHubLevel(slug);
  if (hubLevel) return <LevelHub level={hubLevel} />;

  const page = source.getPage(slug);
  if (!page) notFound();

  return <LessonPage page={page} source={source} markdownUrl={getPageMarkdownUrl(page).url} />;
}

export async function generateStaticParams() {
  return [...levels.map((level) => ({ slug: [level] })), ...source.generateParams()];
}

export async function generateMetadata(props: PageProps<'/[...slug]'>): Promise<Metadata> {
  const { slug } = await props.params;

  const hubLevel = getHubLevel(slug);
  if (hubLevel) {
    const info = levelInfo[hubLevel];
    return {
      title: `${info.label} — קורס Claude Code בעברית`,
      description: info.description,
      alternates: { canonical: info.href },
      // רמה בלי שיעורים שפורסמו היא רק סילבוס — לא לאינדוקס עד שיהיה בה תוכן
      robots: isLevelLive(hubLevel) ? undefined : { index: false, follow: true },
    };
  }

  const page = source.getPage(slug);
  if (!page) notFound();

  return createLessonMetadata(page);
}
