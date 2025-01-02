import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.users.findFirst({
          where: { email: credentials?.email.toLowerCase() },
        });

        if (user) {
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password,
          );
          if (passwordCorrect) {
            return {
              id: user.toString(),
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
