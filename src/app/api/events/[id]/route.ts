import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT
export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    try {
        const event = await prisma.event.findUnique({
            where: { id: id },
        });

        return new NextResponse(JSON.stringify(event), {
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

// DELETE SINGLE PRODUCT
export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    const session = await getAuthSession();

    if (session?.user.isAdmin) {
        try {
            const event = await prisma.event.delete({
                where: { id: id },
            });

            return new NextResponse(
                JSON.stringify(`Event /{${event.title}/} was deleted from db.`),
                {
                    status: 200,
                }
            );
        } catch (error) {
            console.log("Error deleting event from db:", error);
            return new NextResponse(
                JSON.stringify({
                    message: error + ": " + "Error deleting event from db!",
                }),
                {
                    status: 500,
                }
            );
        }
    }
    return new NextResponse(
        JSON.stringify({ message: "Error deleting event from db!" }),
        {
            status: 403,
        }
    );
};
