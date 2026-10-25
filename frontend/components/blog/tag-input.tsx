"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "cn";

import { controlClassName } from "@/components/blog/text-field";

type TagInputProps = {
  id: string;
  tags: string[];
  onChange: (tags: string[]) => void;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "")
    .slice(0, 24);
}

function TagInput({ id, tags, onChange }: TagInputProps) {
  const [draft, setDraft] = useState("");
  const hintId = `${id}-hint`;

  function addFrom(raw: string) {
    const next = raw
      .split(",")
      .map((part) => normalize(part))
      .filter(Boolean);
    if (next.length === 0) {
      setDraft("");
      return;
    }
    const merged = [...tags];
    for (const name of next) {
      if (!merged.includes(name) && merged.length < 8) merged.push(name);
    }
    onChange(merged);
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        Tags
      </label>
      <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-2 py-2 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/30">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-muted py-0.5 pr-1 pl-2.5 text-sm text-foreground"
          >
            {tag}
            <button
              type="button"
              className="rounded-full p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Remove ${tag}`}
              onClick={() => onChange(tags.filter((item) => item !== tag))}
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          aria-describedby={hintId}
          placeholder={tags.length === 0 ? "nestjs, prisma" : "Add a tag"}
          className={cn(
            controlClassName,
            "h-8 min-w-32 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0",
          )}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addFrom(draft);
            }
            if (event.key === "Backspace" && draft === "" && tags.length > 0) {
              onChange(tags.slice(0, -1));
            }
          }}
          onBlur={() => {
            if (draft.trim()) addFrom(draft);
          }}
        />
      </div>
      <p id={hintId} className="text-sm text-muted-foreground">
        Press Enter to add a tag. Tags are short lowercase names.
      </p>
    </div>
  );
}

export { TagInput };
