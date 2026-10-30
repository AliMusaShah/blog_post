"use client";

import { useEffect } from "react";

import { isApiError } from "@/lib/api/error";
import { userIdFromAccessToken } from "@/lib/api/token";
import { getUser } from "@/lib/api/users";

import { useAuthStore } from "./store/auth-store";

function SessionSync() {
  const access = useAuthStore((state) => state.access);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!access) return;
    const userId = userIdFromAccessToken(access);
    if (!userId) {
      logout();
      return;
    }

    let cancelled = false;
    getUser(userId)
      .then((user) => {
        if (!cancelled) {
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          });
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (isApiError(error) && (error.statusCode === 401 || error.statusCode === 404)) {
          logout();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [access, logout, setUser]);

  return null;
}

export { SessionSync };
