import { EventType } from "@/types/types";
import Image from "next/image";

// Build base URL for SSR-safe fetches
const getBaseUrl = () =>
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

const getData = async () => {
    const response = await fetch(`${getBaseUrl()}/api/events`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const FeaturedEvents = async () => {
    const featuredEvents: EventType[] = await getData();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Featured Events
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        <span className="text-gradient-primary">Premium</span>
                        <span className="text-white"> Experiences</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Discover our carefully curated selection of luxury
                        events, each designed to create unforgettable memories
                        and extraordinary experiences.
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredEvents.map((event, index) => (
                        <div
                            key={index}
                            className="group card-premium p-6 hover-lift"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                                        ${event.price}
                                    </div>
                                </div>

                                {/* Premium Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="glass rounded-full px-3 py-1 text-white text-xs font-semibold">
                                        Premium
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-display font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
                                    {event.title}
                                </h3>

                                <p className="text-slate-300 leading-relaxed line-clamp-3">
                                    {event.description}
                                </p>

                                {/* Event Details */}
                                <div className="flex items-center space-x-4 text-sm text-slate-400">
                                    <div className="flex items-center space-x-1">
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
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button className="flex-1 btn-premium text-sm py-3">
                                        <span className="flex items-center justify-center space-x-2">
                                            <span>Book Now</span>
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
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                    <button className="flex-1 px-4 py-3 rounded-xl border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-white font-medium transition-all duration-300 text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-16">
                    <button className="btn-premium">
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
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
