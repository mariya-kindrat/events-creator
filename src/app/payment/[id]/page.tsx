"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentPage = ({ params }: { params: { id: string } }) => {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = params;

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/create-intent/${id}`,
                    {
                        method: "POST",
                    }
                );

                const clientSecretData = await response.json();
                setClientSecret(clientSecretData.clientSecret);
            } catch (error) {
                console.error("Error fetching payment details:", error);
            }
        };

        makeRequest();
    }, [id]);

    const options: StripeElementsOptions = {
        clientSecret: clientSecret,
        appearance: {
            theme: "stripe",
        },
    };

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};

export default PaymentPage;
