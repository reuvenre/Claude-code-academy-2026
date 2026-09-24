import { BookOpen, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { levelInfo, type Level } from '@/lib/levels';

const badgeClass =
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground';

export function LevelBadge({ level }: { level: Level }) {
  const info = levelInfo[level];
  return (
    <Link href={info.href} className={`${badgeClass} hover:text-foreground`}>
      <BookOpen aria-hidden className="size-3.5" />
      {info.label}
    </Link>
  );
}

export function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className={badgeClass}>
      <Clock aria-hidden className="size-3.5" />
      {minutes === 1 ? 'דקת קריאה' : `${minutes} דקות קריאה`}
    </span>
  );
}

// קישור למקור הרשמי שממנו אומתו העובדות בשיעור
export function SourceBadge({ href }: { href: string }) {
  const url = new URL(href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${badgeClass} max-w-full hover:text-foreground`}
    >
      <ExternalLink aria-hidden className="size-3.5" />
      {/* בנייד הנתיב ארוך מהמסך: התווית נשארת שלמה והנתיב נשבר בתוך הבאדג' */}
      <span className="whitespace-nowrap">מקור רשמי:</span>
      <span dir="ltr" className="min-w-0 font-mono [overflow-wrap:anywhere]">
        {url.hostname + url.pathname}
      </span>
    </a>
  );
}

export function LastVerified({ date }: { date: string }) {
  const formatted = new Intl.DateTimeFormat('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

  return (
    <p className="mt-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <ShieldCheck aria-hidden className="size-3.5" />
      אומת לאחרונה מול התיעוד הרשמי: <time dateTime={date}>{formatted}</time>
    </p>
  );
}
