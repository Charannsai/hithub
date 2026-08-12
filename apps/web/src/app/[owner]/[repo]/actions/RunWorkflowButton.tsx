"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export default function RunWorkflowButton({ repoId }: { repoId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/actions/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={loading}
      className="bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
    >
      <Play className="w-3.5 h-3.5 fill-white" />
      {loading ? "Running..." : "Run Workflow"}
    </button>
  );
}
