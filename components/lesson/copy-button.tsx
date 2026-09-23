'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard חסום — אין מה לעשות מלבד לא להציג "הועתק"
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      aria-label={copied ? 'הועתק' : 'העתק פקודה'}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'הועתק' : ''}
      </span>
    </button>
  );
}
