import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // Get all environment variables
        const allEnvVars = process.env;

        // Filter for our specific variables
        const relevantVars = Object.keys(allEnvVars)
            .filter(
                (key) =>
                    key.includes("DATABASE") ||
                    key.includes("NEXTAUTH") ||
                    key.includes("GOOGLE") ||
                    key.includes("STRIPE") ||
                    key.includes("ENABLE") ||
                    key.startsWith("NEXT_PUBLIC_")
            )
            .reduce((obj, key) => {
                obj[key] = allEnvVars[key] ? "SET" : "NOT_SET";
                return obj;
            }, {} as Record<string, string>);

        // Also check some common AWS/Amplify environment variables
        const awsVars = Object.keys(allEnvVars)
            .filter(
                (key) =>
                    key.startsWith("AWS_") ||
                    key.startsWith("AMPLIFY_") ||
                    key.includes("LAMBDA") ||
                    key.includes("VERCEL")
            )
            .reduce((obj, key) => {
                obj[key] = allEnvVars[key] ? "SET" : "NOT_SET";
                return obj;
            }, {} as Record<string, string>);

        return NextResponse.json({
            success: true,
            message: "Environment variables test",
            data: {
                totalEnvVars: Object.keys(allEnvVars).length,
                nodeEnv: process.env.NODE_ENV,
                relevantVars,
                awsVars,
                // Direct checks
                directChecks: {
                    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT_SET",
                    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
                        ? "SET"
                        : "NOT_SET",
                    ENABLE_DEBUG: process.env.ENABLE_DEBUG ? "SET" : "NOT_SET",
                    GOOGLE_ID: process.env.GOOGLE_ID ? "SET" : "NOT_SET",
                },
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Environment test error:", error);
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
