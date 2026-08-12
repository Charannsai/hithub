import { NextResponse } from "next/server";
import { db } from "@hithub/database";

export async function POST(req: Request) {
  try {
    const { sourceRepo, destName, token } = await req.json();

    if (!sourceRepo || !destName) {
      return NextResponse.json({ error: "Source repo and destination name required" }, { status: 400 });
    }

    // 1. Fetch public metadata from GitHub API
    const headers: Record<string, string> = {
      "User-Agent": "Hithub-Importer",
    };
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const ghRes = await fetch(`https://api.github.com/repos/${sourceRepo}`, { headers });
    if (!ghRes.ok) {
      return NextResponse.json({ error: `GitHub API error: ${ghRes.statusText}` }, { status: ghRes.status });
    }

    const ghRepo = await ghRes.json();

    // 2. Get default octocat user
    let user = await db.user.findFirst({ where: { username: "octocat" } });
    if (!user) {
      user = await db.user.create({
        data: { username: "octocat", email: "octocat@hithub.com" },
      });
    }

    // 3. Create real repository in SQLite
    const repo = await db.repository.create({
      data: {
        name: destName,
        description: ghRepo.description || `Imported from GitHub ${sourceRepo}`,
        visibility: "PUBLIC",
        starsCount: ghRepo.stargazers_count || 0,
        forksCount: ghRepo.forks_count || 0,
        ownerId: user.id,
      },
    });

    // 4. Initialize bare git repository via Git Service
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
      message: `Successfully imported ${sourceRepo} into Hithub!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
