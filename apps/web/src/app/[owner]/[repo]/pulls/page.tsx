import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  GitPullRequest,
  GitMerge,
  CheckCircle2,
  Plus,
} from "lucide-react";

export const revalidate = 0;

export default async function PullRequestsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData: any = null;
  let prs: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
    });

    if (repoData) {
      prs = await db.pullRequest.findMany({
        where: { repoId: repoData.id },
        include: {
          author: true,
          reviews: { include: { reviewer: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    // Safety fallback
  }

  const openPRs = prs.filter((pr) => pr.state === "OPEN");
  const closedPRs = prs.filter((pr) => pr.state !== "OPEN");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-semibold">
          <button className="bg-[#21262d] text-white px-3 py-1.5 rounded-md border border-[#30363d] flex items-center gap-1.5">
            <GitPullRequest className="w-3.5 h-3.5 text-[#3fb950]" />
            {openPRs.length} Open
          </button>
          <button className="text-[#8b949e] hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#a371f7]" />
            {closedPRs.length} Closed
          </button>
        </div>

        <button className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-3.5 h-3.5" />
          New Pull Request
        </button>
      </div>

      {/* PR List */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden divide-y divide-[#30363d]">
        {prs.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#8b949e]">
            <GitPullRequest className="w-8 h-8 text-[#30363d] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#c9d1d9] mb-1">
              There aren't any open pull requests.
            </p>
          </div>
        ) : (
          prs.map((pr: any) => (
            <div
              key={pr.id}
              className="px-4 py-3 hover:bg-[#21262d]/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {pr.state === "MERGED" ? (
                  <GitMerge className="w-4 h-4 text-[#a371f7] shrink-0 mt-0.5" />
                ) : pr.state === "OPEN" ? (
                  <GitPullRequest className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                ) : (
                  <GitPullRequest className="w-4 h-4 text-[#f85149] shrink-0 mt-0.5" />
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-white hover:text-[#58a6ff] cursor-pointer">
                    {pr.title}
                  </h3>

                  <div className="text-[11px] text-[#8b949e] mt-1 space-y-0.5">
                    <div>
                      #{pr.number} opened on{" "}
                      {new Date(pr.createdAt).toLocaleDateString()} by{" "}
                      <span className="text-[#c9d1d9]">{pr.author?.username || "user"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <code className="bg-[#0d1117] text-[#58a6ff] px-1.5 py-0.5 rounded border border-[#30363d] font-mono text-[10px]">
                        {pr.sourceBranch}
                      </code>
                      <span>→</span>
                      <code className="bg-[#0d1117] text-[#3fb950] px-1.5 py-0.5 rounded border border-[#30363d] font-mono text-[10px]">
                        {pr.targetBranch}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Review status */}
                {pr.reviews?.length > 0 && (
                  <div className="shrink-0 flex -space-x-1">
                    {pr.reviews.slice(0, 3).map((review: any) => (
                      <div
                        key={review.id}
                        className="w-5 h-5 rounded-full bg-[#30363d] text-[8px] font-bold flex items-center justify-center text-white border border-[#0d1117]"
                        title={`${review.reviewer?.username}: ${review.state}`}
                      >
                        {(review.reviewer?.username || "U").substring(0, 2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
