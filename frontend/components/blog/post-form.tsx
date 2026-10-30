"use client";

import { useState } from "react";
import Link from "next/link";

import { ApiAlert } from "@/components/blog/api-alert";
import { TagInput } from "@/components/blog/tag-input";
import { TextArea } from "@/components/blog/text-area";
import { TextField } from "@/components/blog/text-field";
import { Button, buttonVariants } from "@/components/ui/button";

const TITLE_LIMIT = 150;

type PostFormValues = {
  title: string;
  content: string;
  tags: string[];
};

type PostFormProps = {
  mode: "create" | "edit";
  cancelHref: string;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  pending?: boolean;
  messages?: string[];
  onPublish: (values: PostFormValues) => Promise<void> | void;
};

function PostForm({
  mode,
  cancelHref,
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  pending = false,
  messages = [],
  onPublish,
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState(initialTags);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const overLimit = title.length > TITLE_LIMIT;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTitleError = !title.trim()
      ? "Add a title before publishing."
      : overLimit
        ? "Titles can be at most 150 characters."
        : "";
    const nextContentError = content.trim()
      ? ""
      : "Write the post before publishing.";
    setTitleError(nextTitleError);
    setContentError(nextContentError);
    if (nextTitleError || nextContentError || pending) return;
    await onPublish({
      title: title.trim(),
      content: content.trim(),
      tags,
    });
  }

  return (
    <form className="mt-8 flex flex-col gap-6" noValidate onSubmit={onSubmit}>
      {titleError || contentError ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
          Check the highlighted fields.
        </p>
      ) : null}
      {messages.length > 0 ? <ApiAlert messages={messages} /> : null}
      <TextField
        id="post-title"
        label="Title"
        value={title}
        maxLength={TITLE_LIMIT}
        error={titleError}
        disabled={pending}
        asideId="post-title-count"
        aside={
          <span
            id="post-title-count"
            className={
              overLimit
                ? "text-sm font-medium text-red-800 dark:text-red-300"
                : "text-sm text-muted-foreground"
            }
          >
            {title.length}/{TITLE_LIMIT}
          </span>
        }
        onChange={(event) => {
          setTitle(event.target.value);
          setTitleError("");
        }}
      />
      <TextArea
        id="post-content"
        label="Content"
        value={content}
        error={contentError}
        disabled={pending}
        className="min-h-72 font-serif text-base leading-7"
        onChange={(event) => {
          setContent(event.target.value);
          setContentError("");
        }}
      />
      <TagInput id="post-tags" tags={tags} onChange={setTags} />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" className="h-10 px-4" disabled={pending}>
          {pending ? "Saving…" : mode === "edit" ? "Save changes" : "Publish"}
        </Button>
        <Link
          href={cancelHref}
          className={buttonVariants({
            variant: "outline",
            className: "h-10 px-4",
          })}
          aria-disabled={pending}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

export { PostForm };
export type { PostFormValues };
