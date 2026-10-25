"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";

type PaginationBarProps = {
  page: number;
  pageCount: number;
  start: number;
  end: number;
  total: number;
  onPageChange: (page: number) => void;
};

function PaginationBar({
  page,
  pageCount,
  start,
  end,
  total,
  onPageChange,
}: PaginationBarProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between"
    >
      <p className="text-sm text-muted-foreground">
        Showing {start}-{end} of {total}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        <button
          type="button"
          className="inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Previous
        </button>
        {pages.map((number) => (
          <button
            key={number}
            type="button"
            aria-current={number === page ? "page" : undefined}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40",
              number === page
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          className="inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
        >
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

export { PaginationBar };
