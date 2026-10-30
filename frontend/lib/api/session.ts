import { useAuthStore } from "@/features/auth/store/auth-store";

import { login, signup } from "./auth";
import { ApiError, isApiError } from "./error";
import { userIdFromAccessToken } from "./token";
import type { CreateUserInput, User } from "./types";
import { getUser } from "./users";

function toSessionUser(user: User): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function establishSession(email: string, password: string) {
  const { accessToken } = await login({ email, password });
  const userId = userIdFromAccessToken(accessToken);
  if (!userId) {
    throw new ApiError(0, [
      "Sign-in succeeded, but the session token could not be read.",
    ]);
  }

  const user = toSessionUser(await getUser(userId, accessToken));
  useAuthStore.getState().setAuth({ user, access: accessToken });
  return user;
}

export async function registerAccount(input: CreateUserInput) {
  await signup(input);

  try {
    return await establishSession(input.email, input.password);
  } catch (error) {
    const details = isApiError(error)
      ? error.messages
      : ["Sign-in failed after the account was created."];
    throw new ApiError(isApiError(error) ? error.statusCode : 0, [
      "Your account was created, but signing in failed. Use the sign-in page to continue.",
      ...details,
    ]);
  }
}
