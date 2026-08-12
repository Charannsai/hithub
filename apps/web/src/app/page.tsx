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
  Server,
  Terminal,
  Cpu,
} from "lucide-react";

export const revalidate = 0; // Dynamic real-time data fetching on every request

export default async function HomePage() {
  // Fetch real repositories from SQLite
  const repositories = await db.repository.findMany({
    include: { owner: true },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  // Fetch real issues from SQLite
  const recentIssues = await db.issue.findMany({
    include: { author: true, repository: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // Fetch real workflow runs from SQLite
  const recentRuns = await db.workflowRun.findMany({
    include: { workflow: { include: { repository: true } } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar: User & Real Repositories */}
      <div className="lg:col-span-4 space-y-6">
        {/* User Card */}
        <div className="bg-[#121215] border border-[#27272a] rounded-lg p-5 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-100 font-bold text-sm flex items-center justify-center border border-zinc-700">
              OC
            </div>
            <div>
              <h2 className="font-semibold text-white text-sm">octocat</h2>
              <p className="text-xs text-zinc-400">The Hithub Octocat</p>
            </div>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Open-source developer platform. 100% self-hosted & AI-native.
          </p>
        </div>

        {/* Real Repositories List */}
        <div className="bg-[#121215] border border-[#27272a] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">
              Repositories ({repositories.length})
            </h3>
            <Link
              href="/import"
              className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              New
            </Link>
          </div>

          <div className="space-y-2">
            {repositories.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No repositories found in SQLite database.</p>
            ) : (
              repositories.map((repo) => (
                <Link
                  key={repo.id}
                  href={`/${repo.owner.username}/${repo.name}`}
                  className="block p-2.5 rounded-md hover:bg-[#18181b] transition-colors border border-transparent hover:border-[#27272a] group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-zinc-200 group-hover:text-white group-hover:underline">
                      {repo.owner.username}/{repo.name}
                    </span>
                    <span className="text-[10px] bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800 font-mono">
                      {repo.visibility}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                      {repo.description}
                    </p>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Center Real-Time Feed */}
      <div className="lg:col-span-8 space-y-6">
        {/* Banner */}
        <div className="bg-[#121215] border border-[#27272a] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              HITHUB CORE PLATFORM
            </span>
            <span className="text-[11px] bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded font-mono">
              SQLite Dynamic Engine
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            "We rebuilt GitHub. Then we open-sourced it."
          </h1>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Full-featured developer platform with Git smart HTTP protocol hosting, pull request reviews, issues, CI/CD runners, and autonomous AI agents.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href="/octocat/hithub-core"
              className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-4 py-2 rounded-md transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Open Hithub Core
            </Link>
            <Link
              href="/import"
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium px-4 py-2 rounded-md border border-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-zinc-400" />
              GitHub Importer
            </Link>
          </div>
        </div>

        {/* Real-time Activity Feed from DB */}
        <div className="bg-[#121215] border border-[#27272a] rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-[#27272a] pb-3">
            <Clock className="w-4 h-4 text-zinc-300" />
            Real-Time Activity & Issues Feed
          </h3>

          <div className="space-y-4 text-xs">
            {recentIssues.length === 0 ? (
              <p className="text-zinc-500 text-xs">No active issues found in database.</p>
            ) : (
              recentIssues.map((issue) => (
                <div key={issue.id} className="flex gap-3 items-start p-3 bg-[#09090b] border border-[#27272a] rounded-md">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <CircleDot className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-200">
                      <span className="font-semibold text-white">{issue.author.username}</span> opened issue{" "}
                      <Link
                        href={`/${issue.repository.ownerId}/${issue.repository.name}/issues`}
                        className="font-semibold text-white font-mono hover:underline"
                      >
                        #{issue.number} {issue.title}
                      </Link>
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono">
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
