import type * as PageTree from 'fumadocs-core/page-tree';
import { curriculum } from './curriculum';
import { levelInfo, levels, type Level } from './levels';
import { getReadingMinutes } from './reading-time';
import { source } from './source';

type LessonPage = ReturnType<typeof source.getPages>[number];

// שיעורים שפורסמו ברמה, לפי order (drafts כבר מסוננים ב-source)
export function getLevelLessons(level: Level): LessonPage[] {
  return source
    .getPages()
    .filter((page) => page.data.level === level)
    .sort((a, b) => a.data.order - b.data.order);
}

export interface HubEntry {
  n?: number;
  slug: string;
  title: string;
  description?: string;
  url?: string;
  minutes?: number;
}

// הסילבוס המלא של רמה: שיעורים שנכתבו (עם קישור וזמן קריאה) + מתוכננים ("בקרוב")
export async function getHubEntries(level: Level): Promise<HubEntry[]> {
  const written = new Map(getLevelLessons(level).map((page) => [page.slugs.at(-1)!, page]));

  const toEntry = async (page: LessonPage, n?: number): Promise<HubEntry> => ({
    n,
    slug: page.slugs.at(-1)!,
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    minutes: getReadingMinutes(await page.data.getText('processed')),
  });

  const planned = await Promise.all(
    curriculum[level].map((item) => {
      const page = written.get(item.slug);
      return page ? toEntry(page, item.n) : { n: item.n, slug: item.slug, title: item.title };
    }),
  );

  // שיעור שנכתב ואינו בסילבוס — מתווסף בסוף
  const plannedSlugs = new Set(curriculum[level].map((item) => item.slug));
  const extra = await Promise.all(
    [...written.values()]
      .filter((page) => !plannedSlugs.has(page.slugs.at(-1)!))
      .map((page) => toEntry(page)),
  );

  return [...planned, ...extra];
}

// רמה "חיה" = יש בה לפחות שיעור אחד שפורסם. רק היא נכנסת ל-sitemap ומאונדקסת.
export function isLevelLive(level: Level): boolean {
  return getLevelLessons(level).length > 0;
}

// עץ הסיידבר: תיקייה לכל רמה (לפי סדר המסלול) שהאינדקס שלה הוא עמוד השער,
// ובתוכה השיעורים שפורסמו לפי order. (מרכז הרפרנס מופיע בקישורי הניווט העליונים — lib/layout.shared.tsx)
export function getSidebarTree(): PageTree.Root {
  const folders: PageTree.Folder[] = levels.map((level) => {
    const info = levelInfo[level];
    return {
      $id: `level:${level}`,
      type: 'folder',
      name: info.label,
      index: { $id: `hub:${level}`, type: 'page', name: info.label, url: info.href },
      children: getLevelLessons(level).map((page) => ({
        $id: `lesson:${page.url}`,
        type: 'page',
        name: page.data.title,
        url: page.url,
      })),
    };
  });

  return {
    name: 'Claude Code Academy',
    children: folders,
  };
}
