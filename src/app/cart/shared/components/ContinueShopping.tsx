import Link from "next/link";
import React from "react";

export const ContinueShopping: React.FC = () => (
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
);
