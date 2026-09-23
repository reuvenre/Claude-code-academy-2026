import { DocsPage } from 'fumadocs-ui/layouts/docs/page';
import { NotFoundContent } from '@/components/site/not-found-content';

// 404 בתוך layout הקורס (הסרגל הצדי נשאר, כך שאפשר להמשיך לנווט)
export default function NotFound() {
  return (
    <DocsPage toc={[]} tableOfContent={{ enabled: false }}>
      <NotFoundContent />
    </DocsPage>
  );
}
