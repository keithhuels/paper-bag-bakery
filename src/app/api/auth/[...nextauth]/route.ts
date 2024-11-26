import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        //validate. Zod?
        const response = await sql`
        SELECT * WHERE email=${credentials?.email}`;

        console.log({ credentials });
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
