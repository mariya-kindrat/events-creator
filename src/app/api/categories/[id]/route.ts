import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE CATEGORY
export const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: id },
        });

        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "Category not found!" }),
                {
                    status: 404,
                }
            );
        }

        return new NextResponse(JSON.stringify(category), {
            status: 200,
        });
    } catch (error) {
        console.log("Error fetching category:", error);
        return new NextResponse(
            JSON.stringify({ message: "Failed to fetch category!" }),
            {
                status: 500,
            }
        );
    }
};

// UPDATE SINGLE CATEGORY
export const PUT = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const session = await getAuthSession();

    if (!session?.user.isAdmin) {
        return new NextResponse(
            JSON.stringify({
                message: "You are not authorized to update categories!",
            }),
            {
                status: 403,
            }
        );
    }

    try {
        const body = await request.json();
        const category = await prisma.category.update({
            where: { id: id },
            data: body,
        });

        return new NextResponse(JSON.stringify(category), {
            status: 200,
        });
    } catch (error) {
        console.log("Error updating category:", error);
        return new NextResponse(
            JSON.stringify({ message: "Failed to update category!" }),
            {
                status: 500,
            }
        );
    }
};

// DELETE SINGLE CATEGORY
export const DELETE = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const session = await getAuthSession();

    if (!session?.user.isAdmin) {
        return new NextResponse(
            JSON.stringify({
                message: "You are not authorized to delete categories!",
            }),
            {
                status: 403,
            }
        );
    }

    try {
        // Check if category has events
        const eventsCount = await prisma.event.count({
            where: {
                catSlug: {
                    equals: (
                        await prisma.category.findUnique({ where: { id } })
                    )?.slug,
                },
            },
        });

        if (eventsCount > 0) {
            return new NextResponse(
                JSON.stringify({
                    message: "Cannot delete category with existing events!",
                }),
                {
                    status: 400,
                }
            );
        }

        const category = await prisma.category.delete({
            where: { id: id },
        });

        return new NextResponse(
            JSON.stringify(
                `Category "${category.title}" was deleted from database.`
            ),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error deleting category:", error);
        return new NextResponse(
            JSON.stringify({ message: "Failed to delete category!" }),
            {
                status: 500,
            }
        );
    }
};
