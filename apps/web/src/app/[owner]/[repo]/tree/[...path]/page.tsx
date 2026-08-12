import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import {
  GitBranch,
  Folder,
  FileText,
  History,
  ChevronRight,
  FileCode,
} from "lucide-react";
import CloneDropdown from "../../CloneDropdown";

export const revalidate = 0;

export default async function RepoTreePage({
  params,
}: {
  params: { owner: string; repo: string; path: string[] };
}) {
  const { owner, repo, path: pathSegments } = params;
  const currentPath = pathSegments ? pathSegments.join("/") : "";

  // Query git tree for subpath
  let fileList: Array<{ name: string; type: string; sha: string; path: string }> = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const treeRes = await fetch(
      `http://localhost:8080/api/repos/${owner}/${repo}/tree?path=${encodeURIComponent(currentPath)}`,
      {
        cache: "no-store",
        signal: controller.signal,
      }
    ).catch(() => null);

    clearTimeout(timeoutId);

    if (treeRes && treeRes.ok) {
      const data = await treeRes.json();
      if (Array.isArray(data.entries)) {
        fileList = data.entries.map((e: any) => ({
          name: e.name,
          type: e.type,
          sha: e.sha || "",
          path: e.path,
        }));
      }
    }
  } catch (e) {}

  fileList.sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return a.name.localeCompare(b.name);
  });

  // Calculate parent directory link
  const parentSegments = pathSegments ? pathSegments.slice(0, -1) : [];
  const parentLink =
    parentSegments.length > 0
      ? `/${owner}/${repo}/tree/${parentSegments.join("/")}`
      : `/${owner}/${repo}`;

  return (
    <div className="space-y-4">
      {/* Breadcrumb Path & Code Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-sm font-semibold flex-wrap">
          <Link href={`/${owner}/${repo}`} className="text-[#58a6ff] hover:underline">
            {repo}
          </Link>
          {pathSegments.map((segment, idx) => {
            const subPath = pathSegments.slice(0, idx + 1).join("/");
            return (
              <React.Fragment key={subPath}>
                <span className="text-[#8b949e]">/</span>
                <Link
                  href={`/${owner}/${repo}/tree/${subPath}`}
                  className="text-[#58a6ff] hover:underline"
                >
                  {segment}
                </Link>
              </React.Fragment>
            );
          })}
        </div>

        <CloneDropdown owner={owner} repo={repo} />
      </div>

      {/* Directory Items Table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden text-xs divide-y divide-[#30363d]">
        {/* Parent Row */}
        <div className="px-4 py-2.5 bg-[#21262d]/50 hover:bg-[#21262d] transition-colors">
          <Link href={parentLink} className="font-bold text-[#58a6ff] hover:underline flex items-center gap-2">
            .. (Go to parent directory)
          </Link>
        </div>

        {fileList.map((file) => {
          const itemPath = `${currentPath}/${file.name}`;
          const itemHref =
            file.type === "dir"
              ? `/${owner}/${repo}/tree/${itemPath}`
              : `/${owner}/${repo}/blob/${itemPath}`;

          return (
            <div
              key={file.name}
              className="px-4 py-2 flex items-center justify-between hover:bg-[#21262d]/50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {file.type === "dir" ? (
                  <Folder className="w-4 h-4 text-[#58a6ff] shrink-0 fill-[#58a6ff]/20" />
                ) : (
                  <FileText className="w-4 h-4 text-[#8b949e] shrink-0" />
                )}
                <Link
                  href={itemHref}
                  className="font-medium text-[#c9d1d9] hover:text-[#58a6ff] hover:underline truncate"
                >
                  {file.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
