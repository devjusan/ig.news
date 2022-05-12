import { query as q } from "faunadb";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import fauna from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const { email } = user;

      try {
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },
});
