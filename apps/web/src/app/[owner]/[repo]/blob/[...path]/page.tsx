import React from "react";
import Link from "next/link";
import { FileCode, Copy, Download, Code2 } from "lucide-react";
import CopyBlobButton from "./CopyBlobButton";

export const revalidate = 0;

export default async function RepoBlobPage({
  params,
}: {
  params: { owner: string; repo: string; path: string[] };
}) {
  const { owner, repo, path: pathSegments } = params;
  const filePath = pathSegments ? pathSegments.join("/") : "";
  const fileName = pathSegments ? pathSegments[pathSegments.length - 1] : "";

  let content = "";
  let errorMsg = "";

  try {
    const res = await fetch(
      `http://localhost:8080/api/repos/${owner}/${repo}/blob?path=${encodeURIComponent(filePath)}`,
      { cache: "no-store" }
    ).catch(() => null);

    if (res && res.ok) {
      const data = await res.json();
      content = data.content || "";
    } else {
      errorMsg = "File not found or failed to load.";
    }
  } catch (e: any) {
    errorMsg = e.message;
  }

  const lines = content.split("\n");
  const lineCount = lines.length;
  const byteSize = new Blob([content]).size;

  return (
    <div className="space-y-4">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between text-xs border-b border-[#30363d] pb-3">
        <div className="flex items-center space-x-2 text-sm font-semibold flex-wrap">
          <Link href={`/${owner}/${repo}`} className="text-[#58a6ff] hover:underline">
            {repo}
          </Link>
          {pathSegments.map((segment, idx) => {
            const subPath = pathSegments.slice(0, idx + 1).join("/");
            const isLast = idx === pathSegments.length - 1;
            return (
              <React.Fragment key={subPath}>
                <span className="text-[#8b949e]">/</span>
                {isLast ? (
                  <span className="text-white font-bold">{segment}</span>
                ) : (
                  <Link
                    href={`/${owner}/${repo}/tree/${subPath}`}
                    className="text-[#58a6ff] hover:underline"
                  >
                    {segment}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* File Viewer Box */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden text-xs">
        {/* Header Bar */}
        <div className="bg-[#21262d] px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center space-x-3 text-[#8b949e] font-mono text-[11px]">
            <span className="font-semibold text-[#c9d1d9] flex items-center gap-1.5 font-sans">
              <FileCode className="w-4 h-4 text-[#8b949e]" />
              {fileName}
            </span>
            <span>·</span>
            <span>{lineCount} lines</span>
            <span>·</span>
            <span>{(byteSize / 1024).toFixed(1)} KB</span>
          </div>

          <div className="flex items-center space-x-2">
            <CopyBlobButton content={content} />
          </div>
        </div>

        {/* File Content with Line Numbers */}
        {errorMsg ? (
          <div className="p-8 text-center text-[#f85149] font-mono">{errorMsg}</div>
        ) : (
          <div className="p-4 bg-[#0d1117] font-mono text-xs overflow-x-auto leading-relaxed">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-[#21262d]/50">
                    <td className="w-12 text-right pr-4 text-[#8b949e] select-none text-[11px] opacity-60">
                      {idx + 1}
                    </td>
                    <td className="text-[#c9d1d9] whitespace-pre">{line || " "}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
