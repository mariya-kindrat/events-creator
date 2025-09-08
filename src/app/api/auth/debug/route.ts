import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const session = await getAuthSession();

        return new NextResponse(
            JSON.stringify(
                {
                    session,
                    headers: Object.fromEntries(request.headers.entries()),
                    url: request.url,
                    cookies: request.cookies.getAll(),
                    env: {
                        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                        NODE_ENV: process.env.NODE_ENV,
                        GOOGLE_ID: process.env.GOOGLE_ID ? "Set" : "Not set",
                        GOOGLE_SECRET: process.env.GOOGLE_SECRET
                            ? "Set"
                            : "Not set",
                        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
                            ? "Set"
                            : "Not set",
                    },
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
        console.error("Debug API error:", error);
        return new NextResponse(
            JSON.stringify({
                error: "Failed to get debug info",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
            }
        );
    }
};
