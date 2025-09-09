import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (
    request: NextRequest,
    { params }: { params: Promise<{ bookingId: string }> }
) => {
    const { bookingId } = await params;
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
    });

    if (booking) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        await prisma.booking.update({
            where: { id: bookingId },
            data: {
                intent_id: paymentIntent.id,
            },
        });

        return new NextResponse(
            JSON.stringify({
                clientSecret: paymentIntent.client_secret,
            }),
            {
                status: 200,
            }
        );
    } else {
        return new Response(JSON.stringify({ message: "Booking not found" }), {
            status: 404,
        });
    }
};
