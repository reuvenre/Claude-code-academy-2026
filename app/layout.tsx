import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';
import { Heebo } from 'next/font/google';
import { appName, siteUrl } from '@/lib/shared';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable} suppressHydrationWarning>
      {/* Fumadocs דורש dir גם על body וגם על RootProvider (שמעביר אותו ל-Base UI, כולל רכיבי shadcn) */}
      <body dir="rtl" className="flex flex-col min-h-screen font-sans">
        <RootProvider dir="rtl">{children}</RootProvider>
      </body>
    </html>
  );
}
