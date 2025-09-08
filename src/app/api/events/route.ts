import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH EVENTS
export const GET = async (request: NextRequest) => {
    // if we are in category page we have to filter events by category (slug)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // localhost:3000/api/events?category="art"

    try {
        const events = await prisma.event.findMany({
            // we chwck if category is provided
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
        console.log(error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to fetch categories" }),
            {
                status: 500,
            }
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
