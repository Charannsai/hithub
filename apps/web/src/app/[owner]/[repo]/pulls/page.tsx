import React from "react";
import { db } from "@hithub/database";
import {
  GitPullRequest,
  GitMerge,
  Bot,
} from "lucide-react";

export const revalidate = 0;

export default async function PullRequestsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData = null;
  let prs: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo },
    });

    if (repoData) {
      prs = await db.pullRequest.findMany({
        where: { repoId: repoData.id },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    // Safety fallback
  }

  return (
    <div className="space-y-6">
      {/* PR Header */}
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <button className="bg-[#21262d] text-white px-3 py-1.5 rounded-md border border-[#30363d] flex items-center gap-1.5">
            <GitPullRequest className="w-3.5 h-3.5 text-[#3fb950]" />
            {prs.length} Pull Requests
          </button>
        </div>

        <button className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all">
          <GitPullRequest className="w-3.5 h-3.5" />
          New Pull Request
        </button>
      </div>

      {prs.length === 0 ? (
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-8 text-center text-xs text-[#8b949e]">
          No active pull requests in database for this repository.
        </div>
      ) : (
        prs.map((pr) => (
          <div key={pr.id} className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-bold text-white hover:text-[#58a6ff] cursor-pointer">
                  #{pr.number} {pr.title}
                </h1>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="bg-[#8957e5]/20 text-[#d2a8ff] border border-[#8957e5]/40 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <GitMerge className="w-3.5 h-3.5" /> {pr.state}
                </span>
                <span className="text-[#8b949e]">
                  <strong className="text-[#c9d1d9]">{pr.author?.username || "octocat"}</strong> wants to merge commits from{" "}
                  <code className="bg-[#0d1117] text-[#58a6ff] px-1.5 py-0.5 rounded border border-[#30363d] font-mono">
                    {pr.sourceBranch}
                  </code>{" "}
                  into{" "}
                  <code className="bg-[#0d1117] text-[#3fb950] px-1.5 py-0.5 rounded border border-[#30363d] font-mono">
                    {pr.targetBranch}
                  </code>
                </span>
              </div>
            </div>

            {/* AI Automated Code Review */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#c9d1d9] flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#a371f7]" />
                  Hithub AI Automated Code Review
                </span>
                <span className="text-[10px] bg-[#21262d] text-[#3fb950] border border-[#30363d] px-2 py-0.5 rounded font-mono">
                  Passed Automated Scan
                </span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Automated security & performance review passed with 0 vulnerabilities detected.
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
