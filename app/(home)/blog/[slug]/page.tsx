import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostPage } from '@/components/posts/post-page';
import { blogSource } from '@/lib/source';
import { site } from '@/lib/seo/site';

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  return <PostPage page={page} source={blogSource} />;
}

export async function generateStaticParams() {
  return blogSource.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
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
