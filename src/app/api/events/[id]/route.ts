import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT
export const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;

    try {
        const event = await prisma.event.findUnique({
            where: { id: id },
        });

        return new NextResponse(JSON.stringify(event), {
            status: 200,
        });
    } catch (error) {
        console.log("Error fetching event:", error);
        return new NextResponse(
            JSON.stringify({ message: "Failed to fetch event!" }),
            {
                status: 500,
            }
        );
    }
};

// UPDATE SINGLE EVENT
export const PUT = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const session = await getAuthSession();

    if (!session?.user.isAdmin) {
        return new NextResponse(
            JSON.stringify({
                message: "You are not authorized to update events!",
            }),
            {
                status: 403,
            }
        );
    }

    try {
        const body = await request.json();
        const event = await prisma.event.update({
            where: { id: id },
            data: body,
        });

        return new NextResponse(JSON.stringify(event), {
            status: 200,
        });
    } catch (error) {
        console.log("Error updating event:", error);
        return new NextResponse(
            JSON.stringify({ message: "Failed to update event!" }),
            {
                status: 500,
            }
        );
    }
};

// DELETE SINGLE PRODUCT
export const DELETE = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;

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
