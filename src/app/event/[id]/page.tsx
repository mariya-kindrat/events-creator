import DeleteButton from "@/components/DeleteButton";
import SingleEventPrice from "@/components/SingleEventPrice";
import { EventType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const getBaseUrl = () =>
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

const getData = async (id: string) => {
    const response = await fetch(`${getBaseUrl()}/api/events/${id}`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

// Loading skeleton for the page
const EventPageSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Image Skeleton */}
                <div className="aspect-[4/3] bg-slate-700/30 rounded-3xl animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="space-y-6">
                    <div className="h-12 bg-slate-700/30 rounded animate-pulse"></div>
                    <div className="h-6 bg-slate-700/30 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-700/30 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-700/30 rounded w-5/6 animate-pulse"></div>
                    <div className="h-32 bg-slate-700/30 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

// Event Features Component
const EventFeatures = ({ event }: { event: EventType }) => {
    const features = [
        {
            icon: (
                <svg
                    className="w-6 h-6"
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
            ),
            label: "Location",
            value: event.location || "Premium Venue",
        },
        {
            icon: (
                <svg
                    className="w-6 h-6"
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
            ),
            label: "Duration",
            value: "3-4 Hours",
        },
        {
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            label: "Capacity",
            value: "50-200 Guests",
        },
        {
            icon: (
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            label: "Includes",
            value: "Premium Service",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-xl glass border border-slate-700/50"
                >
                    <div className="text-blue-400">{feature.icon}</div>
                    <div>
                        <div className="text-slate-400 text-xs">
                            {feature.label}
                        </div>
                        <div className="text-white text-sm font-medium">
                            {feature.value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Event Gallery Component (placeholder for future enhancement)
const EventGallery = ({ event }: { event: EventType }) => (
    <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Event Gallery</h3>
        <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className="aspect-square relative overflow-hidden rounded-xl glass border border-slate-700/50"
                >
                    <Image
                        src={event.image}
                        alt={`${event.title} gallery ${index}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                </div>
            ))}
        </div>
    </div>
);

const SingleEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const singleEvent: EventType = await getData(id);

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
                        <span className="text-white">Event Details</span>
                    </nav>

                    {/* Status Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-green-500/30 text-green-300 text-sm font-medium mb-6">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Available for Booking
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Image Section */}
                        <div className="relative">
                            <div className="aspect-[4/3] relative overflow-hidden rounded-3xl glass border border-slate-700/50 group">
                                <Image
                                    src={singleEvent.image}
                                    alt={singleEvent.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Favorite Button */}
                                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/20">
                                    <svg
                                        className="w-6 h-6 text-white"
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

                                {/* Share Button */}
                                <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/20">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Event Gallery */}
                            <EventGallery event={singleEvent} />
                        </div>

                        {/* Content Section */}
                        <div className="space-y-8">
                            {/* Title and Description */}
                            <div>
                                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                    <span className="text-gradient-primary">
                                        {singleEvent.title}
                                    </span>
                                </h1>

                                {singleEvent.description && (
                                    <p className="text-xl text-slate-300 leading-relaxed mb-6">
                                        {singleEvent.description}
                                    </p>
                                )}

                                {/* Rating and Reviews */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-slate-400">
                                        4.9 (127 reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Event Features */}
                            <EventFeatures event={singleEvent} />

                            {/* Pricing Component */}
                            <div className="p-8 rounded-3xl glass border border-slate-700/50">
                                <h3 className="text-2xl font-bold text-white mb-6">
                                    Book Your Experience
                                </h3>
                                <Suspense
                                    fallback={
                                        <div className="animate-pulse space-y-4">
                                            <div className="h-8 bg-slate-700/30 rounded"></div>
                                            <div className="h-12 bg-slate-700/30 rounded"></div>
                                            <div className="h-16 bg-slate-700/30 rounded"></div>
                                        </div>
                                    }
                                >
                                    <SingleEventPrice event={singleEvent} />
                                </Suspense>
                            </div>

                            {/* Additional Information */}
                            <div className="p-8 rounded-3xl glass border border-slate-700/50">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    What's Included
                                </h3>
                                <ul className="space-y-3 text-slate-300">
                                    <li className="flex items-center space-x-3">
                                        <svg
                                            className="w-5 h-5 text-green-400"
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
                                        <span>Premium venue access</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg
                                            className="w-5 h-5 text-green-400"
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
                                        <span>
                                            Professional event coordination
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg
                                            className="w-5 h-5 text-green-400"
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
                                        <span>Complimentary refreshments</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <svg
                                            className="w-5 h-5 text-green-400"
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
                                        <span>24/7 concierge support</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Information */}
                            <div className="p-8 rounded-3xl glass border border-slate-700/50">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    Need Help?
                                </h3>
                                <p className="text-slate-300 mb-4">
                                    Our premium concierge team is available 24/7
                                    to assist with your booking and answer any
                                    questions.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="btn-premium flex-1">
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
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        Call Concierge
                                    </button>
                                    <button className="btn-premium flex-1">
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
                                        Live Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Delete Button */}
                <DeleteButton id={singleEvent.id} />
            </div>
        </div>
    );
};

export default SingleEvent;
