"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "cn";

import { controlClassName } from "@/components/blog/text-field";

type PasswordFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  label: string;
  error?: string;
};

function PasswordField({
  label,
  error,
  id,
  className,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            controlClassName,
            "pr-11",
            error &&
              "border-red-700 focus-visible:border-red-700 focus-visible:ring-red-700/25 dark:border-red-400",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          aria-pressed={visible}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-800 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { PasswordField };
