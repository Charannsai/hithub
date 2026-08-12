import { NextResponse } from "next/server";
import { db } from "@hithub/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { sourceRepo, destName, token } = await req.json();

    if (!sourceRepo || !destName) {
      return NextResponse.json(
        { error: "Source repo and destination name required" },
        { status: 400 }
      );
    }

    // Get user for username
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch metadata from GitHub API
    const headers: Record<string, string> = {
      "User-Agent": "Hithub-Importer",
    };
    const authToken = token || user.githubToken;
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const ghRes = await fetch(`https://api.github.com/repos/${sourceRepo}`, { headers });
    if (!ghRes.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${ghRes.statusText}` },
        { status: ghRes.status }
      );
    }

    const ghRepo = await ghRes.json();

    // Check for duplicate in DB
    const existing = await db.repository.findFirst({
      where: { ownerId: userId, name: destName },
    });
    if (existing) {
      return NextResponse.json(
        { error: `You already have a repository named '${destName}'` },
        { status: 409 }
      );
    }

    // 1. Clone full real git repository from GitHub into local Hithub bare storage
    const remoteUrl = ghRepo.clone_url || `https://github.com/${sourceRepo}.git`;
    try {
      const cloneRes = await fetch("http://localhost:8080/api/repos/clone-remote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: user.username,
          repoName: destName,
          remoteUrl,
          authToken: ghRepo.private ? authToken : undefined,
        }),
      });

      if (!cloneRes.ok) {
        console.warn("Git clone-remote warning:", await cloneRes.text());
      }
    } catch (e) {
      console.warn("Git clone-remote fetch error:", e);
    }

    // 2. Create real repository in SQLite
    const repo = await db.repository.create({
      data: {
        name: destName,
        description: ghRepo.description || `Cloned from GitHub ${sourceRepo}`,
        visibility: ghRepo.private ? "PRIVATE" : "PUBLIC",
        starsCount: ghRepo.stargazers_count || 0,
        forksCount: ghRepo.forks_count || 0,
        defaultBranch: ghRepo.default_branch || "main",
        ownerId: userId,
      },
      include: { owner: true },
    });

    return NextResponse.json({
      success: true,
      repo,
      message: `Successfully cloned ${sourceRepo} into Hithub!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
