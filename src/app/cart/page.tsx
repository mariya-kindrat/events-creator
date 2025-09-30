"use client";

import { useHydration } from "@/hooks/useHydration";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    BackgroundElements,
    CartHeader,
    CartItem,
    ContinueShopping,
    EmptyCart,
    OrderSummary,
    createBooking,
} from "./shared";

const CheckoutPage = () => {
    const { events, totalEvents, totalPrice, removeFromCart } = useCartStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isHydrated = useHydration();

    const handleCheckout = async () => {
        if (!session) {
            router.push("/login");
            return;
        }

        setIsLoading(true);
        try {
            const data = await createBooking(
                events,
                totalPrice,
                session.user.email
            );
            router.push(`/payment/${data.id}`);
        } catch (error) {
            console.error("Checkout error:", error);
            // You could add a toast notification here
        } finally {
            setIsLoading(false);
        }
    };

    // Show empty cart if no events
    if (events.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
            <BackgroundElements />

            <div className="relative z-10">
                <CartHeader totalEvents={totalEvents} />

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {events.map((event, index) => (
                                <CartItem
                                    key={`${event.optionsTitle}-${index}`}
                                    event={event}
                                    onRemove={removeFromCart}
                                />
                            ))}

                            <ContinueShopping />
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <OrderSummary
                                totalEvents={totalEvents}
                                totalPrice={totalPrice}
                                onCheckout={handleCheckout}
                                isLoading={isLoading}
                                isAuthenticated={!!session}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
