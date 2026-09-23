import Link from 'next/link';

// placeholder — דף הבית המלא (בורר רמה ומסלול למידה) נבנה בשלב 4
export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4">
      <h1 className="text-2xl font-bold mb-4">Claude Code Academy IL</h1>
      <p>
        האתר בבנייה. בינתיים אפשר לפתוח את{' '}
        <Link href="/beginner" className="font-medium underline">
          רמה 0 — מתחילים לחלוטין
        </Link>
        .
      </p>
    </div>
  );
}
