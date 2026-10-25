"use client";

import { useEffect, useId, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { buttonVariants } from "@/components/ui/button";
import { currentUser } from "@/data/mock-data";
import { useFeedUi } from "@/store/feed-ui-store";

function SearchField({ id }: { id: string }) {
  const query = useFeedUi((state) => state.query);
  const setQuery = useFeedUi((state) => state.setQuery);
  const router = useRouter();

  return (
    <form
      role="search"
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/");
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search posts
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={query}
        placeholder="Search posts"
        autoComplete="off"
        className="h-10 w-full rounded-full border border-border bg-card pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30"
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useLayoutEffect(() => {
    return () => setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-4">
        <Logo />
        <div className="hidden min-w-0 flex-1 md:block md:max-w-md">
          <SearchField id="site-search" />
        </div>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/assistant"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
          >
            Assistant
          </Link>
          {currentUser.role === "ADMIN" ? (
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            >
              Admin
            </Link>
          ) : null}
          <Link
            href="/posts/new"
            className={buttonVariants({ className: "h-10 px-4" })}
          >
            Write post
          </Link>
          <UserMenu />
        </div>
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div id={menuId} className="border-t border-border px-4 py-4 md:hidden">
          <SearchField id="mobile-search" />
          <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile">
            <Link
              href="/assistant"
              className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Assistant
            </Link>
            <Link
              href="/posts/new"
              className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Write post
            </Link>
            {currentUser.role === "ADMIN" ? (
              <Link
                href="/admin"
                className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            ) : null}
            <Link
              href={`/users/${currentUser.id}`}
              className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              Log out
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export { SiteHeader };
