import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Only show this in development or if explicitly enabled
        if (
            process.env.NODE_ENV === "production" &&
            process.env.ENABLE_DEBUG !== "true"
        ) {
            return NextResponse.json(
                { error: "Debug endpoint disabled in production" },
                { status: 403 }
            );
        }

        const envVars = {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
            NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "SET" : "NOT SET",
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
            GOOGLE_ID: process.env.GOOGLE_ID ? "SET" : "NOT SET",
            GOOGLE_SECRET: process.env.GOOGLE_SECRET ? "SET" : "NOT SET",
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env
                .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                ? "SET"
                : "NOT SET",
            STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
                ? "SET"
                : "NOT SET",
            // Show partial DATABASE_URL for debugging (without credentials)
            DATABASE_URL_PARTIAL: process.env.DATABASE_URL
                ? process.env.DATABASE_URL.replace(/\/\/[^@]+@/, "//***:***@")
                : "NOT SET",
        };

        return NextResponse.json({
            success: true,
            environment: envVars,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Environment debug error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
};
