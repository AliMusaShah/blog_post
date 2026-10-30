import { cn } from "cn";

import type { Role } from "@/lib/api/types";

function RoleBadge({ role, className }: { role: Role; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide",
        role === "ADMIN"
          ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200"
          : "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
        className,
      )}
    >
      {role}
    </span>
  );
}

export { RoleBadge };
