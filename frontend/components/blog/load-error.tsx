import { ApiAlert } from "@/components/blog/api-alert";
import { Button } from "@/components/ui/button";

function LoadError({
  title,
  messages,
  onRetry,
}: {
  title: string;
  messages: string[];
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="font-serif text-4xl tracking-tight text-foreground">{title}</h1>
      <div className="mt-4 w-full text-left">
        <ApiAlert messages={messages} />
      </div>
      {onRetry ? (
        <Button type="button" className="mt-6 h-10 px-4" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export { LoadError };
