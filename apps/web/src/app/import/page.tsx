import React from "react";
import { DownloadCloud, Github, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

export default function ImportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-cyan-950/40 border border-[#30363d] rounded-lg p-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <DownloadCloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">One-Click GitHub Importer Wizard</h1>
            <p className="text-xs text-zinc-400">Transfer entire codebases, Git history, issues, PRs, and releases from GitHub to Hithub.</p>
          </div>
        </div>
      </div>

      {/* Main Wizard Form */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 space-y-6">
        {/* Step 1: GitHub Authorization */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 text-[11px] flex items-center justify-center font-mono">1</span>
            Authorize GitHub Connection
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:w-auto bg-[#24292e] hover:bg-zinc-800 text-white font-bold text-xs px-5 py-2.5 rounded-md border border-[#30363d] flex items-center justify-center gap-2 shadow-sm transition-colors">
              <Github className="w-4 h-4" />
              Sign in with GitHub OAuth
            </button>
            <span className="text-xs text-zinc-500">or enter Personal Access Token:</span>
            <input
              type="password"
              placeholder="ghp_1234567890abcdef..."
              className="flex-1 w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Step 2: Target Repository */}
        <div className="space-y-3 pt-4 border-t border-[#30363d]">
          <h3 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 text-[11px] flex items-center justify-center font-mono">2</span>
            Target GitHub Repository
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-400">Source GitHub Repo (owner/repo):</label>
              <input
                type="text"
                placeholder="e.g. facebook/react"
                defaultValue="octocat/hello-world"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-zinc-400">Destination Hithub Repository:</label>
              <input
                type="text"
                defaultValue="octocat/hello-world"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Metadata Options */}
        <div className="space-y-3 pt-4 border-t border-[#30363d]">
          <h3 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 text-[11px] flex items-center justify-center font-mono">3</span>
            Import Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
            <label className="flex items-center space-x-2.5 bg-[#0d1117] border border-[#30363d] p-3 rounded-md cursor-pointer hover:border-emerald-500">
              <input type="checkbox" defaultChecked className="accent-emerald-500" />
              <span>Full Git History & All Branches</span>
            </label>
            <label className="flex items-center space-x-2.5 bg-[#0d1117] border border-[#30363d] p-3 rounded-md cursor-pointer hover:border-emerald-500">
              <input type="checkbox" defaultChecked className="accent-emerald-500" />
              <span>Issues & Comments</span>
            </label>
            <label className="flex items-center space-x-2.5 bg-[#0d1117] border border-[#30363d] p-3 rounded-md cursor-pointer hover:border-emerald-500">
              <input type="checkbox" defaultChecked className="accent-emerald-500" />
              <span>Pull Requests & Diff Threads</span>
            </label>
            <label className="flex items-center space-x-2.5 bg-[#0d1117] border border-[#30363d] p-3 rounded-md cursor-pointer hover:border-emerald-500">
              <input type="checkbox" defaultChecked className="accent-emerald-500" />
              <span>Releases & Asset Downloads</span>
            </label>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-[#30363d] flex justify-end">
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-md flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-colors">
            <DownloadCloud className="w-4 h-4" />
            Start Transfer to Hithub
          </button>
        </div>
      </div>
    </div>
  );
}
