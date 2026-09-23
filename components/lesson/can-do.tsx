import { CircleCheckBig } from 'lucide-react';
import type { ReactNode } from 'react';

// נקודת הביטחון בסוף השיעור: "עכשיו אתה יכול…"
export function CanDo({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <section
      aria-label="מה למדת"
      className="not-prose mt-12 flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center"
    >
      <CircleCheckBig aria-hidden className="size-6 shrink-0 text-primary" />
      <p className="flex-1 font-medium">{children}</p>
      {action}
    </section>
  );
}
