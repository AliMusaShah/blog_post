import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/lib/api/types";

import type { AuthState } from "../types/auth-types";

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const user = value as Partial<User>;
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    (user.role === "USER" || user.role === "ADMIN") &&
    typeof user.createdAt === "string"
  );
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access: null,
      setAuth: ({ user, access }) => set({ user, access }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, access: null }),
    }),
    {
      name: "auth",
      version: 1,
      partialize: (state) => ({ user: state.user, access: state.access }),
      migrate: (persisted) => {
        const state = persisted as { user?: unknown; access?: unknown };
        const user = isUser(state.user) ? state.user : null;
        const access = user && typeof state.access === "string" ? state.access : null;
        return { user, access };
      },
    },
  ),
);
