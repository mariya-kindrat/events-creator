import React from "react";
import { OrderSummaryProps } from "../types";
import { calculatePricing, formatPrice } from "../utils";
import { LoadingSpinner } from "./LoadingSpinner";

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    totalEvents,
    totalPrice,
    onCheckout,
    isLoading,
    isAuthenticated,
}) => {
    const { serviceFee, tax, finalTotal } = calculatePricing(totalPrice);

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
                            ${formatPrice(totalPrice)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                        <span>Service Fee</span>
                        <span className="font-medium">
                            ${formatPrice(serviceFee)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                        <span>Tax</span>
                        <span className="font-medium">${formatPrice(tax)}</span>
                    </div>

                    <hr className="border-slate-700/50" />

                    <div className="flex items-center justify-between text-xl font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-gradient-primary">
                            ${formatPrice(finalTotal)}
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
