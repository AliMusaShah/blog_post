import { cn } from "cn";

import { controlClassName } from "@/components/blog/text-field";

type TextAreaProps = React.ComponentProps<"textarea"> & {
  label: string;
  error?: string;
  labelAction?: React.ReactNode;
};

function TextArea({
  label,
  error,
  labelAction,
  id,
  className,
  ...props
}: TextAreaProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {labelAction}
      </div>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          controlClassName,
          "h-auto min-h-48 resize-y py-3 leading-6",
          error &&
            "border-red-700 focus-visible:border-red-700 focus-visible:ring-red-700/25 dark:border-red-400",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-800 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { TextArea };
