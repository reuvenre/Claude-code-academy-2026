import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostPage } from '@/components/posts/post-page';
import { researchSource } from '@/lib/source';
import { site } from '@/lib/seo/site';

export default async function Page(props: PageProps<'/research/[slug]'>) {
  const { slug } = await props.params;
  const page = researchSource.getPage([slug]);
  if (!page) notFound();

  return <PostPage page={page} source={researchSource} />;
}

export async function generateStaticParams() {
  return researchSource.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(props: PageProps<'/research/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const page = researchSource.getPage([slug]);
  if (!page) notFound();

  const { title, description, keywords, date } = page.data;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      url: page.url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: date,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
