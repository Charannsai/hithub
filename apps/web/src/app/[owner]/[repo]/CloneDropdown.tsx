"use client";

import React, { useState } from "react";
import { Code2, ChevronDown, Copy, Check, Download, Terminal } from "lucide-react";

export default function CloneDropdown({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const cloneUrl = `http://localhost:8080/${owner}/${repo}.git`;
  const cliCmd = `hithub repo clone ${owner}/${repo}`;

  const copyToClipboard = (text: string, isCli = false) => {
    navigator.clipboard.writeText(text);
    if (isCli) {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <button className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all">
        <Code2 className="w-3.5 h-3.5" />
        <span>Code</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {/* GitHub Exact Code Popover */}
      <div className="absolute right-0 top-full mt-1.5 w-80 bg-[#161b22] border border-[#30363d] rounded-md p-4 shadow-2xl hidden group-hover:block z-50 space-y-3 text-xs">
        <div className="text-xs font-bold text-white border-b border-[#30363d] pb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
            Clone Repository
          </span>
          <span className="text-[10px] bg-[#21262d] text-[#3fb950] border border-[#30363d] px-1.5 py-0.5 rounded font-mono font-semibold">
            Git HTTP
          </span>
        </div>

        {/* HTTPS Git URL */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-[#8b949e] font-mono">Clone with Git HTTP:</label>
          <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#58a6ff] font-mono justify-between">
            <input
              type="text"
              readOnly
              value={cloneUrl}
              className="bg-transparent w-full focus:outline-none select-all text-[#58a6ff]"
            />
            <button
              onClick={() => copyToClipboard(cloneUrl)}
              className="text-[#8b949e] hover:text-white transition-colors p-1 shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#3fb950]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Hithub CLI */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-[#8b949e] font-mono">Hithub CLI Command:</label>
          <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 text-xs text-[#c9d1d9] font-mono justify-between">
            <span className="truncate">{cliCmd}</span>
            <button
              onClick={() => copyToClipboard(cliCmd, true)}
              className="text-[#8b949e] hover:text-white transition-colors p-1 shrink-0"
              title="Copy to clipboard"
            >
              {copiedCli ? (
                <Check className="w-3.5 h-3.5 text-[#3fb950]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-[#30363d]">
          <a
            href={`http://localhost:8080/api/repos/${owner}/${repo}/zip`}
            className="text-xs text-[#c9d1d9] hover:text-[#58a6ff] flex items-center gap-2 font-medium py-1 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#58a6ff]" />
            Download ZIP
          </a>
        </div>
      </div>
    </div>
  );
}
