import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { posts } from "@/data/mock-data";
import { ChatScreen } from "@/features/assistant/chat-screen";

export const metadata: Metadata = {
  title: "Assistant",
};

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default function PostChatPage({ params }: PageProps<"/posts/[id]/chat">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <PostChatLoader params={params} />
    </Suspense>
  );
}

async function PostChatLoader({
  params,
}: {
  params: PageProps<"/posts/[id]/chat">["params"];
}) {
  const { id } = await params;
  if (!posts.some((post) => post.id === id)) notFound();
  return <ChatScreen postId={id} />;
}
