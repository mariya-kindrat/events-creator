import CountDown from "./CountDown";

const Offer = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-4xl">
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/events/event_14.jpg')",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/50"></div>
                    </div>

                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                        <div
                            className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-8 py-20 lg:px-16 lg:py-32">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-yellow-500/30 text-yellow-300 text-sm font-medium mb-8">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></span>
                                Limited Time Offer
                            </div>

                            {/* Main Title */}
                            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-8">
                                <span className="text-gradient-luxury block">
                                    Exclusive
                                </span>
                                <span className="text-white block">
                                    Art Gala
                                </span>
                            </h2>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12 leading-relaxed">
                                Join us for an extraordinary evening of
                                contemporary art, fine dining, and exclusive
                                networking.
                                <span className="text-gradient-primary font-semibold">
                                    {" "}
                                    Don't miss this once-in-a-lifetime
                                    experience!
                                </span>
                            </p>

                            {/* Countdown */}
                            <div className="mb-12">
                                <CountDown />
                            </div>

                            {/* Special Offer Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="glass rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                                        50%
                                    </div>
                                    <div className="text-slate-300 text-sm">
                                        Early Bird Discount
                                    </div>
                                </div>
                                <div className="glass rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                                        VIP
                                    </div>
                                    <div className="text-slate-300 text-sm">
                                        Access Included
                                    </div>
                                </div>
                                <div className="glass rounded-2xl p-6 text-center">
                                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                                        100
                                    </div>
                                    <div className="text-slate-300 text-sm">
                                        Limited Seats
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <button className="btn-premium group text-lg px-12 py-5">
                                    <span className="flex items-center space-x-3">
                                        <span>Secure Your Spot</span>
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
                                </button>
                                <button className="px-8 py-4 rounded-2xl border-2 border-slate-600 text-slate-300 hover:border-yellow-500 hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/25 hover:shadow-lg">
                                    Learn More
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-slate-400 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Instant Confirmation</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Money Back Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Offer;
