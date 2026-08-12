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
  Bell,
  Plus,
  BookOpen,
  Settings,
} from "lucide-react";

export const metadata = {
  title: "Hithub — Open Source Software Development Platform",
  description: "Rebuilt from scratch as an open-source, self-hostable GitHub alternative.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen flex flex-col antialiased">
        {/* Top Navbar */}
        <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-lg group-hover:bg-emerald-600/30 transition-all">
                H
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                  Hithub
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">Self-Hosted</span>
              </div>
            </Link>

            {/* Global Search Bar */}
            <div className="relative w-64 md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search or type 'Ctrl+K'..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-8 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <span className="absolute right-2 top-2 text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono border border-zinc-700">
                ⌘K
              </span>
            </div>

            {/* Top Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 text-xs font-medium">
              <Link
                href="/octocat/hithub-core"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4 text-zinc-400" />
                Repositories
              </Link>
              <Link
                href="/octocat/hithub-core/issues"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <CircleDot className="w-4 h-4 text-zinc-400" />
                Issues
              </Link>
              <Link
                href="/octocat/hithub-core/pulls"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <GitPullRequest className="w-4 h-4 text-zinc-400" />
                Pull Requests
              </Link>
              <Link
                href="/octocat/hithub-core/actions"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <Terminal className="w-4 h-4 text-zinc-400" />
                Actions
              </Link>
              <Link
                href="/ai"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                AI Sandbox
              </Link>
              <Link
                href="/import"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <DownloadCloud className="w-4 h-4 text-cyan-400" />
                GitHub Import
              </Link>
            </nav>
          </div>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-3">
            <button className="p-1.5 text-zinc-400 hover:text-white bg-[#0d1117] border border-[#30363d] rounded-md hover:bg-zinc-800 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button className="relative p-1.5 text-zinc-400 hover:text-white bg-[#0d1117] border border-[#30363d] rounded-md hover:bg-zinc-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1"></span>
            </button>
            <div className="flex items-center space-x-2 border-l border-[#30363d] pl-3">
              <div className="w-7 h-7 rounded-full bg-emerald-600/80 text-white font-bold text-xs flex items-center justify-center border border-emerald-500/40">
                OC
              </div>
              <span className="text-xs font-semibold text-zinc-200 hidden sm:inline">octocat</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[#30363d] bg-[#161b22] px-6 py-4 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-400">Hithub</span>
            <span>© 2026 Open Source Project — "We rebuilt GitHub. Then we open-sourced it."</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-zinc-300">Docs</Link>
            <Link href="/" className="hover:text-zinc-300">API</Link>
            <Link href="/" className="hover:text-zinc-300">CLI</Link>
            <Link href="/import" className="hover:text-zinc-300">GitHub Importer</Link>
            <Link href="/ai" className="hover:text-emerald-400">AI Platform</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
