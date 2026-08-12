import React from "react";
import { Bot, Terminal, Cpu, Zap } from "lucide-react";

export default function AIPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-[#121215] border border-[#27272a] rounded-lg p-6 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-md bg-white text-black flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              Hithub AI Platform & Agent Sandbox
            </h1>
            <p className="text-xs text-zinc-400">
              Provider-agnostic model gateway — Autonomous coding agent execution sandbox.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config Panel */}
        <div className="lg:col-span-4 space-y-4 text-xs">
          <div className="bg-[#121215] border border-[#27272a] rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-zinc-400" /> Model Provider
            </h3>

            <select className="w-full bg-[#09090b] border border-[#27272a] rounded-md p-2 text-white font-mono focus:outline-none">
              <option>Ollama (Local 100% Offline)</option>
              <option>Google Gemini 1.5 Pro</option>
              <option>Anthropic Claude 3.5 Sonnet</option>
              <option>OpenAI GPT-4o</option>
            </select>
          </div>

          <div className="bg-[#121215] border border-[#27272a] rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-zinc-400" /> Autonomous Workflow
            </h3>

            <div className="space-y-2">
              <div className="p-3 bg-[#09090b] border border-[#27272a] rounded-md space-y-1 cursor-pointer">
                <span className="font-bold text-white">Issue ➔ Plan ➔ Code ➔ Test ➔ PR</span>
                <p className="text-[10px] text-zinc-400">Agent inspects issue, writes code in Docker sandbox, and opens PR.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sandbox Terminal */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#121215] border border-[#27272a] rounded-lg overflow-hidden">
            <div className="bg-zinc-900 px-4 py-3 border-b border-[#27272a] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-mono">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span className="text-white font-bold">Execution Terminal</span>
              </div>
              <span className="bg-zinc-900 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded text-[10px] font-mono">
                Isolated Sandbox
              </span>
            </div>

            <div className="p-4 bg-[#09090b] font-mono text-xs text-zinc-300 space-y-2 min-h-[300px] overflow-x-auto">
              <div className="text-zinc-400">🤖 [Hithub AI] AI Gateway connected to local SQLite database & AST indexer...</div>
              <div className="text-zinc-300">✓ Ready to execute autonomous agent jobs.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
