import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// placeholder — דף הבית המלא (בורר רמה ומסלול למידה) נבנה בשלב 4
export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4">
      <h1 className="text-2xl font-bold mb-4">Claude Code Academy IL</h1>
      <p>
        האתר בבנייה. בינתיים אפשר לראות את{' '}
        <Link href="/demo/components" className="font-medium underline">
          עמוד הדמו של רכיבי השיעור
        </Link>
        .
      </p>
    </div>
  );
}
