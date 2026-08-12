"use client";

import React, { useState } from "react";
import { DownloadCloud, Github, CheckCircle2 } from "lucide-react";

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
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-[#21262d] text-[#58a6ff] flex items-center justify-center font-bold border border-[#30363d]">
            <DownloadCloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Import a Repository from GitHub</h1>
            <p className="text-xs text-[#8b949e]">Transfer public or private GitHub codebases directly into your local Hithub SQLite instance.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleImport} className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-5 text-xs">
        {statusMsg && (
          <div className="p-3 bg-[#0d1117] border border-[#238636] rounded text-[#3fb950] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {statusMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-[#0d1117] border border-[#f85149] rounded text-[#f85149] font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[#c9d1d9] font-semibold">Source GitHub Repository (owner/repo):</label>
          <input
            type="text"
            required
            value={sourceRepo}
            onChange={(e) => setSourceRepo(e.target.value)}
            placeholder="e.g. facebook/react"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[#c9d1d9] font-semibold">Destination Hithub Repository Name:</label>
          <input
            type="text"
            required
            value={destName}
            onChange={(e) => setDestName(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[#8b949e]">GitHub Personal Access Token (Optional for private repos):</label>
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
            disabled={loading}
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? "Cloning & Importing from GitHub..." : "Begin Repository Import"}
          </button>
        </div>
      </form>
    </div>
  );
}
