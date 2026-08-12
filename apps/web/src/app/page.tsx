import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  BookOpen,
  Plus,
  GitPullRequest,
  CircleDot,
  CheckCircle2,
  Clock,
  Sparkles,
  DownloadCloud,
  Github,
  Search,
  Star,
  GitFork,
  Bot,
} from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  // Query real repositories from SQLite
  let repositories: any[] = [];
  let recentIssues: any[] = [];

  try {
    repositories = await db.repository.findMany({
      include: { owner: true },
      orderBy: { updatedAt: "desc" },
      take: 8,
    });

    recentIssues = await db.issue.findMany({
      include: { author: true, repository: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (e) {
    // Database query safety fallback
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar: User & Repositories */}
      <div className="lg:col-span-4 space-y-6">
        {/* User Badge */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#30363d] text-white font-bold text-sm flex items-center justify-center border border-[#8b949e]/30">
              OC
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">octocat</h2>
              <p className="text-xs text-[#8b949e]">The Hithub Octocat</p>
            </div>
          </div>
          <p className="text-xs text-[#c9d1d9] leading-relaxed">
            Open-source GitHub clone platform. 100% self-hosted & AI-native.
          </p>
        </div>

        {/* Repositories Sidebar */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#f0f6fc]">
              Top Repositories
            </h3>
            <Link
              href="/import"
              className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3 h-3" />
              New
            </Link>
          </div>

          <div className="space-y-1.5">
            {repositories.length === 0 ? (
              <p className="text-xs text-[#8b949e] italic">No repositories found in SQLite database.</p>
            ) : (
              repositories.map((repo) => (
                <Link
                  key={repo.id}
                  href={`/${repo.owner?.username || "octocat"}/${repo.name}`}
                  className="block p-2 rounded-md hover:bg-[#21262d] transition-colors group border border-transparent hover:border-[#30363d]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#58a6ff] group-hover:underline">
                      {repo.owner?.username || "octocat"}/{repo.name}
                    </span>
                    <span className="text-[10px] bg-[#21262d] text-[#8b949e] border border-[#30363d] px-1.5 py-0.5 rounded font-mono">
                      {repo.visibility}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-[#8b949e] mt-1 line-clamp-1">
                      {repo.description}
                    </p>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Feed Column */}
      <div className="lg:col-span-8 space-y-6">
        {/* GitHub Clone Announcement Banner */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
              <Github className="w-4 h-4 text-white fill-white" />
              HITHUB PLATFORM
            </span>
            <span className="text-[11px] bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-2 py-0.5 rounded font-mono font-semibold">
              100% Dynamic Engine
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            "We rebuilt GitHub. Then we open-sourced it."
          </h1>
          <p className="text-xs text-[#c9d1d9] leading-relaxed">
            Hithub provides full GitHub feature parity: Git smart HTTP protocol repository hosting, side-by-side PR code reviews, issue tracking, Hithub Actions CI/CD, security scanning, and autonomous AI agents.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/octocat/hithub-core"
              className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-2 rounded-md transition-all shadow-sm flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Explore Hithub Core
            </Link>
            <Link
              href="/import"
              className="bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-semibold px-4 py-2 rounded-md border border-[#30363d] transition-colors flex items-center gap-1.5"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-[#3fb950]" />
              GitHub Importer
            </Link>
          </div>
        </div>

        {/* Real-time Activity Timeline */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-4">
          <h3 className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider flex items-center gap-2 border-b border-[#30363d] pb-3">
            <Clock className="w-4 h-4 text-[#8b949e]" />
            Recent Activity & Issues
          </h3>

          <div className="space-y-3 text-xs">
            {recentIssues.length === 0 ? (
              <p className="text-[#8b949e] text-xs">No active issues found in database.</p>
            ) : (
              recentIssues.map((issue) => (
                <div key={issue.id} className="flex gap-3 items-start p-3 bg-[#0d1117] border border-[#30363d] rounded-md">
                  <CircleDot className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[#c9d1d9]">
                      <span className="font-bold text-white">{issue.author?.username || "octocat"}</span> opened issue{" "}
                      <Link
                        href={`/${issue.repository?.ownerId || "octocat"}/${issue.repository?.name || "hithub-core"}/issues`}
                        className="font-bold text-[#58a6ff] hover:underline"
                      >
                        #{issue.number} {issue.title}
                      </Link>
                    </p>
                    <p className="text-[11px] text-[#8b949e] font-mono">
                      State: {issue.state} • {new Date(issue.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
