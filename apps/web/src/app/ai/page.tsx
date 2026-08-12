import React from "react";
import { Bot, Sparkles, Terminal, Play, Cpu, CheckCircle2, ShieldCheck, Code, Zap } from "lucide-react";

export default function AIPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* AI Sandbox Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-purple-950/50 border border-emerald-500/40 rounded-lg p-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Hithub AI Platform & Coding Agent Sandbox
            </h1>
            <p className="text-xs text-zinc-300">
              Provider-agnostic AI engine — Autonomous issue implementation, automated PR review, & CI debugging.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Options Panel */}
        <div className="lg:col-span-4 space-y-4 text-xs">
          {/* AI Provider Config */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" /> Model Adapter Provider
            </h3>

            <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-white font-mono">
              <option>Ollama (Local 100% Offline)</option>
              <option>Google Gemini 1.5 Pro</option>
              <option>Anthropic Claude 3.5 Sonnet</option>
              <option>OpenAI GPT-4o</option>
            </select>
          </div>

          {/* Autonomous Task Selector */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Autonomous Workflow
            </h3>

            <div className="space-y-2">
              <div className="p-3 bg-[#0d1117] border border-emerald-500/40 rounded-md space-y-1 cursor-pointer">
                <span className="font-bold text-emerald-400">Issue ➔ Plan ➔ Edit ➔ Test ➔ PR</span>
                <p className="text-[10px] text-zinc-400">Agent reads issue #1, writes code in Docker sandbox, runs unit tests, and submits PR.</p>
              </div>

              <div className="p-3 bg-[#161b22] hover:bg-[#21262d] border border-transparent hover:border-[#30363d] rounded-md space-y-1 cursor-pointer transition-colors">
                <span className="font-bold text-zinc-300">PR Security & Performance Reviewer</span>
                <p className="text-[10px] text-zinc-400">Inspects git diffs for memory leaks and vulnerability regressions.</p>
              </div>

              <div className="p-3 bg-[#161b22] hover:bg-[#21262d] border border-transparent hover:border-[#30363d] rounded-md space-y-1 cursor-pointer transition-colors">
                <span className="font-bold text-zinc-300">CI Build Debugger</span>
                <p className="text-[10px] text-zinc-400">Analyzes failed runner logs and auto-submits a fix commit.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sandbox Interactive Execution Terminal */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="bg-[#21262d] px-4 py-3 border-b border-[#30363d] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-mono">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">Autonomous Agent Execution Terminal</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-mono">
                Sandbox: Isolated Docker Container
              </span>
            </div>

            {/* Live Agent Trace Output */}
            <div className="p-4 bg-[#0d1117] font-mono text-xs text-zinc-300 space-y-2 min-h-[360px] overflow-x-auto">
              <div className="text-purple-400">🤖 [Hithub AI] Task received: "Implement WebAuthn passkeys for Issue #1"</div>
              <div className="text-zinc-500">Step 1: Reading repository AST and database schema in packages/database...</div>
              <div className="text-emerald-400">✓ Retrieved database models: User, Session, SSHKey</div>
              <div className="text-zinc-500">Step 2: Spinning up temporary isolated container sandbox...</div>
              <div className="text-emerald-400">✓ Created branch `agent/issue-1-webauthn`</div>
              <div className="text-zinc-300">&gt; git checkout -b agent/issue-1-webauthn</div>
              <div className="text-zinc-300">&gt; editing packages/database/prisma/schema.prisma...</div>
              <div className="text-zinc-300">&gt; pnpm test</div>
              <div className="text-emerald-400">✓ 142 unit tests passed cleanly in sandbox</div>
              <div className="text-purple-400 font-bold pt-2">
                🎉 Agent generated Pull Request #3: "feat(auth): Add WebAuthn Passkeys model and API"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
