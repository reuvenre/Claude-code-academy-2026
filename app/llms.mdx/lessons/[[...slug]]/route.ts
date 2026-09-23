import { source } from '@/lib/source';
import { getPageMarkdownUrl } from '@/lib/shared';
import { renderLessonMarkdown } from '@/lib/seo/llms';
import { notFound } from 'next/navigation';

export const revalidate = false;

// גרסת Markdown של שיעור בודד (לקוראי AI). נגישה גם דרך /<level>/<slug>.md ו-Accept: text/markdown
export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/lessons/[[...slug]]'>) {
  const { slug } = await params;
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await renderLessonMarkdown(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageMarkdownUrl(page).segments,
  }));
}
