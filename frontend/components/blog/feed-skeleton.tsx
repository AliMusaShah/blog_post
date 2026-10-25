function Bone({ className }: { className: string }) {
  return (
    <span
      className={`block animate-pulse rounded-md bg-muted motion-reduce:animate-none ${className}`}
    />
  );
}

function FeedSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12"
    >
      <span className="sr-only">Loading posts</span>
      <Bone className="h-9 w-48" />
      <Bone className="mt-3 h-5 w-72 max-w-full" />
      <Bone className="mt-8 h-11 w-full" />
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Bone key={index} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <div className="mt-8 space-y-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Bone className="size-9 rounded-full" />
              <div className="flex-1">
                <Bone className="h-4 w-32" />
                <Bone className="mt-2 h-3 w-24" />
              </div>
            </div>
            <Bone className="mt-4 h-7 w-4/5" />
            <Bone className="mt-3 h-4 w-full" />
            <Bone className="mt-2 h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export { FeedSkeleton };
