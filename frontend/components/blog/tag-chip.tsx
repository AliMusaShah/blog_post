"use client";

import { cn } from "cn";

type TagChipProps = {
  label: string;
  pressed?: boolean;
  onClick: () => void;
};

function TagChip({ label, pressed = false, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40",
        pressed
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}

export { TagChip };
