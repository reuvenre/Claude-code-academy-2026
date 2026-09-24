import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { SiteFooter } from '@/components/site/footer';
import { NotFoundContent } from '@/components/site/not-found-content';
import { baseOptions } from '@/lib/layout.shared';

// 404 גלובלי: לכתובת שלא נכנסת לאף מקטע (למקטעי הקורס והבית יש not-found משלהם)
export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:py-16">
        <NotFoundContent />
      </div>
      <SiteFooter />
    </HomeLayout>
  );
}
