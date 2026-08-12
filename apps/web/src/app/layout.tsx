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
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "Hithub — Open Source Software Development Platform",
  description: "Rebuilt from scratch as an open-source, self-hostable GitHub alternative.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#09090b] text-[#f4f4f5] min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
        {/* Sleek Monochrome Top Navbar */}
        <header className="bg-[#09090b] border-b border-[#27272a] px-5 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
          <div className="flex items-center space-x-6">
            {/* Minimal Monochromatic Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-7 h-7 rounded-md bg-white text-black flex items-center justify-center font-bold text-sm tracking-tighter group-hover:scale-105 transition-transform">
                H
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white text-base tracking-tight">
                  Hithub
                </span>
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono">
                  v1.0
                </span>
              </div>
            </Link>

            {/* Global Search */}
            <div className="relative w-64 md:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search repositories, issues, PRs..."
                className="w-full bg-[#121215] border border-[#27272a] rounded-md pl-9 pr-8 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors font-sans"
              />
              <kbd className="absolute right-2 top-2 text-[10px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded font-mono border border-zinc-800">
                ⌘K
              </kbd>
            </div>

            {/* Top Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 text-xs font-medium text-zinc-400">
              <Link
                href="/octocat/hithub-core"
                className="hover:text-white transition-colors"
              >
                Repositories
              </Link>
              <Link
                href="/octocat/hithub-core/issues"
                className="hover:text-white transition-colors"
              >
                Issues
              </Link>
              <Link
                href="/octocat/hithub-core/pulls"
                className="hover:text-white transition-colors"
              >
                Pull Requests
              </Link>
              <Link
                href="/octocat/hithub-core/actions"
                className="hover:text-white transition-colors"
              >
                Actions
              </Link>
              <Link
                href="/ai"
                className="text-white hover:text-zinc-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-zinc-300" />
                AI Sandbox
              </Link>
              <Link
                href="/import"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <DownloadCloud className="w-3.5 h-3.5 text-zinc-400" />
                GitHub Import
              </Link>
            </nav>
          </div>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-3">
            <Link
              href="/import"
              className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              New Repo
            </Link>
            <div className="flex items-center space-x-2 border-l border-[#27272a] pl-3">
              <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-200 font-bold text-xs flex items-center justify-center border border-zinc-700">
                OC
              </div>
              <span className="text-xs font-medium text-zinc-300 hidden sm:inline">octocat</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Minimal Footer */}
        <footer className="border-t border-[#27272a] bg-[#09090b] px-6 py-4 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zinc-300">Hithub Platform</span>
            <span>— Open Source Software Development Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-zinc-300">Docs</Link>
            <Link href="/" className="hover:text-zinc-300">API</Link>
            <Link href="/import" className="hover:text-zinc-300">GitHub Importer</Link>
            <Link href="/ai" className="hover:text-white">AI Sandbox</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
