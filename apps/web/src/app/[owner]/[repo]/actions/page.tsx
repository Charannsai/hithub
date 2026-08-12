import React from "react";
import { db } from "@hithub/database";
import { PlaySquare, Terminal, Play } from "lucide-react";

export const revalidate = 0;

export default async function ActionsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData = null;
  let runs: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo },
    });

    if (repoData) {
      runs = await db.workflowRun.findMany({
        where: { workflow: { repoId: repoData.id } },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (e) {
    // Safety fallback
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-base font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-4 h-4 text-[#58a6ff]" />
            Hithub Actions CI/CD Pipeline
          </h1>
          <p className="text-xs text-[#8b949e]">Automated workflow execution and container runners</p>
        </div>

        <button className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-all">
          <Play className="w-3 h-3 fill-white" />
          Run Workflow
        </button>
      </div>

      {/* Execution Logs */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
        <div className="bg-[#21262d] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 font-mono">
            <Terminal className="w-4 h-4 text-[#3fb950]" />
            <span className="text-white font-bold">Execution Logs</span>
          </div>
          <span className="text-[#8b949e] text-[11px] font-mono">Docker Isolated Runner</span>
        </div>

        <div className="p-4 bg-[#0d1117] font-mono text-xs text-[#c9d1d9] space-y-2 min-h-[300px] overflow-x-auto">
          {runs.length === 0 ? (
            <div className="text-[#8b949e]">✓ Hithub Actions orchestrator ready. Click 'Run Workflow' to launch CI container.</div>
          ) : (
            runs.map((r) => (
              <div key={r.id} className="space-y-1">
                <div className="text-[#58a6ff]">Status: {r.status} (Commit {r.commitSha.substring(0, 7)})</div>
                <div className="text-[#c9d1d9]">{r.logs}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
