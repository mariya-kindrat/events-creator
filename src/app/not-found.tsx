import Link from "next/link";

// Client component for the back button
function BackButton() {
    "use client";

    return (
        <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-white font-medium transition-all duration-300"
        >
            Go Back
        </button>
    );
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="card-premium p-8">
                    {/* 404 Icon */}
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-8 h-8 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-display font-bold text-white mb-4">
                        Page Not Found
                    </h2>

                    <p className="text-slate-300 mb-6">
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>

                    <div className="space-y-3">
                        <Link href="/" className="block w-full btn-premium">
                            Go Home
                        </Link>
                        <BackButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
