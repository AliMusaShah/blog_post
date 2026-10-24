import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../types/auth-types";



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access: null,
      refresh: null,
      setAuth: ({ user, access, refresh }) =>
        set((s) => ({ user: user ?? s.user, access, refresh: refresh ?? s.refresh })),
      setAccess: (access, refresh) =>
        set((s) => ({ access, refresh: refresh ?? s.refresh })),
      logout: () => set({ user: null, access: null, refresh: null }),
    }),
    { name: "auth" }
  )
);