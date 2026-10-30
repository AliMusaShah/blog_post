"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ApiAlert } from "@/components/blog/api-alert";
import { PasswordField } from "@/components/blog/password-field";
import { TextField } from "@/components/blog/text-field";
import { Button } from "@/components/ui/button";
import { apiErrorMessages } from "@/lib/api/error";
import { registerAccount } from "@/lib/api/session";
import { safeNext } from "@/lib/safe-next";

function passwordError(password: string) {
  if (!password) return "Enter a password.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password.length > 72) return "Password must be at most 72 characters.";
  if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
    return "Password must contain at least one letter and one number.";
  }
  return "";
}

function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [messages, setMessages] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  const confirmError =
    confirmPassword && confirmPassword !== password ? "Passwords do not match." : "";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    const nextPasswordError = passwordError(password);
    const nextConfirmError =
      confirmPassword !== password ? "Passwords do not match." : "";
    setFieldErrors({
      name: nextNameError,
      email: nextEmailError,
      password: nextPasswordError,
    });
    setMessages(nextConfirmError ? [nextConfirmError] : []);
    if (nextNameError || nextEmailError || nextPasswordError || nextConfirmError) return;

    setPending(true);
    try {
      await registerAccount({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      const next = safeNext(new URLSearchParams(window.location.search).get("next"));
      router.push(next);
      router.refresh();
    } catch (error) {
      setMessages(apiErrorMessages(error));
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h1 className="font-serif text-4xl tracking-tight">Create account</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        A name, an email, and a password are enough to start writing.
      </p>
      {messages.length > 0 ? (
        <div className="mt-6">
          <ApiAlert messages={messages} />
        </div>
      ) : null}
      <form className="mt-6 flex flex-col gap-5" noValidate onSubmit={onSubmit}>
        <TextField
          id="signup-name"
          label="Name"
          autoComplete="name"
          value={name}
          error={fieldErrors.name}
          disabled={pending}
          onChange={(event) => {
            setName(event.target.value);
            setFieldErrors((current) => ({ ...current, name: "" }));
            setMessages([]);
          }}
        />
        <TextField
          id="signup-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          error={fieldErrors.email}
          disabled={pending}
          onChange={(event) => {
            setEmail(event.target.value);
            setFieldErrors((current) => ({ ...current, email: "" }));
            setMessages([]);
          }}
        />
        <PasswordField
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          value={password}
          error={fieldErrors.password}
          disabled={pending}
          onChange={(event) => {
            setPassword(event.target.value);
            setFieldErrors((current) => ({ ...current, password: "" }));
            setMessages([]);
          }}
        />
        <PasswordField
          id="signup-confirm"
          label="Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          error={confirmError}
          disabled={pending}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setMessages([]);
          }}
        />
        <Button type="submit" className="h-11 w-full" disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
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
