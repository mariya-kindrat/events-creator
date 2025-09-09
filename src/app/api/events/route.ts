import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH EVENTS
export const GET = async (request: NextRequest) => {
    // if we are in category page we have to filter events by category (slug)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // localhost:3000/api/events?category="art"

    try {
        // Check if DATABASE_URL is available
        if (!process.env.DATABASE_URL) {
            console.error("DATABASE_URL environment variable is not set");
            return new NextResponse(
                JSON.stringify({
                    error: "Database configuration error",
                    details: "DATABASE_URL environment variable is not set",
                }),
                { status: 500 }
            );
        }

        const events = await prisma.event.findMany({
            // we check if category is provided
            // if it is provided we filter events by category
            // if it is not provided we fetch all events that are featured
            where: {
                ...(category ? { catSlug: category } : { isFeatured: true }),
            },
        });

        return new NextResponse(JSON.stringify(events), {
            status: 200,
        });
    } catch (error) {
        console.error("Events API Error:", error);

        // More detailed error handling
        if (error instanceof Error) {
            if (
                error.message.includes(
                    "Environment variable not found: DATABASE_URL"
                )
            ) {
                return new NextResponse(
                    JSON.stringify({
                        error: "Database configuration error",
                        details:
                            "DATABASE_URL environment variable is not configured properly",
                    }),
                    { status: 500 }
                );
            }
        }

        return new NextResponse(
            JSON.stringify({
                error: "Failed to fetch events",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            }),
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const event = await prisma.event.create({
            data: body,
        });

        return new NextResponse(JSON.stringify(event), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to add event" }),
            {
                status: 500,
            }
        );
    }
};
