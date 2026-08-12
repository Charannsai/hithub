import React from "react";
import { ShieldCheck, ShieldAlert, KeyRound, Bug, FileCode, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Security & Compliance Overview
          </h1>
          <p className="text-xs text-zinc-400">SAST code scanning, Secret detection, and Dependency vulnerability audit</p>
        </div>

        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Passed All Scans
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300">Dependabot Vulnerabilities</span>
            <Bug className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">0</p>
          <p className="text-[11px] text-zinc-400">All npm and Go dependencies up to date.</p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300">Secret Scanning (Gitleaks)</span>
            <KeyRound className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">0</p>
          <p className="text-[11px] text-zinc-400">No API keys or tokens detected in git history.</p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300">SAST Code Analysis</span>
            <FileCode className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">0 Alerts</p>
          <p className="text-[11px] text-zinc-400">Semgrep SARIF ingestion scanner clean.</p>
        </div>
      </div>
    </div>
  );
}
