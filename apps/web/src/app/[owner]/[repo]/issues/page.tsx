import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  CircleDot,
  CheckCircle2,
  Plus,
} from "lucide-react";

export const revalidate = 0;

export default async function IssuesPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData = null;
  let issues: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo },
    });

    if (repoData) {
      issues = await db.issue.findMany({
        where: { repoId: repoData.id },
        include: { author: true, comments: { include: { author: true } } },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    // Database safety fallback
  }

  const openCount = issues.filter((i) => i.state === "OPEN").length;
  const closedCount = issues.filter((i) => i.state === "CLOSED").length;

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4">
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <button className="bg-[#21262d] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-[#30363d]">
            <CircleDot className="w-4 h-4 text-[#3fb950]" />
            {openCount} Open
          </button>
          <button className="text-[#8b949e] hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#a371f7]" />
            {closedCount} Closed
          </button>
        </div>

        <Link
          href={`/${owner}/${repo}/issues`}
          className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          New Issue
        </Link>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {issues.length === 0 ? (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-8 text-center text-xs text-[#8b949e]">
            No issues found in database for this repository.
          </div>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3 hover:border-[#8b949e]/40 transition-colors">
              <div className="flex items-center space-x-3">
                <CircleDot className="w-4 h-4 text-[#3fb950] shrink-0" />
                <h3 className="font-bold text-white text-sm hover:text-[#58a6ff] cursor-pointer">
                  #{issue.number} {issue.title}
                </h3>
              </div>

              {issue.body && (
                <p className="text-xs text-[#c9d1d9] bg-[#0d1117] border border-[#30363d] p-3 rounded-md leading-relaxed font-sans">
                  {issue.body}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-[#8b949e] pt-2 border-t border-[#30363d]">
                <span>Opened by <strong className="text-[#c9d1d9]">{issue.author?.username || "octocat"}</strong> on {new Date(issue.createdAt).toLocaleDateString()}</span>
                <span>{issue.comments?.length || 0} comments</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
