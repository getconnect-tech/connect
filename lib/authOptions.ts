import { prisma } from "@/prisma/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: { code: { label: "Code", type: "text" }, email: { label: "Email", type: "text" } },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.code) {
          return null;
        }

        const { email, code } = credentials;

        const isValidCode = !!(await prisma.verificationToken.findUnique({ where: { email, token: code, expires: { gte: new Date() } } }));

        if (isValidCode) {
          await prisma.verificationToken.delete({ where: { email } });

          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            return user;
          } else {
            const newUser = await prisma.user.create({ data: { email, display_name: "", profile_url: "" } });
            return newUser;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // forward userInfo to token
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user!; // forward userInfo to client session from token
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // age of session cokkie in seconds
  },
};
