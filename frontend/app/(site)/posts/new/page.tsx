import type { Metadata } from "next";

import { PostEditorScreen } from "@/features/posts/post-editor-screen";

export const metadata: Metadata = {
  title: "Write a post",
};

export default function NewPostPage() {
  return <PostEditorScreen />;
}
