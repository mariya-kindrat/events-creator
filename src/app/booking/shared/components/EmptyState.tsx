import Link from "next/link";

export const EmptyState = () => {
    return (
        <div className="text-center py-20">
            {/* Enhanced container with subtle background */}
            <div className="max-w-md mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                {/* Improved icon with gradient background */}
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <svg
                        className="w-16 h-16 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                </div>

                {/* Enhanced typography */}
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    No bookings yet
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Start exploring amazing events and make your first booking
                    to see them here!
                </p>

                {/* Call-to-action button */}
                <Link
                    href="/events-board"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
                >
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    Explore Events
                </Link>

                {/* Decorative elements */}
                <div className="mt-8 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
                </div>
            </div>
        </div>
    );
};
