/**
 * ContactUsPage - Contact form with premium styling and real API integration
 * Features form validation, loading states, and success/error feedback
 */
"use client";

import Link from "next/link";
import { useState } from "react";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Background Elements - More subtle */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh]">
                        {/* Left Side - Contact Info */}
                        <div className="lg:col-span-2 space-y-10 lg:space-y-12">
                            {/* Back Button */}
                            <div>
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-5 py-2.5 rounded-full glass border border-slate-600/30 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 group text-sm font-medium"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2.5 group-hover:-translate-x-0.5 transition-transform duration-300"
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

                            {/* Heading */}
                            <div className="space-y-6">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
                                    Contact{" "}
                                    <span className="text-gradient-primary">
                                        Us
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                                    We'd love to hear from you. Send us a
                                    message and we'll respond as soon as
                                    possible.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/mariya-kindrat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-14 h-14 rounded-2xl glass border border-slate-600/30 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 group"
                                >
                                    <svg
                                        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/mariya-kindrat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-14 h-14 rounded-2xl glass border border-slate-600/30 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 group"
                                >
                                    <svg
                                        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.kindratmariya.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-14 h-14 rounded-2xl glass border border-slate-600/30 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 group"
                                    aria-label="Website"
                                >
                                    <svg
                                        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="glass-dark rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-700/50 max-w-2xl mx-auto lg:mx-0">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    {/* Name and Email Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-slate-300"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your Name"
                                                required
                                                className="w-full h-14 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-slate-300"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Your@Email.com"
                                                required
                                                className="w-full h-14 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-3">
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-slate-300"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Your Message"
                                            required
                                            rows={6}
                                            className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-4 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="loading-dots">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                                <span className="ml-3">
                                                    Sending...
                                                </span>
                                            </div>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>

                                    {/* Status Messages */}
                                    {submitStatus === "success" && (
                                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center text-sm">
                                            Message sent successfully! We'll get
                                            back to you soon.
                                        </div>
                                    )}
                                    {submitStatus === "error" && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center text-sm">
                                            Failed to send message. Please try
                                            again.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
