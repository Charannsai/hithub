import React from "react";
import { db } from "@hithub/database";
import { PlaySquare, Terminal } from "lucide-react";
import RunWorkflowButton from "./RunWorkflowButton";

export const revalidate = 0;

export default async function ActionsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData: any = null;
  let runs: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
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
          <p className="text-xs text-[#8b949e]">
            Automated workflow execution and container runners
          </p>
        </div>

        {repoData && <RunWorkflowButton repoId={repoData.id} />}
      </div>

      {/* Workflow Runs / Execution Logs */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
        <div className="bg-[#21262d] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 font-mono">
            <Terminal className="w-4 h-4 text-[#3fb950]" />
            <span className="text-white font-bold">Execution Logs</span>
          </div>
          <span className="text-[#8b949e] text-[11px] font-mono">
            Local Runner ({runs.length} runs)
          </span>
        </div>

        <div className="p-4 bg-[#0d1117] font-mono text-xs text-[#c9d1d9] space-y-4 min-h-[300px] overflow-x-auto divide-y divide-[#30363d]">
          {runs.length === 0 ? (
            <div className="text-[#8b949e]">
              ✓ Hithub Actions orchestrator ready. Click 'Run Workflow' to launch CI execution.
            </div>
          ) : (
            runs.map((r) => (
              <div key={r.id} className="pt-3 first:pt-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#58a6ff] font-bold">
                    Status: {r.status} (Commit {r.commitSha ? r.commitSha.substring(0, 7) : "head"})
                  </span>
                  <span className="text-[11px] text-[#8b949e]">
                    {new Date(r.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-[#c9d1d9] whitespace-pre-wrap">{r.logs}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
