"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { LoadError } from "@/components/blog/load-error";
import { NotFoundView } from "@/components/blog/not-found-view";
import { PostForm } from "@/components/blog/post-form";
import { buttonVariants } from "@/components/ui/button";
import { useAuthReady } from "@/features/auth/use-auth-ready";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { apiErrorMessages, isNotFound } from "@/lib/api/error";
import { useCreatePost, usePost, useUpdatePost } from "@/lib/api/queries";
import { usePostDraft } from "@/store/post-draft-store";

function PostEditorScreen({ postId }: { postId?: string }) {
  const router = useRouter();
  const ready = useAuthReady();
  const user = useAuthStore((state) => state.user);
  const draft = usePostDraft((state) => state.draft);
  const clearDraft = usePostDraft((state) => state.clearDraft);
  const postQuery = usePost(postId ?? "", { enabled: Boolean(postId) });
  const createPost = useCreatePost();
  const updatePost = useUpdatePost(postId ?? "");

  if (!ready || (postId && postQuery.isLoading)) return <ArticleSkeleton />;
  if (postId && isNotFound(postQuery.error)) return <NotFoundView />;
  if (postId && (postQuery.isError || !postQuery.data)) {
    return (
      <LoadError
        title="Could not load this post"
        messages={apiErrorMessages(postQuery.error)}
        onRetry={() => postQuery.refetch()}
      />
    );
  }

  const post = postId ? postQuery.data : undefined;
  const fromAssistant = !post && draft ? draft : null;
  const canEdit = !post || user?.role === "ADMIN" || user?.id === post.author.id;
  const mutation = post ? updatePost : createPost;
  const messages = mutation.isError ? apiErrorMessages(mutation.error) : [];

  if (!user) {
    const next = postId ? `/posts/${postId}/edit` : "/posts/new";
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-24 text-center">
        <h1 className="font-serif text-4xl tracking-tight">Sign in to write</h1>
        <p className="mt-3 text-muted-foreground">
          Posts are published under your account.
        </p>
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className={buttonVariants({ className: "mt-8 h-10 px-4" })}
        >
          Log in
        </Link>
      </div>
    );
  }

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
        Titles stay under 150 characters. Tags are lowercase words, with hyphens between them.
      </p>
      <PostForm
        key={post?.id ?? fromAssistant?.id ?? "new"}
        mode={post ? "edit" : "create"}
        cancelHref={post ? `/posts/${post.id}` : "/"}
        initialTitle={post?.title ?? fromAssistant?.title}
        initialContent={post?.content ?? fromAssistant?.content}
        initialTags={post?.tags ?? fromAssistant?.tags}
        pending={mutation.isPending}
        messages={messages}
        onPublish={async (values) => {
          try {
            const saved = post
              ? await updatePost.mutateAsync(values)
              : await createPost.mutateAsync({ ...values, authorId: user.id });
            if (!post) clearDraft();
            router.push(`/posts/${saved.id}`);
            router.refresh();
          } catch {
            // The form renders the mutation error.
          }
        }}
      />
    </div>
  );
}

export { PostEditorScreen };
