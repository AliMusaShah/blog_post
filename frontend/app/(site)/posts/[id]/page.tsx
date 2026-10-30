import { Suspense } from "react";
import type { Metadata } from "next";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { PostDetailScreen } from "@/features/posts/post-detail-screen";

export const metadata: Metadata = {
  title: "Post",
};

export default async function PostPage({ params }: PageProps<"/posts/[id]">) {
  const { id } = await params;
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <PostDetailScreen postId={id} />
    </Suspense>
  );
}
