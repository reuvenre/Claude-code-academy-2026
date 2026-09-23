import { appName, siteUrl } from '@/lib/shared';

// זהות האתר — מקור יחיד ל-metadata, ל-JSON-LD ול-llms.txt
export const site = {
  name: appName,
  url: siteUrl,
  locale: 'he_IL',
  language: 'he',
  description:
    'אתר לימוד עברי לעבודה ב-Claude Code, מאפס למאה. כל עובדה מאומתת מול התיעוד הרשמי של Anthropic.',
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
