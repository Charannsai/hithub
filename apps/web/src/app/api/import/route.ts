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
    // Use the user's GitHub OAuth token if available, or a provided PAT
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

    // Check for duplicate
    const existing = await db.repository.findFirst({
      where: { ownerId: userId, name: destName },
    });
    if (existing) {
      return NextResponse.json({ error: "Repository with this name already exists" }, { status: 409 });
    }

    // Create real repository in SQLite
    const repo = await db.repository.create({
      data: {
        name: destName,
        description: ghRepo.description || `Imported from GitHub ${sourceRepo}`,
        visibility: ghRepo.private ? "PRIVATE" : "PUBLIC",
        starsCount: ghRepo.stargazers_count || 0,
        forksCount: ghRepo.forks_count || 0,
        defaultBranch: ghRepo.default_branch || "main",
        ownerId: userId,
      },
      include: { owner: true },
    });

    // Initialize bare git repository via Git Service
    try {
      await fetch("http://localhost:8080/api/repos/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner: user.username, repoName: destName }),
      });
    } catch (e) {
      console.warn("Git service init warning:", e);
    }

    return NextResponse.json({
      success: true,
      repo,
      message: `Successfully imported ${sourceRepo} into Hithub as ${user.username}/${destName}!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
