"use client";

import { useEffect } from "react";
import { Search } from "lucide-react";

import { EmptyFeed } from "@/components/blog/empty-feed";
import { PaginationBar } from "@/components/blog/pagination-bar";
import { PostCard } from "@/components/blog/post-card";
import { TagChip } from "@/components/blog/tag-chip";
import { posts, tags } from "@/data/mock-data";
import { useFeedUi } from "@/store/feed-ui-store";

const PAGE_SIZE = 5;

function FeedScreen() {
  const query = useFeedUi((state) => state.query);
  const tag = useFeedUi((state) => state.tag);
  const page = useFeedUi((state) => state.page);
  const setQuery = useFeedUi((state) => state.setQuery);
  const setTag = useFeedUi((state) => state.setTag);
  const setPage = useFeedUi((state) => state.setPage);

  const normalized = query.trim().toLowerCase();
  const filtered = posts.filter((post) => {
    const matchesTag = !tag || post.tags.includes(tag);
    if (!matchesTag) return false;
    if (!normalized) return true;
    const haystack = [post.title, post.content, post.author.name, ...post.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  useEffect(() => {
    if (filtered.length > 0 && page > pageCount) setPage(pageCount);
  }, [filtered.length, page, pageCount, setPage]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const start = filtered.length === 0 ? 0 : startIndex + 1;
  const end = startIndex + visible.length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">
        Latest writing
      </h1>
      <p className="mt-2 max-w-xl text-base leading-7 text-muted-foreground">
        Notes on the tools we use to ship software, from the people writing them.
      </p>
      <form
        role="search"
        className="mt-8"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="feed-search" className="text-sm font-medium text-foreground">
          Search
        </label>
        <div className="relative mt-1.5">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="feed-search"
            type="search"
            value={query}
            placeholder="Search by title, author, or tag"
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </form>
      <div className="mt-4 flex flex-wrap gap-2" role="toolbar" aria-label="Filter by tag">
        <TagChip label="All" pressed={tag === null} onClick={() => setTag(null)} />
        {tags.map((item) => (
          <TagChip
            key={item.id}
            label={item.name}
            pressed={tag === item.name}
            onClick={() => setTag(tag === item.name ? null : item.name)}
          />
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyFeed />
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {visible.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
          <PaginationBar
            page={currentPage}
            pageCount={pageCount}
            start={start}
            end={end}
            total={filtered.length}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export { FeedScreen };
