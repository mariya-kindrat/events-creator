/**
 * FeaturedEvents - Server component that fetches and displays featured events
 * Shows first 3 events from the API with premium styling and error handling
 */
import { EventCard } from "@/app/events-board/shared/components";
import { EventType } from "@/types/types";
import Link from "next/link";

// Build base URL for SSR-safe fetches
const getBaseUrl = () =>
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

const getData = async () => {
    try {
        const baseUrl = getBaseUrl();
        console.log("Fetching events from:", `${baseUrl}/api/events`);

        const response = await fetch(`${baseUrl}/api/events`, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API Error:", response.status, errorData);
            throw new Error(
                `Failed to fetch data: ${response.status} - ${errorData.error || "Unknown error"
                }`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("getData error:", error);
        throw error;
    }
};

const FeaturedEvents = async () => {
    try {
        const featuredEvents: EventType[] = await getData();

        // If no events, show a message
        if (!featuredEvents || featuredEvents.length === 0) {
            return (
                <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
                        <div
                            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            No Featured Events
                        </h2>
                        <p className="text-slate-300">
                            Check back soon for exciting events!
                        </p>
                    </div>
                </section>
            );
        }

        return (
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            Featured Events
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            <span className="text-gradient-primary">
                                Premium
                            </span>
                            <span className="text-white"> Experiences</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Discover our carefully curated selection of luxury
                            events, each designed to create unforgettable
                            memories and extraordinary experiences.
                        </p>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {featuredEvents.map((event, index) => (
                            <div
                                key={event.id || index}
                                className="animate-fade-in-up opacity-0 leading-none"
                                style={{
                                    animationDelay: `${index * 0.15}s`,
                                    animationFillMode: "forwards",
                                }}
                            >
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-16">
                        <Link
                            href="/events-board"
                            className="btn-premium inline-flex"
                        >
                            <span className="flex items-center space-x-2">
                                <span>View All Events</span>
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
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error("FeaturedEvents component error:", error);

        // Return error state
        return (
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto text-center">
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-red-400 mb-4">
                            Unable to Load Events
                        </h2>
                        <p className="text-slate-300 mb-4">
                            We're experiencing technical difficulties. Please
                            try again later.
                        </p>
                        <p className="text-sm text-slate-400">
                            Error:{" "}
                            {error instanceof Error
                                ? error.message
                                : "Unknown error"}
                        </p>
                    </div>
                </div>
            </section>
        );
    }
};

export default FeaturedEvents;
