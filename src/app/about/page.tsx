"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const AboutPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <main className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex flex-col justify-center items-center h-full text-center">
                        <div
                            className={`transform transition-all duration-1000 ${
                                isLoaded
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            }`}
                        >
                            <h1 className="text-6xl md:text-8xl font-display font-bold text-gradient-primary mb-8 leading-tight">
                                About EventsLux
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
                                Where luxury meets innovation, creating
                                extraordinary experiences that transcend the
                                ordinary and define the exceptional.
                            </p>
                        </div>

                        {/* Scroll indicator */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-5xl font-display font-bold text-gradient-primary mb-6">
                                    Our Story
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>
                            </div>

                            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                                <p>
                                    Founded in 2009, EventsLux emerged from a
                                    simple yet powerful vision: to transform
                                    ordinary moments into extraordinary
                                    memories. What began as a boutique event
                                    planning service has evolved into the
                                    premier destination for luxury experiences.
                                </p>
                                <p>
                                    Our journey started with a single,
                                    unforgettable wedding in the heart of
                                    Manhattan. The attention to detail, the
                                    seamless execution, and the pure joy on our
                                    clients' faces ignited a passion that
                                    continues to drive us today.
                                </p>
                                <p>
                                    Today, EventsLux stands as a testament to
                                    the power of dreams realized. We've
                                    orchestrated over 500 premium events, from
                                    intimate gatherings to grand celebrations,
                                    each one a masterpiece of planning and
                                    execution.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="glass-dark rounded-3xl p-8 hover-lift">
                                <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden mb-6">
                                    <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                                        <div className="text-6xl">🎭</div>
                                    </div>
                                </div>
                                <blockquote className="text-xl text-slate-300 italic text-center">
                                    "Every event tells a story. We're here to
                                    make sure it's extraordinary."
                                </blockquote>
                                <p className="text-center text-slate-400 mt-4 font-semibold">
                                    - Alexandra Sterling, Founder
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-5xl font-display font-bold text-gradient-primary mb-8">
                            Our Mission
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-2xl text-slate-300 leading-relaxed mb-8">
                                To create extraordinary experiences that
                                transcend expectations, turning moments into
                                memories and dreams into reality through
                                unparalleled luxury and innovation.
                            </p>
                            <div className="glass-dark rounded-3xl p-12 hover-lift">
                                <div className="text-6xl mb-6">✨</div>
                                <p className="text-xl text-slate-300 italic">
                                    "We don't just plan events – we craft
                                    experiences that become the stories you'll
                                    tell for a lifetime."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-5xl font-display font-bold text-gradient-primary mb-8">
                        Ready to Create Magic?
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
                        Let's transform your vision into an extraordinary
                        reality. Your perfect event awaits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/events-board" className="btn-premium">
                            Explore Our Events
                        </Link>
                        <Link
                            href="/contact-us"
                            className="glass-dark px-8 py-4 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
