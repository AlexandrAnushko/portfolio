import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Header } from "@/shared/components/Header/Header";
import { ClientProviders } from "@/lib/providers/ClientProviders";
import "react-loading-skeleton/dist/skeleton.css";
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
  title: "Portfolio",
  description: "Portfolio created using Next JS 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full overflow-y-auto overflow-x-clip`}
      >
        <Suspense>
          <ClientProviders>
            <Header />
            {children}
          </ClientProviders>
        </Suspense>
      </body>
    </html>
  );
}
