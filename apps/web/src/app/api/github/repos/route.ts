import { NextResponse } from "next/server";
import { db } from "@hithub/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user || !user.githubToken) {
      return NextResponse.json({ repos: [] });
    }

    // Fetch user's repositories from GitHub API
    const res = await fetch("https://api.github.com/user/repos?sort=updated&per_page=30", {
      headers: {
        Authorization: `Bearer ${user.githubToken}`,
        "User-Agent": "Hithub-App",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ repos: [] });
    }

    const ghRepos = await res.json();
    if (!Array.isArray(ghRepos)) {
      return NextResponse.json({ repos: [] });
    }

    const repos = ghRepos.map((r: any) => ({
      id: r.id,
      fullName: r.full_name,
      name: r.name,
      owner: r.owner?.login,
      description: r.description,
      isPrivate: r.private,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      updatedAt: r.updated_at,
    }));

    return NextResponse.json({ repos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
