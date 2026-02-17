"use client";

import { createContext, useState, useEffect } from "react";

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

  const refresh = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();

      Promise.resolve().then(() => {
        setAuth({
          isAuthorized: data.isAuth,
          userId: data.userId,
        });
      });
    } catch {
      Promise.resolve().then(() => {
        setAuth({
          isAuthorized: null,
          userId: null,
        });
      });
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthorized: auth.isAuthorized, userId: auth.userId, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}
