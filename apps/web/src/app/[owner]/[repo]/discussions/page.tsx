import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import { MessageSquare, Plus } from "lucide-react";

export const revalidate = 0;

export default async function DiscussionsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let discussions: any[] = [];

  try {
    const repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
    });

    if (repoData) {
      discussions = await db.discussion.findMany({
        where: { repoId: repoData.id },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {}

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#58a6ff]" />
          Discussions
        </h1>

        <button className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-3.5 h-3.5" />
          New Discussion
        </button>
      </div>

      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden divide-y divide-[#30363d]">
        {discussions.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#8b949e]">
            <MessageSquare className="w-8 h-8 text-[#30363d] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#c9d1d9] mb-1">
              No discussions yet.
            </p>
            <p>Start a conversation to help grow the community.</p>
          </div>
        ) : (
          discussions.map((d: any) => (
            <div
              key={d.id}
              className="px-4 py-3 hover:bg-[#21262d]/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white hover:text-[#58a6ff] cursor-pointer">
                      {d.title}
                    </h3>
                    <span className="text-[10px] bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-1.5 py-0.5 rounded font-mono">
                      {d.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] mt-1 line-clamp-1">
                    {d.body}
                  </p>
                  <div className="text-[11px] text-[#8b949e] mt-1">
                    Started by <span className="text-[#c9d1d9]">{d.author?.username || "user"}</span>{" "}
                    on {new Date(d.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
