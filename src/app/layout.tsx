import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Header } from "@/shared/components/Header";
import { antdTheme } from "@/lib/antdTheme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio App",
  description: "Portfolio created using Next JS 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen flex flex-col`}
      >
        <AntdRegistry>
          <ConfigProvider theme={antdTheme}>
            <Header />
            {children}
          </ConfigProvider>
        </AntdRegistry>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
