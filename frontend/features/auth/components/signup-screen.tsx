"use client";

import { useState } from "react";
import Link from "next/link";

import { PasswordField } from "@/components/blog/password-field";
import { TextField } from "@/components/blog/text-field";
import { Button } from "@/components/ui/button";

function SignupScreen() {
  const [name, setName] = useState("Jordan Lee");
  const [email, setEmail] = useState("jordan@example.com");
  const [password, setPassword] = useState("north-star");
  const [confirmPassword, setConfirmPassword] = useState("north-star-1");
  const [notice, setNotice] = useState("");

  const confirmError =
    confirmPassword !== password ? "Passwords do not match." : "";

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h1 className="font-serif text-4xl tracking-tight">Create account</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        A name, an email, and a password are enough to start writing.
      </p>
      {notice ? (
        <p role="status" className="mt-6 rounded-lg border border-border bg-muted px-3 py-2 text-sm">
          {notice}
        </p>
      ) : null}
      <form
        className="mt-6 flex flex-col gap-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (confirmPassword !== password) {
            setNotice("");
            return;
          }
          setNotice("Preview only. No account was created.");
        }}
      >
        <TextField
          id="signup-name"
          label="Name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id="signup-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordField
          id="signup-confirm"
          label="Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          error={confirmError}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setNotice("");
          }}
        />
        <Button type="submit" className="h-11 w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export { SignupScreen };
