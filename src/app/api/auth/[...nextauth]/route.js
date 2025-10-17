import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],

  callbacks: {
    // Called whenever a JWT is created or updated
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // OAuth token
        token.idToken = account.id_token;         // JWT for backend validation
      }
      return token;
    },

    // Called whenever session data is checked
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken; // Include ID token
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
