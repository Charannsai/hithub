import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  GitBranch,
  Folder,
  FileText,
  History,
  Code2,
  ChevronDown,
  Download,
  FileCode,
} from "lucide-react";

export const revalidate = 0;

export default async function RepoBrowserPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  // Get repo from DB
  let repoData: any = null;
  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
      include: { owner: true },
    });
  } catch (e) {}

  // Real-time Git tree query
  let fileList: Array<{ name: string; type: string; sha: string }> = [];
  let commitCount = 0;
  let lastCommit: any = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const treeRes = await fetch(`http://localhost:8080/api/repos/${owner}/${repo}/tree`, {
      cache: "no-store",
      signal: controller.signal,
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (treeRes && treeRes.ok) {
      const data = await treeRes.json();
      if (Array.isArray(data.entries) && data.entries.length > 0) {
        fileList = data.entries.map((e: any) => ({
          name: e.name,
          type: e.type,
          sha: e.sha || "",
        }));
      }
    }

    // Get commit history
    const commitsRes = await fetch(`http://localhost:8080/api/repos/${owner}/${repo}/commits`, {
      cache: "no-store",
    }).catch(() => null);

    if (commitsRes && commitsRes.ok) {
      const commitsData = await commitsRes.json();
      if (Array.isArray(commitsData.commits)) {
        commitCount = commitsData.commits.length;
        lastCommit = commitsData.commits[0] || null;
      }
    }
  } catch (e) {
    // Git service may not be running
  }

  // Sort: directories first, then files
  fileList.sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return a.name.localeCompare(b.name);
  });

  const isEmpty = fileList.length === 0;

  return (
    <div className="space-y-4">
      {/* Branch & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          {/* Branch Switcher */}
          <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-2 font-semibold transition-colors shadow-sm">
            <GitBranch className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>{repoData?.defaultBranch || "main"}</span>
            <ChevronDown className="w-3 h-3 text-[#8b949e]" />
          </button>

          <div className="flex items-center space-x-3 text-[#8b949e] font-mono text-[11px]">
            <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
              <GitBranch className="w-3.5 h-3.5" /> <strong>1</strong> branch
            </span>
            {commitCount > 0 && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                  <History className="w-3.5 h-3.5" /> <strong>{commitCount}</strong> commits
                </span>
              </>
            )}
          </div>
        </div>

        {/* Code / Clone Dropdown */}
        <div className="relative group">
          <button className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all">
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Clone Popover */}
          <div className="absolute right-0 top-full mt-1.5 w-80 bg-[#161b22] border border-[#30363d] rounded-md p-4 shadow-2xl hidden group-hover:block z-30 space-y-3">
            <div className="text-xs font-bold text-white border-b border-[#30363d] pb-2 flex items-center justify-between">
              <span>Clone Repository</span>
              <span className="text-[10px] bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-1.5 py-0.5 rounded font-mono">
                HTTPS
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#8b949e] font-mono">Clone with Git HTTP:</label>
              <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#58a6ff] font-mono">
                <input
                  type="text"
                  readOnly
                  value={`http://localhost:8080/${owner}/${repo}.git`}
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#8b949e] font-mono">Hithub CLI:</label>
              <div className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#c9d1d9] font-mono">
                hithub repo clone {owner}/{repo}
              </div>
            </div>

            <div className="pt-2 border-t border-[#30363d]">
              <a
                href={`http://localhost:8080/api/repos/${owner}/${repo}/zip`}
                className="text-xs text-[#c9d1d9] hover:text-[#58a6ff] flex items-center gap-2 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                Download ZIP
              </a>
            </div>
          </div>
        </div>
      </div>

      {isEmpty ? (
        /* Empty Repository State */
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-8 space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-lg font-bold text-white">
              Quick setup — if you've done this kind of thing before
            </h2>
            <div className="inline-flex items-center bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-xs text-[#58a6ff] font-mono">
              http://localhost:8080/{owner}/{repo}.git
            </div>
          </div>

          <div className="space-y-4 text-xs text-[#c9d1d9]">
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">
                …or create a new repository on the command line
              </h3>
              <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 font-mono text-[#c9d1d9] space-y-1">
                <div>echo "# {repo}" &gt;&gt; README.md</div>
                <div>git init</div>
                <div>git add README.md</div>
                <div>git commit -m "Initial commit"</div>
                <div>git branch -M main</div>
                <div>git remote add origin http://localhost:8080/{owner}/{repo}.git</div>
                <div>git push -u origin main</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">
                …or push an existing repository from the command line
              </h3>
              <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 font-mono text-[#c9d1d9] space-y-1">
                <div>git remote add origin http://localhost:8080/{owner}/{repo}.git</div>
                <div>git branch -M main</div>
                <div>git push -u origin main</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* File Directory Table */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden text-xs">
            {/* Latest Commit Bar */}
            <div className="bg-[#21262d]/80 px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-[#c9d1d9]">
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-[#30363d] text-white font-bold text-[10px] flex items-center justify-center border border-[#8b949e]/30">
                  {(lastCommit?.author_name || owner).substring(0, 2).toUpperCase()}
                </div>
                <span className="font-bold text-white hover:underline cursor-pointer">
                  {lastCommit?.author_name || owner}
                </span>
                <span className="text-[#8b949e] truncate max-w-xs">
                  {lastCommit?.message || "Initial commit"}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[#8b949e] text-[11px] font-mono shrink-0">
                {lastCommit?.hash && (
                  <span className="hover:text-[#58a6ff] cursor-pointer">
                    {lastCommit.hash.substring(0, 7)}
                  </span>
                )}
                {lastCommit?.date && (
                  <span>{new Date(lastCommit.date).toLocaleDateString()}</span>
                )}
              </div>
            </div>

            {/* Directory Items */}
            <div className="divide-y divide-[#30363d]">
              {fileList.map((file) => (
                <div
                  key={file.name}
                  className="px-4 py-2 flex items-center hover:bg-[#21262d]/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {file.type === "dir" ? (
                      <Folder className="w-4 h-4 text-[#58a6ff] shrink-0 fill-[#58a6ff]/20" />
                    ) : (
                      <FileText className="w-4 h-4 text-[#8b949e] shrink-0" />
                    )}
                    <span className="font-medium text-[#c9d1d9] hover:text-[#58a6ff] hover:underline cursor-pointer truncate">
                      {file.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* README */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
            <div className="bg-[#21262d] px-4 py-2.5 border-b border-[#30363d] flex items-center text-xs">
              <span className="font-semibold text-[#c9d1d9] flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#8b949e]" />
                README.md
              </span>
            </div>

            <div className="p-6 text-xs text-[#c9d1d9] space-y-4 leading-relaxed">
              <h1 className="text-xl font-bold text-white border-b border-[#30363d] pb-2">
                {repo}
              </h1>
              {repoData?.description && <p>{repoData.description}</p>}
              <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-md font-mono text-xs text-[#c9d1d9] space-y-1">
                <div className="text-[#8b949e]"># Clone this repository:</div>
                <div className="text-[#58a6ff]">
                  git clone http://localhost:8080/{owner}/{repo}.git
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
