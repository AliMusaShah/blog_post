import { Suspense } from "react";
import type { Metadata } from "next";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { PostEditorScreen } from "@/features/posts/post-editor-screen";

export const metadata: Metadata = {
  title: "Edit post",
};

export default async function EditPostPage({
  params,
}: PageProps<"/posts/[id]/edit">) {
  const { id } = await params;
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <PostEditorScreen postId={id} />
    </Suspense>
  );
}
