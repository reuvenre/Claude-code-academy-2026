import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReferencePage } from '@/components/reference/reference-page';
import { referenceSource } from '@/lib/source';
import { site } from '@/lib/seo/site';

export default async function Page(props: PageProps<'/reference/[slug]'>) {
  const { slug } = await props.params;
  const page = referenceSource.getPage([slug]);
  if (!page) notFound();

  return <ReferencePage page={page} source={referenceSource} />;
}

export async function generateStaticParams() {
  return referenceSource.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(props: PageProps<'/reference/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const page = referenceSource.getPage([slug]);
  if (!page) notFound();

  const { title, description, keywords, lastVerified } = page.data;
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
      modifiedTime: lastVerified,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
