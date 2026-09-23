import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema } from 'fumadocs-core/source/schema';
import { lessonSchema, postSchema, referenceSchema } from './lesson-schema';

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

// מרכז הרפרנס: collection נפרד עם סכמה משלו, בכתובות /reference/<slug>
const reference = defineDocs({
  dir: 'content/reference',
  docs: {
    schema: referenceSchema,
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

const referenceFiles = reference.toFumadocsSource();
if (hideDrafts) {
  referenceFiles.files = referenceFiles.files.filter(
    (file) => file.type !== 'page' || !file.data.draft,
  );
}

export const referenceSource = loader({
  baseUrl: '/reference',
  source: referenceFiles,
});

export const demoSource = loader({
  baseUrl: '/demo',
  source: demo.toFumadocsSource(),
});

// בלוג ומחקרים: status: draft לא מתפרסם בפרודקשן (במצב פיתוח מוצג עם תווית טיוטה)
// (macro של fumadocs-mdx חייב להיות initializer ישיר של const ברמה העליונה)
const blog = defineDocs({
  dir: 'content/blog',
  docs: { schema: postSchema, postprocess: { includeProcessedMarkdown: true } },
  meta: { schema: metaSchema },
});

const research = defineDocs({
  dir: 'content/research',
  docs: { schema: postSchema, postprocess: { includeProcessedMarkdown: true } },
  meta: { schema: metaSchema },
});

function publishedOnly<T extends { files: { type: string; data: unknown }[] }>(files: T): T {
  if (hideDrafts) {
    files.files = files.files.filter(
      (file) => file.type !== 'page' || (file.data as { status?: string }).status === 'published',
    );
  }
  return files;
}

export const blogSource = loader({
  baseUrl: '/blog',
  source: publishedOnly(blog.toFumadocsSource()),
});

export const researchSource = loader({
  baseUrl: '/research',
  source: publishedOnly(research.toFumadocsSource()),
});
