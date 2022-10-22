import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import prisma from "../../../lib/prisma";

export const authOptions = {
    providers : [
        GithubProvider({
            clientId: process.env.GITHUB,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile){
                return{
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session:({session, user})=> ({
            ...session,
            user: {
            ...session.user,
            id: user.id,
            username: user.username,
            },
        }),
    },

}

export default nextAuth(authOptions)