import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // First, let's check what environment variables are available
        const envCheck = {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
            DATABASE_URL_PARTIAL: process.env.DATABASE_URL
                ? process.env.DATABASE_URL.substring(0, 20) + "..."
                : "NOT_SET",
            NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT_SET",
            ALL_ENV_KEYS: Object.keys(process.env).filter(
                (key) =>
                    key.includes("DATABASE") ||
                    key.includes("NEXTAUTH") ||
                    key.includes("GOOGLE") ||
                    key.includes("STRIPE")
            ),
        };

        console.log("Environment check:", envCheck);

        // If DATABASE_URL is not available, return debug info
        if (!process.env.DATABASE_URL) {
            return NextResponse.json(
                {
                    success: false,
                    message: "DATABASE_URL not found",
                    debug: envCheck,
                    timestamp: new Date().toISOString(),
                },
                { status: 500 }
            );
        }

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
                debug: envCheck,
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
                debug: {
                    NODE_ENV: process.env.NODE_ENV,
                    DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
                    ENV_KEYS_COUNT: Object.keys(process.env).length,
                },
            },
            { status: 500 }
        );
    }
};
