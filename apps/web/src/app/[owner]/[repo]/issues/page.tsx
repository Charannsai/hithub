import React from "react";
import Link from "next/link";
import {
  CircleDot,
  CheckCircle2,
  Plus,
  MessageSquare,
  Tag,
  User,
  Send,
  ShieldAlert,
} from "lucide-react";

export default function IssuesPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-4">
        <div className="flex items-center space-x-3 text-xs">
          <button className="bg-[#21262d] text-white px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 border border-[#30363d]">
            <CircleDot className="w-4 h-4 text-emerald-400" />
            1 Open
          </button>
          <button className="text-zinc-400 hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            12 Closed
          </button>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          New Issue
        </button>
      </div>

      {/* Main Issue Card: Issue #1 */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 space-y-6">
        {/* Issue Title & Meta */}
        <div className="space-y-2 border-b border-[#30363d] pb-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-white">
              Add support for WebAuthn passkeys in 2FA settings
            </h1>
            <span className="text-sm font-mono text-zinc-500">#1</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
              <CircleDot className="w-3.5 h-3.5" /> Open
            </span>
            <span className="text-zinc-300">
              <strong className="text-white">octocat</strong> opened this issue 1 hour ago • 1 comment
            </span>
          </div>
        </div>

        {/* Issue Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Main Post */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                    OC
                  </div>
                  <span className="font-bold text-white">octocat</span>
                  <span className="text-zinc-500">commented 1 hour ago</span>
                </div>
                <span className="text-[10px] bg-[#21262d] text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">
                  Author
                </span>
              </div>

              <div className="text-xs text-zinc-200 leading-relaxed space-y-2">
                <p>
                  We should allow users to register FIDO2 / WebAuthn passkeys for hardware security keys like YubiKeys or Apple TouchID/FaceID.
                </p>
                <p className="font-mono text-emerald-400 bg-[#161b22] p-3 rounded border border-[#30363d]">
                  // Proposed credential schema model:<br />
                  model WebAuthnCredential &#123;<br />
                  &nbsp;&nbsp;id: String<br />
                  &nbsp;&nbsp;publicKey: Bytes<br />
                  &nbsp;&nbsp;counter: Int<br />
                  &#125;
                </p>
              </div>
            </div>

            {/* Existing Comment */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-cyan-600 text-white font-bold text-[10px] flex items-center justify-center">
                    OC
                  </div>
                  <span className="font-bold text-white">octocat</span>
                  <span className="text-zinc-500">commented 45 minutes ago</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300">
                Great feature request! We can implement WebAuthn using standard browser WebAuthn API primitives and store public keys directly in the SQLite database.
              </p>
            </div>

            {/* New Comment Box */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-3">
              <textarea
                placeholder="Leave a comment..."
                rows={3}
                className="w-full bg-[#161b22] border border-[#30363d] rounded-md p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans"
              />
              <div className="flex justify-end">
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors">
                  <Send className="w-3.5 h-3.5" />
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Metadata */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-3">
              <div>
                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Assignees</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                    OC
                  </div>
                  <span className="text-white">octocat</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#30363d]">
                <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">Labels</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                    enhancement
                  </span>
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                    security
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
