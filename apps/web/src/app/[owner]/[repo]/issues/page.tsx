import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  CircleDot,
  CheckCircle2,
  Plus,
  MessageSquare,
} from "lucide-react";

export const revalidate = 0;

export default async function IssuesPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData: any = null;
  let issues: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
    });

    if (repoData) {
      issues = await db.issue.findMany({
        where: { repoId: repoData.id },
        include: {
          author: true,
          labels: { include: { label: true } },
          comments: true,
        },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    // Safety fallback
  }

  const openIssues = issues.filter((i) => i.state === "OPEN");
  const closedIssues = issues.filter((i) => i.state === "CLOSED");

  return (
    <div className="space-y-4">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-semibold">
          <button className="bg-[#21262d] text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-[#30363d]">
            <CircleDot className="w-3.5 h-3.5 text-[#3fb950]" />
            {openIssues.length} Open
          </button>
          <button className="text-[#8b949e] hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#a371f7]" />
            {closedIssues.length} Closed
          </button>
        </div>

        <Link
          href={`/${owner}/${repo}/issues/new`}
          className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          New Issue
        </Link>
      </div>

      {/* Issues List */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden divide-y divide-[#30363d]">
        {issues.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#8b949e]">
            <CircleDot className="w-8 h-8 text-[#30363d] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#c9d1d9] mb-1">
              There aren't any open issues.
            </p>
            <p>
              Want to help improve this project?{" "}
              <Link
                href={`/${owner}/${repo}/issues/new`}
                className="text-[#58a6ff] hover:underline"
              >
                Create an issue
              </Link>.
            </p>
          </div>
        ) : (
          issues.map((issue: any) => (
            <div
              key={issue.id}
              className="px-4 py-3 hover:bg-[#21262d]/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {issue.state === "OPEN" ? (
                  <CircleDot className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#a371f7] shrink-0 mt-0.5" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/${owner}/${repo}/issues/${issue.number}`}
                      className="font-bold text-sm text-white hover:text-[#58a6ff] transition-colors"
                    >
                      {issue.title}
                    </Link>

                    {/* Labels */}
                    {issue.labels?.map((il: any) => (
                      <span
                        key={il.label.id}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: `${il.label.color}20`,
                          color: il.label.color,
                          border: `1px solid ${il.label.color}40`,
                        }}
                      >
                        {il.label.name}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#8b949e] mt-1">
                    #{issue.number} opened on{" "}
                    {new Date(issue.createdAt).toLocaleDateString()} by{" "}
                    <span className="text-[#c9d1d9]">{issue.author?.username || "user"}</span>
                  </div>
                </div>

                {/* Comment count */}
                {issue.comments?.length > 0 && (
                  <Link
                    href={`/${owner}/${repo}/issues/${issue.number}`}
                    className="flex items-center gap-1 text-[11px] text-[#8b949e] hover:text-[#58a6ff] shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {issue.comments.length}
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
