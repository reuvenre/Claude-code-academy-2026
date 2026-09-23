import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { levels } from '@/lib/levels';
import { docsContentRoute } from '@/lib/shared';

// גרסת Markdown של שיעור לקוראי AI:
//   /<level>/<slug>.md                      → תמיד Markdown
//   /<level>/<slug> + Accept: text/markdown → Markdown (עם Vary: Accept)
// השיעורים יושבים בשורש, ולכן הכללים מוגבלים לתחיליות הרמות. /<level> עצמו הוא עמוד שער (HTML בלבד).
const rules = levels.map((level) => ({
  suffix: rewritePath(`/${level}/*path.md`, `${docsContentRoute}/${level}{/*path}/content.md`),
  negotiated: rewritePath(`/${level}/*path`, `${docsContentRoute}/${level}{/*path}/content.md`),
}));

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const rule of rules) {
    const result = rule.suffix.rewrite(pathname);
    if (result) return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    for (const rule of rules) {
      const result = rule.negotiated.rewrite(pathname);
      if (result) {
        return NextResponse.rewrite(new URL(result, request.nextUrl), {
          // לאותו URL יש שתי גרסאות, לפי Accept
          headers: { Vary: 'Accept' },
        });
      }
    }
  }

  return NextResponse.next();
}

// Next דורש matcher סטטי (literal), ולכן הרשימה משוכפלת מ-lib/levels.ts — לעדכן את שניהם יחד
export const config = {
  matcher: [
    '/beginner/:path*',
    '/beginner-plus/:path*',
    '/advanced/:path*',
    '/pro/:path*',
    '/product-family/:path*',
    '/fluency/:path*',
    '/enterprise/:path*',
  ],
};
