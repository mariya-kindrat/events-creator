"use client";

import Link from "next/link";

const ExplorePage = () => {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/events/future_event_01.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/100 via-slate-900/60 to-slate-900/80"></div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-32 lg:py-48">
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Back Button */}
                        <div className="mb-8">
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 rounded-full glass border border-slate-600/30 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 group"
                            >
                                <svg
                                    className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                    />
                                </svg>
                                Back to Home
                            </Link>
                        </div>

                        {/* Event Category Badge */}
                        <div className="inline-flex items-center px-8 py-4 rounded-full glass border border-blue-500/30 text-blue-300 text-lg font-medium mb-8">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-4 animate-pulse"></span>
                            Contemporary Art Exhibition
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8">
                            <span className="text-gradient-luxury block">
                                Visions of Tomorrow
                            </span>
                            <span className="text-white block mt-4">
                                Digital Art Collective
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
                            Where technology meets creativity in an
                            unprecedented journey through the digital
                            renaissance
                        </p>
                    </div>
                </div>
            </section>

            {/* Exhibition Highlights */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            <span className="text-gradient-primary">
                                Exhibition Highlights
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Immerse yourself in groundbreaking installations
                            that redefine the boundaries of art and technology
                        </p>
                    </div>

                    {/* Featured Installations Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {/* Installation 1 */}
                        <div className="group relative overflow-hidden rounded-4xl">
                            <div
                                className="aspect-[4/3] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('/events/future_event_02.jpg')",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                                    Neural Networks in Motion
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Experience AI-generated art that evolves in
                                    real-time, responding to viewer presence and
                                    creating unique visual narratives that have
                                    never existed before.
                                </p>
                            </div>
                        </div>

                        {/* Installation 2 */}
                        <div className="group relative overflow-hidden rounded-4xl">
                            <div
                                className="aspect-[4/3] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('/events/future_event_03.jpg')",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                                    Holographic Dreamscapes
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Step into three-dimensional light sculptures
                                    that transport you to otherworldly realms,
                                    where digital artistry meets cutting-edge
                                    holographic technology.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Three Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Installation 3 */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            <div
                                className="aspect-[3/4] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('/events/future_event_04.jpg')",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-display font-bold text-white mb-3">
                                    Interactive Sound Sculptures
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Touch, move, and create music through
                                    gesture-controlled installations that blend
                                    visual art with sonic exploration.
                                </p>
                            </div>
                        </div>

                        {/* Installation 4 */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            <div
                                className="aspect-[3/4] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('/events/future_event_05.jpg')",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-display font-bold text-white mb-3">
                                    Virtual Reality Galleries
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Explore impossible spaces and surreal
                                    environments through immersive VR
                                    experiences crafted by visionary artists.
                                </p>
                            </div>
                        </div>

                        {/* Installation 5 */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            <div
                                className="aspect-[3/4] bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        "url('/events/future_event_06.jpg')",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-display font-bold text-white mb-3">
                                    Augmented Reality Murals
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Watch static walls come alive through AR
                                    technology, revealing hidden layers of
                                    digital storytelling.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExplorePage;
