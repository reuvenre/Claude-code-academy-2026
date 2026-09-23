import { buildLlmsIndex } from '@/lib/seo/llms';

export const revalidate = false;

export async function GET() {
  return new Response(buildLlmsIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
