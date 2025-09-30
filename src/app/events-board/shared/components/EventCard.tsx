import { EventType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
    event: EventType;
}

/**
 * Enhanced Event Card Component with hover effects and booking functionality
 */
export const EventCard = ({ event }: EventCardProps) => {
    return (
        <Link
            href={`/event/${event.id}`}
            className="event-card-link group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-500/60 hover:border-blue-400/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 shadow-xl shadow-slate-900/60 hover:shadow-blue-400/20"
        >
            {/* Background Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                    src={
                        event.images && event.images.length > 0
                            ? event.images[0]
                            : ""
                    }
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Premium Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full glass border border-white/20 text-xs font-medium text-white/90">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Available
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 hover:bg-white/25 shadow-lg">
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
            <div className="p-6 bg-gradient-to-t from-slate-900/98 to-slate-800/85 backdrop-blur-sm border-t border-slate-600/30">
                {/* Event Title */}
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gradient-primary transition-all duration-300 line-clamp-2">
                    {event.title}
                </h3>

                {/* Event Description */}
                {event.description && (
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-slate-200 transition-colors duration-300">
                        {event.description}
                    </p>
                )}

                {/* Event Location */}
                {event.location && (
                    <div className="flex items-center text-slate-300 text-sm mb-4">
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
                        <span className="text-slate-300 text-xs">
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
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl shadow-inner shadow-white/5 pointer-events-none"></div>
        </Link>
    );
};
