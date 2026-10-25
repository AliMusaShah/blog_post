"use client";

import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar } from "@/components/blog/avatar";
import { CommentSection } from "@/components/blog/comment-section";
import { DeletePostDialog } from "@/components/blog/delete-post-dialog";
import { buttonVariants } from "@/components/ui/button";
import { currentUser, getPost } from "@/data/mock-data";
import { formatDate } from "@/lib/format";
import { useFeedUi } from "@/store/feed-ui-store";

function PostDetailScreen({ postId }: { postId: string }) {
  const post = getPost(postId);
  const router = useRouter();
  const setTag = useFeedUi((state) => state.setTag);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removed, setRemoved] = useState(false);

  useLayoutEffect(() => {
    return () => setDialogOpen(false);
  }, []);

  if (!post) return null;

  const canModerate =
    currentUser.role === "ADMIN" || currentUser.id === post.author.id;

  if (removed) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-4xl tracking-tight">Post deleted</h1>
        <p className="mt-3 text-muted-foreground">
          This preview removed the post and its comments. Nothing was sent to a server.
        </p>
        <Link
          href="/"
          className={buttonVariants({ className: "mt-8 h-10 px-4" })}
        >
          Back to the feed
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
      <p className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground hover:underline">
          Latest writing
        </Link>
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
        {post.title}
      </h1>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Avatar name={post.author.name} className="size-10" />
        <div>
          <Link
            href={`/users/${post.author.id}`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {post.author.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            {post.updatedAt !== post.createdAt ? (
              <>
                {" "}
                · Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </>
            ) : null}
          </p>
        </div>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
        {post.tags.map((tag) => (
          <li key={tag}>
            <button
              type="button"
              className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
              onClick={() => {
                setTag(tag);
                router.push("/");
              }}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <Link
        href={`/posts/${post.id}/chat`}
        className="mt-6 inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
      >
        Ask the assistant about this post
      </Link>
      <div className="mt-8 space-y-6 font-serif text-lg leading-8 text-foreground">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      {canModerate ? (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          <Link
            href={`/posts/${post.id}/edit`}
            className={buttonVariants({
              variant: "outline",
              className: "h-10 px-4",
            })}
          >
            Edit
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-red-700 px-4 text-sm font-medium text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-700/40"
            onClick={() => setDialogOpen(true)}
          >
            Delete
          </button>
        </div>
      ) : null}
      <CommentSection postId={post.id} />
      <DeletePostDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={() => setRemoved(true)}
      />
    </article>
  );
}

export { PostDetailScreen };
