import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import { getSession } from "@/lib/session";
import {
  CircleDot,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import IssueCommentForm from "./CommentForm";

export const revalidate = 0;

export default async function IssueDetailPage({
  params,
}: {
  params: { owner: string; repo: string; number: string };
}) {
  const { owner, repo, number } = params;
  const issueNumber = parseInt(number, 10);
  const session = await getSession();
  const currentUserId = (session?.user as any)?.id;

  // Get repo
  const repoData = await db.repository.findFirst({
    where: { name: repo, owner: { username: owner } },
  });

  if (!repoData) {
    return (
      <div className="text-center py-16">
        <h1 className="text-xl font-bold text-white">Repository not found</h1>
      </div>
    );
  }

  // Get issue with comments
  const issue = await db.issue.findFirst({
    where: { repoId: repoData.id, number: issueNumber },
    include: {
      author: true,
      assignee: true,
      labels: { include: { label: true } },
      comments: {
        include: { author: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!issue) {
    return (
      <div className="text-center py-16">
        <h1 className="text-xl font-bold text-white">Issue not found</h1>
        <Link
          href={`/${owner}/${repo}/issues`}
          className="text-sm text-[#58a6ff] hover:underline mt-2 inline-block"
        >
          ← Back to issues
        </Link>
      </div>
    );
  }

  const isOpen = issue.state === "OPEN";

  return (
    <div className="space-y-6">
      {/* Issue Header */}
      <div className="space-y-2 border-b border-[#30363d] pb-4">
        <h1 className="text-xl font-bold text-white">
          {issue.title}{" "}
          <span className="text-[#8b949e] font-normal">#{issue.number}</span>
        </h1>

        <div className="flex items-center gap-3 text-xs">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold ${
              isOpen
                ? "bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40"
                : "bg-[#8957e5]/20 text-[#d2a8ff] border border-[#8957e5]/40"
            }`}
          >
            {isOpen ? (
              <CircleDot className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {isOpen ? "Open" : "Closed"}
          </span>
          <span className="text-[#8b949e]">
            <strong className="text-[#c9d1d9]">{issue.author?.username || "user"}</strong> opened
            this issue on {new Date(issue.createdAt).toLocaleDateString()} ·{" "}
            {issue.comments.length} comment{issue.comments.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Thread */}
        <div className="lg:col-span-9 space-y-4">
          {/* Original Issue Body */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden">
            <div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {issue.author?.avatarUrl || issue.author?.image ? (
                  <img
                    src={issue.author.avatarUrl || issue.author.image}
                    alt={issue.author.username}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#30363d] text-[9px] font-bold flex items-center justify-center text-white">
                    {(issue.author?.username || "U").substring(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="font-bold text-[#c9d1d9]">{issue.author?.username}</span>
                <span className="text-[#8b949e]">
                  commented on {new Date(issue.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="px-4 py-4 text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-wrap min-h-[80px]">
              {issue.body || <span className="text-[#8b949e] italic">No description provided.</span>}
            </div>
          </div>

          {/* Comments */}
          {issue.comments.map((comment: any) => (
            <div
              key={comment.id}
              className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden"
            >
              <div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex items-center gap-2 text-xs">
                {comment.author?.avatarUrl || comment.author?.image ? (
                  <img
                    src={comment.author.avatarUrl || comment.author.image}
                    alt={comment.author.username}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#30363d] text-[9px] font-bold flex items-center justify-center text-white">
                    {(comment.author?.username || "U").substring(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="font-bold text-[#c9d1d9]">{comment.author?.username}</span>
                <span className="text-[#8b949e]">
                  commented on {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="px-4 py-4 text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-wrap">
                {comment.body}
              </div>
            </div>
          ))}

          {/* Add Comment Form */}
          {currentUserId && (
            <IssueCommentForm issueId={issue.id} />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-4 text-xs">
          {/* Assignees */}
          <div className="border-b border-[#30363d] pb-3">
            <h4 className="font-semibold text-[#8b949e] mb-2">Assignees</h4>
            {issue.assignee ? (
              <div className="flex items-center gap-2">
                {issue.assignee.avatarUrl || issue.assignee.image ? (
                  <img
                    src={issue.assignee.avatarUrl || issue.assignee.image}
                    alt={issue.assignee.username}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#30363d] text-[9px] font-bold flex items-center justify-center text-white">
                    {(issue.assignee?.username || "U").substring(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="text-[#c9d1d9] font-semibold">{issue.assignee.username}</span>
              </div>
            ) : (
              <p className="text-[#8b949e]">No one assigned</p>
            )}
          </div>

          {/* Labels */}
          <div className="border-b border-[#30363d] pb-3">
            <h4 className="font-semibold text-[#8b949e] mb-2">Labels</h4>
            {issue.labels && issue.labels.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {issue.labels.map((il: any) => (
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
            ) : (
              <p className="text-[#8b949e]">None yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
