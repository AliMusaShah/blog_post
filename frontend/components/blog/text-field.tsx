import { cn } from "cn";

const controlClassName =
  "h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30";

type TextFieldProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
  hint?: string;
  aside?: React.ReactNode;
  asideId?: string;
};

function TextField({
  label,
  error,
  hint,
  aside,
  asideId,
  id,
  className,
  ...props
}: TextFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy =
    [asideId, hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {aside}
      </div>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          controlClassName,
          error &&
            "border-red-700 focus-visible:border-red-700 focus-visible:ring-red-700/25 dark:border-red-400",
          className,
        )}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-800 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { TextField, controlClassName };
