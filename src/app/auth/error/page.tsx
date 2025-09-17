"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const getErrorMessage = (error: string | null) => {
        switch (error) {
            case "Configuration":
                return "There is a problem with the server configuration.";
            case "AccessDenied":
                return "Access denied. You do not have permission to sign in.";
            case "Verification":
                return "The verification token has expired or has already been used.";
            case "Default":
                return "An error occurred during authentication.";
            default:
                return "An unexpected error occurred. Please try again.";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 text-red-600">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Authentication Error
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {getErrorMessage(error)}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Try Again
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            href="/"
                            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                        >
                            Go back to homepage
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">
                            <strong>Error code:</strong> {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AuthError() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            }
        >
            <AuthErrorContent />
        </Suspense>
    );
}

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
