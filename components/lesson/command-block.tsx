import type { ReactNode } from 'react';
import { CopyButton } from './copy-button';

function toText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  return '';
}

// פקודת טרמינל אחת עם כפתור העתקה. תמיד LTR, גם בתוך טקסט עברי.
export function CommandBlock({ children }: { children: ReactNode }) {
  const command = toText(children).trim();

  return (
    <div
      dir="ltr"
      className="not-prose my-4 flex items-center gap-2 rounded-lg border bg-muted/50 ps-4 pe-1 py-1 font-mono text-sm"
    >
      <span aria-hidden className="select-none text-muted-foreground">
        $
      </span>
      <code className="flex-1 overflow-x-auto whitespace-pre py-1.5">{command}</code>
      <CopyButton text={command} />
    </div>
  );
}
