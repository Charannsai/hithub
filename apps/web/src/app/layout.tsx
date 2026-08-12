import React from "react";
import "./globals.css";
import Link from "next/link";
import {
  GitPullRequest,
  CircleDot,
  Terminal,
  ShieldCheck,
  Bot,
  DownloadCloud,
  Search,
  Plus,
  Github,
  Bell,
} from "lucide-react";

export const metadata = {
  title: "Hithub · Open Source GitHub Clone Platform",
  description: "Complete open-source software development platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen flex flex-col antialiased selection:bg-[#58a6ff] selection:text-white">
        {/* Exact GitHub Top Navigation Header */}
        <header className="bg-[#161b22] border-b border-[#30363d] px-5 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-5">
            {/* GitHub Invertocat Logo */}
            <Link href="/" className="flex items-center space-x-3 text-white hover:opacity-80 transition-opacity">
              <Github className="w-8 h-8 fill-white" />
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-base tracking-tight">
                  Hithub
                </span>
                <span className="text-[10px] bg-[#21262d] border border-[#30363d] text-[#8b949e] px-1.5 py-0.5 rounded font-mono">
                  GitHub Clone
                </span>
              </div>
            </Link>

            {/* Global GitHub Search Bar */}
            <div className="relative w-64 md:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Type '/' to search or jump to..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-8 py-1.5 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors"
              />
              <kbd className="absolute right-2 top-2 text-[10px] bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded font-mono border border-[#30363d]">
                /
              </kbd>
            </div>

            {/* GitHub Main Sub-Header Links */}
            <nav className="hidden lg:flex items-center space-x-4 text-xs font-semibold text-[#c9d1d9]">
              <Link href="/octocat/hithub-core/pulls" className="hover:text-white transition-colors">
                Pull requests
              </Link>
              <Link href="/octocat/hithub-core/issues" className="hover:text-white transition-colors">
                Issues
              </Link>
              <Link href="/ai" className="hover:text-white transition-colors flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-[#58a6ff]" />
                AI Sandbox
              </Link>
              <Link href="/import" className="hover:text-white transition-colors flex items-center gap-1">
                <DownloadCloud className="w-3.5 h-3.5 text-[#3fb950]" />
                GitHub Importer
              </Link>
            </nav>
          </div>

          {/* Right Action Icons & "Sign In with GitHub" Button */}
          <div className="flex items-center space-x-3">
            <Link
              href="/auth/signin"
              className="bg-[#21262d] hover:bg-[#30363d] text-white font-semibold text-xs px-3.5 py-1.5 rounded-md border border-[#30363d] flex items-center gap-2 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4 fill-white" />
              <span>Sign in with GitHub</span>
            </Link>

            <Link
              href="/import"
              className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              New Repo
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* GitHub Footer */}
        <footer className="border-t border-[#30363d] bg-[#0d1117] px-6 py-6 text-xs text-[#8b949e] flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
          <div className="flex items-center space-x-3">
            <Github className="w-6 h-6 fill-[#8b949e]" />
            <span>© 2026 Hithub, Inc. — Full GitHub Clone Engine</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#58a6ff]">
            <Link href="/" className="hover:underline">Terms</Link>
            <Link href="/" className="hover:underline">Privacy</Link>
            <Link href="/" className="hover:underline">Security</Link>
            <Link href="/" className="hover:underline">Status</Link>
            <Link href="/import" className="hover:underline">GitHub Importer</Link>
            <Link href="/ai" className="hover:underline">AI Coding Sandbox</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
