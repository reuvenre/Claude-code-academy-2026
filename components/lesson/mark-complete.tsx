'use client';

import { useEffect, useState } from 'react';
import { progressStore } from '@/lib/progress/progressStore';

export function MarkComplete({ lessonId }: { lessonId: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    void progressStore.getProgress(lessonId).then((p) => {
      if (active && p?.completedAt) setDone(true);
    });
    return () => {
      active = false;
    };
  }, [lessonId]);

  async function complete() {
    await progressStore.markComplete(lessonId);
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-muted-foreground" aria-live="polite">
        השיעור סומן כהושלם
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={complete}
      className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
    >
      סמן כהושלם
    </button>
  );
}
