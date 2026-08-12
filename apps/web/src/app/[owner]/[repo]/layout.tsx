import React from "react";
import Link from "next/link";
import {
  Code2,
  CircleDot,
  GitPullRequest,
  MessageSquare,
  PlaySquare,
  Kanban,
  ShieldCheck,
  Settings,
  Star,
  GitFork,
  Eye,
  Lock,
  Globe,
} from "lucide-react";

export default function RepoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;
  const baseUrl = `/${owner}/${repo}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Repository Header */}
      <div className="bg-[#161b22] border-b border-[#30363d] pt-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Title & Visibility */}
            <div className="flex items-center space-x-2 text-lg">
              <span className="text-emerald-400 font-semibold">{owner}</span>
              <span className="text-zinc-500">/</span>
              <span className="text-white font-extrabold">{repo}</span>
              <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                <Globe className="w-3 h-3" /> Public
              </span>
            </div>

            {/* Action buttons (Watch, Fork, Star) */}
            <div className="flex items-center space-x-2 text-xs">
              <button className="bg-[#21262d] hover:bg-zinc-700 border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-1.5 text-zinc-200 transition-colors">
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
                <span>Watch</span>
                <span className="bg-[#0d1117] px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">14</span>
              </button>

              <button className="bg-[#21262d] hover:bg-zinc-700 border border-[#30363d] px-3 py-1.5 rounded-md flex items-center gap-1.5 text-zinc-200 transition-colors">
                <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                <span>Fork</span>
                <span className="bg-[#0d1117] px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">289</span>
              </button>

              <button className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-emerald-300 transition-colors font-medium">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Starred</span>
                <span className="bg-emerald-950 px-1.5 py-0.5 rounded text-[10px] text-emerald-400 font-mono">1.4k</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <nav className="flex items-center space-x-1 border-t border-[#30363d] pt-2 overflow-x-auto text-xs font-medium">
            <Link
              href={baseUrl}
              className="flex items-center gap-2 px-3 py-2 text-zinc-200 border-b-2 border-emerald-500 hover:text-white transition-colors"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              Code
            </Link>

            <Link
              href={`${baseUrl}/issues`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <CircleDot className="w-4 h-4 text-zinc-400" />
              Issues
              <span className="bg-[#21262d] text-zinc-300 px-1.5 py-0.2 text-[10px] rounded-full font-mono">1</span>
            </Link>

            <Link
              href={`${baseUrl}/pulls`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <GitPullRequest className="w-4 h-4 text-zinc-400" />
              Pull Requests
              <span className="bg-[#21262d] text-zinc-300 px-1.5 py-0.2 text-[10px] rounded-full font-mono">1</span>
            </Link>

            <Link
              href={`${baseUrl}/discussions`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              Discussions
            </Link>

            <Link
              href={`${baseUrl}/actions`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <PlaySquare className="w-4 h-4 text-zinc-400" />
              Actions
            </Link>

            <Link
              href={`${baseUrl}/projects`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <Kanban className="w-4 h-4 text-zinc-400" />
              Projects
            </Link>

            <Link
              href={`${baseUrl}/security`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              Security
            </Link>

            <Link
              href={`${baseUrl}/settings`}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-500 transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Page Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">{children}</div>
    </div>
  );
}
