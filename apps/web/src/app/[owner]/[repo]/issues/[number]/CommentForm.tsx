"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function IssueCommentForm({ issueId }: { issueId: string }) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId, body }),
      });

      if (res.ok) {
        setBody("");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden">
      <div className="border-b border-[#30363d] px-3 py-2 text-[11px] text-[#8b949e]">
        <span className="font-semibold text-[#c9d1d9]">Write</span>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Leave a comment"
        rows={5}
        className="w-full bg-transparent px-3 py-3 text-sm text-white focus:outline-none resize-y placeholder-[#8b949e] min-h-[120px]"
      />
      <div className="border-t border-[#30363d] px-3 py-2 flex justify-end">
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-1.5 rounded-md transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Commenting..." : "Comment"}
        </button>
      </div>
    </form>
  );
}
