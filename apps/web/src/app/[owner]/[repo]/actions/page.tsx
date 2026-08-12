import React from "react";
import Link from "next/link";
import {
  PlaySquare,
  CheckCircle2,
  Clock,
  RotateCw,
  Terminal,
  Play,
  FileCode,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export default function ActionsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  return (
    <div className="space-y-6">
      {/* Header & Run Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-5 h-5 text-emerald-400" />
            Hithub Actions CI/CD Pipeline
          </h1>
          <p className="text-xs text-zinc-400">Automated testing, linting, matrix builds, and deployments</p>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition-colors">
          <Play className="w-3.5 h-3.5 fill-white" />
          Run Workflow Manually
        </button>
      </div>

      {/* Workflow Run Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Workflow List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs text-zinc-400 uppercase tracking-wider">
            Workflow Runs
          </h3>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 space-y-2">
            <div className="p-3 bg-[#0d1117] border border-emerald-500/40 rounded-md space-y-2 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">CI Pipeline #142</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Success
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">Commit: a1b2c3d (main)</p>
              <div className="text-[10px] text-zinc-500 flex justify-between">
                <span>Duration: 18s</span>
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="p-3 bg-[#161b22] hover:bg-[#21262d] border border-transparent hover:border-[#30363d] rounded-md space-y-2 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-300">CI Pipeline #141</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Success
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">Commit: f9e8d7c (feat/matrix)</p>
              <div className="text-[10px] text-zinc-500 flex justify-between">
                <span>Duration: 22s</span>
                <span>5 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Execution Log Viewer */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="bg-[#21262d] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-mono">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">Runner Logs: job (build & test)</span>
              </div>
              <span className="text-emerald-400 text-[11px] font-mono">Container: Docker isolated runner</span>
            </div>

            <div className="p-4 bg-[#0d1117] font-mono text-xs text-zinc-300 space-y-2 min-h-[320px] overflow-x-auto">
              <div className="text-zinc-500">2026-08-12T14:35:01Z [INFO] Initializing Hithub Action Runner v1.2.0...</div>
              <div className="text-emerald-400">✓ Setup Node.js runtime environment v22.3.0</div>
              <div className="text-emerald-400">✓ Checkout repository source code (ref: refs/heads/main)</div>
              <div className="text-emerald-400">✓ Restored dependency cache (key: pnpm-v9-142)</div>
              <div className="text-zinc-300">&gt; pnpm install --frozen-lockfile</div>
              <div className="text-zinc-400">Progress: 142 packages installed in 2.1s</div>
              <div className="text-zinc-300">&gt; pnpm lint</div>
              <div className="text-emerald-400">✓ 0 lint warnings, 0 syntax errors.</div>
              <div className="text-zinc-300">&gt; pnpm test</div>
              <div className="text-emerald-400">PASS packages/database/src/index.test.ts (12 tests)</div>
              <div className="text-emerald-400">PASS services/git/src/index.test.ts (28 tests)</div>
              <div className="text-emerald-400">PASS services/ai/src/index.test.ts (15 tests)</div>
              <div className="text-emerald-400 font-bold pt-2">🎉 Workflow completed successfully with exit code 0.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
