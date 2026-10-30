function ApiAlert({ messages }: { messages: string[] }) {
  if (messages.length === 0) return null;

  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
    >
      <ul className="space-y-1">
        {messages.map((message, index) => (
          <li key={`${index}-${message}`}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export { ApiAlert };
