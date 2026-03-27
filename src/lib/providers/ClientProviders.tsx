"use client";

import { SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <SessionProvider>
        <AuthProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </AuthProvider>
      </SessionProvider>
    </AntdRegistry>
  );
}
