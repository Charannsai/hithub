import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@hithub/database";

export const authOptions: NextAuthOptions = {
  // @ts-ignore — adapter type mismatch between @auth/prisma-adapter and next-auth is cosmetic
  adapter: PrismaAdapter(db),
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
        // Update or set GitHub-specific fields on the user
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
          // User may not exist yet on first sign-in (adapter creates it)
          // We handle it in the session callback instead
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        // Attach user ID and username to the session
        (session.user as any).id = user.id;

        // Fetch full user data from our DB
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
          (session.user as any).username = dbUser.username;
          (session.user as any).avatarUrl = dbUser.avatarUrl;
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
      // When a new user is created by the adapter, set username from their profile
      // The adapter creates the user with email/name/image but not username
      const account = await db.account.findFirst({
        where: { userId: user.id },
      });

      if (account) {
        // Fetch GitHub profile to get login
        try {
          const res = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              "User-Agent": "Hithub",
            },
          });
          if (res.ok) {
            const ghProfile = await res.json();
            await db.user.update({
              where: { id: user.id },
              data: {
                username: ghProfile.login,
                avatarUrl: ghProfile.avatar_url,
                bio: ghProfile.bio || null,
                location: ghProfile.location || null,
                company: ghProfile.company || null,
                website: ghProfile.blog || null,
                githubId: String(ghProfile.id),
                githubToken: account.access_token,
              },
            });
          }
        } catch (e) {
          // Fallback: use email prefix as username
          if (user.email) {
            await db.user.update({
              where: { id: user.id },
              data: {
                username: user.email.split("@")[0],
              },
            });
          }
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.BETTER_AUTH_SECRET,
};
