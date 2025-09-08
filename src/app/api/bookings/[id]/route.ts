import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    try {
        const body = await request.json();

        await prisma.booking.update({
            where: { id: id },
            data: {
                status: body, // Assuming you want to set the status to "confirmed"
            },
        });

        return new NextResponse("Booking updated successfully", {
            status: 200,
        });
    } catch (error) {
        console.log("Error updating booking:", error);
        return new NextResponse(
            JSON.stringify({ message: "Update went wrong!" }),
            {
                status: 500,
            }
        );
    }
};
