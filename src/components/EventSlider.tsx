"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SLIDER_DATA } from "../dummy-store/data";

const EventSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === SLIDER_DATA.length - 1 ? 0 : prev + 1
            );
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === SLIDER_DATA.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? SLIDER_DATA.length - 1 : prev - 1
        );
    };

    return (
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
                <div className="flex flex-col lg:flex-row items-center justify-between h-full py-20">
                    {/* TEXT CONTAINER */}
                    <div
                        className={`flex-1 flex flex-col items-center lg:items-start justify-center space-y-8 text-center lg:text-left transition-all duration-1000 ${isLoaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                            }`}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            Premium Events Experience
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight">
                            <span className="text-gradient-primary block">
                                {SLIDER_DATA[currentSlide].title.split(" ")[0]}
                            </span>
                            <span className="text-white block">
                                {SLIDER_DATA[currentSlide].title
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
                            Experience luxury events like never before. Premium
                            venues, world-class entertainment, and unforgettable
                            moments.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="btn-premium group">
                                <span className="flex items-center space-x-2">
                                    <span>Book Premium Event</span>
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                            <button className="px-8 py-4 rounded-2xl border-2 border-slate-600 text-slate-300 hover:border-blue-500 hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 hover:shadow-lg">
                                View Gallery
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-primary">
                                    500+
                                </div>
                                <div className="text-slate-400 text-sm">
                                    Premium Events
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-primary">
                                    50K+
                                </div>
                                <div className="text-slate-400 text-sm">
                                    Happy Guests
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-primary">
                                    5★
                                </div>
                                <div className="text-slate-400 text-sm">
                                    Rating
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* IMAGE CONTAINER */}
                    <div className="flex-1 relative h-96 lg:h-full max-h-[600px] w-full lg:w-auto">
                        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-luxury">
                            {/* Image with overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
                            <Image
                                src={SLIDER_DATA[currentSlide].image}
                                alt={SLIDER_DATA[currentSlide].title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                                priority={currentSlide === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Floating elements */}
                            <div className="absolute top-4 right-4 glass rounded-2xl px-4 py-2 z-20">
                                <span className="text-white font-semibold text-sm">
                                    Premium
                                </span>
                            </div>
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-20 group"
                        >
                            <svg
                                className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-20 group"
                        >
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Slide indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                    {SLIDER_DATA.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                                : "bg-slate-600 hover:bg-slate-500"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventSlider;
