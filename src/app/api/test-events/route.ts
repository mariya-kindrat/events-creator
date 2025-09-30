import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// TEST EVENTS API - to debug the images field issue
export const GET = async (request: NextRequest) => {
    try {
        console.log("🧪 Testing events API with images field...");
        console.log("🔍 Environment check:");
        console.log("- NODE_ENV:", process.env.NODE_ENV);
        console.log("- DATABASE_URL exists:", !!process.env.DATABASE_URL);
        console.log("- DATABASE_URL preview:", process.env.DATABASE_URL?.substring(0, 50) + "...");
        
        // First, let's try to get the database schema info
        const columns = await prisma.$queryRaw`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'Event' AND table_schema = 'public'
            ORDER BY ordinal_position;
        `;
        
        console.log("📋 Database columns:", columns);
        
        // Now try to fetch events with images field
        const events = await prisma.event.findMany({
            select: {
                id: true,
                title: true,
                images: true,
                location: true,
                price: true,
            },
            take: 3
        });

        console.log("✅ Successfully fetched events with images field");
        console.log("Sample event:", events[0]);

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Events fetched successfully with images field",
            columns: columns,
            events: events,
            count: events.length
        }), {
            status: 200,
        });
    } catch (error) {
        console.error("❌ Test Events API Error:", error);

        return new NextResponse(
            JSON.stringify({
                success: false,
                error: "Failed to fetch test events",
                details: error instanceof Error ? error.message : "Unknown error",
            }),
            { status: 500 }
        );
    }
};