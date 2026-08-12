import React from "react";
import Link from "next/link";
import { db } from "@hithub/database";
import { getSession } from "@/lib/session";
import {
  BookOpen,
  Star,
  GitFork,
  MapPin,
  Link2,
  Building2,
  Lock,
  Users,
} from "lucide-react";

export const revalidate = 0;

export default async function UserProfilePage({
  params,
}: {
  params: { owner: string };
}) {
  const { owner } = params;
  const session = await getSession();
  const currentUserId = (session?.user as any)?.id;

  // Fetch user from DB
  const user = await db.user.findFirst({
    where: { username: owner },
  });

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-white">User not found</h1>
        <p className="text-sm text-[#8b949e] mt-2">
          The user <span className="font-mono text-[#58a6ff]">{owner}</span> doesn't exist.
        </p>
        <Link href="/" className="text-sm text-[#58a6ff] hover:underline mt-4 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const isOwnProfile = currentUserId === user.id;

  // Fetch user's repos
  const repos = await db.repository.findMany({
    where: {
      ownerId: user.id,
      ...(isOwnProfile ? {} : { visibility: "PUBLIC" }),
    },
    include: {
      _count: {
        select: { stars: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const avatarUrl = user.avatarUrl || user.image;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: User Profile */}
      <div className="lg:col-span-3 space-y-4">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user.username}
            className="w-64 h-64 rounded-full border-2 border-[#30363d] mx-auto lg:mx-0"
          />
        ) : (
          <div className="w-64 h-64 rounded-full bg-[#21262d] border-2 border-[#30363d] flex items-center justify-center text-4xl font-bold text-white mx-auto lg:mx-0">
            {user.username.substring(0, 2).toUpperCase()}
          </div>
        )}

        {/* Name & Username */}
        <div>
          {user.name && (
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          )}
          <p className="text-xl text-[#8b949e] font-light">{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-[#c9d1d9]">{user.bio}</p>
        )}

        {/* Edit Profile Button */}
        {isOwnProfile && (
          <button className="w-full bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-semibold py-1.5 rounded-md border border-[#30363d] transition-colors">
            Edit profile
          </button>
        )}

        {/* Meta Info */}
        <div className="space-y-1.5 text-xs text-[#8b949e]">
          {user.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <a
                href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline"
              >
                {user.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right: Repositories */}
      <div className="lg:col-span-9 space-y-4">
        {/* Tab Bar */}
        <div className="border-b border-[#30363d] pb-2">
          <nav className="flex items-center space-x-4 text-sm font-semibold">
            <span className="text-white border-b-2 border-[#f78166] pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Repositories
              <span className="bg-[#30363d] text-[#c9d1d9] px-2 py-0.5 text-[11px] rounded-full font-mono">
                {repos.length}
              </span>
            </span>
          </nav>
        </div>

        {/* Repository List */}
        <div className="space-y-4">
          {repos.length === 0 ? (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-8 text-center">
              <p className="text-sm text-[#8b949e]">
                {isOwnProfile
                  ? "You don't have any repositories yet."
                  : `${user.username} doesn't have any public repositories yet.`}
              </p>
              {isOwnProfile && (
                <Link
                  href="/new"
                  className="inline-flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-2 rounded-md mt-4 transition-all shadow-sm"
                >
                  New repository
                </Link>
              )}
            </div>
          ) : (
            repos.map((repo: any) => (
              <div
                key={repo.id}
                className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${user.username}/${repo.name}`}
                      className="text-[#58a6ff] font-bold text-base hover:underline"
                    >
                      {repo.name}
                    </Link>
                    <span className="text-[10px] bg-[#21262d] text-[#8b949e] border border-[#30363d] px-1.5 py-0.5 rounded-full font-mono flex items-center gap-1">
                      {repo.visibility === "PRIVATE" && <Lock className="w-2.5 h-2.5" />}
                      {repo.visibility}
                    </span>
                  </div>

                  <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors">
                    <Star className="w-3.5 h-3.5 text-[#8b949e]" />
                    Star
                  </button>
                </div>

                {repo.description && (
                  <p className="text-xs text-[#8b949e]">{repo.description}</p>
                )}

                <div className="flex items-center gap-4 text-[11px] text-[#8b949e] pt-1">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {repo._count?.stars || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    {repo.forksCount}
                  </span>
                  <span>
                    Updated {new Date(repo.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
