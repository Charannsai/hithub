import React from "react";
import { db } from "@hithub/database";
import { Kanban, Plus, CircleDot, GitPullRequest, MoreHorizontal } from "lucide-react";

export const revalidate = 0;

export default async function ProjectsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let openIssues: any[] = [];
  let closedIssues: any[] = [];
  let openPRs: any[] = [];

  try {
    const repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
    });

    if (repoData) {
      openIssues = await db.issue.findMany({
        where: { repoId: repoData.id, state: "OPEN" },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });

      closedIssues = await db.issue.findMany({
        where: { repoId: repoData.id, state: "CLOSED" },
        include: { author: true },
        orderBy: { updatedAt: "desc" },
      });

      openPRs = await db.pullRequest.findMany({
        where: { repoId: repoData.id, state: "OPEN" },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Kanban className="w-5 h-5 text-[#58a6ff]" />
            Project Board
          </h1>
          <p className="text-xs text-[#8b949e]">Real-time board for issues and pull requests</p>
        </div>

        <button className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Todo (Open Issues) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <span className="font-bold text-xs text-[#c9d1d9] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]"></span> Todo / Open ({openIssues.length})
            </span>
            <MoreHorizontal className="w-4 h-4 text-[#8b949e]" />
          </div>

          <div className="space-y-2">
            {openIssues.length === 0 ? (
              <p className="text-xs text-[#8b949e] py-4 text-center">No open issues</p>
            ) : (
              openIssues.map((issue) => (
                <div key={issue.id} className="bg-[#0d1117] border border-[#30363d] p-3 rounded-md space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#58a6ff] font-mono flex items-center gap-1">
                      <CircleDot className="w-3 h-3 text-[#3fb950]" /> #{issue.number}
                    </span>
                    <span className="bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded text-[10px]">
                      {issue.author?.username || "user"}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white">{issue.title}</h4>
                  {issue.body && (
                    <p className="text-[11px] text-[#8b949e] line-clamp-2">{issue.body}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Progress (Open PRs) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <span className="font-bold text-xs text-[#d2a8ff] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a371f7]"></span> In Progress / PRs ({openPRs.length})
            </span>
            <MoreHorizontal className="w-4 h-4 text-[#8b949e]" />
          </div>

          <div className="space-y-2">
            {openPRs.length === 0 ? (
              <p className="text-xs text-[#8b949e] py-4 text-center">No open pull requests</p>
            ) : (
              openPRs.map((pr) => (
                <div key={pr.id} className="bg-[#0d1117] border border-[#8957e5]/40 p-3 rounded-md space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#d2a8ff] font-mono flex items-center gap-1">
                      <GitPullRequest className="w-3 h-3 text-[#a371f7]" /> #{pr.number}
                    </span>
                    <span className="bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded text-[10px]">
                      {pr.sourceBranch} → {pr.targetBranch}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white">{pr.title}</h4>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Done (Closed Issues) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <span className="font-bold text-xs text-[#8b949e] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b949e]"></span> Done ({closedIssues.length})
            </span>
            <MoreHorizontal className="w-4 h-4 text-[#8b949e]" />
          </div>

          <div className="space-y-2">
            {closedIssues.length === 0 ? (
              <p className="text-xs text-[#8b949e] py-4 text-center">No closed items</p>
            ) : (
              closedIssues.map((issue) => (
                <div key={issue.id} className="bg-[#0d1117] border border-[#30363d] p-3 rounded-md space-y-2 opacity-70">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8b949e] font-mono">#{issue.number}</span>
                    <span className="bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded text-[10px]">Closed</span>
                  </div>
                  <h4 className="font-bold text-xs text-white">{issue.title}</h4>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
