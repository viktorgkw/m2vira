import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signUserIn } from "@/services/authService";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    maxAge: 3600,
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account.provider === "google") {
        await signUserIn(user.name, user.email);
      }
      return user;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
