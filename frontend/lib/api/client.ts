import { useAuthStore } from "@/features/auth/store/auth-store";

import { ApiError } from "./error";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/backend";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Pass null to omit the stored session token. */
  token?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function messagesFrom(message: unknown): string[] {
  if (typeof message === "string" && message.trim()) return [message];
  if (Array.isArray(message)) {
    const items = message.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0,
    );
    if (items.length > 0) return items;
  }
  return ["Request failed."];
}

function errorFrom(payload: unknown, status: number): ApiError {
  if (!isRecord(payload)) return new ApiError(status, ["Request failed."]);
  const statusCode =
    typeof payload.statusCode === "number" ? payload.statusCode : status;
  return new ApiError(statusCode, messagesFrom(payload.message));
}

export function toQuery(
  params: Record<string, string | number | undefined | null>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers();
  if (options.body !== undefined) headers.set("Content-Type", "application/json");

  const storedToken = useAuthStore.getState().access;
  const token = options.token === undefined ? storedToken : options.token;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError(0, [
      "Could not reach the server. Check your connection and try again.",
    ]);
  }

  const text = await response.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      throw new ApiError(response.status || 0, [
        "The server returned an unexpected response.",
      ]);
    }
  }

  if (!response.ok || (isRecord(payload) && payload.success === false)) {
    const error = errorFrom(payload, response.status);
    if (error.statusCode === 401 && options.token === undefined && storedToken) {
      useAuthStore.getState().logout();
    }
    throw error;
  }

  if (!isRecord(payload) || payload.success !== true) {
    throw new ApiError(response.status || 0, [
      "The server returned an unexpected response.",
    ]);
  }

  return payload.data as T;
}
