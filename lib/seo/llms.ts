import { levelInfo, levels } from '@/lib/levels';
import { getReferencePages } from '@/lib/navigation';
import { source } from '@/lib/source';
import { absoluteUrl, site } from './site';

// llms.txt / llms-full.txt לפי templates/llms-txt.example.txt, מתוך ה-frontmatter.
// drafts כבר מסוננים ב-source.

type LessonPage = ReturnType<typeof source.getPages>[number];

const header = `# ${site.name}

> אתר לימוד עברי (RTL) שמלמד לעבוד ב-Claude Code מאפס למאה — ממתחילים לחלוטין ועד
> מקצוענים. כל התוכן מאומת מול התיעוד הרשמי של Anthropic ב-code.claude.com/docs.
`;

function lessonsByLevel() {
  const pages = source.getPages();
  return levels
    .map((level) => ({
      level,
      pages: pages
        .filter((page) => page.data.level === level)
        .sort((a, b) => a.data.order - b.data.order),
    }))
    .filter((group) => group.pages.length > 0);
}

// אינדקס תמציתי: שורה אחת לכל שיעור — [כותרת](URL מלא): תיאור
export function buildLlmsIndex(): string {
  const sections = lessonsByLevel().map(
    ({ level, pages }) =>
      `## ${levelInfo[level].label}\n` +
      `- [עמוד הרמה](${absoluteUrl(levelInfo[level].href)}): ${levelInfo[level].description}\n` +
      pages
        .map((page) => `- [${page.data.title}](${absoluteUrl(page.url)}): ${page.data.description}`)
        .join('\n'),
  );

  const reference = getReferencePages();
  const referenceSection = reference.length
    ? `## מרכז הרפרנס\n` +
      reference
        .map((page) => `- [${page.data.title}](${absoluteUrl(page.url)}): ${page.data.description}`)
        .join('\n')
    : undefined;

  return [
    header,
    ...sections,
    ...(referenceSection ? [referenceSection] : []),
    `## תוכן מלא\n- [llms-full.txt](${absoluteUrl('/llms-full.txt')})`,
  ].join('\n');
}

export async function renderLessonMarkdown(page: LessonPage): Promise<string> {
  const { title, source: officialSource, lastVerified, level } = page.data;
  return `# ${title}

URL: ${absoluteUrl(page.url)}
רמה: ${levelInfo[level].label}
מקור רשמי: ${officialSource}
אומת לאחרונה: ${lastVerified}

${await page.data.getText('processed')}`;
}

export async function buildLlmsFull(): Promise<string> {
  const groups = lessonsByLevel();
  const bodies = await Promise.all(
    groups.flatMap(({ pages }) => pages.map((page) => renderLessonMarkdown(page))),
  );
  return [header, ...bodies].join('\n\n---\n\n');
}
