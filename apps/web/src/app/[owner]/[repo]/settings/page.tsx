import React from "react";
import { db } from "@hithub/database";
import { Settings, KeyRound, Save, Trash2, Globe, Lock } from "lucide-react";

export const revalidate = 0;

export default async function SettingsPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const { owner, repo } = params;

  let repoData: any = null;
  let secrets: any[] = [];

  try {
    repoData = await db.repository.findFirst({
      where: { name: repo, owner: { username: owner } },
      include: { secrets: true },
    });

    if (repoData) {
      secrets = repoData.secrets || [];
    }
  } catch (e) {}

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#30363d] pb-4">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#58a6ff]" />
          Repository Settings
        </h1>
        <p className="text-xs text-[#8b949e]">
          Manage permissions, default branches, secrets, and repository visibility
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-6">
        <h3 className="font-bold text-sm text-white">General Information</h3>
        <form className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#c9d1d9] font-semibold">Repository Name</label>
              <input
                type="text"
                defaultValue={repoData?.name || repo}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[#c9d1d9] font-semibold">Default Branch</label>
              <input
                type="text"
                defaultValue={repoData?.defaultBranch || "main"}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-white font-mono focus:outline-none focus:border-[#58a6ff]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#c9d1d9] font-semibold">Description</label>
            <textarea
              defaultValue={repoData?.description || ""}
              rows={3}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-white focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-2 transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Encrypted Secrets */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#58a6ff]" /> Secrets and Variables
            </h3>
            <p className="text-xs text-[#8b949e]">
              Repository secrets are available in Hithub Actions workflows.
            </p>
          </div>
          <button className="bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-semibold px-3 py-1.5 rounded-md border border-[#30363d]">
            New repository secret
          </button>
        </div>

        <div className="divide-y divide-[#30363d] border border-[#30363d] rounded-md bg-[#0d1117]">
          {secrets.length === 0 ? (
            <p className="text-xs text-[#8b949e] p-4 text-center">
              There are no secrets for this repository.
            </p>
          ) : (
            secrets.map((secret: any) => (
              <div
                key={secret.id}
                className="p-3 flex items-center justify-between text-xs font-mono"
              >
                <span className="text-white font-bold">{secret.name}</span>
                <span className="text-[#8b949e] text-[11px]">
                  Updated {new Date(secret.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#161b22] border border-[#f85149]/40 rounded-md p-6 space-y-4">
        <h3 className="font-bold text-sm text-[#f85149]">Danger Zone</h3>
        <div className="flex items-center justify-between pt-2 text-xs">
          <div>
            <p className="font-bold text-white">Change repository visibility</p>
            <p className="text-[#8b949e]">
              Currently {repoData?.visibility || "PUBLIC"}.
            </p>
          </div>
          <button className="bg-[#21262d] hover:bg-[#30363d] text-[#f85149] text-xs font-semibold px-3 py-1.5 rounded-md border border-[#30363d]">
            Change visibility
          </button>
        </div>

        <div className="border-t border-[#30363d] flex items-center justify-between pt-4 text-xs">
          <div>
            <p className="font-bold text-[#f85149]">Delete this repository</p>
            <p className="text-[#8b949e]">
              Once deleted, it cannot be recovered.
            </p>
          </div>
          <button className="bg-[#f85149]/10 hover:bg-[#f85149]/20 text-[#f85149] text-xs font-semibold px-3 py-1.5 rounded-md border border-[#f85149]/40 flex items-center gap-1.5">
            <Trash2 className="w-3.5 h-3.5" />
            Delete repository
          </button>
        </div>
      </div>
    </div>
  );
}
