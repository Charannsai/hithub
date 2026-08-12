import React from "react";
import { Kanban, Plus, CircleDot, GitPullRequest, MoreHorizontal } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Kanban className="w-5 h-5 text-emerald-400" />
            Project Board: Hithub v1.0 Launch Roadmap
          </h1>
          <p className="text-xs text-zinc-400">Interactive Kanban board for issues & pull requests</p>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Todo */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <span className="font-bold text-xs text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-500"></span> Todo (2)
            </span>
            <MoreHorizontal className="w-4 h-4 text-zinc-400 cursor-pointer" />
          </div>

          <div className="space-y-2">
            <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded-md space-y-2 cursor-grab">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-400 font-mono flex items-center gap-1">
                  <CircleDot className="w-3 h-3" /> #1
                </span>
                <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded text-[10px]">security</span>
              </div>
              <h4 className="font-bold text-xs text-white">Add WebAuthn passkey support</h4>
              <p className="text-[11px] text-zinc-400 line-clamp-2">Enable FIDO2 hardware security keys for 2FA.</p>
            </div>
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <span className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> In Progress (1)
            </span>
            <MoreHorizontal className="w-4 h-4 text-zinc-400 cursor-pointer" />
          </div>

          <div className="space-y-2">
            <div className="bg-[#0d1117] border border-amber-500/30 p-3 rounded-md space-y-2 cursor-grab">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-purple-400 font-mono flex items-center gap-1">
                  <GitPullRequest className="w-3 h-3" /> #2
                </span>
                <span className="bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded text-[10px]">CI/CD</span>
              </div>
              <h4 className="font-bold text-xs text-white">feat(ci): Add matrix build executor</h4>
              <p className="text-[11px] text-zinc-400 line-clamp-2">Multi-OS and multi-node matrix build support.</p>
            </div>
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
            <span className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Done (3)
            </span>
            <MoreHorizontal className="w-4 h-4 text-zinc-400 cursor-pointer" />
          </div>

          <div className="space-y-2">
            <div className="bg-[#0d1117] border border-emerald-500/30 p-3 rounded-md space-y-2 opacity-80">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-mono">#0</span>
                <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded text-[10px]">Core</span>
              </div>
              <h4 className="font-bold text-xs text-white">Setup SQLite database & Git smart HTTP protocol</h4>
              <p className="text-[11px] text-zinc-400 line-clamp-2">Completed monorepo base architecture.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
