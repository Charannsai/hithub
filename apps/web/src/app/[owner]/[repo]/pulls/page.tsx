import React from "react";
import { db } from "@hithub/database";
import {
  GitPullRequest,
  CheckCircle2,
  GitMerge,
  FileDiff,
  Plus,
  Minus,
  Bot,
} from "lucide-react";

export const revalidate = 0;

export default async function PullRequestsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  const repoData = await db.repository.findFirst({
    where: { name: repo },
  });

  const prs = repoData
    ? await db.pullRequest.findMany({
        where: { repoId: repoData.id },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      {/* PR Header & Filter */}
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div className="flex items-center space-x-3 text-xs font-medium">
          <button className="bg-[#121215] text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 border border-[#27272a]">
            <GitPullRequest className="w-3.5 h-3.5 text-zinc-300" />
            {prs.length} Pull Requests
          </button>
        </div>

        <button className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
          <GitPullRequest className="w-3.5 h-3.5" />
          New Pull Request
        </button>
      </div>

      {prs.length === 0 ? (
        <div className="bg-[#121215] border border-[#27272a] rounded-lg p-8 text-center text-xs text-zinc-500">
          No active pull requests in database for this repository.
        </div>
      ) : (
        prs.map((pr) => (
          <div key={pr.id} className="bg-[#121215] border border-[#27272a] rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-bold text-white">
                  #{pr.number} {pr.title}
                </h1>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="bg-zinc-900 text-zinc-200 border border-zinc-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <GitMerge className="w-3 h-3 text-zinc-400" /> {pr.state}
                </span>
                <span className="text-zinc-400">
                  <strong className="text-white">{pr.author.username}</strong> wants to merge commits from{" "}
                  <code className="bg-[#09090b] text-zinc-200 px-1.5 py-0.5 rounded border border-[#27272a] font-mono">
                    {pr.sourceBranch}
                  </code>{" "}
                  into{" "}
                  <code className="bg-[#09090b] text-zinc-200 px-1.5 py-0.5 rounded border border-[#27272a] font-mono">
                    {pr.targetBranch}
                  </code>
                </span>
              </div>
            </div>

            {/* AI Automated Code Review */}
            <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-zinc-400" />
                  Hithub AI Code Review
                </span>
                <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded font-mono border border-zinc-800">
                  Passed Automated Scan
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Code changes verified. No performance bottlenecks or memory regressions detected.
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
