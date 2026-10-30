import { Suspense } from "react";
import type { Metadata } from "next";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { ChatScreen } from "@/features/assistant/chat-screen";

export const metadata: Metadata = {
  title: "Assistant",
};

export default async function PostChatPage({
  params,
}: PageProps<"/posts/[id]/chat">) {
  const { id } = await params;
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ChatScreen postId={id} />
    </Suspense>
  );
}
