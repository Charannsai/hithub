"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DownloadCloud,
  Github,
  CheckCircle2,
  Lock,
  Globe,
  Star,
  GitFork,
  ArrowRight,
  Search,
} from "lucide-react";

export default function ImportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user as any;

  // Custom import form state
  const [sourceRepo, setSourceRepo] = useState("");
  const [destName, setDestName] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // GitHub user repos
  const [myRepos, setMyRepos] = useState<any[]>([]);
  const [loadingMyRepos, setLoadingMyRepos] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [cloningRepoId, setCloningRepoId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      setLoadingMyRepos(true);
      fetch("/api/github/repos")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.repos)) {
            setMyRepos(data.repos);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingMyRepos(false));
    }
  }, [status]);

  const handleSourceChange = (val: string) => {
    setSourceRepo(val);
    const parts = val.split("/");
    const suggestedName = parts.length > 1 ? parts[1].replace(".git", "") : val.replace(".git", "");
    if (!destName || destName === sourceRepo) {
      setDestName(suggestedName);
    }
  };

  const handleCloneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceRepo || !destName) return;

    setLoading(true);
    setStatusMsg("");
    setErrorMsg("");

    try {
      const cleanSource = sourceRepo
        .replace("https://github.com/", "")
        .replace(".git", "")
        .trim();

      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceRepo: cleanSource,
          destName: destName.trim(),
          token: token.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to clone repository");

      setStatusMsg(data.message || `Successfully cloned ${sourceRepo} into Hithub!`);
      setTimeout(() => {
        router.push(`/${user?.username || "user"}/${destName.trim()}`);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloneFromList = async (repoItem: any) => {
    setCloningRepoId(repoItem.fullName);
    setStatusMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceRepo: repoItem.fullName,
          destName: repoItem.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to clone repository");

      setStatusMsg(`Successfully cloned ${repoItem.fullName} into Hithub!`);
      setTimeout(() => {
        router.push(`/${user?.username || "user"}/${repoItem.name}`);
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setCloningRepoId(null);
    }
  };

  const filteredRepos = myRepos.filter((r) =>
    r.fullName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-[#21262d] text-[#58a6ff] flex items-center justify-center font-bold border border-[#30363d]">
            <DownloadCloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              Clone & Import Repositories from GitHub
            </h1>
            <p className="text-xs text-[#8b949e]">
              Download complete GitHub repositories (all source files, branches, and commit histories) directly into your local Hithub platform.
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-[#0d1117] border border-[#238636] rounded-md text-[#3fb950] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {statusMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-[#0d1117] border border-[#f85149] rounded-md text-[#f85149] text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* 1. Your GitHub Account Repositories (if authenticated) */}
      {status === "authenticated" && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Github className="w-4 h-4" /> Your GitHub Repositories
              </h2>
              <p className="text-[11px] text-[#8b949e]">
                1-click copy and clone your GitHub repositories to local Hithub
              </p>
            </div>

            {myRepos.length > 0 && (
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Filter your repositories..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-3 py-1 text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>
            )}
          </div>

          {loadingMyRepos ? (
            <p className="text-xs text-[#8b949e] py-6 text-center">
              Fetching your repositories from GitHub...
            </p>
          ) : myRepos.length === 0 ? (
            <p className="text-xs text-[#8b949e] py-4 text-center">
              No repositories found on your GitHub account or OAuth token lacks repo scope.
            </p>
          ) : (
            <div className="divide-y divide-[#30363d] max-h-80 overflow-y-auto pr-1">
              {filteredRepos.map((repoItem) => {
                const isCloning = cloningRepoId === repoItem.fullName;

                return (
                  <div
                    key={repoItem.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-[#21262d]/40 px-2 rounded transition-colors"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#58a6ff] truncate">
                          {repoItem.fullName}
                        </span>
                        <span className="text-[10px] bg-[#21262d] text-[#8b949e] border border-[#30363d] px-1.5 py-0.2 rounded-full font-mono flex items-center gap-1">
                          {repoItem.isPrivate ? (
                            <>
                              <Lock className="w-2.5 h-2.5" /> Private
                            </>
                          ) : (
                            <>
                              <Globe className="w-2.5 h-2.5" /> Public
                            </>
                          )}
                        </span>
                        {repoItem.language && (
                          <span className="text-[10px] text-[#8b949e] font-mono">
                            • {repoItem.language}
                          </span>
                        )}
                      </div>
                      {repoItem.description && (
                        <p className="text-[11px] text-[#8b949e] line-clamp-1">
                          {repoItem.description}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleCloneFromList(repoItem)}
                      disabled={isCloning || loading}
                      className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all shrink-0 disabled:opacity-50"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>{isCloning ? "Cloning..." : "Clone to Hithub"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Custom GitHub Repository URL Clone */}
      <form onSubmit={handleCloneSubmit} className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-5 text-xs">
        <h2 className="text-sm font-bold text-white border-b border-[#30363d] pb-2">
          Clone Any Public or Private GitHub Repository
        </h2>

        <div className="space-y-1.5">
          <label className="text-[#c9d1d9] font-semibold">
            GitHub Repository URL or owner/repo path:
          </label>
          <input
            type="text"
            required
            value={sourceRepo}
            onChange={(e) => handleSourceChange(e.target.value)}
            placeholder="e.g. facebook/react or https://github.com/torvalds/linux"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[#c9d1d9] font-semibold">
            Destination Repository Name in Hithub:
          </label>
          <input
            type="text"
            required
            value={destName}
            onChange={(e) => setDestName(e.target.value)}
            placeholder="react"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[#8b949e]">
            Personal Access Token (Optional, only needed for private repos outside your account):
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_..."
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        <div className="pt-3 border-t border-[#30363d] flex justify-end">
          <button
            type="submit"
            disabled={loading || !sourceRepo || !destName}
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
          >
            <DownloadCloud className="w-4 h-4" />
            {loading ? "Cloning Git Repository from GitHub..." : "Begin Git Clone"}
          </button>
        </div>
      </form>
    </div>
  );
}
