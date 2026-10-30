import { api } from "./client";
import type { CreateUserInput, LoginResult, User } from "./types";

export function login(input: { email: string; password: string }) {
  return api<LoginResult>("/auth/login", {
    method: "POST",
    body: input,
    token: null,
  });
}

export function signup(input: CreateUserInput) {
  return api<User>("/auth/signup", {
    method: "POST",
    body: input,
    token: null,
  });
}
