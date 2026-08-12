import React from "react";
import Link from "next/link";
import {
  GitBranch,
  Folder,
  FileText,
  Download,
  Terminal,
  Copy,
  Check,
  Clock,
  History,
  FileCode,
  Shield,
  Sparkles,
} from "lucide-react";

export default function RepoBrowserPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  // Mock File Tree Structure for Hithub Core repository
  const fileList = [
    { name: "apps", type: "dir", commit: "feat(web): Add repository browser & Monaco viewer", age: "2 hours ago" },
    { name: "packages", type: "dir", commit: "feat(db): Add SQLite & Prisma schema models", age: "3 hours ago" },
    { name: "services", type: "dir", commit: "feat(git): Implement Git smart HTTP protocol service", age: "4 hours ago" },
    { name: "cli", type: "dir", commit: "feat(cli): Add hithub terminal executable", age: "5 hours ago" },
    { name: ".gitignore", type: "file", commit: "chore: Initial gitignore configuration", age: "1 day ago" },
    { name: "docker-compose.yml", type: "file", commit: "feat(docker): Add zero-dependency SQLite compose setup", age: "1 day ago" },
    { name: "package.json", type: "file", commit: "chore: Setup pnpm workspace monorepo configuration", age: "1 day ago" },
    { name: "README.md", type: "file", commit: "docs: Add product overview & satirical positioning", age: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Toolbar: Branch Switcher & Clone Code Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-xs">
          {/* Branch Dropdown */}
          <button className="bg-[#21262d] hover:bg-zinc-700 border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-2 text-white font-medium transition-colors">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>main</span>
          </button>

          <div className="flex items-center space-x-2 text-zinc-400 font-mono">
            <span><strong>3</strong> branches</span>
            <span>•</span>
            <span><strong>12</strong> commits</span>
          </div>
        </div>

        {/* Clone / Code Button */}
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
              <Code2Icon className="w-4 h-4" />
              <span>Code / Clone</span>
            </button>

            {/* Dropdown Content */}
            <div className="absolute right-0 top-full mt-1 w-80 bg-[#161b22] border border-[#30363d] rounded-lg p-3 shadow-2xl hidden group-hover:block z-30 space-y-3">
              <div className="text-xs font-bold text-white border-b border-[#30363d] pb-2 flex items-center justify-between">
                <span>Clone Repository</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">HTTPS</span>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-mono">Git Smart HTTP Clone URL:</label>
                <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-emerald-400 font-mono">
                  <input
                    type="text"
                    readOnly
                    value={`http://localhost:8080/${owner}/${repo}.git`}
                    className="bg-transparent w-full focus:outline-none"
                  />
                  <Copy className="w-3.5 h-3.5 text-zinc-400 hover:text-white cursor-pointer" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-mono">CLI Command:</label>
                <div className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-zinc-300 font-mono">
                  hithub repo clone {owner}/{repo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repository File Table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden text-xs">
        {/* Latest Commit Bar */}
        <div className="bg-[#21262d]/60 px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-zinc-300">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-emerald-600/80 text-white font-bold text-[10px] flex items-center justify-center">
              OC
            </div>
            <span className="font-bold text-white">octocat</span>
            <span className="text-zinc-400 truncate">feat(web): Add repository browser & Monaco viewer</span>
          </div>
          <div className="flex items-center space-x-3 text-zinc-400 text-[11px]">
            <span className="font-mono">a1b2c3d</span>
            <span className="flex items-center gap-1"><History className="w-3 h-3 text-zinc-400" /> 2 hours ago</span>
          </div>
        </div>

        {/* Directory Items */}
        <div className="divide-y divide-[#30363d]">
          {fileList.map((file) => (
            <div
              key={file.name}
              className="px-4 py-2.5 flex items-center justify-between hover:bg-[#21262d]/40 transition-colors"
            >
              <div className="flex items-center space-x-3 w-1/3">
                {file.type === "dir" ? (
                  <Folder className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
                <span className="font-medium text-white hover:text-emerald-400 cursor-pointer">
                  {file.name}
                </span>
              </div>
              <div className="text-zinc-400 text-xs w-1/2 truncate font-mono">
                {file.commit}
              </div>
              <div className="text-zinc-500 text-[11px] text-right w-1/6">
                {file.age}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* README.md Rendered Block */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
        <div className="bg-[#21262d] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs">
          <span className="font-bold text-zinc-200 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            README.md
          </span>
          <span className="text-zinc-400 text-[11px]">Markdown Preview</span>
        </div>

        <div className="p-6 text-sm text-zinc-200 space-y-4">
          <h1 className="text-2xl font-bold text-white border-b border-[#30363d] pb-2 flex items-center gap-2">
            🚀 Hithub Core Platform
          </h1>
          <p className="text-zinc-300 leading-relaxed">
            Hithub is an open-source, self-hostable software development platform rebuilt from scratch. It provides Git repository hosting, code review pull requests, issue tracking, CI/CD runners, and autonomous AI agents.
          </p>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 space-y-2 font-mono text-xs text-emerald-400">
            <div className="text-zinc-400"># Quick Start Local Setup:</div>
            <div>git clone http://localhost:8080/octocat/hithub-core.git</div>
            <div>cd hithub-core</div>
            <div>pnpm install</div>
            <div>pnpm dev</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-md space-y-1">
              <h3 className="font-bold text-emerald-400 text-xs">⚡ 100% Self-Hosted & Local</h3>
              <p className="text-xs text-zinc-400">Runs directly on your machine using zero-dependency SQLite and local Git bare repositories.</p>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-md space-y-1">
              <h3 className="font-bold text-cyan-400 text-xs">🤖 AI Native Platform</h3>
              <p className="text-xs text-zinc-400">Includes autonomous coding sandbox agents, automated PR code review, and CI debugging.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Code2Icon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}
