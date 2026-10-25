import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { posts } from "@/data/mock-data";
import { PostDetailScreen } from "@/features/posts/post-detail-screen";

export const metadata: Metadata = {
  title: "Post",
};

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default function PostPage({ params }: PageProps<"/posts/[id]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <PostDetailLoader params={params} />
    </Suspense>
  );
}

async function PostDetailLoader({
  params,
}: {
  params: PageProps<"/posts/[id]">["params"];
}) {
  const { id } = await params;
  if (!posts.some((post) => post.id === id)) notFound();
  return <PostDetailScreen postId={id} />;
}
