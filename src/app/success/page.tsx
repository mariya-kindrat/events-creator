"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");
    const router = useRouter();

    useEffect(() => {
        if (!payment_intent) return;
        const confirmPayment = async () => {
            try {
                await fetch(`/api/confirm/${payment_intent}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                });
                router.push("/booking");
            } catch (error) {
                console.error("Error confirming payment:", error);
            }
        };

        confirmPayment();
    }, [payment_intent, router]);

    return (
        <div>
            Payment successful. You are being redirected to the bookings page.
            Please, do not close the page
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Processing payment...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
