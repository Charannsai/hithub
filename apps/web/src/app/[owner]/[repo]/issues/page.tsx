import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  CircleDot,
  CheckCircle2,
  Plus,
  Send,
} from "lucide-react";

export const revalidate = 0;

export default async function IssuesPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  // Find real repository in SQLite
  const repoData = await db.repository.findFirst({
    where: { name: repo },
  });

  // Query real issues from SQLite
  const issues = repoData
    ? await db.issue.findMany({
        where: { repoId: repoData.id },
        include: { author: true, comments: { include: { author: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const openCount = issues.filter((i) => i.state === "OPEN").length;
  const closedCount = issues.filter((i) => i.state === "CLOSED").length;

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div className="flex items-center space-x-3 text-xs font-medium">
          <button className="bg-[#121215] text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 border border-[#27272a]">
            <CircleDot className="w-3.5 h-3.5 text-zinc-300" />
            {openCount} Open
          </button>
          <button className="text-zinc-400 hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" />
            {closedCount} Closed
          </button>
        </div>

        <Link
          href={`/${owner}/${repo}/issues`}
          className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Issue
        </Link>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.length === 0 ? (
          <div className="bg-[#121215] border border-[#27272a] rounded-lg p-8 text-center text-xs text-zinc-500">
            No issues found in database for this repository.
          </div>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="bg-[#121215] border border-[#27272a] rounded-lg p-5 space-y-4">
              <div className="flex items-center space-x-3">
                <CircleDot className="w-4 h-4 text-zinc-300 shrink-0" />
                <h3 className="font-bold text-white text-sm">
                  #{issue.number} {issue.title}
                </h3>
              </div>

              {issue.body && (
                <p className="text-xs text-zinc-300 bg-[#09090b] border border-[#27272a] p-3 rounded-md">
                  {issue.body}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-[#27272a]">
                <span>Opened by <strong>{issue.author.username}</strong> on {new Date(issue.createdAt).toLocaleDateString()}</span>
                <span>{issue.comments.length} comments</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
