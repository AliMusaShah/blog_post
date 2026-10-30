import type { User } from "@/lib/api/types";

export type { User };

export type AuthState = {
  user: User | null;
  access: string | null;
  setAuth: (data: { user: User; access: string }) => void;
  setUser: (user: User) => void;
  logout: () => void;
};
