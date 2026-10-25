"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { RoleBadge } from "@/components/blog/role-badge";
import { buttonVariants } from "@/components/ui/button";
import { currentUser, users, type Role, type User } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

function AccessDenied({ onReturn }: { onReturn?: () => void }) {
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
      {onReturn ? (
        <button
          type="button"
          className="mt-4 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
          onClick={onReturn}
        >
          Show admin table
        </button>
      ) : null}
    </div>
  );
}

function RoleSelect({
  user,
  idPrefix,
  onChange,
}: {
  user: User;
  idPrefix: string;
  onChange: (role: Role) => void;
}) {
  const id = `${idPrefix}-role-${user.id}`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        Role for {user.name}
      </label>
      <select
        id={id}
        value={user.role}
        className="h-10 rounded-lg border border-border bg-card px-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30"
        onChange={(event) => onChange(event.target.value as Role)}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
    </div>
  );
}

function BanButton({
  name,
  banned,
  onClick,
}: {
  name: string;
  banned: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={banned}
      aria-label={banned ? `Unban ${name}` : `Ban ${name}`}
      className="inline-flex h-10 items-center justify-center rounded-lg border border-red-700 px-3 text-sm font-medium text-red-800 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-700/40 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-950/40"
      onClick={onClick}
    >
      {banned ? "Unban" : "Ban"}
    </button>
  );
}

function AdminScreen() {
  const [previewDenied, setPreviewDenied] = useState(false);
  const [people, setPeople] = useState<User[]>(() => users.map((user) => ({ ...user })));
  const [banned, setBanned] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return people;
    return people.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(needle),
    );
  }, [people, query]);

  if (currentUser.role !== "ADMIN" || previewDenied) {
    return (
      <AccessDenied
        onReturn={
          currentUser.role === "ADMIN" ? () => setPreviewDenied(false) : undefined
        }
      />
    );
  }

  function setRole(id: string, role: Role) {
    setPeople((current) =>
      current.map((user) => (user.id === id ? { ...user, role } : user)),
    );
  }

  function toggleBan(id: string) {
    setBanned((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight">Users</h1>
          <p className="mt-2 text-muted-foreground">
            Change a role or ban an account. This preview keeps the change on the page only.
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
          onClick={() => setPreviewDenied(true)}
        >
          Preview the non-admin view
        </button>
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
      {visible.length === 0 ? (
        <p role="status" className="mt-8 text-sm text-muted-foreground">
          No users match your search.
        </p>
      ) : (
        <>
          <ul className="mt-6 space-y-3 md:hidden">
            {visible.map((user) => {
              const isBanned = banned.includes(user.id);
              return (
                <li
                  key={user.id}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <RoleBadge role={user.role} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Joined {formatDate(user.createdAt)}
                    {isBanned ? " · Banned" : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <RoleSelect
                      user={user}
                      idPrefix="mobile"
                      onChange={(role) => setRole(user.id, role)}
                    />
                    <BanButton
                      name={user.name}
                      banned={isBanned}
                      onClick={() => toggleBan(user.id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">People who can write on Quill</caption>
              <thead className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium">Email</th>
                  <th scope="col" className="px-4 py-3 font-medium">Role</th>
                  <th scope="col" className="px-4 py-3 font-medium">Joined</th>
                  <th scope="col" className="px-4 py-3 font-medium">Change role</th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    <span className="sr-only">Ban</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((user) => {
                  const isBanned = banned.includes(user.id);
                  return (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <th scope="row" className="px-4 py-3 font-medium">
                        {user.name}
                        {isBanned ? (
                          <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-950 dark:text-red-200">
                            Banned
                          </span>
                        ) : null}
                      </th>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <time dateTime={user.createdAt}>{formatDate(user.createdAt)}</time>
                      </td>
                      <td className="px-4 py-3">
                        <RoleSelect
                          user={user}
                          idPrefix="table"
                          onChange={(role) => setRole(user.id, role)}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <BanButton
                          name={user.name}
                          banned={isBanned}
                          onClick={() => toggleBan(user.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export { AdminScreen };
