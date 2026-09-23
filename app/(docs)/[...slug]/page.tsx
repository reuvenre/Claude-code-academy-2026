import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LessonPage } from '@/components/lesson/lesson-page';
import { getPageImageUrl, getPageMarkdownUrl } from '@/lib/shared';

// שיעור עם draft: true מוסתר בפרודקשן
const hideDrafts = process.env.NODE_ENV === 'production';

function getLesson(slug: string[]) {
  const page = source.getPage(slug);
  if (!page || (hideDrafts && page.data.draft)) return undefined;
  return page;
}

export default async function Page(props: PageProps<'/[...slug]'>) {
  const params = await props.params;
  const page = getLesson(params.slug);
  if (!page) notFound();

  return <LessonPage page={page} source={source} markdownUrl={getPageMarkdownUrl(page).url} />;
}

export async function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => !(hideDrafts && page.data.draft))
    .map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: PageProps<'/[...slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = getLesson(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    keywords: page.data.keywords,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
