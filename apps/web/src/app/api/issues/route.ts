import { NextResponse } from "next/server";
import { db } from "@hithub/database";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repoId");

    const issues = await db.issue.findMany({
      where: repoId ? { repoId } : undefined,
      include: {
        author: true,
        comments: {
          include: { author: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ issues });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { repoId, title, body: issueBody } = body;

    if (!repoId || !title) {
      return NextResponse.json({ error: "repoId and title required" }, { status: 400 });
    }

    const user = await db.user.findFirst({ where: { username: "octocat" } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const count = await db.issue.count({ where: { repoId } });

    const issue = await db.issue.create({
      data: {
        repoId,
        number: count + 1,
        title,
        body: issueBody,
        authorId: user.id,
      },
    });

    return NextResponse.json({ success: true, issue });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
