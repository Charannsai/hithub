import React from "react";
import { db } from "@hithub/database";
import { ShieldCheck, KeyRound, Bug, FileCode, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function SecurityPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData: any = null;

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
    });
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3fb950]" />
            Security & Compliance Overview
          </h1>
          <p className="text-xs text-[#8b949e]">
            Dependabot alerts, secret scanning, and automated SAST code analysis
          </p>
        </div>

        <span className="bg-[#238636]/10 text-[#3fb950] border border-[#238636]/30 px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Passed All Scans
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#c9d1d9]">Dependabot Alerts</span>
            <Bug className="w-4 h-4 text-[#3fb950]" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">0</p>
          <p className="text-[11px] text-[#8b949e]">
            No known security vulnerabilities in repository dependencies.
          </p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#c9d1d9]">Secret Scanning</span>
            <KeyRound className="w-4 h-4 text-[#3fb950]" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">0</p>
          <p className="text-[11px] text-[#8b949e]">
            No API keys or tokens detected in git commit history.
          </p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#c9d1d9]">Code Scanning (SAST)</span>
            <FileCode className="w-4 h-4 text-[#3fb950]" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">0 Alerts</p>
          <p className="text-[11px] text-[#8b949e]">
            Static analysis rules clean for {owner}/{repo}.
          </p>
        </div>
      </div>
    </div>
  );
}
