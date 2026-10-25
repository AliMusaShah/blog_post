"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";

import { Avatar } from "@/components/blog/avatar";
import { commentCount, type Post } from "@/data/mock-data";
import { formatDate, previewText } from "@/lib/format";
import { useFeedUi } from "@/store/feed-ui-store";

function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const setTag = useFeedUi((state) => state.setTag);
  const count = commentCount(post.id);

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <Avatar name={post.author.name} />
        <div className="min-w-0">
          <Link
            href={`/users/${post.author.id}`}
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
          >
            {post.author.name}
          </Link>
          <time
            dateTime={post.createdAt}
            className="block text-xs text-muted-foreground"
          >
            {formatDate(post.createdAt)}
          </time>
        </div>
      </div>
      <h2 className="mt-4 font-serif text-2xl leading-snug tracking-tight text-foreground">
        <Link
          href={`/posts/${post.id}`}
          className="rounded-sm underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-2 font-serif text-base leading-7 text-muted-foreground">
        {previewText(post.content)}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            onClick={() => {
              setTag(tag);
              router.push("/");
            }}
          >
            {tag}
          </button>
        ))}
        <p className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageSquare className="size-4" aria-hidden="true" />
          <span>
            {count} {count === 1 ? "comment" : "comments"}
          </span>
        </p>
      </div>
    </article>
  );
}

export { PostCard };
