import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Star,
  GitFork,
  GitPullRequest,
  CircleDot,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
  DownloadCloud,
  Terminal,
  Cpu,
  Server,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar: User & Repositories */}
      <div className="lg:col-span-3 space-y-6">
        {/* User Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600/80 text-white font-bold text-lg flex items-center justify-center border border-emerald-400/40">
              OC
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">octocat</h2>
              <p className="text-xs text-zinc-400">The Hithub Octocat</p>
            </div>
          </div>
          <p className="text-xs text-zinc-300">
            Building the ultimate open-source software development platform. 100% self-hosted & AI-native.
          </p>
          <div className="pt-2 border-t border-[#30363d] flex justify-between text-xs text-zinc-400">
            <span><strong>1.4k</strong> stars</span>
            <span><strong>289</strong> followers</span>
          </div>
        </div>

        {/* Repositories List */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-zinc-200 uppercase tracking-wider">
              Repositories
            </h3>
            <Link
              href="/octocat/hithub-core"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New
            </Link>
          </div>

          <div className="space-y-2">
            <Link
              href="/octocat/hithub-core"
              className="block p-2 rounded-md hover:bg-[#21262d] transition-colors border border-transparent hover:border-[#30363d] group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-400 group-hover:underline">
                  octocat/hithub-core
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Public
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                Complete open-source software platform
              </p>
            </Link>

            <Link
              href="/octocat/hithub-cli"
              className="block p-2 rounded-md hover:bg-[#21262d] transition-colors border border-transparent hover:border-[#30363d] group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-200 group-hover:text-emerald-400 group-hover:underline">
                  octocat/hithub-cli
                </span>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                  Public
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                Official Go-based terminal CLI binary
              </p>
            </Link>

            <Link
              href="/octocat/ai-sandbox"
              className="block p-2 rounded-md hover:bg-[#21262d] transition-colors border border-transparent hover:border-[#30363d] group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-200 group-hover:text-emerald-400 group-hover:underline">
                  octocat/ai-sandbox
                </span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">
                  AI Agent
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                Isolated coding agent execution environment
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Center Feed */}
      <div className="lg:col-span-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-cyan-950/40 border border-emerald-500/30 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              WELCOME TO HITHUB v1.0
            </span>
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono">
              100% Self-Hosted & Local
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            "We rebuilt GitHub. Then we open-sourced it."
          </h1>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Hithub is your complete self-contained developer platform. Git HTTP/SSH hosting, pull request code reviews, issue tracking, CI/CD runners, security scanning, and autonomous AI agents.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href="/octocat/hithub-core"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-900/40"
            >
              <BookOpen className="w-4 h-4" />
              Explore Hithub Core
            </Link>
            <Link
              href="/import"
              className="bg-[#21262d] hover:bg-zinc-700 text-zinc-100 text-xs font-medium px-4 py-2 rounded-md border border-[#30363d] transition-colors flex items-center gap-1.5"
            >
              <DownloadCloud className="w-4 h-4 text-cyan-400" />
              Import from GitHub
            </Link>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#30363d] pb-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            Recent Activity Feed
          </h3>

          <div className="space-y-4 text-xs">
            {/* Activity 1 */}
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-zinc-200">
                  <span className="font-bold text-white">octocat</span> merged pull request{" "}
                  <Link href="/octocat/hithub-core/pulls" className="text-emerald-400 font-mono hover:underline">
                    #2 feat(ci): Add matrix build executor
                  </Link>
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">10 minutes ago • 142 checks passed</p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-zinc-200">
                  <span className="font-bold text-emerald-400">Hithub AI Agent</span> auto-reviewed code changes for{" "}
                  <Link href="/octocat/hithub-core/pulls" className="text-purple-400 font-mono hover:underline">
                    PR #2
                  </Link>
                </p>
                <p className="text-[11px] text-zinc-400">
                  "No security regressions found. Optimized matrix worker queue bounds."
                </p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <CircleDot className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-zinc-200">
                  <span className="font-bold text-white">octocat</span> opened issue{" "}
                  <Link href="/octocat/hithub-core/issues" className="text-cyan-400 font-mono hover:underline">
                    #1 Add support for WebAuthn passkeys in 2FA settings
                  </Link>
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        {/* System Health */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <h3 className="font-bold text-xs text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
            <Server className="w-4 h-4 text-emerald-400" />
            Instance Status
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-400" /> Database
              </span>
              <span className="text-emerald-400 font-bold font-mono">SQLite (Local)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Git Protocol
              </span>
              <span className="text-cyan-400 font-bold font-mono">Port 8080 (HTTP)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> AI Gateway
              </span>
              <span className="text-purple-400 font-bold font-mono">Local / Ready</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3 text-xs">
          <h3 className="font-bold text-zinc-200 uppercase tracking-wider">
            Shortcuts
          </h3>
          <div className="space-y-1.5">
            <Link href="/import" className="block text-zinc-300 hover:text-emerald-400">
              ➜ Import GitHub Repository
            </Link>
            <Link href="/ai" className="block text-zinc-300 hover:text-emerald-400">
              ➜ Open AI Code Sandbox
            </Link>
            <Link href="/octocat/hithub-core/actions" className="block text-zinc-300 hover:text-emerald-400">
              ➜ View Hithub CI Actions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
