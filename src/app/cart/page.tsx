"use client";

import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Loading component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-slate-300">Processing...</span>
    </div>
);

// Empty cart component
const EmptyCart = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        {/* Background Elements */}
        <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div
                className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            ></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-full flex items-center justify-center glass border border-slate-700/50">
                    <svg
                        className="w-16 h-16 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                        />
                    </svg>
                </div>

                <h2 className="text-3xl font-display font-bold text-white mb-4">
                    Your Cart is Empty
                </h2>

                <p className="text-slate-400 mb-8 leading-relaxed">
                    Looks like you haven't added any events to your cart yet.
                    Discover amazing events and start building your perfect
                    experience.
                </p>

                <Link
                    href="/events-board"
                    className="btn-premium inline-flex items-center space-x-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <span>Explore Events</span>
                </Link>
            </div>
        </div>
    </div>
);

// Cart item component
const CartItem = ({
    event,
    onRemove,
}: {
    event: any;
    onRemove: (event: any) => void;
}) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        // Add a small delay for better UX
        setTimeout(() => {
            onRemove(event);
            setIsRemoving(false);
        }, 300);
    };

    return (
        <div
            className={`group p-6 rounded-2xl glass border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 ${
                isRemoving ? "opacity-50 scale-95" : ""
            }`}
        >
            <div className="flex items-start space-x-6">
                {/* Event Image */}
                <div className="flex-shrink-0 relative overflow-hidden rounded-xl">
                    {event.image && (
                        <Image
                            src={event.image}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            width={120}
                            height={120}
                            alt={event.title}
                        />
                    )}

                    {/* Quantity Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {event.quantity}
                    </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-colors duration-300">
                                {event.title}
                            </h3>

                            {event.optionsTitle && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full glass border border-slate-700/50 text-sm text-slate-300 mb-3">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                    {event.optionsTitle}
                                </div>
                            )}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Remove from cart"
                        >
                            {isRemoving ? (
                                <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Price and Quantity Info */}
                    <div className="flex items-center justify-between">
                        <div className="text-slate-400 text-sm">
                            Quantity:{" "}
                            <span className="text-white font-medium">
                                {event.quantity}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gradient-primary">
                            ${event.price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Order summary component
const OrderSummary = ({
    totalEvents,
    totalPrice,
    onCheckout,
    isLoading,
    isAuthenticated,
}: {
    totalEvents: number;
    totalPrice: number;
    onCheckout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}) => {
    const serviceFee = Math.round(totalPrice * 0.05 * 100) / 100; // 5% service fee
    const tax = Math.round(totalPrice * 0.08 * 100) / 100; // 8% tax
    const finalTotal = totalPrice + serviceFee + tax;

    return (
        <div className="sticky top-8 space-y-6">
            {/* Order Summary Card */}
            <div className="p-8 rounded-3xl glass border border-slate-700/50 backdrop-blur-xl">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                    Order Summary
                </h3>

                {/* Summary Items */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-slate-300">
                        <span>
                            Subtotal ({totalEvents}{" "}
                            {totalEvents === 1 ? "event" : "events"})
                        </span>
                        <span className="font-medium">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                        <span>Service Fee</span>
                        <span className="font-medium">
                            ${serviceFee.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                        <span>Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <hr className="border-slate-700/50" />

                    <div className="flex items-center justify-between text-xl font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-gradient-primary">
                            ${finalTotal.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={onCheckout}
                    disabled={isLoading}
                    className="w-full btn-premium text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : isAuthenticated ? (
                        <>
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                            Proceed to Payment
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-6 h-6 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            Sign In to Checkout
                        </>
                    )}
                </button>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-4 h-4 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-4 h-4 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>Instant Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Card */}
            <div className="p-6 rounded-2xl glass border border-slate-700/50">
                <h4 className="text-lg font-bold text-white mb-3">
                    Need Help?
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                    Our concierge team is available 24/7 to assist with your
                    booking.
                </p>
                <button className="w-full btn-secondary">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    Contact Support
                </button>
            </div>
        </div>
    );
};

const CheckoutPage = () => {
    const { events, totalEvents, totalPrice, removeFromCart } = useCartStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    const handleCheckout = async () => {
        if (!session) {
            router.push("/login");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    events,
                    status: "Not Paid!",
                    price: totalPrice,
                    userEmail: session.user.email,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create booking");
            }

            const data = await response.json();
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
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
                        <Link
                            href="/events-board"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Events Board
                        </Link>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="text-white">Shopping Cart</span>
                    </nav>

                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            {totalEvents}{" "}
                            {totalEvents === 1 ? "Event" : "Events"} in Cart
                        </div>

                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            <span className="text-gradient-primary">
                                Your Cart
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Review your selected events and proceed to secure
                            checkout
                        </p>
                    </div>
                </div>

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

                            {/* Continue Shopping */}
                            <div className="pt-6">
                                <Link
                                    href="/events-board"
                                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
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
