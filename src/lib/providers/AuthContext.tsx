"use client";

import { createContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuthorized: boolean | null;
  userId: string | null;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();

      Promise.resolve().then(() => {
        setIsAuthorized(data.isAuth);
        setUserId(data.userId);
      });
    } catch {
      Promise.resolve().then(() => {
        setIsAuthorized(false);
        setUserId(null);
      });
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, userId, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
