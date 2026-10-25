"use client";

import { useState } from "react";
import Link from "next/link";

import { PasswordField } from "@/components/blog/password-field";
import { TextField } from "@/components/blog/text-field";
import { Button, buttonVariants } from "@/components/ui/button";

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.44a5.51 5.51 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.65z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.86-3c-1.07.72-2.45 1.15-4.09 1.15-3.14 0-5.8-2.12-6.75-4.97H1.26v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.27A7.2 7.2 0 0 1 4.87 12c0-.79.14-1.55.38-2.27V6.64H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.36l3.99-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.14 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.64l3.99 3.09C6.2 6.88 8.86 4.75 12 4.75z"
      />
    </svg>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("maya.ellison@quill.dev");
  const [password, setPassword] = useState("wrong-password");
  const [showError, setShowError] = useState(true);
  const [googleNotice, setGoogleNotice] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h1 className="font-serif text-4xl tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Continue with Google, or create an account yourself.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
          onClick={() => setGoogleNotice(true)}
        >
          <GoogleMark />
          Sign in with Google
        </button>
        {googleNotice ? (
          <p role="status" className="text-sm text-muted-foreground">
            Google sign-in is not connected in this preview.
          </p>
        ) : null}
        <Link
          href="/signup"
          className={buttonVariants({
            variant: "outline",
            className: "h-11 w-full",
          })}
        >
          Sign up manually
        </Link>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      {showError ? (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
        >
          Invalid email or password
        </p>
      ) : null}
      <form
        className="mt-6 flex flex-col gap-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setShowError(true);
        }}
      >
        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" className="h-11 w-full">
          Log in
        </Button>
      </form>
    </div>
  );
}

export { LoginScreen };
