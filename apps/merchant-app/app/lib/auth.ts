import GoogleProvider from "next-auth/providers/google";
import db from "@repo/database/client";
import type { NextAuthOptions } from "next-auth";
import type { User, Account } from "next-auth";
// const db = new PrismaClient() ;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn(params: { user: User; account: Account | null; profile?: any; email?: any; credentials?: any }) {
      console.log("hi signin");

      const { user, account } = params;

      // Ensure user and user.email are defined
      if (!user || !user.email) {
        return false;
      }

      // Ensure account is not null
      if (!account) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true
        },
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name || "", // Handle optional fields
          auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
        },
        update: {
          name: user.name || "", // Handle optional fields
          auth_type: account.provider === "google" ? "Google" : "Github" // Use a prisma type here
        }
      });

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};
