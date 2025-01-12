// src/app/api/auth/options.ts
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user; // Attach user info to the session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Attach user info to the token
      }
      return token;
    },
  },
  pages: {
    signIn: "/login", // Redirect to login page
    signOut: "/login", // Redirect to login page after logout
    error: "/login",  // Redirect to login on error
  },
};
