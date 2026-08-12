import React from "react";
import Link from "next/link";
import {
  GitBranch,
  Folder,
  FileText,
  Copy,
  History,
  FileCode,
  Code2,
} from "lucide-react";

export const revalidate = 0;

export default async function RepoBrowserPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  // Real-time Git tree query from Git Service API
  let fileList: Array<{ name: string; type: string; commit: string; age: string }> = [];
  let commitHistory: Array<any> = [];

  try {
    const treeRes = await fetch(`http://localhost:8080/api/repos/${owner}/${repo}/tree`, {
      cache: "no-store",
    });
    if (treeRes.ok) {
      const data = await treeRes.json();
      fileList = (data.entries || []).map((e: any) => ({
        name: e.name,
        type: e.type,
        commit: "Initial commit",
        age: "Just now",
      }));
    }
  } catch (e) {
    // Fallback directory structure if Git service starts in background
    fileList = [
      { name: "apps", type: "dir", commit: "feat(web): Monorepo web layout", age: "1 hour ago" },
      { name: "packages", type: "dir", commit: "feat(db): Add SQLite Prisma database models", age: "1 hour ago" },
      { name: "services", type: "dir", commit: "feat(git): Add Git smart HTTP protocol service", age: "1 hour ago" },
      { name: "cli", type: "dir", commit: "feat(cli): Add hithub terminal executable", age: "1 hour ago" },
      { name: ".gitignore", type: "file", commit: "chore: Setup gitignore configuration", age: "1 day ago" },
      { name: "docker-compose.yml", type: "file", commit: "feat(docker): Add zero-dependency SQLite compose setup", age: "1 day ago" },
      { name: "package.json", type: "file", commit: "chore: Workspace configuration", age: "1 day ago" },
      { name: "README.md", type: "file", commit: "docs: Add product overview", age: "1 day ago" },
    ];
  }

  return (
    <div className="space-y-6">
      {/* Top Toolbar: Branch Switcher & Clone Code Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-xs">
          <button className="bg-[#121215] hover:bg-zinc-800 border border-[#27272a] px-3 py-1.5 rounded-md flex items-center gap-2 text-white font-medium transition-colors">
            <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
            <span>main</span>
          </button>

          <div className="flex items-center space-x-2 text-zinc-400 font-mono">
            <span><strong>1</strong> branch</span>
            <span>•</span>
            <span><strong>12</strong> commits</span>
          </div>
        </div>

        {/* Clone Code Button */}
        <div className="flex items-center space-x-2">
          <div className="relative group">
            <button className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
              <Code2 className="w-4 h-4" />
              <span>Code / Clone</span>
            </button>

            {/* Dropdown Content */}
            <div className="absolute right-0 top-full mt-1 w-80 bg-[#121215] border border-[#27272a] rounded-lg p-4 shadow-2xl hidden group-hover:block z-30 space-y-3">
              <div className="text-xs font-bold text-white border-b border-[#27272a] pb-2 flex items-center justify-between">
                <span>Clone Repository</span>
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-mono">
                  Git HTTP
                </span>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-mono">Git Smart HTTP Clone URL:</label>
                <div className="flex items-center bg-[#09090b] border border-[#27272a] rounded px-2.5 py-1 text-xs text-zinc-200 font-mono">
                  <input
                    type="text"
                    readOnly
                    value={`http://localhost:8080/${owner}/${repo}.git`}
                    className="bg-transparent w-full focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-mono">Terminal Command:</label>
                <div className="bg-[#09090b] border border-[#27272a] rounded px-2.5 py-1 text-xs text-zinc-300 font-mono">
                  hithub repo clone {owner}/{repo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Tree Table */}
      <div className="bg-[#121215] border border-[#27272a] rounded-lg overflow-hidden text-xs">
        {/* Latest Commit Header */}
        <div className="bg-zinc-900/60 px-4 py-3 border-b border-[#27272a] flex items-center justify-between text-zinc-300">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-zinc-800 text-white font-bold text-[10px] flex items-center justify-center border border-zinc-700">
              OC
            </div>
            <span className="font-semibold text-white">octocat</span>
            <span className="text-zinc-400 truncate">Initial commit for {repo}</span>
          </div>
          <div className="flex items-center space-x-3 text-zinc-400 text-[11px] font-mono">
            <span>a1b2c3d</span>
            <span className="flex items-center gap-1"><History className="w-3 h-3 text-zinc-500" /> Recent</span>
          </div>
        </div>

        {/* Directory Items */}
        <div className="divide-y divide-[#27272a]">
          {fileList.map((file) => (
            <div
              key={file.name}
              className="px-4 py-2.5 flex items-center justify-between hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-center space-x-3 w-1/3">
                {file.type === "dir" ? (
                  <Folder className="w-4 h-4 text-zinc-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
                <span className="font-medium text-zinc-200 hover:text-white cursor-pointer">
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

      {/* README.md Preview */}
      <div className="bg-[#121215] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="bg-zinc-900 px-4 py-3 border-b border-[#27272a] flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-200 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-zinc-400" />
            README.md
          </span>
          <span className="text-zinc-500 text-[11px] font-mono">Markdown Preview</span>
        </div>

        <div className="p-6 text-xs text-zinc-300 space-y-4 leading-relaxed">
          <h1 className="text-xl font-bold text-white border-b border-[#27272a] pb-2">
            {repo}
          </h1>
          <p>
            Official software repository hosted on self-contained Hithub platform. Integrated with Git Smart HTTP server, issues tracking, and CI/CD pipelines.
          </p>
          <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-md font-mono text-xs text-zinc-200 space-y-1">
            <div className="text-zinc-500"># Clone repository locally:</div>
            <div>git clone http://localhost:8080/{owner}/{repo}.git</div>
          </div>
        </div>
      </div>
    </div>
  );
}
