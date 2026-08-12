import { NextResponse } from "next/server";
import { db } from "@hithub/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const repoId = searchParams.get("repoId");

    const issues = await db.issue.findMany({
      where: repoId ? { repoId } : undefined,
      include: {
        author: true,
        labels: { include: { label: true } },
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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { repoId, title, body: issueBody } = body;

    if (!repoId || !title) {
      return NextResponse.json({ error: "repoId and title required" }, { status: 400 });
    }

    // Get next issue number for this repo
    const lastIssue = await db.issue.findFirst({
      where: { repoId },
      orderBy: { number: "desc" },
    });
    const nextNumber = (lastIssue?.number || 0) + 1;

    const issue = await db.issue.create({
      data: {
        repoId,
        number: nextNumber,
        title,
        body: issueBody || null,
        authorId: userId,
      },
      include: { author: true },
    });

    return NextResponse.json({ success: true, issue });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const { issueId, state, title, body: issueBody, assigneeId } = body;

    if (!issueId) {
      return NextResponse.json({ error: "issueId required" }, { status: 400 });
    }

    const updateData: any = {};
    if (state) updateData.state = state;
    if (title) updateData.title = title;
    if (issueBody !== undefined) updateData.body = issueBody;
    if (assigneeId !== undefined) updateData.assigneeId = assigneeId;

    const issue = await db.issue.update({
      where: { id: issueId },
      data: updateData,
      include: { author: true },
    });

    return NextResponse.json({ success: true, issue });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
