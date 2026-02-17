"use client";

import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/lib/antdTheme";
import { AuthProvider } from "./AuthContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ConfigProvider theme={antdTheme}>
        {children}
        <Toaster richColors position="bottom-right" />
      </ConfigProvider>
    </AuthProvider>
  );
}
