import type { GetServerSidePropsContext } from 'next';
import type { NextAuthOptions, DefaultSession } from 'next-auth';
import { getServerSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '@src/env.mjs';
import { prisma } from '@server/db';
import type { UserRole } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      role: UserRole;
      address: string;
      phoneNumber: string;
      companyName: string;
      companyBio: string;
    } & DefaultSession['user'];
  }

  interface User {
    name: string;
    role: UserRole;
    address: string;
    phoneNumber: string;
    companyName: string;
    companyBio: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.role = user.role;
        session.user.address = user.address;
        session.user.phoneNumber = user.phoneNumber || '';
        session.user.companyName = user.companyName;
        session.user.companyBio = user.companyBio;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  pages: { newUser: '/signin/new', signIn: '/', signOut: '/' },
  providers: [
    DiscordProvider({
      clientId: env.TOKEN_DISCORD_CLIENT_ID,
      clientSecret: env.TOKEN_DISCORD_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.TOKEN_GITHUB_CLIENT_ID,
      clientSecret: env.TOKEN_GITHUB_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
