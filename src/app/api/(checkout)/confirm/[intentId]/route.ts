import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (
    _req: Request,
    { params }: { params: Promise<{ intentId: string }> }
) => {
    const { intentId } = await params;

    try {
        await prisma.booking.update({
            where: { intent_id: intentId },
            data: {
                status: "being confirmed!",
            },
        });

        return new NextResponse(
            JSON.stringify({ message: "Booking has been updated!" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error updating booking:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to update booking" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
