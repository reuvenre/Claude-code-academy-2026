import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'takumi-js/response';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { levelInfo } from '@/lib/levels';
import { getPageImageUrl } from '@/lib/shared';
import { site } from '@/lib/seo/site';

export const revalidate = false;

// next/og (Satori) לא תומך ב-RTL ומהפך אותיות עבריות, ולכן Takumi עם Heebo מקומי
const fontDir = join(process.cwd(), 'node_modules/@fontsource/heebo/files');
const fontsPromise = Promise.all(
  (['hebrew', 'latin'] as const).flatMap((subset) =>
    ([400, 700] as const).map(async (weight) => ({
      name: 'Heebo',
      weight,
      data: await readFile(join(fontDir, `heebo-${subset}-${weight}-normal.woff2`)),
    })),
  ),
);

export async function GET(_req: Request, { params }: RouteContext<'/og/lessons/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <div
      lang="he"
      style={{
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 72,
        fontFamily: 'Heebo',
        color: '#fafafa',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontSize: 28, color: '#a3a3a3', margin: 0 }}>
          {levelInfo[page.data.level].label}
        </p>
        <p style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
          {page.data.title}
        </p>
      </div>
      <p style={{ fontSize: 30, color: '#d4d4d4', margin: 0 }}>{site.name}</p>
    </div>,
    { width: 1200, height: 630, format: 'png', fonts: await fontsPromise },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImageUrl(page).segments,
  }));
}
