import { NextResponse } from "next/server";
import { db } from "@hithub/database";

// GET /api/repos — List all real repositories from database
export async function GET() {
  try {
    const repos = await db.repository.findMany({
      include: {
        owner: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ repos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/repos — Create a real repository in DB & initialize Git bare repo on disk
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, visibility = "PUBLIC" } = body;

    if (!name) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
    }

    // 1. Get or create default user (octocat)
    let user = await db.user.findFirst({ where: { username: "octocat" } });
    if (!user) {
      user = await db.user.create({
        data: {
          username: "octocat",
          email: "octocat@hithub.com",
          name: "The Hithub Octocat",
        },
      });
    }

    // 2. Save repository metadata in SQLite
    const repo = await db.repository.create({
      data: {
        name,
        description,
        visibility,
        ownerId: user.id,
      },
    });

    // 3. Trigger Git service to create bare repository on disk
    try {
      await fetch("http://localhost:8080/api/repos/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner: user.username, repoName: name }),
      });
    } catch (e) {
      console.warn("Git service init warning (Git service may start separately):", e);
    }

    return NextResponse.json({ success: true, repo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
