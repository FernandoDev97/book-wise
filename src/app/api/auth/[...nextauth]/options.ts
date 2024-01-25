/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextAuthOptions } from 'next-auth'
import { prismaClient } from '../../../../lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile: GithubProfile) {
        return {
          id: profile.id,
          name: profile.name!,
          email: profile.email!,
          image: profile.avatar_url,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name!,
          email: profile.email!,
          image: profile.picture,
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user,
      }
    },
  },
}
