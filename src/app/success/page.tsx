"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");
    const router = useRouter();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/confirm/${payment_intent}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                // if (!response.ok) {
                //     throw new Error("Failed to confirm payment");
                // }

                // const data = await response.json();
                // console.log("Payment confirmed:", data);

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
};

export default SuccessPage;
