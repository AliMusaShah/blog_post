"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "./store/auth-store";

export function useAuthReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setReady(true);
      return;
    }
    return useAuthStore.persist.onFinishHydration(() => setReady(true));
  }, []);

  return ready;
}
