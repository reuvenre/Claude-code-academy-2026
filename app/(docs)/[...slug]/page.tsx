import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LessonPage } from '@/components/lesson/lesson-page';
import { getPageMarkdownUrl } from '@/lib/shared';
import { createLessonMetadata } from '@/lib/seo/metadata';

export default async function Page(props: PageProps<'/[...slug]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return <LessonPage page={page} source={source} markdownUrl={getPageMarkdownUrl(page).url} />;
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[...slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return createLessonMetadata(page);
}
