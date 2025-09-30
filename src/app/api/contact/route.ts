/**
 * Contact API endpoint - Handles contact form submissions
 * Currently logs to console, can be extended to send emails or save to database
 */
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Log the contact form submission (replace with actual email sending or database storage)
        console.log("Contact form submission:", {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
        });

        // TODO: Implement actual email sending or database storage
        // Example: await sendEmail({ to: 'admin@example.com', subject: 'Contact Form', body: message });
        // Example: await prisma.contact.create({ data: { name, email, message } });

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
