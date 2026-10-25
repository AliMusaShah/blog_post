function Bone({ className }: { className: string }) {
  return (
    <span
      className={`block animate-pulse rounded-md bg-muted motion-reduce:animate-none ${className}`}
    />
  );
}

function ArticleSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" className="mx-auto w-full max-w-2xl px-4 py-10">
      <span className="sr-only">Loading post</span>
      <Bone className="h-4 w-28" />
      <Bone className="mt-4 h-12 w-full" />
      <Bone className="mt-3 h-12 w-4/5" />
      <div className="mt-6 flex items-center gap-3">
        <Bone className="size-10 rounded-full" />
        <Bone className="h-4 w-40" />
      </div>
      <div className="mt-8 space-y-3">
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-11/12" />
        <Bone className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export { ArticleSkeleton };
