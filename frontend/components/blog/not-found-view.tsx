import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

function NotFoundView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-primary">404</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-base leading-7 text-muted-foreground">
        That link does not lead to a post, a person, or any other page on Quill.
      </p>
      <Link
        href="/"
        className={buttonVariants({
          className: "mt-8 h-10 px-4",
        })}
      >
        Back to the feed
      </Link>
    </div>
  );
}

export { NotFoundView };
