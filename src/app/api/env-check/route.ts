import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const envStatus = {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
            DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
            DATABASE_URL_STARTS_WITH:
                process.env.DATABASE_URL?.substring(0, 15) || "N/A",
            NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "SET" : "NOT SET",
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
            GOOGLE_ID: process.env.GOOGLE_ID ? "SET" : "NOT SET",
            GOOGLE_SECRET: process.env.GOOGLE_SECRET ? "SET" : "NOT SET",
            STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
                ? "SET"
                : "NOT SET",
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env
                .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                ? "SET"
                : "NOT SET",
            TOTAL_ENV_VARS: Object.keys(process.env).length,
            RELEVANT_ENV_KEYS: Object.keys(process.env).filter(
                (key) =>
                    key.includes("DATABASE") ||
                    key.includes("NEXTAUTH") ||
                    key.includes("GOOGLE") ||
                    key.includes("STRIPE")
            ),
            TIMESTAMP: new Date().toISOString(),
        };

        return NextResponse.json(
            {
                success: true,
                message: "Environment variables check",
                data: envStatus,
            },
            { status: 200 }
        );
    } catch (error) {
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
