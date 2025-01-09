import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
      if (token) {
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
