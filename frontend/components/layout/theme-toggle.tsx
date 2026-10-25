"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { applyDarkTheme, readDarkTheme, subscribeToTheme } from "@/lib/theme";

function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeToTheme, readDarkTheme, () => false);

  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
      onClick={() => applyDarkTheme(!dark)}
    >
      {dark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

export { ThemeToggle };
