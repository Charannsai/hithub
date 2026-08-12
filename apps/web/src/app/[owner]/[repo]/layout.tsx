import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  Code2,
  CircleDot,
  GitPullRequest,
  MessageSquare,
  PlaySquare,
  Kanban,
  ShieldCheck,
  Settings,
  Star,
  GitFork,
  Eye,
  Globe,
} from "lucide-react";

export const revalidate = 0;

export default async function RepoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;
  const baseUrl = `/${owner}/${repo}`;

  // Query real repository metadata from SQLite
  const repoData = await db.repository.findFirst({
    where: { name: repo },
  });

  const issueCount = repoData
    ? await db.issue.count({ where: { repoId: repoData.id, state: "OPEN" } })
    : 0;

  const prCount = repoData
    ? await db.pullRequest.count({ where: { repoId: repoData.id, state: "OPEN" } })
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Repository Header */}
      <div className="bg-[#09090b] border-b border-[#27272a] pt-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Title & Visibility */}
            <div className="flex items-center space-x-2 text-base">
              <span className="text-zinc-400 font-medium">{owner}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-white font-bold">{repo}</span>
              <span className="text-[10px] bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <Globe className="w-3 h-3 text-zinc-400" /> {repoData?.visibility || "PUBLIC"}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 text-xs font-medium">
              <button className="bg-[#121215] hover:bg-zinc-800 border border-[#27272a] px-3 py-1.5 rounded-md flex items-center gap-1.5 text-zinc-200 transition-colors">
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
                <span>Watch</span>
              </button>

              <button className="bg-[#121215] hover:bg-zinc-800 border border-[#27272a] px-3 py-1.5 rounded-md flex items-center gap-1.5 text-zinc-200 transition-colors">
                <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                <span>Fork</span>
                <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.2 text-[10px] rounded text-zinc-400 font-mono">
                  {repoData?.forksCount || 0}
                </span>
              </button>

              <button className="bg-white hover:bg-zinc-200 text-black font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors">
                <Star className="w-3.5 h-3.5 fill-black" />
                <span>Star</span>
                <span className="bg-zinc-900 text-zinc-200 border border-zinc-700 px-1.5 py-0.2 text-[10px] rounded font-mono">
                  {repoData?.starsCount || 0}
                </span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <nav className="flex items-center space-x-1 border-t border-[#27272a] pt-2 overflow-x-auto text-xs font-medium">
            <Link
              href={baseUrl}
              className="flex items-center gap-2 px-3.5 py-2 text-white border-b-2 border-white transition-colors"
            >
              <Code2 className="w-4 h-4 text-zinc-300" />
              Code
            </Link>

            <Link
              href={`${baseUrl}/issues`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <CircleDot className="w-4 h-4 text-zinc-400" />
              Issues
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.2 text-[10px] rounded-full font-mono">
                {issueCount}
              </span>
            </Link>

            <Link
              href={`${baseUrl}/pulls`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <GitPullRequest className="w-4 h-4 text-zinc-400" />
              Pull Requests
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.2 text-[10px] rounded-full font-mono">
                {prCount}
              </span>
            </Link>

            <Link
              href={`${baseUrl}/discussions`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              Discussions
            </Link>

            <Link
              href={`${baseUrl}/actions`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <PlaySquare className="w-4 h-4 text-zinc-400" />
              Actions
            </Link>

            <Link
              href={`${baseUrl}/projects`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Kanban className="w-4 h-4 text-zinc-400" />
              Projects
            </Link>

            <Link
              href={`${baseUrl}/security`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              Security
            </Link>

            <Link
              href={`${baseUrl}/settings`}
              className="flex items-center gap-2 px-3.5 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Page Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">{children}</div>
    </div>
  );
}
