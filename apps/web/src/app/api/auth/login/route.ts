import { NextResponse } from "next/server";
import { db } from "@hithub/database";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username = "octocat" } = await req.json();

    // Get or create user in SQLite
    let user = await db.user.findFirst({ where: { username } });
    if (!user) {
      user = await db.user.create({
        data: {
          username,
          email: `${username}@hithub.com`,
          name: "The Hithub Octocat",
        },
      });
    }

    // Create session token
    const token = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await db.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("hithub_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
