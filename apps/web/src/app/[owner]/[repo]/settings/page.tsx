import React from "react";
import { Settings, ShieldAlert, KeyRound, Webhook, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#30363d] pb-4">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          Repository Settings
        </h1>
        <p className="text-xs text-zinc-400">Manage permissions, webhooks, encrypted secrets, and branch rules</p>
      </div>

      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 space-y-6">
        <h3 className="font-bold text-sm text-white">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-zinc-400">Repository Name</label>
            <input
              type="text"
              defaultValue="hithub-core"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-white font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-zinc-400">Default Branch</label>
            <input
              type="text"
              defaultValue="main"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-white font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#30363d] space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400" /> Encrypted Secrets
          </h3>
          <p className="text-xs text-zinc-400">Repository secrets are encrypted locally with KMS/AES-256 envelope encryption.</p>
          <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 flex items-center justify-between text-xs font-mono">
            <span className="text-white">DEPLOY_TOKEN</span>
            <span className="text-zinc-500">Updated 2 days ago</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#30363d] flex justify-end">
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
