import type { Metadata } from 'next';
import { PostList } from '@/components/posts/post-list';
import { postSections } from '@/components/posts/sections';
import { blogSource } from '@/lib/source';

const section = postSections.blog;

export const metadata: Metadata = {
  title: { absolute: section.title },
  description: section.description,
  alternates: { canonical: section.href },
};

export default function Page() {
  return <PostList type="blog" posts={blogSource.getPages()} />;
}
