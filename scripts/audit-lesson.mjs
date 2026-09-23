// בדיקת שיעור מול /seo-audit ו-/rtl-check (.claude/commands), על ה-HTML המרונדר.
// שימוש: שרת רץ (npm run build && npx next start -p 3100), ואז:
//   node scripts/audit-lesson.mjs beginner/what-is-claude-code [level/slug ...]
// משתנה סביבה AUDIT_BASE משנה את כתובת השרת (ברירת מחדל http://localhost:3100).
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = process.env.AUDIT_BASE ?? 'http://localhost:3100';
const RED = '🔴';
const YELLOW = '🟡';
const OK = '✅';

const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

function frontmatter(src) {
  const block = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const get = (key) => block.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1];
  return { block, title: get('title'), description: get('description'), source: get('source'), lastVerified: get('lastVerified') };
}

// הפסקה הראשונה בגוף ה-MDX (אחרי frontmatter, imports והערות)
function answerFirst(src) {
  const body = src
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^import .*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  const para = body.split(/\r?\n\s*\r?\n/).map((p) => p.trim()).find((p) => p && !p.startsWith('<') && !p.startsWith('#'));
  return (para ?? '').replace(/`([^`]*)`/g, '$1').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '');
}

async function audit(path) {
  const findings = [];
  const add = (level, msg) => findings.push(`${level} ${msg}`);

  const src = await readFile(join('content/lessons', `${path}.mdx`), 'utf8');
  const fm = frontmatter(src);
  const res = await fetch(`${BASE}/${path}`);
  if (res.status !== 200) return [`${RED} העמוד החזיר ${res.status}`];
  const html = await res.text();

  // --- SEO / AEO ---
  const af = answerFirst(src);
  const afWords = words(af);
  add(afWords > 0 && afWords <= 50 ? OK : RED, `תשובה-קודם: ${afWords} מילים (≤50)`);

  const titleLen = [...(fm.title ?? '')].length;
  add(titleLen >= 50 && titleLen <= 60 ? OK : YELLOW, `title: ${titleLen} תווים (50-60)`);
  add(/\?/.test(fm.title ?? '') ? OK : YELLOW, 'title בנוסח שאלה');
  add((fm.title ?? '').includes('Claude Code') ? OK : RED, 'title כולל "Claude Code"');
  const descLen = [...(fm.description ?? '')].length;
  add(descLen >= 140 && descLen <= 160 ? OK : YELLOW, `description: ${descLen} תווים (140-160)`);
  for (const key of ['source', 'lastVerified']) add(fm[key] ? OK : RED, `frontmatter.${key}`);
  add(/^keywords:/m.test(fm.block) ? OK : RED, 'frontmatter.keywords');

  const h1 = html.match(/<h1[\s>]/g)?.length ?? 0;
  add(h1 === 1 ? OK : RED, `H1 יחיד (נמצאו ${h1})`);
  const headings = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const skip = headings.find((h, i) => i > 0 && h > headings[i - 1] + 1);
  add(skip ? RED : OK, skip ? `דילוג בהיררכיית כותרות (h${skip})` : 'היררכיית H2/H3 תקינה');

  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
    .flatMap((m) => [JSON.parse(m[1])].flat())
    .map((x) => x['@type']);
  for (const type of ['TechArticle', 'BreadcrumbList', 'FAQPage', 'Organization'])
    add(ld.includes(type) ? OK : RED, `JSON-LD ${type}`);
  // רק בלוק faq (בלי quiz): מ-"faq:" ועד המפתח הבא ברמה העליונה
  const faqBlock = fm.block.match(/^faq:\r?\n([\s\S]*?)(?=^\S|$(?![\s\S]))/m)?.[1] ?? '';
  const faqCount = (faqBlock.match(/^\s+- q:/gm) ?? []).length;
  add(faqCount >= 3 && faqCount <= 5 ? OK : YELLOW, `שו"ת: ${faqCount} שאלות (3-5)`);
  add(/עכשיו אתה יכול/.test(html) ? OK : RED, 'CanDo');

  add(fm.source && html.includes(`href="${fm.source}"`) ? OK : RED, 'SourceBadge מקשר למקור הרשמי');
  add(/^https:\/\/(code|platform|docs|support|academy)\.claude\.com\//.test(fm.source ?? '') ? OK : YELLOW, 'source הוא דף רשמי ספציפי');

  for (const [re, name] of [
    [/<html[^>]*lang="he"[^>]*dir="rtl"/, 'html lang=he dir=rtl'],
    [/<link rel="canonical"/, 'canonical'],
    [/property="og:title"/, 'Open Graph'],
    [/name="twitter:card"/, 'Twitter card'],
  ])
    add(re.test(html) ? OK : RED, name);

  // SSR: כל שאלות השו"ת נמצאות ב-HTML
  const faqQs = [...faqBlock.matchAll(/^\s+- q:\s*"(.*)"\s*$/gm)].map((m) => m[1]);
  // שאלות ה-Quiz חייבות להיות ב-HTML (הרכיב אינטראקטיבי, אבל הטקסט מרונדר בשרת)
  const quizBlock = fm.block.match(/^quiz:\r?\n([\s\S]*?)(?=^\S|$(?![\s\S]))/m)?.[1] ?? '';
  const quizQs = [...quizBlock.matchAll(/^\s+- q:\s*"(.*)"\s*$/gm)].map((m) => m[1]);
  const text = stripTags(html);
  const missing = faqQs.filter((q) => !text.includes(q));
  add(missing.length ? RED : OK, missing.length ? `שו"ת לא ב-HTML: ${missing.join(' | ')}` : 'שו"ת מרונדר ב-HTML (SSR)');
  if (quizQs.length) {
    const missingQuiz = quizQs.filter((q) => !text.includes(q));
    add(quizQs.length >= 5 && quizQs.length <= 8 ? OK : YELLOW, `Quiz: ${quizQs.length} שאלות (5-8)`);
    add(missingQuiz.length ? RED : OK, missingQuiz.length ? `שאלות Quiz לא ב-HTML: ${missingQuiz.join(' | ')}` : 'שאלות Quiz מרונדרות ב-HTML (SSR)');
  }

  // קישוריות פנימית: "הצעד הבא" + קישורים פנימיים תקינים
  // Fumadocs עוטף כותרות בקישור עוגן, ולכן בודקים את הטקסט של ה-h2 ולא את ה-markup
  const h2Texts = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => stripTags(m[1]));
  add(h2Texts.some((t) => t.includes('הצעד הבא')) ? OK : RED, 'סקשן "הצעד הבא"');
  const article = html.split('<article')[1]?.split('</article>')[0] ?? html;
  const internal = [...new Set([...article.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]))].filter(
    (href) => !href.startsWith('/llms.mdx') && href !== `/${path}`,
  );
  const lessonLinks = internal.filter((href) => href.split('/').filter(Boolean).length === 2);
  add(lessonLinks.length >= 2 ? OK : YELLOW, `קישורים לשיעורים אחרים: ${lessonLinks.length} (מומלץ ≥2)`);
  for (const href of internal) {
    const status = (await fetch(`${BASE}${href}`, { method: 'HEAD' })).status;
    if (status !== 200) add(RED, `קישור פנימי שבור: ${href} (${status})`);
  }

  // --- RTL ---
  const physical = src.match(/\b(ml|mr|pl|pr|left|right)-\d|text-(left|right)|margin-(left|right)|padding-(left|right)/g);
  add(physical ? RED : OK, physical ? `מאפיינים פיזיים ב-MDX: ${physical.join(', ')}` : 'אין מאפייני כיוון פיזיים ב-MDX');
  const rawDir = src.match(/dir="rtl"/g);
  add(rawDir ? YELLOW : OK, rawDir ? 'dir="rtl" מיותר בתוך MDX' : 'אין dir מיותר ב-MDX');
  add(/<pre[^>]*>/.test(article) || /<code/.test(article) ? OK : YELLOW, 'קוד/פקודות מוצגים ב-<code>/<pre> (LTR דרך global.css)');

  return findings;
}

const paths = process.argv.slice(2);
if (paths.length === 0) {
  console.error('usage: node scripts/audit-lesson.mjs <level/slug> [...]');
  process.exit(1);
}

let blocking = 0;
for (const path of paths) {
  const findings = await audit(path);
  blocking += findings.filter((f) => f.startsWith(RED)).length;
  console.log(`\n## ${path}\n${findings.join('\n')}`);
}
console.log(`\n${blocking ? `${RED} ${blocking} ממצאים חוסמים` : `${OK} אין ממצאים חוסמים`}`);
process.exit(blocking ? 1 : 0);
