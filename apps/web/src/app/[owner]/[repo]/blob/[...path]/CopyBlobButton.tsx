"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyBlobButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
      title="Copy raw contents"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#3fb950]" />
          <span className="text-[#3fb950]">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#8b949e]" />
          <span>Copy raw</span>
        </>
      )}
    </button>
  );
}
