import { api, toQuery } from "./client";
import type {
  CreateUserInput,
  Page,
  UpdateUserInput,
  User,
  UserDetail,
  UsersQuery,
} from "./types";

function asId(value: unknown) {
  return value === undefined || value === null ? "" : String(value);
}

function normalizeUser<T extends User>(user: T): T {
  return { ...user, id: asId(user.id) };
}

export function listUsers(query: UsersQuery = {}) {
  return api<Page<User>>(`/users${toQuery(query)}`).then((page) => ({
    ...page,
    items: page.items.map((user) => normalizeUser(user)),
  }));
}

export function getUser(id: string, token?: string | null) {
  return api<UserDetail>(`/users/${encodeURIComponent(id)}`, { token }).then(
    (user) => ({
      ...normalizeUser(user),
      posts: (user.posts ?? []).map((post) => ({ ...post, id: asId(post.id) })),
      comments: (user.comments ?? []).map((comment) => ({
        ...comment,
        id: asId(comment.id),
      })),
    }),
  );
}

export function createUser(input: CreateUserInput) {
  return api<User>("/users", { method: "POST", body: input, token: null }).then(
    normalizeUser,
  );
}

export function updateUser(id: string, input: UpdateUserInput) {
  return api<User>(`/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: input,
  }).then(normalizeUser);
}

export function deleteUser(id: string) {
  return api<void>(`/users/${encodeURIComponent(id)}`, { method: "DELETE" });
}
