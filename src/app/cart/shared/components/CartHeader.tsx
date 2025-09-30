import Link from "next/link";
import React from "react";

interface CartHeaderProps {
    totalEvents: number;
}

export const CartHeader: React.FC<CartHeaderProps> = ({ totalEvents }) => (
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
                {totalEvents} {totalEvents === 1 ? "Event" : "Events"} in Cart
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <span className="text-gradient-primary">Your Cart</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Review your selected events and proceed to secure checkout
            </p>
        </div>
    </div>
);
