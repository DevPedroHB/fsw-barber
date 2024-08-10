import { env } from "@/env";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as any;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
