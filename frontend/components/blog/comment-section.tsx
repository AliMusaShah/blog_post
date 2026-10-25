"use client";

import { useState } from "react";
import Link from "next/link";

import { Avatar } from "@/components/blog/avatar";
import { Button } from "@/components/ui/button";
import {
  commentsFor,
  currentUser,
  type Comment,
} from "@/data/mock-data";
import { formatDate } from "@/lib/format";

function CommentSection({ postId }: { postId: string }) {
  const [items, setItems] = useState<Comment[]>(() => commentsFor(postId));
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) {
      setError("Write a comment before posting.");
      return;
    }
    setItems((current) => [
      ...current,
      {
        id: `local-${current.length + 1}`,
        postId,
        text: text.trim(),
        author: currentUser,
        createdAt: new Date().toISOString(),
      },
    ]);
    setText("");
    setError("");
  }

  return (
    <section className="mt-12 border-t border-border pt-8" aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="font-serif text-2xl tracking-tight">
        Comments
      </h2>
      {items.length === 0 ? (
        <p role="status" className="mt-4 rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          No comments yet. Be the first to share a thought.
        </p>
      ) : (
        <ol className="mt-6 space-y-6">
          {items.map((comment) => (
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
      <form className="mt-8" noValidate onSubmit={onSubmit}>
        <label htmlFor="comment-text" className="text-sm font-medium text-foreground">
          Comment
        </label>
        <textarea
          id="comment-text"
          value={text}
          rows={4}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "comment-error" : undefined}
          placeholder="Share a thought"
          className="mt-1.5 w-full resize-y rounded-lg border border-border bg-card px-3 py-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30 aria-invalid:border-red-700"
          onChange={(event) => {
            setText(event.target.value);
            setError("");
          }}
        />
        {error ? (
          <p id="comment-error" role="alert" className="mt-1.5 text-sm font-medium text-red-800 dark:text-red-300">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="mt-3 h-10 px-4">
          Post comment
        </Button>
      </form>
    </section>
  );
}

export { CommentSection };
