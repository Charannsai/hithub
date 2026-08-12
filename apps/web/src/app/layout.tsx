import React from "react";
import "./globals.css";
import Link from "next/link";
import { Github } from "lucide-react";
import Providers from "./providers";
import Header from "@/components/Header";

export const metadata = {
  title: "Hithub · Open Source GitHub Alternative",
  description:
    "Complete open-source software development platform. Self-hosted GitHub alternative with real Git hosting, issues, PRs, and AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen flex flex-col antialiased selection:bg-[#58a6ff] selection:text-white">
        <Providers>
          <Header />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-[#30363d] bg-[#0d1117] px-6 py-6 text-xs text-[#8b949e] flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
            <div className="flex items-center space-x-3">
              <Github className="w-6 h-6 fill-[#8b949e]" />
              <span>© 2026 Hithub — Open Source GitHub Alternative</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[#58a6ff]">
              <Link href="/" className="hover:underline">
                Terms
              </Link>
              <Link href="/" className="hover:underline">
                Privacy
              </Link>
              <Link href="/" className="hover:underline">
                Security
              </Link>
              <Link href="/" className="hover:underline">
                Status
              </Link>
              <Link href="/import" className="hover:underline">
                Import
              </Link>
              <Link href="/ai" className="hover:underline">
                AI Sandbox
              </Link>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
