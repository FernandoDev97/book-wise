import { PrismaAdapter } from "@/lib/auth/prismaAdapter";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export function buildNextAuthOption(req: NextApiRequest, res: NextApiResponse): NextAuthOptions {
    return {
        adapter: PrismaAdapter(req, res),
        providers: []
    }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, buildNextAuthOption(req, res)) 
}