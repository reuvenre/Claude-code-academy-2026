import { Info, Lightbulb, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  tip: { label: 'טיפ', Icon: Lightbulb, className: 'border-emerald-500/40 bg-emerald-500/5' },
  warning: { label: 'אזהרה', Icon: TriangleAlert, className: 'border-amber-500/50 bg-amber-500/5' },
  note: { label: 'הערה', Icon: Info, className: 'border-sky-500/40 bg-sky-500/5' },
} as const;

export type CalloutType = keyof typeof variants;

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { label, Icon, className } = variants[type] ?? variants.note;

  return (
    <aside
      role="note"
      aria-label={title ?? label}
      className={cn('not-prose my-6 flex gap-3 rounded-lg border border-s-4 p-4 text-sm', className)}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 flex-1 space-y-2 [&_p]:leading-relaxed">
        <p className="font-semibold">{title ?? label}</p>
        {children}
      </div>
    </aside>
  );
}
