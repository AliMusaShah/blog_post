"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import { SessionSync } from "@/features/auth/session-sync";
import { ApiError } from "@/lib/api/error";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: (failureCount, error) => {
              if (error instanceof ApiError && error.statusCode > 0 && error.statusCode < 500) {
                return false;
              }
              return failureCount < 1;
            },
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionSync />
      <div className="flex min-h-svh flex-1 flex-col">{children}</div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}