import type { Metadata } from "next";

import { LoginCard, LoginIntro } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in | Parhai.pk",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh bg-board">
      <div className="flex flex-1 items-center justify-center rounded-tl-md border border-tertiary-fixed/42 bg-chat-area px-5 py-10">
        <div className="flex w-full max-w-296 flex-col items-center gap-7 self-stretch lg:flex-row lg:items-stretch">
          <LoginIntro />
          <div className="flex w-full justify-center lg:flex-1 lg:self-center">
            <LoginCard />
          </div>
        </div>
      </div>
    </main>
  );
}
