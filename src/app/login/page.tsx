"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Loading component
const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-slate-300 text-lg">Loading...</p>
        </div>
    </div>
);

// Social login button component
const SocialLoginButton = ({
    provider,
    icon,
    onClick,
    isLoading,
}: {
    provider: string;
    icon: React.ReactNode;
    onClick: () => void;
    isLoading: boolean;
}) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="group relative w-full flex items-center justify-center space-x-3 p-4 rounded-xl glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isLoading ? (
            <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin"></div>
        ) : (
            <div className="w-5 h-5 flex items-center justify-center">
                {icon}
            </div>
        )}
        <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
            Continue with {provider}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </button>
);

// Feature highlight component
const FeatureHighlight = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => (
    <div className="flex items-start space-x-4 p-6 rounded-xl glass border border-slate-700/30">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-blue-400">
            {icon}
        </div>
        <div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    </div>
);

const LoginPage = () => {
    const { data, status } = useSession();
    const router = useRouter();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isFacebookLoading, setIsFacebookLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <LoadingSpinner />;
    }

    if (status === "authenticated") {
        return <LoadingSpinner />;
    }

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            console.error("Google sign-in error:", error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleFacebookSignIn = async () => {
        setIsFacebookLoading(true);
        try {
            await signIn("facebook");
        } catch (error) {
            console.error("Facebook sign-in error:", error);
        } finally {
            setIsFacebookLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Hero Content */}
                    <div className="space-y-8">
                        {/* Brand Section */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                                Premium Events Platform
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                                <span className="text-gradient-primary block">
                                    Welcome to
                                </span>
                                <span className="text-white">EventsHub</span>
                            </h1>

                            <p className="text-xl text-slate-300 leading-relaxed mb-8">
                                Discover and book extraordinary events curated
                                for unforgettable experiences. Join thousands of
                                event enthusiasts today.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FeatureHighlight
                                icon={
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
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                        />
                                    </svg>
                                }
                                title="Premium Events"
                                description="Access exclusive, high-quality events curated by professionals"
                            />
                            <FeatureHighlight
                                icon={
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                }
                                title="Secure Booking"
                                description="Safe and secure payment processing with instant confirmation"
                            />
                            <FeatureHighlight
                                icon={
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
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                }
                                title="Instant Access"
                                description="Get immediate access to your bookings and event details"
                            />
                            <FeatureHighlight
                                icon={
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
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                }
                                title="24/7 Support"
                                description="Round-the-clock concierge support for all your needs"
                            />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-primary mb-2">
                                    10K+
                                </div>
                                <div className="text-slate-400 text-sm">
                                    Happy Customers
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-primary mb-2">
                                    500+
                                </div>
                                <div className="text-slate-400 text-sm">
                                    Premium Events
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient-primary mb-2">
                                    4.9★
                                </div>
                                <div className="text-slate-400 text-sm">
                                    Average Rating
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full max-w-md mx-auto">
                        <div className="p-8 rounded-3xl glass border border-slate-700/50 backdrop-blur-xl">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-display font-bold text-white mb-2">
                                    Sign In
                                </h2>
                                <p className="text-slate-400">
                                    Choose your preferred sign-in method
                                </p>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="space-y-4 mb-8">
                                <SocialLoginButton
                                    provider="Google"
                                    icon={
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                    }
                                    onClick={handleGoogleSignIn}
                                    isLoading={isGoogleLoading}
                                />

                                <SocialLoginButton
                                    provider="Facebook"
                                    icon={
                                        <svg
                                            className="w-5 h-5"
                                            fill="#1877F2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    }
                                    onClick={handleFacebookSignIn}
                                    isLoading={isFacebookLoading}
                                />
                            </div>

                            {/* Divider */}
                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700/50"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900/50 text-slate-400">
                                        Secure & Private
                                    </span>
                                </div>
                            </div>

                            {/* Security Features */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center space-x-3 text-sm text-slate-400">
                                    <svg
                                        className="w-4 h-4 text-green-400"
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
                                    <span>End-to-end encryption</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-slate-400">
                                    <svg
                                        className="w-4 h-4 text-green-400"
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
                                    <span>No spam, ever</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-slate-400">
                                    <svg
                                        className="w-4 h-4 text-green-400"
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
                                    <span>GDPR compliant</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center pt-6 border-t border-slate-700/50">
                                <p className="text-slate-400 text-sm">
                                    Need help?{" "}
                                    <Link
                                        href="/contact"
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                                    >
                                        Contact our support team
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Terms */}
                        <p className="text-center text-xs text-slate-500 mt-6">
                            By signing in, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
