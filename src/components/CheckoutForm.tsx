"use client";

import {
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import AddressForm from "./AddressForm";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        console.log("Client Secret - Checkout Form: ", clientSecret);

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/success",
            },
        });

        if (result.error) {
            setMessage(result.error.message || "An error occurred.");
        } else {
            setMessage("Payment successful! Redirecting...");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            <AddressForm />
            <button disabled={!stripe || isLoading || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay now"
                    )}
                </span>
            </button>

            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
