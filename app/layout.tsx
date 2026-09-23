import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';
import { Heebo, JetBrains_Mono } from 'next/font/google';
import { JsonLd } from '@/components/seo/json-ld';
import { SiteBackground } from '@/components/site/site-background';
import { organizationJsonLd } from '@/lib/seo/jsonld';
import { site } from '@/lib/seo/site';
import { heTranslations } from '@/lib/ui-translations';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-sans',
});

// קוד ופקודות (לטינית בלבד)
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// ברירות מחדל לכל האתר. canonical לא מוגדר כאן בכוונה — הוא עובר בירושה לכל עמוד שלא דורס אותו.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* Fumadocs דורש dir גם על body וגם על RootProvider (שמעביר אותו ל-Base UI, כולל רכיבי shadcn) */}
      <body dir="rtl" className="flex flex-col min-h-screen font-sans">
        <JsonLd data={organizationJsonLd()} />
        <SiteBackground />
        <RootProvider
          dir="rtl"
          i18n={{ locale: 'he', translations: heTranslations }}
          // ערכת הנושא Tech Innovation: כהה כברירת מחדל, עם מעבר לבהיר
          theme={{ defaultTheme: 'dark' }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
