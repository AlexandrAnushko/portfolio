"use client";

import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { antdTheme } from "@/lib/antdTheme";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>
      {children}
      <Toaster richColors position="bottom-right" />
    </ConfigProvider>
  );
}
