import Link from "next/link";
import { cn } from "cn";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-lg bg-primary font-serif text-base text-primary-foreground"
      >
        Q
      </span>
      Quill
    </Link>
  );
}

export { Logo };
