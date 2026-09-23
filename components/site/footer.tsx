import Link from 'next/link';
import { site } from '@/lib/seo/site';

const links = [
  { href: '/start', label: 'מאיפה להתחיל?' },
  { href: '/beginner', label: 'הקורס' },
  { href: '/reference', label: 'מרכז הרפרנס' },
  { href: '/faq', label: 'שאלות נפוצות' },
  { href: '/about', label: 'אודות' },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-card/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 max-w-md">
            אתר לימוד עצמאי בעברית. לא קשור ל-Anthropic. כל עובדה מאומתת מול{' '}
            <a
              href="https://code.claude.com/docs"
              className="underline underline-offset-2 hover:text-foreground"
              rel="noopener"
            >
              התיעוד הרשמי
            </a>
            .
          </p>
        </div>
        <nav aria-label="קישורי האתר">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
