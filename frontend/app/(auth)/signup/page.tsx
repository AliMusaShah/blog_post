import type { Metadata } from "next";

import { SignupScreen } from "@/features/auth/components/signup-screen";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return <SignupScreen />;
}
