"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";
import Event from "./Event";
import UserLinks from "./UserLinks";

const Navbar = () => {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out">
            <div className="glass-dark backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* LEFT LINKS */}
                        <div className="hidden md:flex items-center space-x-8 flex-1">
                            <Link
                                href="/"
                                className="relative group text-slate-300 hover:text-white font-medium text-sm tracking-wide transition-all duration-300"
                            >
                                <span className="relative z-10">Home</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                            </Link>
                            <Link
                                href="/events-board"
                                className="relative group text-slate-300 hover:text-white font-medium text-sm tracking-wide transition-all duration-300"
                            >
                                <span className="relative z-10">Events</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                            </Link>
                            <Link
                                href="/contact-us"
                                className="relative group text-slate-300 hover:text-white font-medium text-sm tracking-wide transition-all duration-300"
                            >
                                <span className="relative z-10">Contact</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                            </Link>
                        </div>

                        {/* LOGO */}
                        <div className="flex-1 flex justify-center md:flex-none">
                            <Link href="/" className="group">
                                <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary hover:scale-105 transition-transform duration-300">
                                    EventsLux
                                </h1>
                                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                            </Link>
                        </div>

                        {/* MOBILE MENU */}
                        <div className="md:hidden">
                            <Event />
                        </div>

                        {/* RIGHT LINKS */}
                        <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
                            {/* Phone Number */}
                            <div className="flex items-center space-x-2 glass rounded-xl px-4 py-2 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors duration-300">
                                    +1 234 567 890
                                </span>
                            </div>

                            <UserLinks />
                            <CartIcon />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
