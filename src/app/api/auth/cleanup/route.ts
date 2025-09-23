import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        // Find users without any accounts (orphaned users)
        const usersWithoutAccounts = await prisma.user.findMany({
            where: {
                accounts: {
                    none: {},
                },
            },
            include: {
                accounts: true,
                sessions: true,
                Booking: true,
            },
        });

        const cleanupResults = [];

        for (const user of usersWithoutAccounts) {
            // Only delete users that have no bookings and no sessions
            if (user.Booking.length === 0 && user.sessions.length === 0) {
                await prisma.user.delete({
                    where: { id: user.id },
                });
                cleanupResults.push({
                    action: "deleted",
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    },
                });
            } else {
                cleanupResults.push({
                    action: "skipped",
                    reason: "has bookings or sessions",
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        bookings: user.Booking.length,
                        sessions: user.sessions.length,
                    },
                });
            }
        }

        return new NextResponse(
            JSON.stringify({
                message: "Cleanup completed",
                results: cleanupResults,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Cleanup error:", error);
        return new NextResponse(
            JSON.stringify({
                error: "Failed to cleanup database",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
            }
        );
    }
};
