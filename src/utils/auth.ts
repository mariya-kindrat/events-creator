import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";

declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: boolean;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            // Add user properties to the session
            if (user) {
                session.user.isAdmin = (user as any).isAdmin || false;
            }
            return session;
        },
        async signIn({ user, account, profile, email }) {
            try {
                // Allow sign in for OAuth providers
                if (account?.provider === "google") {
                    // Check if user already exists with this email
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email! },
                        include: { accounts: true },
                    });

                    if (existingUser) {
                        // Check if this Google account is already linked
                        const existingAccount = existingUser.accounts.find(
                            (acc) =>
                                acc.provider === "google" &&
                                acc.providerAccountId ===
                                    account.providerAccountId
                        );

                        if (!existingAccount) {
                            // Link the Google account to the existing user
                            await prisma.account.create({
                                data: {
                                    userId: existingUser.id,
                                    type: account.type,
                                    provider: account.provider,
                                    providerAccountId:
                                        account.providerAccountId,
                                    refresh_token: account.refresh_token,
                                    access_token: account.access_token,
                                    expires_at: account.expires_at,
                                    token_type: account.token_type,
                                    scope: account.scope,
                                    id_token: account.id_token,
                                    session_state: account.session_state,
                                },
                            });
                        }
                    }
                    return true;
                }
                return true;
            } catch (error) {
                console.error("SignIn callback error:", error);
                return false;
            }
        },
    },
    pages: {
        error: "/auth/error", // Error code passed in query string as ?error=
        signIn: "/login", // Custom sign in page
    },
    debug: process.env.NODE_ENV === "development",
};

//  to be able to use the session in server components
export const getAuthSession = () => getServerSession(authOptions);
