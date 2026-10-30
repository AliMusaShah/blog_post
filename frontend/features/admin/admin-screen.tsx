"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { ApiAlert } from "@/components/blog/api-alert";
import { PaginationBar } from "@/components/blog/pagination-bar";
import { RoleBadge } from "@/components/blog/role-badge";
import { buttonVariants } from "@/components/ui/button";
import { useAuthReady } from "@/features/auth/use-auth-ready";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { apiErrorMessages } from "@/lib/api/error";
import { useUsers } from "@/lib/api/queries";
import { PAGE_LIMIT } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { pageWindow } from "@/lib/pagination";
import { useDebouncedValue } from "@/lib/use-debounced-value";

function AccessDenied() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-24 text-center">
      <LockKeyhole className="size-8 text-muted-foreground" aria-hidden="true" />
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-foreground">
        You do not have access
      </h1>
      <p className="mt-3 text-base leading-7 text-muted-foreground">
        This page is for administrators. Your account cannot manage users.
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-8 h-10 px-4" })}>
        Back to the feed
      </Link>
    </div>
  );
}

function AdminScreen() {
  const ready = useAuthReady();
  const user = useAuthStore((state) => state.user);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebouncedValue(query.trim(), 300);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const usersQuery = useUsers(
    { page, limit: PAGE_LIMIT, search },
    { enabled: ready && user?.role === "ADMIN" },
  );

  if (!ready) {
    return (
      <div aria-busy="true" className="mx-auto w-full max-w-5xl px-4 py-16">
        <span className="sr-only">Loading users</span>
      </div>
    );
  }

  if (user?.role !== "ADMIN") return <AccessDenied />;

  const items = usersQuery.data?.items ?? [];
  const total = usersQuery.data?.total ?? 0;
  const { start, end, pageCount } = pageWindow(page, PAGE_LIMIT, items.length, total);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
      <div>
        <h1 className="font-serif text-4xl tracking-tight">Users</h1>
        <p className="mt-2 text-muted-foreground">
          People with accounts. Role changes are not available from this page.
        </p>
      </div>
      <form className="mt-8 max-w-md" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="user-search" className="text-sm font-medium">
          Search users
        </label>
        <input
          id="user-search"
          type="search"
          value={query}
          placeholder="Name or email"
          autoComplete="off"
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30"
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      {usersQuery.isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading users…</p>
      ) : usersQuery.isError ? (
        <div className="mt-8">
          <ApiAlert messages={apiErrorMessages(usersQuery.error)} />
          <button
            type="button"
            className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
            onClick={() => usersQuery.refetch()}
          >
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <p role="status" className="mt-8 text-sm text-muted-foreground">
          No users match your search.
        </p>
      ) : (
        <>
          <ul className="mt-6 space-y-3 md:hidden">
            {items.map((person) => (
              <li
                key={person.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/users/${person.id}`}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {person.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{person.email}</p>
                  </div>
                  <RoleBadge role={person.role} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Joined {formatDate(person.createdAt)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">People with accounts</caption>
              <thead className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium">Email</th>
                  <th scope="col" className="px-4 py-3 font-medium">Role</th>
                  <th scope="col" className="px-4 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {items.map((person) => (
                  <tr key={person.id} className="border-b border-border last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium">
                      <Link
                        href={`/users/${person.id}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {person.name}
                      </Link>
                    </th>
                    <td className="px-4 py-3 text-muted-foreground">{person.email}</td>
                    <td className="px-4 py-3">
                      <RoleBadge role={person.role} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <time dateTime={person.createdAt}>{formatDate(person.createdAt)}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
}

export { AdminScreen };
