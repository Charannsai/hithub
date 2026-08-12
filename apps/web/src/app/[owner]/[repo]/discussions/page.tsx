import React from "react";
import Link from "next/link";
import { MessageSquare, Plus, CheckCircle, ThumbsUp, Heart } from "lucide-react";

export default function DiscussionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            Community Discussions
          </h1>
          <p className="text-xs text-zinc-400">Q&A, feature proposals, announcements, and show-and-tell</p>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          New Discussion
        </button>
      </div>

      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-4">
        <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">
                Q&A
              </span>
              <h3 className="font-bold text-white text-sm hover:text-emerald-400 cursor-pointer">
                Welcome to Hithub Community Discussions!
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Answered
            </span>
          </div>

          <p className="text-xs text-zinc-300">
            Feel free to post questions, share ideas for new plugins, or showcase what you are building with self-hosted Hithub.
          </p>

          <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-[#30363d] pt-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                OC
              </div>
              <span>octocat started 2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-zinc-400">
              <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> 18</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-zinc-400" /> 4 replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
