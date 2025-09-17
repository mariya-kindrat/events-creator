import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH CATEGORIES
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();

        return new NextResponse(JSON.stringify(categories), {
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

// ADD CATEGORY
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        // Validate required fields
        const { title, description, color, image, slug } = body;

        if (!title || !description || !color || !image || !slug) {
            return new NextResponse(
                JSON.stringify({
                    error: "Missing required fields. Please provide title, description, color, image, and slug.",
                }),
                {
                    status: 400,
                }
            );
        }

        // Check if slug already exists
        const existingCategory = await prisma.category.findUnique({
            where: { slug },
        });

        if (existingCategory) {
            return new NextResponse(
                JSON.stringify({
                    error: "A category with this slug already exists. Please use a unique slug.",
                }),
                {
                    status: 409,
                }
            );
        }

        // Create the category
        const category = await prisma.category.create({
            data: {
                title,
                description,
                color,
                image,
                slug,
            },
        });

        return new NextResponse(JSON.stringify(category), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to add category" }),
            {
                status: 500,
            }
        );
    }
};

// export const GET = () => {
//     return new NextResponse("Hello", {
//         status: 200,
//     });
// };
