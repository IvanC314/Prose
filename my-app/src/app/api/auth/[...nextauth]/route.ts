import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials || {};

          if (!username || !password) {
            throw new Error("Username and password required.");
          }

          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            throw new Error("Invalid username or password.");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid username or password.");
          }

            //if success, return user data
            return {
            id: user._id.toString(),
            username: user.username,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null; //if fail, return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/Login_Page/Login",
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
