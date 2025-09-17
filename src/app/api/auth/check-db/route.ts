import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Check users and accounts in the database
        const users = await prisma.user.findMany({
            include: {
                accounts: true,
                sessions: true,
            },
        });

        const accounts = await prisma.account.findMany();
        const sessions = await prisma.session.findMany();

        return new NextResponse(
            JSON.stringify(
                {
                    users: users.length,
                    accounts: accounts.length,
                    sessions: sessions.length,
                    userDetails: users.map((user) => ({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        accountCount: user.accounts.length,
                        sessionCount: user.sessions.length,
                        accounts: user.accounts.map((acc) => ({
                            provider: acc.provider,
                            type: acc.type,
                            providerAccountId: acc.providerAccountId,
                        })),
                    })),
                },
                null,
                2
            ),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Database check error:", error);
        return new NextResponse(
            JSON.stringify({
                error: "Failed to check database",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
            }
        );
    }
};
