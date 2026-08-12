import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import { getSession } from "@/lib/session";
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
  const session = await getSession();
  const currentUserId = (session?.user as any)?.id;

  // Query real repository metadata
  let repoData: any = null;
  let issueCount = 0;
  let prCount = 0;
  let starCount = 0;
  let isOwner = false;
  let isStarred = false;

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
      include: {
        owner: true,
        _count: {
          select: {
            stars: true,
          },
        },
      },
    });

    if (repoData) {
      issueCount = await db.issue.count({ where: { repoId: repoData.id, state: "OPEN" } });
      prCount = await db.pullRequest.count({ where: { repoId: repoData.id, state: "OPEN" } });
      starCount = repoData._count?.stars || 0;
      isOwner = currentUserId === repoData.ownerId;

      if (currentUserId) {
        const star = await db.star.findUnique({
          where: { userId_repoId: { userId: currentUserId, repoId: repoData.id } },
        });
        isStarred = !!star;
      }
    }
  } catch (e) {
    // Database fallback
  }

  if (!repoData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0d1117]">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <h1 className="text-xl font-bold text-white">Repository not found</h1>
            <p className="text-sm text-[#8b949e]">
              The repository <span className="font-mono text-[#58a6ff]">{owner}/{repo}</span> doesn't exist.
            </p>
            <Link href="/" className="inline-block text-sm text-[#58a6ff] hover:underline mt-4">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      {/* Repository Header */}
      <div className="bg-[#161b22] border-b border-[#30363d] pt-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Title & Visibility */}
            <div className="flex items-center space-x-2 text-base">
              <Link href={`/${owner}`} className="text-[#58a6ff] hover:underline font-medium">
                {owner}
              </Link>
              <span className="text-[#8b949e]">/</span>
              <Link href={baseUrl} className="text-[#f0f6fc] font-bold hover:underline">
                {repo}
              </Link>
              <span className="text-[10px] bg-[#161b22] text-[#8b949e] border border-[#30363d] px-2 py-0.5 rounded-full font-medium">
                {repoData.visibility}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm">
                <Eye className="w-3.5 h-3.5 text-[#8b949e]" />
                <span>Watch</span>
              </button>

              <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm">
                <GitFork className="w-3.5 h-3.5 text-[#8b949e]" />
                <span>Fork</span>
                <span className="bg-[#30363d] text-[#c9d1d9] px-1.5 text-[10px] rounded-full font-mono">
                  {repoData.forksCount}
                </span>
              </button>

              <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors shadow-sm">
                <Star
                  className={`w-3.5 h-3.5 ${
                    isStarred ? "text-[#e3b341] fill-[#e3b341]" : "text-[#8b949e]"
                  }`}
                />
                <span>{isStarred ? "Starred" : "Star"}</span>
                <span className="bg-[#30363d] text-[#c9d1d9] px-1.5 text-[10px] rounded-full font-mono">
                  {starCount}
                </span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <nav className="flex items-center space-x-1 border-t border-[#30363d] pt-2 overflow-x-auto text-xs font-semibold">
            <Link
              href={baseUrl}
              className="flex items-center gap-2 px-3.5 py-2 text-[#f0f6fc] border-b-2 border-[#f78166] transition-colors"
            >
              <Code2 className="w-4 h-4 text-[#8b949e]" />
              Code
            </Link>

            <Link
              href={`${baseUrl}/issues`}
              className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <CircleDot className="w-4 h-4 text-[#8b949e]" />
              Issues
              {issueCount > 0 && (
                <span className="bg-[#30363d] text-[#c9d1d9] px-1.5 text-[10px] rounded-full font-mono">
                  {issueCount}
                </span>
              )}
            </Link>

            <Link
              href={`${baseUrl}/pulls`}
              className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <GitPullRequest className="w-4 h-4 text-[#8b949e]" />
              Pull Requests
              {prCount > 0 && (
                <span className="bg-[#30363d] text-[#c9d1d9] px-1.5 text-[10px] rounded-full font-mono">
                  {prCount}
                </span>
              )}
            </Link>

            <Link
              href={`${baseUrl}/discussions`}
              className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#8b949e]" />
              Discussions
            </Link>

            <Link
              href={`${baseUrl}/actions`}
              className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <PlaySquare className="w-4 h-4 text-[#8b949e]" />
              Actions
            </Link>

            <Link
              href={`${baseUrl}/projects`}
              className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <Kanban className="w-4 h-4 text-[#8b949e]" />
              Projects
            </Link>

            <Link
              href={`${baseUrl}/security`}
              className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#8b949e]" />
              Security
            </Link>

            {isOwner && (
              <Link
                href={`${baseUrl}/settings`}
                className="flex items-center gap-2 px-3.5 py-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#8b949e]" />
                Settings
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Page Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">{children}</div>
    </div>
  );
}
