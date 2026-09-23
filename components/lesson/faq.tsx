import type { FaqItem } from '@/lib/lesson-schema';

// שו"ת גלוי במלואו ב-HTML (בלי accordion). ה-JSON-LD מסוג FAQPage נבנה מאותם נתונים
// בתבנית הדף (lib/seo/jsonld.ts), כך שהתוכן וה-schema תמיד תואמים.
export function FAQ({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq" className="mt-12">
      <h2 id="faq" className="mb-4 text-xl font-semibold">
        שאלות נפוצות
      </h2>
      <dl className="divide-y rounded-lg border">
        {items.map((item) => (
          <div key={item.q} className="p-4">
            <dt className="font-medium">{item.q}</dt>
            <dd className="mt-1.5 text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
