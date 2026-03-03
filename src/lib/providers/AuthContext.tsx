"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  startTransition,
} from "react";

type AuthContextType = {
  isAuthorized: boolean | null;
  userId: string | null;
  refresh: () => Promise<void>;
};

type Auth = {
  isAuthorized: boolean | null;
  userId: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    isAuthorized: null,
    userId: null,
  });

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();

      startTransition(() => {
        setAuth({
          isAuthorized: data.isAuth,
          userId: data.userId,
        });
      });
    } catch {
      startTransition(() => {
        setAuth({
          isAuthorized: null,
          userId: null,
        });
      });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{ isAuthorized: auth.isAuthorized, userId: auth.userId, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}
