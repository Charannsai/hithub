import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@hithub/database";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers: [
    GithubProvider({
      clientId: (process.env.GITHUB_CLIENT_ID || "").trim(),
      clientSecret: (process.env.GITHUB_CLIENT_SECRET || "").trim(),
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile) {
        const ghProfile = profile as any;
        try {
          await db.user.update({
            where: { id: user.id },
            data: {
              username: ghProfile.login || user.name || "user",
              avatarUrl: ghProfile.avatar_url || user.image,
              bio: ghProfile.bio || null,
              location: ghProfile.location || null,
              company: ghProfile.company || null,
              website: ghProfile.blog || null,
              githubId: String(ghProfile.id),
              githubToken: account.access_token,
            },
          });
        } catch (e) {
          // If user record is not created yet by adapter, adapter will create it and trigger createUser event
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;

        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: {
            username: true,
            avatarUrl: true,
            bio: true,
            githubId: true,
          },
        });

        if (dbUser) {
          (session.user as any).username = dbUser.username || session.user.name || "user";
          (session.user as any).avatarUrl = dbUser.avatarUrl || session.user.image;
          (session.user as any).bio = dbUser.bio;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async createUser({ user }) {
      // Ensure username is populated if null
      if (!user.username) {
        const fallbackUsername = user.email ? user.email.split("@")[0] : `user_${user.id.substring(0, 8)}`;
        await db.user.update({
          where: { id: user.id },
          data: { username: fallbackUsername },
        });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.BETTER_AUTH_SECRET,
};
