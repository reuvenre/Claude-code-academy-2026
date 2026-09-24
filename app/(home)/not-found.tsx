import { NotFoundContent } from '@/components/site/not-found-content';

// 404 בתוך layout הבית (בלוג, מחקרים, עמודי תשתית)
export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:py-16">
      <NotFoundContent />
    </div>
  );
}
