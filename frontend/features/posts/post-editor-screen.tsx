"use client";

import Link from "next/link";

import { PostForm } from "@/components/blog/post-form";
import { buttonVariants } from "@/components/ui/button";
import { currentUser, getPost } from "@/data/mock-data";
import { usePostDraft } from "@/store/post-draft-store";

function PostEditorScreen({ postId }: { postId?: string }) {
  const draft = usePostDraft((state) => state.draft);
  const post = postId ? getPost(postId) : undefined;
  const fromAssistant = !post && draft ? draft : null;
  const canEdit =
    !post || currentUser.role === "ADMIN" || currentUser.id === post.author.id;

  if (!canEdit) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-24 text-center">
        <h1 className="font-serif text-4xl tracking-tight">You cannot edit this post</h1>
        <p className="mt-3 text-muted-foreground">
          Only the author and administrators see the editor.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8 h-10 px-4" })}>
          Back to the feed
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">
        {post ? "Edit post" : "New post"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Titles stay under 150 characters. Tags become chips as you type.
      </p>
      <PostForm
        key={post?.id ?? fromAssistant?.id ?? "new"}
        mode={post ? "edit" : "create"}
        cancelHref={post ? `/posts/${post.id}` : "/assistant"}
        initialTitle={post?.title ?? fromAssistant?.title}
        initialContent={post?.content ?? fromAssistant?.content}
        initialTags={post?.tags ?? fromAssistant?.tags}
      />
    </div>
  );
}

export { PostEditorScreen };
