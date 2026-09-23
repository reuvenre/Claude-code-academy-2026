import { demoSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/demo'>) {
  return (
    <DocsLayout tree={demoSource.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
