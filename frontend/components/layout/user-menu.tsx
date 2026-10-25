"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

import { Avatar } from "@/components/blog/avatar";
import { currentUser } from "@/data/mock-data";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useLayoutEffect(() => {
    return () => setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <Avatar name={currentUser.name} />
        <span className="hidden text-sm font-medium sm:inline">{currentUser.name}</span>
        <span className="sr-only">Account menu</span>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-40 mt-2 w-44 rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          <Link
            role="menuitem"
            href={`/users/${currentUser.id}`}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            role="menuitem"
            href="/login"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            onClick={() => setOpen(false)}
          >
            Log out
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export { UserMenu };
