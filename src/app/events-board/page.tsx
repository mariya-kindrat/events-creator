import { EventCategory } from "@/types/types";
import Link from "next/link";
import { Suspense } from "react";

const getBaseUrl = () =>
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

const getData = async () => {
    const response = await fetch(`${getBaseUrl()}/api/categories`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

// Loading component for better UX
const CategoryCardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-pulse">
        <div className="aspect-[4/3] bg-slate-700/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="h-8 bg-slate-600/30 rounded-lg mb-4"></div>
            <div className="h-4 bg-slate-600/30 rounded mb-2"></div>
            <div className="h-4 bg-slate-600/30 rounded w-3/4 mb-6"></div>
            <div className="h-12 bg-slate-600/30 rounded-xl w-32"></div>
        </div>
    </div>
);

// Enhanced Category Card Component
const CategoryCard = ({ category }: { category: any }) => {
    return (
        <Link
            href={`events-board/${category.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
        >
            {/* Background Image with Overlay */}
            <div className="aspect-[4/3] relative overflow-hidden">
                {category.image && (
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${category.image})` }}
                    />
                )}

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
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
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full glass border border-white/20 text-xs font-medium text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                    Premium Category
                </div>

                {/* Title */}
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-3 group-hover:text-gradient-primary transition-all duration-300">
                    {category.title}
                </h2>

                {/* Description */}
                {category.description && (
                    <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-6 line-clamp-2 group-hover:text-white transition-colors duration-300">
                        {category.description}
                    </p>
                )}

                {/* CTA Button */}
                <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <span>Explore Events</span>
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

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </Link>
    );
};

const EventsBoardPage = async () => {
    const eventsCategories: EventCategory = await getData();

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
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            Premium Event Categories
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            <span className="text-gradient-primary block">
                                Discover
                            </span>
                            <span className="text-white">
                                Extraordinary Events
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Explore our curated collection of premium event
                            categories, each offering unique experiences
                            designed to create unforgettable memories.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <CategoryCardSkeleton key={i} />
                                ))}
                            </div>
                        }
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {eventsCategories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </div>
                    </Suspense>

                    {/* Stats Section */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gradient-primary mb-2">
                                500+
                            </div>
                            <div className="text-slate-400 text-sm">
                                Premium Events
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gradient-primary mb-2">
                                50K+
                            </div>
                            <div className="text-slate-400 text-sm">
                                Happy Guests
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gradient-primary mb-2">
                                100+
                            </div>
                            <div className="text-slate-400 text-sm">
                                Luxury Venues
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gradient-primary mb-2">
                                24/7
                            </div>
                            <div className="text-slate-400 text-sm">
                                Concierge Support
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsBoardPage;
