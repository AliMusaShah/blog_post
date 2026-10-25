import { cn } from "cn";

import { initials } from "@/lib/format";

type AvatarProps = {
  name: string;
  className?: string;
};

function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export { Avatar };
