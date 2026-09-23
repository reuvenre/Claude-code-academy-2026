import type { FaqItem } from '@/lib/lesson-schema';

// שו"ת גלוי במלואו ב-HTML (בלי accordion) + JSON-LD מסוג FAQPage מאותו מקור בדיוק
export function FAQ({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </section>
  );
}
