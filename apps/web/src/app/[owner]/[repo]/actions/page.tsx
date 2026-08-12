import React from "react";
import { db } from "@hithub/database";
import { PlaySquare, CheckCircle2, Terminal, Play } from "lucide-react";

export const revalidate = 0;

export default async function ActionsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  const repoData = await db.repository.findFirst({
    where: { name: repo },
  });

  const runs = repoData
    ? await db.workflowRun.findMany({
        where: { workflow: { repoId: repoData.id } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div>
          <h1 className="text-base font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-4 h-4 text-zinc-300" />
            Hithub Actions CI/CD Pipeline
          </h1>
          <p className="text-xs text-zinc-400">Automated runner execution and matrix builds</p>
        </div>

        <button className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-colors">
          <Play className="w-3 h-3 fill-black" />
          Run Workflow
        </button>
      </div>

      {/* Runner Logs */}
      <div className="bg-[#121215] border border-[#27272a] rounded-lg overflow-hidden">
        <div className="bg-zinc-900 px-4 py-3 border-b border-[#27272a] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 font-mono">
            <Terminal className="w-4 h-4 text-zinc-400" />
            <span className="text-white font-bold">Execution Logs</span>
          </div>
          <span className="text-zinc-400 text-[11px] font-mono">Docker isolated runner</span>
        </div>

        <div className="p-4 bg-[#09090b] font-mono text-xs text-zinc-300 space-y-1 min-h-[300px] overflow-x-auto">
          {runs.length === 0 ? (
            <div>✓ Workflow ready. Click 'Run Workflow' to trigger container build.</div>
          ) : (
            runs.map((r) => (
              <div key={r.id} className="space-y-1">
                <div className="text-zinc-400">Status: {r.status} (Commit {r.commitSha.substring(0, 7)})</div>
                <div className="text-zinc-300">{r.logs}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
