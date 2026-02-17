import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/shared/components/Header/Header";
import { ClientProviders } from "@/lib/providers/ClientProviders";
import "./globals.css";
import { Suspense } from "react";

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
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-full overflow-y-auto overflow-x-clip`}
      >
        <Suspense fallback={"...Loading App"}>
          <ClientProviders>
            <Header />
            {children}
          </ClientProviders>
        </Suspense>
      </body>
    </html>
  );
}
