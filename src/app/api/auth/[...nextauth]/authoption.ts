import { prisma } from "@/lib/prisma";
import { GetUserResult } from "@/types/login";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined,
      ): Promise<GetUserResult> {
      const data= z.object({email: z.string().email(),password: z.string()}).parse(credentials)
      try {
        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });
        if (!user) {
          return null
        }
        const isValidPassword = await compare(
          data.password,
          user.password
          );
          if (!isValidPassword){
            return null
          }
          return user;
        } catch (e) {
          throw new Error()
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }:any) {
      const userDb = async () => {
        try {
          return await prisma.user.findUnique({
            where: {
              email: token.email as string,
            },
          });
        } catch (error) {
          throw new Error()
        } finally {
          await prisma.$disconnect();
        }
      };
      const dbUser = await userDb();
      if (!dbUser) {
        return null;
      }
      token.sub = dbUser.id;
      token.name = dbUser.name;
      token.email = dbUser.email;
      token.role = dbUser.role;
      return token;
    },
    async session({ session, token }:any) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },pages:{
    signIn:"/login"
  }
  
};
