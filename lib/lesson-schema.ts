import { pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';
import { levels } from './levels';

// סכמת frontmatter לשיעור — מימוש של templates/frontmatter.schema.md.
// שדה חובה חסר או לא תקין מכשיל את ה-build.

// מקורות אמת רשמיים בלבד (CLAUDE.md): code.claude.com/docs, academy.claude.com וכו'
const officialHosts = ['claude.com', 'anthropic.com'];
const officialUrl = z.url({ protocol: /^https$/ }).refine(
  (value) => {
    const host = new URL(value).hostname;
    return officialHosts.some((h) => host === h || host.endsWith(`.${h}`));
  },
  { message: 'source must be an official claude.com / anthropic.com URL' },
);

// YAML ממיר תאריך ללא מרכאות לאובייקט Date — מנרמלים חזרה ל-YYYY-MM-DD
const isoDate = z.union([
  z.iso.date(),
  z.date().transform((d) => d.toISOString().slice(0, 10)),
]);

export const faqItemSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const quizItemSchema = z
  .object({
    q: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
    // אינדקס (מ-0) של התשובה הנכונה בתוך options
    answer: z.number().int().nonnegative(),
  })
  .refine((item) => item.answer < item.options.length, {
    message: 'quiz answer index is out of range',
  });

export const lessonSchema = pageSchema.extend({
  description: z.string().min(1),
  level: z.enum(levels),
  order: z.number().int().nonnegative(),
  source: officialUrl,
  lastVerified: isoDate,
  keywords: z.array(z.string().min(1)).min(1),
  faq: z.array(faqItemSchema).optional(),
  canDo: z.string().min(1).optional(),
  quiz: z.array(quizItemSchema).optional(),
  fluency: z.enum(['Delegation', 'Description', 'Discernment', 'Diligence']).optional(),
  relatedSlugs: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type QuizItem = z.infer<typeof quizItemSchema>;

// עמוד רפרנס (content/reference): בלי רמה/CanDo/Quiz, אבל עם אותן דרישות מקור ואימות
export const referenceSchema = pageSchema.extend({
  description: z.string().min(1),
  order: z.number().int().nonnegative(),
  source: officialUrl,
  lastVerified: isoDate,
  keywords: z.array(z.string().min(1)).min(1),
  faq: z.array(faqItemSchema).optional(),
  draft: z.boolean().default(false),
});
