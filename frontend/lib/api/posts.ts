import { api, toQuery } from "./client";
import type {
  CreatePostInput,
  Page,
  Post,
  PostComment,
  PostsQuery,
  UpdatePostInput,
} from "./types";

function asId(value: unknown) {
  return value === undefined || value === null ? "" : String(value);
}

function normalizeComment(comment: PostComment): PostComment {
  return {
    ...comment,
    id: asId(comment.id),
    author: { ...comment.author, id: asId(comment.author?.id) },
  };
}

export function normalizePost(post: Post): Post {
  return {
    ...post,
    id: asId(post.id),
    authorId: asId(post.authorId),
    author: {
      id: asId(post.author?.id),
      name: post.author?.name ?? "",
    },
    tags: post.tags ?? [],
    commentCount: post.commentCount ?? 0,
    comments: post.comments?.map(normalizeComment),
  };
}

export function listPosts(query: PostsQuery = {}) {
  return api<Page<Post>>(`/posts${toQuery(query)}`).then((page) => ({
    ...page,
    items: page.items.map(normalizePost),
  }));
}

export function getPost(id: string) {
  return api<Post>(`/posts/${encodeURIComponent(id)}`).then(normalizePost);
}

export function createPost(input: CreatePostInput) {
  return api<Post>("/posts", { method: "POST", body: input }).then(normalizePost);
}

export function updatePost(id: string, input: UpdatePostInput) {
  return api<Post>(`/posts/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: input,
  }).then(normalizePost);
}

export function deletePost(id: string) {
  return api<void>(`/posts/${encodeURIComponent(id)}`, { method: "DELETE" });
}
