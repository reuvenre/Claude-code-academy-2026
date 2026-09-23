// רקע אחיד לכל האתר (דף הבית, הקורס, הרפרנס): רשת עדינה + זוהר מותגי.
// fixed ומאחורי התוכן, כך שהוא נשאר במקום בזמן גלילה ולא משפיע על ה-layout.
// בנייד: blur קטן יותר ובלי אנימציה (ציור blur גדול יקר ב-CPU חלש); motion-safe מכבד prefers-reduced-motion.
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-40 start-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-2xl md:blur-3xl rtl:translate-x-1/2 md:motion-safe:animate-glow" />
      <div className="absolute top-1/3 -start-40 size-[28rem] rounded-full bg-brand-2/10 blur-2xl md:blur-3xl md:motion-safe:animate-glow" />
    </div>
  );
}
