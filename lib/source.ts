import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema } from 'fumadocs-core/source/schema';
import { lessonSchema } from './lesson-schema';

const docs = defineDocs({
  dir: 'content/lessons',
  docs: {
    schema: lessonSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// עמוד הדמו של הרכיבים: אותה סכמה ואותה תבנית, אבל collection נפרד —
// לא נכנס לניווט הקורס, לחיפוש או ל-llms.txt
const demo = defineDocs({
  dir: 'content/demo',
  docs: {
    schema: lessonSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// שיעור עם draft: true לא קיים בפרודקשן — מסננים כבר במקור, ולכן הוא נעלם גם מהסיידבר,
// מהחיפוש, מ-llms.txt, מה-sitemap ומתמונות ה-OG
const hideDrafts = process.env.NODE_ENV === 'production';
const lessonsSource = docs.toFumadocsSource();
if (hideDrafts) {
  lessonsSource.files = lessonsSource.files.filter(
    (file) => file.type !== 'page' || !file.data.draft,
  );
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: lessonsSource,
  plugins: [lucideIconsPlugin()],
});

export const demoSource = loader({
  baseUrl: '/demo',
  source: demo.toFumadocsSource(),
});
