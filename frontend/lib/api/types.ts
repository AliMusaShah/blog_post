export type Role = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type UserPostSummary = {
  id: string;
  title: string;
  createdAt: string;
};

export type UserDetail = User & {
  posts: UserPostSummary[];
  comments: { id: string; text: string; createdAt: string }[];
};

export type PostAuthor = {
  id: string;
  name: string;
};

export type PostComment = {
  id: string;
  text: string;
  createdAt: string;
  author: PostAuthor;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
  tags: string[];
  commentCount: number;
  comments?: PostComment[];
};

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type LoginResult = {
  accessToken: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
};

export type CreatePostInput = {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
};

export type UpdatePostInput = {
  title?: string;
  content?: string;
  tags?: string[];
};

export type PostsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  authorId?: string;
};

export type UsersQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export const PAGE_LIMIT = 10;
