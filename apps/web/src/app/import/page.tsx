"use client";

import React, { useState } from "react";
import { DownloadCloud, Github, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ImportPage() {
  const [sourceRepo, setSourceRepo] = useState("octocat/hello-world");
  const [destName, setDestName] = useState("hello-world");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceRepo, destName, token }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to import repository");
      }

      setStatusMsg(data.message || `Successfully imported ${sourceRepo} into Hithub!`);
      // Redirect after 2s
      setTimeout(() => {
        window.location.href = `/octocat/${destName}`;
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-[#121215] border border-[#27272a] rounded-lg p-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-md bg-white text-black flex items-center justify-center font-bold">
            <DownloadCloud className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">GitHub Repository Importer</h1>
            <p className="text-xs text-zinc-400">Transfer public or private GitHub repositories directly into your local Hithub SQLite instance.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleImport} className="bg-[#121215] border border-[#27272a] rounded-lg p-6 space-y-5 text-xs">
        {statusMsg && (
          <div className="p-3 bg-zinc-900 border border-zinc-700 rounded text-emerald-400 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {statusMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-zinc-900 border border-rose-900/50 rounded text-rose-400 font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-zinc-300 font-medium">GitHub Repository (owner/repo):</label>
          <input
            type="text"
            required
            value={sourceRepo}
            onChange={(e) => setSourceRepo(e.target.value)}
            placeholder="e.g. facebook/react"
            className="w-full bg-[#09090b] border border-[#27272a] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-zinc-300 font-medium">Destination Hithub Repository Name:</label>
          <input
            type="text"
            required
            value={destName}
            onChange={(e) => setDestName(e.target.value)}
            className="w-full bg-[#09090b] border border-[#27272a] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-zinc-400">GitHub Personal Access Token (Optional for private repos):</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_..."
            className="w-full bg-[#09090b] border border-[#27272a] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="pt-3 border-t border-[#27272a] flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-zinc-200 text-black font-semibold px-5 py-2 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? "Importing from GitHub API..." : "Start Import"}
          </button>
        </div>
      </form>
    </div>
  );
}
