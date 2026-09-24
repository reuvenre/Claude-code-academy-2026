import Link from 'next/link';
import { ArrowLeft, BookMarked, Compass, House } from 'lucide-react';

const links = [
  { href: '/', label: 'דף הבית', icon: House },
  { href: '/start', label: 'מאיפה להתחיל?', icon: Compass },
  { href: '/reference', label: 'מרכז הרפרנס', icon: BookMarked },
];

// תוכן עמוד 404 בעברית. ה-layout (קורס / בית) נבחר לפי המקטע שבו נזרק notFound — ראה app/**/not-found.tsx
export function NotFoundContent() {
  return (
    <div className="not-prose">
      <p className="font-mono text-sm text-muted-foreground" dir="ltr">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">העמוד לא נמצא</h1>
      {/* תשובה-קודם */}
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        הכתובת הזו לא קיימת באתר, או שהעמוד הועבר. אפשר לחזור לדף הבית, לבחור נקודת התחלה בקורס,
        או לחפש במרכז הרפרנס.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-3 rounded-xl border bg-card/60 p-4 font-medium backdrop-blur transition-colors hover:border-brand/50"
            >
              <Icon aria-hidden className="size-5 shrink-0 text-brand" />
              <span className="flex-1">{label}</span>
              <ArrowLeft
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
