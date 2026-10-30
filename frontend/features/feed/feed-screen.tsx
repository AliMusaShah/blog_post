"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { ApiAlert } from "@/components/blog/api-alert";
import { EmptyFeed } from "@/components/blog/empty-feed";
import { FeedSkeleton } from "@/components/blog/feed-skeleton";
import { PaginationBar } from "@/components/blog/pagination-bar";
import { PostCard } from "@/components/blog/post-card";
import { TagChip } from "@/components/blog/tag-chip";
import { apiErrorMessages } from "@/lib/api/error";
import { usePosts } from "@/lib/api/queries";
import { PAGE_LIMIT } from "@/lib/api/types";
import { pageWindow } from "@/lib/pagination";
import { useDebouncedValue } from "@/lib/use-debounced-value";
import { useFeedUi } from "@/store/feed-ui-store";

function FeedScreen() {
  const query = useFeedUi((state) => state.query);
  const tag = useFeedUi((state) => state.tag);
  const page = useFeedUi((state) => state.page);
  const setQuery = useFeedUi((state) => state.setQuery);
  const setTag = useFeedUi((state) => state.setTag);
  const setPage = useFeedUi((state) => state.setPage);
  const search = useDebouncedValue(query.trim(), 300);
  const [knownTags, setKnownTags] = useState<string[]>([]);

  const postsQuery = usePosts({
    page,
    limit: PAGE_LIMIT,
    search,
    tag: tag ?? undefined,
  });

  useEffect(() => {
    if (tag || !postsQuery.data) return;
    const names = postsQuery.data.items.flatMap((post) => post.tags);
    if (names.length === 0) return;
    setKnownTags((current) => {
      const merged = new Set([...current, ...names]);
      return [...merged].sort((a, b) => a.localeCompare(b));
    });
  }, [postsQuery.data, tag]);

  const total = postsQuery.data?.total ?? 0;
  const items = postsQuery.data?.items ?? [];
  const { start, end, pageCount } = pageWindow(page, PAGE_LIMIT, items.length, total);

  useEffect(() => {
    if (postsQuery.data && page > pageCount) setPage(pageCount);
  }, [page, pageCount, postsQuery.data, setPage]);

  if (postsQuery.isLoading) return <FeedSkeleton />;

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
            placeholder="Search by title or text"
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </form>
      <div className="mt-4 flex flex-wrap gap-2" role="toolbar" aria-label="Filter by tag">
        <TagChip label="All" pressed={tag === null} onClick={() => setTag(null)} />
        {knownTags.map((name) => (
          <TagChip
            key={name}
            label={name}
            pressed={tag === name}
            onClick={() => setTag(tag === name ? null : name)}
          />
        ))}
        {tag && !knownTags.includes(tag) ? (
          <TagChip label={tag} pressed onClick={() => setTag(null)} />
        ) : null}
      </div>
      {postsQuery.isError ? (
        <div className="mt-8">
          <ApiAlert messages={apiErrorMessages(postsQuery.error)} />
          <button
            type="button"
            className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
            onClick={() => postsQuery.refetch()}
          >
            Try again
          </button>
        </div>
      ) : total === 0 ? (
        search || tag ? (
          <EmptyFeed />
        ) : (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center"
          >
            <h2 className="font-serif text-2xl text-foreground">No posts yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              When someone publishes, it will show up here.
            </p>
          </div>
        )
      ) : (
        <div aria-busy={postsQuery.isFetching}>
          <ul className="mt-8 space-y-4">
            {items.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
          <PaginationBar
            page={Math.min(page, pageCount)}
            pageCount={pageCount}
            start={start}
            end={end}
            total={total}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

export { FeedScreen };
