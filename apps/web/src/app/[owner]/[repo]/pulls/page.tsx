import React from "react";
import Link from "next/link";
import {
  GitPullRequest,
  CheckCircle2,
  GitMerge,
  Sparkles,
  MessageSquare,
  FileDiff,
  User,
  Plus,
  Minus,
  Bot,
} from "lucide-react";

export default function PullRequestsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  return (
    <div className="space-y-6">
      {/* PR Header & Filter */}
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div className="flex items-center space-x-3 text-xs">
          <button className="bg-[#21262d] text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 border border-[#30363d]">
            <GitPullRequest className="w-4 h-4 text-emerald-400" />
            1 Open
          </button>
          <button className="text-zinc-400 hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            4 Closed
          </button>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
          <GitPullRequest className="w-4 h-4" />
          New Pull Request
        </button>
      </div>

      {/* PR Detail View: PR #2 */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-6">
        {/* PR Title & Status Banner */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-white">
              feat(ci): Add matrix build executor for Hithub Actions
            </h1>
            <span className="text-sm font-mono text-zinc-500">#2</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
              <GitMerge className="w-3.5 h-3.5" /> Open
            </span>
            <span className="text-zinc-300">
              <strong className="text-white">octocat</strong> wants to merge 3 commits into{" "}
              <code className="bg-[#0d1117] text-emerald-400 px-1.5 py-0.5 rounded border border-[#30363d]">
                main
              </code>{" "}
              from{" "}
              <code className="bg-[#0d1117] text-cyan-400 px-1.5 py-0.5 rounded border border-[#30363d]">
                feat/matrix-builds
              </code>
            </span>
          </div>
        </div>

        {/* AI PR Reviewer Box */}
        <div className="bg-gradient-to-r from-purple-950/40 via-zinc-900 to-emerald-950/30 border border-purple-500/40 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-purple-400" />
              Hithub AI Automated Code Review
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono border border-purple-500/30">
              Passed Automated Review
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            "Analyzed 2 modified files (+48 additions, -4 deletions). Algorithms for matrix job dependency tree resolution are correct and thread-safe. Security scan verified no credential exposure."
          </p>
        </div>

        {/* Side-by-Side Diff Viewer Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-[#30363d] pb-2">
            <span className="font-bold text-zinc-200 flex items-center gap-2">
              <FileDiff className="w-4 h-4 text-emerald-400" />
              Showing 1 changed file with 48 additions and 4 deletions
            </span>
            <div className="flex items-center space-x-2 font-mono text-[11px]">
              <span className="text-emerald-400">+48</span>
              <span className="text-rose-400">-4</span>
            </div>
          </div>

          {/* Diff Viewer Card */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden font-mono text-xs">
            {/* Diff Header */}
            <div className="bg-[#21262d] px-4 py-2 border-b border-[#30363d] text-zinc-300 flex items-center justify-between">
              <span>services/actions/src/matrix.ts</span>
              <span className="text-zinc-500 text-[10px]">Unified Diff View</span>
            </div>

            {/* Diff Lines */}
            <div className="divide-y divide-[#21262d]">
              <div className="bg-[#161b22] text-zinc-500 px-4 py-1 text-[11px]">
                @@ -12,4 +12,24 @@ export interface MatrixConfig
              </div>

              <div className="px-4 py-1 text-zinc-400">
                export interface MatrixConfig &#123;
              </div>
              <div className="px-4 py-1 text-zinc-400">
                &nbsp;&nbsp;os: string[];
              </div>

              {/* Red Deletions */}
              <div className="bg-rose-950/40 text-rose-300 px-4 py-1 flex items-center gap-2 border-l-2 border-rose-500">
                <Minus className="w-3 h-3 text-rose-400 shrink-0" />
                <span>-&nbsp;&nbsp;node: string;</span>
              </div>

              {/* Green Additions */}
              <div className="bg-emerald-950/40 text-emerald-300 px-4 py-1 flex items-center gap-2 border-l-2 border-emerald-500">
                <Plus className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>+&nbsp;&nbsp;node: string[];</span>
              </div>
              <div className="bg-emerald-950/40 text-emerald-300 px-4 py-1 flex items-center gap-2 border-l-2 border-emerald-500">
                <Plus className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>+&nbsp;&nbsp;maxParallelJobs?: number;</span>
              </div>
              <div className="bg-emerald-950/40 text-emerald-300 px-4 py-1 flex items-center gap-2 border-l-2 border-emerald-500">
                <Plus className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>+&nbsp;&nbsp;failFast?: boolean;</span>
              </div>

              <div className="px-4 py-1 text-zinc-400">
                &#125;
              </div>
            </div>
          </div>
        </div>

        {/* Merge PR Box */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">This pull request can be automatically merged.</h4>
              <p className="text-[11px] text-zinc-400">No merge conflicts with base branch `main`.</p>
            </div>
          </div>

          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-md shadow-md flex items-center gap-2 transition-colors">
            <GitMerge className="w-4 h-4" />
            Merge Pull Request
          </button>
        </div>
      </div>
    </div>
  );
}
