import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Test database connection by counting events
        const eventCount = await prisma.event.count();
        const categoryCount = await prisma.category.count();

        return NextResponse.json(
            {
                success: true,
                message: "Database connection successful",
                data: {
                    events: eventCount,
                    categories: categoryCount,
                    timestamp: new Date().toISOString(),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database connection error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Database connection failed",
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
};
