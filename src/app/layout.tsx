import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "invoice-web",
  description: "노션 기반 견적서 공유 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col bg-white text-foreground dark:bg-zinc-950`}
      >
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              invoice-web
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-6 text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} invoice-web
          </div>
        </footer>
      </body>
    </html>
  );
}
