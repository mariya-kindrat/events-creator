import Link from "next/link";

const EventShowcase = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        <span className="text-gradient-primary block">
                            Discover
                        </span>
                        <span className="text-white block">
                            Extraordinary Events
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Immerse yourself in carefully curated experiences that
                        bring together art, culture, and community in stunning
                        venues across the city.
                    </p>
                </div>

                {/* Main Featured Event */}
                <div className="mb-16">
                    <div className="relative overflow-hidden rounded-4xl group">
                        {/* Background Image with Overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage:
                                    "url('/events/future_event_01.jpg')",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-slate-900/60"></div>
                        </div>

                        {/* Animated Background Elements */}
                        <div className="absolute inset-0">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <div
                                className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-pulse"
                                style={{ animationDelay: "1s" }}
                            ></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 px-8 py-20 lg:px-16 lg:py-32">
                            <div className="max-w-4xl">
                                {/* Event Category Badge */}
                                <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                                    Contemporary Art Exhibition
                                </div>

                                {/* Event Title */}
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                                    <span className="text-gradient-luxury block">
                                        Visions of Tomorrow
                                    </span>
                                    <span className="text-white block">
                                        Digital Art Collective
                                    </span>
                                </h3>

                                {/* Event Description */}
                                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
                                    Experience the intersection of technology
                                    and creativity in this groundbreaking
                                    exhibition featuring works from emerging
                                    digital artists. Interactive installations,
                                    immersive environments, and
                                    thought-provoking pieces that challenge our
                                    perception of art in the digital age.
                                </p>

                                {/* Event Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="glass rounded-2xl p-6">
                                        <div className="text-sm text-slate-400 mb-2">
                                            Date & Time
                                        </div>
                                        <div className="text-white font-semibold">
                                            March 15-30, 2024
                                            <br />
                                            <span className="text-slate-300">
                                                Daily 10AM - 8PM
                                            </span>
                                        </div>
                                    </div>
                                    <div className="glass rounded-2xl p-6">
                                        <div className="text-sm text-slate-400 mb-2">
                                            Venue
                                        </div>
                                        <div className="text-white font-semibold">
                                            Modern Art Gallery
                                            <br />
                                            <span className="text-slate-300">
                                                Downtown District
                                            </span>
                                        </div>
                                    </div>
                                    <div className="glass rounded-2xl p-6">
                                        <div className="text-sm text-slate-400 mb-2">
                                            Experience
                                        </div>
                                        <div className="text-white font-semibold">
                                            Interactive Tours
                                            <br />
                                            <span className="text-slate-300">
                                                Artist Talks Available
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href="/explore"
                                    className="btn-premium group text-lg px-12 py-5 inline-block"
                                >
                                    <span className="flex items-center space-x-3">
                                        <span>Explore Exhibition</span>
                                        <svg
                                            className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventShowcase;
