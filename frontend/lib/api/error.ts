export class ApiError extends Error {
  readonly statusCode: number;
  readonly messages: string[];

  constructor(statusCode: number, messages: string[]) {
    super(messages.join("\n"));
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.messages = messages.length > 0 ? messages : ["Request failed."];
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isNotFound(error: unknown): boolean {
  return isApiError(error) && error.statusCode === 404;
}

export function apiErrorMessages(error: unknown): string[] {
  if (isApiError(error)) return error.messages;
  if (error instanceof Error && error.message.trim()) return [error.message];
  return ["Something went wrong. Please try again."];
}
