"use client";

import { SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/lib/antdTheme";
import { AuthProvider } from "./AuthContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <SessionProvider>
        <AuthProvider>
          <ConfigProvider theme={antdTheme}>
            {children}
            <Toaster richColors position="bottom-right" />
          </ConfigProvider>
        </AuthProvider>
      </SessionProvider>
    </AntdRegistry>
  );
}
