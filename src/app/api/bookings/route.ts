import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH booking events
export const GET = async (request: NextRequest) => {
    const session = await getAuthSession();

    if (session) {
        try {
            if (session.user.isAdmin) {
                const bookings = await prisma.booking.findMany();
                return new NextResponse(JSON.stringify(bookings), {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                const bookings = await prisma.booking.findMany({
                    where: {
                        userEmail: session.user.email!,
                    },
                });
                return new NextResponse(JSON.stringify(bookings), {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
        } catch (error) {
            console.log(error);
            return new NextResponse(
                JSON.stringify({ error: "Failed to fetch categories" }),
                {
                    status: 500,
                }
            );
        }
    } else {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }
};

// POST
export const POST = async (request: NextRequest) => {
    const session = await getAuthSession();

    if (session) {
        try {
            const body = await request.json();

            console.log("Body: ", body);

            const newBooking = await prisma.booking.create({
                data: body,
            });

            return new NextResponse(JSON.stringify(newBooking), {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
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
    } else {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }
};
