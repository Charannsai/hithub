import { NextResponse } from "next/server";
import { db } from "@hithub/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET /api/repos — List repositories
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    const repos = await db.repository.findMany({
      where: userId
        ? {
            OR: [
              { ownerId: userId },
              { visibility: "PUBLIC" },
            ],
          }
        : { visibility: "PUBLIC" },
      include: {
        owner: true,
        _count: {
          select: {
            issues: { where: { state: "OPEN" } },
            pullRequests: { where: { state: "OPEN" } },
            stars: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ repos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/repos — Create a new repository
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { name, description, visibility = "PUBLIC", initReadme = true } = body;

    if (!name) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
    }

    // Validate repo name
    if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
      return NextResponse.json(
        { error: "Repository name can only contain alphanumeric characters, hyphens, dots, and underscores" },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = await db.repository.findFirst({
      where: { ownerId: userId, name },
    });
    if (existing) {
      return NextResponse.json({ error: "Repository already exists" }, { status: 409 });
    }

    // Get user for username
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Save repository metadata in SQLite
    const repo = await db.repository.create({
      data: {
        name,
        description,
        visibility,
        ownerId: userId,
      },
      include: { owner: true },
    });

    // Trigger Git service to create bare repository on disk
    try {
      await fetch("http://localhost:8080/api/repos/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner: user.username, repoName: name }),
      });
    } catch (e) {
      console.warn("Git service init warning:", e);
    }

    return NextResponse.json({ success: true, repo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
