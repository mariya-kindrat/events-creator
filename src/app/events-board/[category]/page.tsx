import { EventType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
    params: {
        category: string;
    };
};

const getData = async (category: string) => {
    const response = await fetch(
        `http://localhost:3000/api/events?category=${category}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

// Get category info for display
const getCategoryInfo = async (category: string) => {
    const response = await fetch("http://localhost:3000/api/categories", {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        return { title: category, description: "Explore premium events" };
    }

    const categories = await response.json();
    const categoryInfo = categories.find((cat: any) => cat.slug === category);
    return (
        categoryInfo || {
            title: category,
            description: "Explore premium events",
        }
    );
};

// Loading skeleton for event cards
const EventCardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-pulse">
        <div className="aspect-[4/3] bg-slate-700/30"></div>
        <div className="p-6">
            <div className="h-6 bg-slate-600/30 rounded mb-3"></div>
            <div className="h-4 bg-slate-600/30 rounded mb-2"></div>
            <div className="h-4 bg-slate-600/30 rounded w-2/3 mb-4"></div>
            <div className="flex justify-between items-center">
                <div className="h-8 bg-slate-600/30 rounded w-20"></div>
                <div className="h-10 bg-slate-600/30 rounded w-24"></div>
            </div>
        </div>
    </div>
);

// Enhanced Event Card Component
const EventCard = ({ event }: { event: EventType }) => {
    return (
        <Link
            href={`/event/${event.id}`}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
        >
            {/* Background Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Premium Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full glass border border-white/20 text-xs font-medium text-white/90">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Available
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 hover:bg-white/20">
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Event Title */}
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gradient-primary transition-all duration-300 line-clamp-2">
                    {event.title}
                </h3>

                {/* Event Description */}
                {event.description && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
                        {event.description}
                    </p>
                )}

                {/* Event Location */}
                {event.location && (
                    <div className="flex items-center text-slate-400 text-sm mb-4">
                        <svg
                            className="w-4 h-4 mr-2"
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
                        <span className="truncate">{event.location}</span>
                    </div>
                )}

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">
                            Starting from
                        </span>
                        <span className="text-2xl font-bold text-gradient-primary">
                            ${event.price}
                        </span>
                    </div>

                    <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                        <span>Book Now</span>
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                    </button>
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </Link>
    );
};

// Filter and Sort Component
const FilterSort = () => (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
            <select className="w-full input-premium">
                <option value="">All Price Ranges</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500+">$500+</option>
            </select>
        </div>
        <div className="flex-1">
            <select className="w-full input-premium">
                <option value="date">Sort by Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
            </select>
        </div>
    </div>
);

const CategoryPage = async ({ params }: Props) => {
    const [events, categoryInfo] = await Promise.all([
        getData(params.category),
        getCategoryInfo(params.category),
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
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
                        <span className="text-white capitalize">
                            {categoryInfo.title}
                        </span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            {events.length} Premium Events Available
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            <span className="text-gradient-primary block capitalize">
                                {categoryInfo.title}
                            </span>
                            <span className="text-white">Events</span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            {categoryInfo.description ||
                                "Discover exceptional events curated for unforgettable experiences"}
                        </p>
                    </div>

                    {/* Filters */}
                    <FilterSort />

                    {/* Events Grid */}
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {[...Array(8)].map((_, i) => (
                                    <EventCardSkeleton key={i} />
                                ))}
                            </div>
                        }
                    >
                        {events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {events.map((event: EventType) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    No Events Available
                                </h3>
                                <p className="text-slate-400 mb-8">
                                    We're working on adding amazing events to
                                    this category. Check back soon!
                                </p>
                                <Link
                                    href="/events-board"
                                    className="btn-premium inline-flex items-center space-x-2"
                                >
                                    <span>Explore Other Categories</span>
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
                                </Link>
                            </div>
                        )}
                    </Suspense>

                    {/* Load More Button */}
                    {events.length > 0 && (
                        <div className="text-center mt-16">
                            <button className="btn-premium">
                                Load More Events
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
