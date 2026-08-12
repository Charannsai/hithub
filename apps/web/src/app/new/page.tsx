"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookOpen, Lock, Globe, GitBranch } from "lucide-react";

export default function NewRepoPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/repos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, visibility }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create repository");
      }

      // Redirect to new repo
      router.push(`/${user?.username || "user"}/${name}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidName = /^[a-zA-Z0-9._-]*$/.test(name);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-white mb-1">Create a new repository</h1>
      <p className="text-xs text-[#8b949e] mb-8">
        A repository contains all project files, including the revision history.
      </p>

      <form onSubmit={handleCreate} className="space-y-6">
        {error && (
          <div className="p-3 bg-[#0d1117] border border-[#f85149] rounded-md text-[#f85149] text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Owner / Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <label className="text-xs text-[#c9d1d9] font-semibold">Owner</label>
              <div className="flex items-center gap-2 bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-white">
                {user?.avatarUrl || user?.image ? (
                  <img
                    src={user.avatarUrl || user.image}
                    alt={user.username}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#30363d] text-[10px] font-bold flex items-center justify-center text-white">
                    {(user?.username || "U").substring(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="font-semibold">{user?.username || "user"}</span>
              </div>
            </div>

            <span className="text-lg text-[#8b949e] mt-6">/</span>

            <div className="flex-1 space-y-1">
              <label className="text-xs text-[#c9d1d9] font-semibold">
                Repository name <span className="text-[#f85149]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-awesome-project"
                className={`w-full bg-[#0d1117] border rounded-md px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:ring-1 transition-colors ${
                  name && !isValidName
                    ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]"
                    : "border-[#30363d] focus:border-[#58a6ff] focus:ring-[#58a6ff]"
                }`}
              />
              {name && !isValidName && (
                <p className="text-[11px] text-[#f85149]">
                  Only letters, numbers, hyphens, dots, and underscores allowed.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs text-[#c9d1d9] font-semibold">
            Description <span className="text-[#8b949e]">(optional)</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors"
          />
        </div>

        <div className="h-px bg-[#30363d]" />

        {/* Visibility */}
        <div className="space-y-3">
          <label
            className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
              visibility === "PUBLIC"
                ? "border-[#238636] bg-[#238636]/5"
                : "border-[#30363d] hover:border-[#8b949e]/40"
            }`}
            onClick={() => setVisibility("PUBLIC")}
          >
            <input
              type="radio"
              name="visibility"
              checked={visibility === "PUBLIC"}
              onChange={() => setVisibility("PUBLIC")}
              className="mt-1 accent-[#238636]"
            />
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#c9d1d9]" />
                <span className="text-sm font-semibold text-white">Public</span>
              </div>
              <p className="text-[11px] text-[#8b949e] mt-0.5">
                Anyone can see this repository. You choose who can commit.
              </p>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
              visibility === "PRIVATE"
                ? "border-[#e3b341] bg-[#e3b341]/5"
                : "border-[#30363d] hover:border-[#8b949e]/40"
            }`}
            onClick={() => setVisibility("PRIVATE")}
          >
            <input
              type="radio"
              name="visibility"
              checked={visibility === "PRIVATE"}
              onChange={() => setVisibility("PRIVATE")}
              className="mt-1 accent-[#e3b341]"
            />
            <div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#c9d1d9]" />
                <span className="text-sm font-semibold text-white">Private</span>
              </div>
              <p className="text-[11px] text-[#8b949e] mt-0.5">
                You choose who can see and commit to this repository.
              </p>
            </div>
          </label>
        </div>

        <div className="h-px bg-[#30363d]" />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !name || !isValidName}
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm px-5 py-2 rounded-md transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            {loading ? "Creating..." : "Create repository"}
          </button>
        </div>
      </form>
    </div>
  );
}
