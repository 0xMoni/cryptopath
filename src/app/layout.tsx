import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoPath — Zero to First Investment",
  description:
    "Learn crypto from scratch. No jargon, no fear, no selling. Just a clear path to your first confident investment.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col pb-16">
        <main className="flex-1">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
