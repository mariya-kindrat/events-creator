import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                slug: true,
                color: true,
            },
            orderBy: {
                title: "asc",
            },
        });

        return new NextResponse(JSON.stringify(categories), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error fetching categories:", err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

export const POST = async (request: NextRequest) => {
    const session = await getAuthSession();

    if (!session?.user.isAdmin) {
        return new NextResponse(
            JSON.stringify({
                message: "You are not authorized to create categories!",
            }),
            {
                status: 403,
            }
        );
    }

    try {
        const body = await request.json();
        const category = await prisma.category.create({
            data: body,
        });

        return new NextResponse(JSON.stringify(category), {
            status: 201,
        });
    } catch (error) {
        console.log("Error creating category:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to create category" }),
            {
                status: 500,
            }
        );
    }
};
