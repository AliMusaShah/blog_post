import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { posts } from "@/data/mock-data";
import { PostEditorScreen } from "@/features/posts/post-editor-screen";

export const metadata: Metadata = {
  title: "Edit post",
};

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default function EditPostPage({ params }: PageProps<"/posts/[id]/edit">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <EditPostLoader params={params} />
    </Suspense>
  );
}

async function EditPostLoader({
  params,
}: {
  params: PageProps<"/posts/[id]/edit">["params"];
}) {
  const { id } = await params;
  if (!posts.some((post) => post.id === id)) notFound();
  return <PostEditorScreen postId={id} />;
}
