import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { getSidebarTree } from '@/lib/navigation';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DocsLayout tree={getSidebarTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
