// app/api/auth/route.ts
import { neon } from "@neondatabase/serverless";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        // console.log(credentials);
        const response =
          await sql`SELECT * FROM users WHERE email=${credentials?.email}`;

        const user = response[0];
        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );
        // console.log(passwordCorrect);
        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
});

export const GET = handler;
export const POST = handler;
