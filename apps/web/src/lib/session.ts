import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { db } from "@hithub/database";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const userId = (session.user as any).id;
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  return user;
}

// Type augmentation for next-auth session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatarUrl?: string | null;
      bio?: string | null;
    };
  }
}
