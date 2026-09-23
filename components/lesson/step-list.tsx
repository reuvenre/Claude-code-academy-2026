import type { ReactNode } from 'react';

// עוטף רשימה ממוספרת (Markdown `1.`) ומעצב אותה כצעדים. logical properties בלבד.
export function StepList({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        'my-6',
        '[&>ol]:list-none [&>ol]:ps-0 [&>ol]:[counter-reset:step]',
        '[&>ol>li]:relative [&>ol>li]:ps-10 [&>ol>li]:pb-4 [&>ol>li]:[counter-increment:step]',
        "[&>ol>li]:before:content-[counter(step)] [&>ol>li]:before:absolute [&>ol>li]:before:start-0 [&>ol>li]:before:top-0",
        '[&>ol>li]:before:flex [&>ol>li]:before:size-7 [&>ol>li]:before:items-center [&>ol>li]:before:justify-center',
        '[&>ol>li]:before:rounded-full [&>ol>li]:before:bg-primary [&>ol>li]:before:text-xs [&>ol>li]:before:font-semibold [&>ol>li]:before:text-primary-foreground',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
