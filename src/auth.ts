import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import prisma from "@/lib/db";
import { compare } from "bcryptjs";


async function getUser(name: string): Promise<User | null> {
  console.log(name);
  try {
    const user = await prisma.user.findUnique({ where: { name } });
    return user;
  } catch (e) {
    console.error("failed to get user", e);
    throw new Error("Failed to fetch user from database");
  }
}

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isInConversations = nextUrl.pathname.startsWith("/conversation");

      if (isInConversations) {
        if (isLoggedIn) return true; //check if user is in this convo
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/conversation", nextUrl));
      }

      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("h");
        const user = await getUser(credentials.name as string);
        if (!user) return null;
        if (await compare(credentials.password as string, user.password))
          return user;
        return null;
      },
    }),
  ],
});

