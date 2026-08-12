"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircleDot } from "lucide-react";

export default function NewIssuePage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [repoId, setRepoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch repo ID
    fetch(`/api/repos?name=${repo}&owner=${owner}`)
      .then((r) => r.json())
      .then((data) => {
        const found = data.repos?.find(
          (r: any) => r.name === repo && r.owner?.username === owner
        );
        if (found) setRepoId(found.id);
      })
      .catch(() => {});
  }, [owner, repo]);

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoId || !title) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId, title, body }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create issue");

      router.push(`/${owner}/${repo}/issues/${data.issue.number}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <CircleDot className="w-4 h-4 text-[#3fb950]" />
        <h1 className="font-bold text-white">New Issue</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-[#0d1117] border border-[#f85149] rounded-md text-[#f85149] text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors placeholder-[#8b949e]"
          />
        </div>

        {/* Body */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden">
          <div className="border-b border-[#30363d] px-3 py-2 text-[11px] text-[#8b949e]">
            <span className="font-semibold text-[#c9d1d9]">Write</span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Leave a comment"
            rows={12}
            className="w-full bg-transparent px-3 py-3 text-sm text-white focus:outline-none resize-y placeholder-[#8b949e] min-h-[200px]"
          />
          <div className="border-t border-[#30363d] px-3 py-2 text-[10px] text-[#8b949e]">
            Supports Markdown formatting.
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !title || !repoId}
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm px-4 py-1.5 rounded-md transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit new issue"}
          </button>
        </div>
      </form>
    </div>
  );
}
