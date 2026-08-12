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
    const { issueId, body } = await req.json();

    if (!issueId || !body) {
      return NextResponse.json({ error: "issueId and body required" }, { status: 400 });
    }

    const comment = await db.issueComment.create({
      data: {
        issueId,
        authorId: userId,
        body,
      },
      include: { author: true },
    });

    return NextResponse.json({ success: true, comment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
