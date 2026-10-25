"use client";

import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFeedUi } from "@/store/feed-ui-store";

function EmptyFeed() {
  const clearFilters = useFeedUi((state) => state.clearFilters);

  return (
    <div
      role="status"
      className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center"
    >
      <SearchX className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
      <h2 className="mt-4 font-serif text-2xl text-foreground">
        No posts match your search
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Try another title, author, or tag. Clearing the filters brings the full feed back.
      </p>
      <Button
        type="button"
        className="mt-6 h-10 px-4"
        onClick={() => clearFilters()}
      >
        Clear filters
      </Button>
    </div>
  );
}

export { EmptyFeed };
