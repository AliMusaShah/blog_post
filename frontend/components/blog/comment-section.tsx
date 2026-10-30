"use client";

import Link from "next/link";

import { Avatar } from "@/components/blog/avatar";
import type { PostComment } from "@/lib/api/types";
import { formatDate } from "@/lib/format";

function CommentSection({ comments }: { comments: PostComment[] }) {
  return (
    <section className="mt-12 border-t border-border pt-8" aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="font-serif text-2xl tracking-tight">
        Comments
      </h2>
      {comments.length === 0 ? (
        <p
          role="status"
          className="mt-4 rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground"
        >
          No comments yet.
        </p>
      ) : (
        <ol className="mt-6 space-y-6">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3">
              <Avatar name={comment.author.name} />
              <div className="min-w-0">
                <p className="text-sm">
                  <Link
                    href={`/users/${comment.author.id}`}
                    className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
                  >
                    {comment.author.name}
                  </Link>
                  <time
                    dateTime={comment.createdAt}
                    className="ml-2 text-muted-foreground"
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                </p>
                <p className="mt-1 text-sm leading-6 text-foreground">{comment.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export { CommentSection };
