"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { Avatar } from "@/components/blog/avatar";
import { DeletePostDialog } from "@/components/blog/delete-post-dialog";
import { LoadError } from "@/components/blog/load-error";
import { NotFoundView } from "@/components/blog/not-found-view";
import { PaginationBar } from "@/components/blog/pagination-bar";
import { PostCard } from "@/components/blog/post-card";
import { RoleBadge } from "@/components/blog/role-badge";
import { TextField } from "@/components/blog/text-field";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { ApiAlert } from "@/components/blog/api-alert";
import { apiErrorMessages, isNotFound } from "@/lib/api/error";
import { useDeleteUser, usePosts, useUpdateUser, useUser } from "@/lib/api/queries";
import { PAGE_LIMIT } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { pageWindow } from "@/lib/pagination";

function ProfileScreen({ userId }: { userId: string }) {
  const router = useRouter();
  const sessionUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const userQuery = useUser(userId);
  const [page, setPage] = useState(1);
  const postsQuery = usePosts(
    { page, limit: PAGE_LIMIT, authorId: userId },
    { enabled: userQuery.isSuccess },
  );
  const updateUser = useUpdateUser(userId);
  const removeUser = useDeleteUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "" });
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const profile = userQuery.data;
  const isOwner = sessionUser?.id === profile?.id;

  useEffect(() => {
    setPage(1);
  }, [userId]);

  useEffect(() => {
    if (!profile || !isOwner) return;
    setName(profile.name);
    setEmail(profile.email);
  }, [profile, isOwner]);

  if (userQuery.isLoading) return <ArticleSkeleton />;
  if (isNotFound(userQuery.error)) return <NotFoundView />;
  if (userQuery.isError || !profile) {
    return (
      <LoadError
        title="Could not load this profile"
        messages={apiErrorMessages(userQuery.error)}
        onRetry={() => userQuery.refetch()}
      />
    );
  }

  const account = profile;

  const items = postsQuery.data?.items ?? [];
  const total = postsQuery.data?.total ?? 0;
  const { start, end, pageCount } = pageWindow(page, PAGE_LIMIT, items.length, total);

  async function onSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextNameError = name.trim()
      ? name.trim().length > 255
        ? "Name must be at most 255 characters."
        : ""
      : "Enter your name.";
    const nextEmailError = email.trim()
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? ""
        : "Enter a valid email."
      : "Enter your email.";
    setFieldErrors({ name: nextNameError, email: nextEmailError });
    setSaved(false);
    if (nextNameError || nextEmailError) return;

    try {
      const updated = await updateUser.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });
      if (sessionUser?.id === updated.id) setUser(updated);
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  async function confirmDelete() {
    try {
      await removeUser.mutateAsync(account.id);
      if (sessionUser?.id === account.id) logout();
      setDeleteOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      // The dialog renders the mutation error.
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <header className="flex flex-col items-start gap-5 border-b border-border pb-8 sm:flex-row sm:items-center">
        <Avatar name={profile.name} className="size-24 text-2xl" />
        <div className="min-w-0">
          <h1 className="font-serif text-4xl tracking-tight text-foreground">
            {profile.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{profile.email}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RoleBadge role={profile.role} />
            <p className="text-sm text-muted-foreground">
              Joined <time dateTime={profile.createdAt}>{formatDate(profile.createdAt)}</time>
            </p>
          </div>
        </div>
      </header>

      {isOwner ? (
        <section className="mt-8" aria-labelledby="account-settings">
          <h2 id="account-settings" className="font-serif text-2xl tracking-tight">
            Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You can change your name and email. Password changes are not available.
          </p>
          <form className="mt-5 flex max-w-md flex-col gap-5" noValidate onSubmit={onSave}>
            {updateUser.isError ? (
              <ApiAlert messages={apiErrorMessages(updateUser.error)} />
            ) : null}
            {saved ? (
              <p role="status" className="rounded-lg border border-border bg-muted px-3 py-2 text-sm">
                Saved.
              </p>
            ) : null}
            <TextField
              id="profile-name"
              label="Name"
              autoComplete="name"
              value={name}
              error={fieldErrors.name}
              disabled={updateUser.isPending}
              onChange={(event) => {
                setName(event.target.value);
                setFieldErrors((current) => ({ ...current, name: "" }));
                setSaved(false);
              }}
            />
            <TextField
              id="profile-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              error={fieldErrors.email}
              disabled={updateUser.isPending}
              onChange={(event) => {
                setEmail(event.target.value);
                setFieldErrors((current) => ({ ...current, email: "" }));
                setSaved(false);
              }}
            />
            <div className="flex flex-wrap gap-3">
              <Button type="submit" className="h-10 px-4" disabled={updateUser.isPending}>
                {updateUser.isPending ? "Saving…" : "Save account"}
              </Button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-red-700 px-4 text-sm font-medium text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-700/40"
                onClick={() => setDeleteOpen(true)}
              >
                Delete account
              </button>
            </div>
          </form>
          <DeletePostDialog
            open={deleteOpen}
            title="Delete this account?"
            description="This cannot be undone. An account that still has posts cannot be deleted."
            confirmLabel="Delete account"
            pending={removeUser.isPending}
            messages={removeUser.isError ? apiErrorMessages(removeUser.error) : []}
            onOpenChange={(open) => {
              setDeleteOpen(open);
              if (!open) removeUser.reset();
            }}
            onConfirm={confirmDelete}
          />
        </section>
      ) : null}

      <section className="mt-8" aria-labelledby="profile-posts">
        <h2 id="profile-posts" className="font-serif text-2xl tracking-tight">
          Posts
        </h2>
        {postsQuery.isLoading ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading posts…</p>
        ) : postsQuery.isError ? (
          <div className="mt-4">
            <ApiAlert messages={apiErrorMessages(postsQuery.error)} />
            <button
              type="button"
              className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
              onClick={() => postsQuery.refetch()}
            >
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          <>
            <ul className="mt-4 space-y-4">
              {items.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
            <PaginationBar
              page={Math.min(page, pageCount)}
              pageCount={pageCount}
              start={start}
              end={end}
              total={total}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </div>
  );
}

export { ProfileScreen };
