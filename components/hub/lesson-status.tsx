'use client';

import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { progressStore } from '@/lib/progress/progressStore';

// סימון "הושלם" ליד שיעור ברשימה. מופיע רק בצד לקוח (ההתקדמות נשמרת בדפדפן).
export function LessonStatus({ lessonId }: { lessonId: string }) {
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

  if (!done) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
      <CircleCheck aria-hidden className="size-3.5" />
      הושלם
    </span>
  );
}
