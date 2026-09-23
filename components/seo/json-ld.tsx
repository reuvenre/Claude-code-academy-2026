// מזריק JSON-LD בצד שרת. `<` מוחלף כדי שתוכן לא יוכל לסגור את תג ה-script.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
