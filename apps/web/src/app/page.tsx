import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import { getSession } from "@/lib/session";
import {
  BookOpen,
  Plus,
  GitPullRequest,
  CircleDot,
  Clock,
  Github,
  Star,
  GitFork,
  Globe,
  Lock,
  DownloadCloud,
} from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  const session = await getSession();
  const user = session?.user as any;
  const isLoggedIn = !!user;

  let myRepositories: any[] = [];
  let publicRepositories: any[] = [];
  let recentIssues: any[] = [];
  let recentPRs: any[] = [];

  try {
    // Always fetch public repositories for explore feed
    publicRepositories = await db.repository.findMany({
      where: { visibility: "PUBLIC" },
      include: { owner: true },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    if (isLoggedIn && user?.id) {
      // Fetch user's own repos
      myRepositories = await db.repository.findMany({
        where: { ownerId: user.id },
        include: { owner: true },
        orderBy: { updatedAt: "desc" },
      });

      const repoIds = myRepositories.map((r: any) => r.id);
      if (repoIds.length > 0) {
        recentIssues = await db.issue.findMany({
          where: { repoId: { in: repoIds } },
          include: { author: true, repository: { include: { owner: true } } },
          orderBy: { createdAt: "desc" },
          take: 5,
        });

        recentPRs = await db.pullRequest.findMany({
          where: { repoId: { in: repoIds } },
          include: { author: true, repository: { include: { owner: true } } },
          orderBy: { createdAt: "desc" },
          take: 5,
        });
      }
    } else {
      recentIssues = await db.issue.findMany({
        include: { author: true, repository: { include: { owner: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      });
    }
  } catch (e) {
    // Database query safety fallback
  }

  const displayedSidebarRepos = isLoggedIn && myRepositories.length > 0 ? myRepositories : publicRepositories;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar: User & Repositories */}
      <div className="lg:col-span-4 space-y-5">
        {/* User Badge */}
        {isLoggedIn ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {user.avatarUrl || user.image ? (
                <img
                  src={user.avatarUrl || user.image}
                  alt={user.username}
                  className="w-9 h-9 rounded-full border border-[#30363d]"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#30363d] text-white font-bold text-xs flex items-center justify-center">
                  {(user.username || "U").substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <span className="font-semibold text-sm text-white block">{user.username || user.name}</span>
                <span className="text-[11px] text-[#8b949e]">Hithub Developer</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 space-y-3 text-center">
            <Github className="w-8 h-8 text-white fill-white mx-auto" />
            <h2 className="font-bold text-sm text-white">Welcome to Hithub</h2>
            <p className="text-xs text-[#8b949e]">
              Sign in with GitHub to clone repositories, open issues, and contribute.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-2 rounded-md transition-all shadow-sm"
            >
              <Github className="w-4 h-4 fill-white" />
              Sign in with GitHub
            </Link>
          </div>
        )}

        {/* Repositories Sidebar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#f0f6fc]">
              {isLoggedIn && myRepositories.length > 0 ? "Top Repositories" : "Repositories"}
            </h3>
            {isLoggedIn && (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/import"
                  className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[11px] font-semibold px-2 py-1 rounded border border-[#30363d] transition-colors flex items-center gap-1"
                  title="Import from GitHub"
                >
                  <DownloadCloud className="w-3 h-3 text-[#58a6ff]" />
                  Import
                </Link>
                <Link
                  href="/new"
                  className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-2 py-1 rounded transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3 h-3" />
                  New
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-0.5">
            {displayedSidebarRepos.length === 0 ? (
              <div className="text-xs text-[#8b949e] py-4 space-y-2">
                <p>No repositories found.</p>
                <Link
                  href="/import"
                  className="text-[#58a6ff] hover:underline flex items-center gap-1 font-semibold"
                >
                  <DownloadCloud className="w-3.5 h-3.5" /> Clone a repository from GitHub
                </Link>
              </div>
            ) : (
              displayedSidebarRepos.map((repo: any) => (
                <Link
                  key={repo.id}
                  href={`/${repo.owner?.username || "user"}/${repo.name}`}
                  className="block py-2 px-2 rounded-md hover:bg-[#21262d] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    {repo.visibility === "PRIVATE" ? (
                      <Lock className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
                    )}
                    <span className="font-medium text-xs text-[#58a6ff] group-hover:underline truncate">
                      {repo.owner?.username || "user"}/{repo.name}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-[#8b949e] mt-0.5 ml-5.5 line-clamp-1">
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
        {/* Welcome / Import CTA Banner for Logged In Users with 0 repos */}
        {isLoggedIn && myRepositories.length === 0 && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Github className="w-4 h-4 text-[#58a6ff]" />
                CLONE REPOSITORIES
              </span>
              <span className="text-[11px] bg-[#238636]/10 text-[#3fb950] border border-[#238636]/30 px-2 py-0.5 rounded font-mono font-semibold">
                GitHub Connected
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Import your GitHub repositories to get started
              </h2>
              <p className="text-xs text-[#8b949e] mt-1 leading-relaxed">
                Connect your existing GitHub codebases to view files, review pull requests, and manage issues on your local Hithub instance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/import"
                className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-2 rounded-md transition-all shadow-sm flex items-center gap-1.5"
              >
                <DownloadCloud className="w-4 h-4" />
                View & Clone Your GitHub Repositories
              </Link>
              <Link
                href="/new"
                className="bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-semibold px-4 py-2 rounded-md border border-[#30363d] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Create New Repository
              </Link>
            </div>
          </div>
        )}

        {/* Welcome Banner (when not logged in) */}
        {!isLoggedIn && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Github className="w-4 h-4 text-white fill-white" />
                HITHUB PLATFORM
              </span>
              <span className="text-[11px] bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-2 py-0.5 rounded font-mono font-semibold">
                Open Source
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              The open-source GitHub alternative you can self-host.
            </h1>
            <p className="text-xs text-[#c9d1d9] leading-relaxed">
              Hithub provides Git repository hosting, side-by-side PR code reviews, issue tracking,
              CI/CD pipelines, and AI-powered coding agents — all running locally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/auth/signin"
                className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-2 rounded-md transition-all shadow-sm flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5 fill-white" />
                Get Started
              </Link>
              <Link
                href="/import"
                className="bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-semibold px-4 py-2 rounded-md border border-[#30363d] transition-colors flex items-center gap-1.5"
              >
                Import from GitHub
              </Link>
            </div>
          </div>
        )}

        {/* Explore All Repositories Section */}
        {publicRepositories.length > 0 && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 space-y-4">
            <h3 className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider flex items-center gap-2 border-b border-[#30363d] pb-3">
              <Globe className="w-4 h-4 text-[#58a6ff]" />
              Explore Repositories
            </h3>

            <div className="space-y-3">
              {publicRepositories.map((repo: any) => (
                <Link
                  key={repo.id}
                  href={`/${repo.owner?.username || "user"}/${repo.name}`}
                  className="block p-3.5 bg-[#0d1117] border border-[#30363d] rounded-md hover:border-[#8b949e]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#58a6ff] hover:underline">
                      {repo.owner?.username || "user"}/{repo.name}
                    </span>
                    <span className="text-[10px] bg-[#21262d] text-[#8b949e] border border-[#30363d] px-1.5 py-0.5 rounded font-mono">
                      {repo.visibility}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-[#8b949e] mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-[#8b949e]">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#e3b341]" />
                      {repo.starsCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forksCount}
                    </span>
                    <span>
                      Updated {new Date(repo.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Activity Timeline */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 space-y-4">
          <h3 className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider flex items-center gap-2 border-b border-[#30363d] pb-3">
            <Clock className="w-4 h-4 text-[#8b949e]" />
            {isLoggedIn ? "Your Activity" : "Recent Activity"}
          </h3>

          <div className="space-y-3 text-xs">
            {recentIssues.length === 0 && recentPRs.length === 0 ? (
              <p className="text-[#8b949e] text-xs py-4 text-center">
                No recent issues or pull request activity.
              </p>
            ) : (
              <>
                {recentIssues.map((issue: any) => (
                  <div
                    key={issue.id}
                    className="flex gap-3 items-start p-3 bg-[#0d1117] border border-[#30363d] rounded-md"
                  >
                    <CircleDot
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        issue.state === "OPEN" ? "text-[#3fb950]" : "text-[#a371f7]"
                      }`}
                    />
                    <div className="space-y-1 min-w-0">
                      <p className="text-[#c9d1d9]">
                        <span className="font-bold text-white">
                          {issue.author?.username || "user"}
                        </span>{" "}
                        opened issue{" "}
                        <Link
                          href={`/${issue.repository?.owner?.username || "user"}/${
                            issue.repository?.name
                          }/issues`}
                          className="font-bold text-[#58a6ff] hover:underline"
                        >
                          #{issue.number} {issue.title}
                        </Link>
                      </p>
                      <p className="text-[11px] text-[#8b949e] font-mono">
                        {issue.repository?.owner?.username}/{issue.repository?.name} ·{" "}
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {recentPRs.map((pr: any) => (
                  <div
                    key={pr.id}
                    className="flex gap-3 items-start p-3 bg-[#0d1117] border border-[#30363d] rounded-md"
                  >
                    <GitPullRequest className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                    <div className="space-y-1 min-w-0">
                      <p className="text-[#c9d1d9]">
                        <span className="font-bold text-white">
                          {pr.author?.username || "user"}
                        </span>{" "}
                        opened PR{" "}
                        <Link
                          href={`/${pr.repository?.owner?.username || "user"}/${
                            pr.repository?.name
                          }/pulls`}
                          className="font-bold text-[#58a6ff] hover:underline"
                        >
                          #{pr.number} {pr.title}
                        </Link>
                      </p>
                      <p className="text-[11px] text-[#8b949e] font-mono">
                        {pr.sourceBranch} → {pr.targetBranch} ·{" "}
                        {new Date(pr.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
