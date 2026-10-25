"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPost, type Post } from "@/data/mock-data";
import { previewText } from "@/lib/format";
import { usePostDraft, type PostDraft } from "@/store/post-draft-store";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  draft?: PostDraft;
};

function opening(post: Post | undefined): ChatMessage {
  if (!post) {
    return {
      id: "welcome",
      role: "assistant",
      text: "I can help you understand a post or draft a new one. Ask about an idea, or say “Draft a post about…” and I will prepare it for the editor.",
    };
  }

  return {
    id: "welcome",
    role: "assistant",
    text: `You're reading “${post.title}” by ${post.author.name}. I can explain the point, suggest a clearer opening, or draft a follow-up post.`,
  };
}

function capitalize(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function replyFor(text: string, post: Post | undefined, id: string): ChatMessage {
  const lower = text.toLowerCase();
  const wantsDraft = /\b(draft|write|create)\b/.test(lower) && /\bpost\b/.test(lower);

  if (wantsDraft) {
    const topic = text
      .replace(
        /^(please\s+)?(can you\s+)?(draft|write|create)(\s+me)?(\s+a)?(\s+new)?(\s+post)?(\s+about)?\s*/i,
        "",
      )
      .replace(/[?.!]+$/g, "")
      .trim();
    const subject = topic || (post ? `a follow-up to ${post.title}` : "a calmer way to ship");
    const title = capitalize(subject).slice(0, 150);
    const content = [
      `${capitalize(subject)} is easier to write once the first paragraph says the decision.`,
      post
        ? `This follows “${post.title}”. Keep the concrete habit from that piece, and leave the tooling tour for a later note.`
        : "Name the choice a reader can make today, then the one detail that makes the advice believable.",
      "Stop while the draft is still short. A title, two paragraphs, and a few tags are enough to edit.",
    ].join("\n\n");

    return {
      id,
      role: "assistant",
      text: "Here is a draft. It stays on this page until you open it in the editor.",
      draft: {
        id,
        title,
        content,
        tags: post?.tags.slice(0, 3) ?? ["writing"],
      },
    };
  }

  if (post && /\b(explain|summary|summarize|about|point|mean)\b/.test(lower)) {
    const lead = previewText(post.content, 180);
    return {
      id,
      role: "assistant",
      text: `The point of “${post.title}” is practical. ${lead} If you want a new piece from this, ask me to draft a follow-up post.`,
    };
  }

  if (post && /\b(opening|clearer|edit|suggest|improve)\b/.test(lower)) {
    const first = post.content.split("\n\n")[0] ?? post.content;
    const shorter = first.length > 140 ? `${first.slice(0, 137).trimEnd()}…` : first;
    return {
      id,
      role: "assistant",
      text: `The opening can start closer to the decision: “${shorter}” That keeps the reader in the idea before the surrounding story.`,
    };
  }

  if (post) {
    return {
      id,
      role: "assistant",
      text: `I can explain “${post.title}”, suggest a clearer opening, or draft a follow-up post. Tell me which you want.`,
    };
  }

  return {
    id,
    role: "assistant",
    text: "Tell me the post you want. For example: “Draft a post about testing a NestJS service.”",
  };
}

function ChatScreen({ postId }: { postId?: string }) {
  const post = postId ? getPost(postId) : undefined;
  const router = useRouter();
  const setDraft = usePostDraft((state) => state.setDraft);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [opening(post)]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const listId = useId();
  const endRef = useRef<HTMLDivElement>(null);
  const fieldId = "assistant-message";

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  const suggestions = post
    ? ["Explain this post", "Suggest a clearer opening", "Draft a follow-up post"]
    : ["Draft a post about testing NestJS", "Draft a post about calm deploys"];

  function send(raw: string) {
    const next = raw.trim();
    if (!next) {
      setError("Write a message first.");
      return;
    }
    const userId = `user-${messages.length + 1}`;
    const assistantId = `assistant-${messages.length + 1}`;
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: next },
      replyFor(next, post, assistantId),
    ]);
    setText("");
    setError("");
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:py-8">
      <header className="border-b border-border pb-4">
        <p className="text-sm font-medium text-primary">Assistant</p>
        <h1 className="mt-1 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          {post ? post.title : "Talk through a post"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {post ? (
            <>
              Help with this post.{" "}
              <Link href={`/posts/${post.id}`} className="font-medium text-primary hover:underline">
                Back to the article
              </Link>
            </>
          ) : (
            "Ask for help, or draft a post and open it in the editor."
          )}
        </p>
      </header>
      <div
        id={listId}
        aria-live="polite"
        className="mt-6 flex flex-1 flex-col gap-4"
      >
        {messages.map((message) => (
          <article
            key={message.id}
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground"
                : "max-w-[85%] rounded-2xl border border-border bg-card px-4 py-3 text-sm leading-6 text-foreground shadow-sm"
            }
          >
            <p className="mb-1 text-xs font-semibold tracking-wide uppercase opacity-70">
              {message.role === "user" ? "You" : "Assistant"}
            </p>
            <p>{message.text}</p>
            {message.draft ? (
              <div className="mt-3 rounded-xl border border-border bg-background p-3 text-foreground">
                <p className="font-serif text-lg leading-snug">{message.draft.title}</p>
                <p className="mt-2 line-clamp-3 text-muted-foreground">
                  {previewText(message.draft.content, 160)}
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Draft tags">
                  {message.draft.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  className="mt-3 h-9 px-3"
                  onClick={() => {
                    if (!message.draft) return;
                    setDraft(message.draft);
                    router.push("/posts/new");
                  }}
                >
                  Open in editor
                </Button>
              </div>
            ) : null}
          </article>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            onClick={() => send(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <form
        className="mt-3"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          send(text);
        }}
      >
        <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
          Message
        </label>
        <div className="mt-1.5 flex items-end gap-2">
          <textarea
            id={fieldId}
            rows={3}
            value={text}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            placeholder={post ? "Ask about this post" : "Describe the post you want"}
            className="min-h-20 flex-1 resize-y rounded-lg border border-border bg-card px-3 py-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30 aria-invalid:border-red-700"
            onChange={(event) => {
              setText(event.target.value);
              setError("");
            }}
          />
          <Button type="submit" className="h-11 px-4" aria-label="Send message">
            <Send className="size-4" aria-hidden="true" />
            Send
          </Button>
        </div>
        {error ? (
          <p id={`${fieldId}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-800 dark:text-red-300">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}

export { ChatScreen };
