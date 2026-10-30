"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPost, deletePost, getPost, listPosts, updatePost } from "./posts";
import type { CreatePostInput, PostsQuery, UpdatePostInput, UpdateUserInput, UsersQuery } from "./types";
import { deleteUser, getUser, listUsers, updateUser } from "./users";

export const queryKeys = {
  posts: (params: PostsQuery) => ["posts", params] as const,
  post: (id: string) => ["post", id] as const,
  users: (params: UsersQuery) => ["users", params] as const,
  user: (id: string) => ["user", id] as const,
};

export function usePosts(params: PostsQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.posts(params),
    queryFn: () => listPosts(params),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
  });
}

export function usePost(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => getPost(id),
    enabled: (options?.enabled ?? true) && id.length > 0,
  });
}

export function useUsers(params: UsersQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.users(params),
    queryFn: () => listUsers(params),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
  });
}

export function useUser(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => getUser(id),
    enabled: (options?.enabled ?? true) && id.length > 0,
  });
}

function useInvalidatePosts() {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
    await queryClient.invalidateQueries({ queryKey: ["post"] });
  };
}

export function useCreatePost() {
  const invalidate = useInvalidatePosts();
  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: invalidate,
  });
}

export function useUpdatePost(id: string) {
  const invalidate = useInvalidatePosts();
  return useMutation({
    mutationFn: (input: UpdatePostInput) => updatePost(id, input),
    onSuccess: invalidate,
  });
}

export function useDeletePost() {
  const invalidate = useInvalidatePosts();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: invalidate,
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(id, input),
    onSuccess: async (user) => {
      queryClient.setQueryData(queryKeys.user(id), (current) =>
        current ? { ...current, ...user } : current,
      );
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
