import { demoSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LessonPage } from '@/components/lesson/lesson-page';

// עמוד דמו פנימי לרכיבי השיעור — לא לאינדוקס
export default async function Page(props: PageProps<'/demo/[...slug]'>) {
  const params = await props.params;
  const page = demoSource.getPage(params.slug);
  if (!page) notFound();

  return <LessonPage page={page} source={demoSource} />;
}

export async function generateStaticParams() {
  return demoSource.generateParams();
}

export async function generateMetadata(props: PageProps<'/demo/[...slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = demoSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    robots: { index: false, follow: false },
  };
}
