import Link from "next/link";
import React from "react";
import { BackgroundElements } from "./BackgroundElements";

export const EmptyCart: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <BackgroundElements />

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
