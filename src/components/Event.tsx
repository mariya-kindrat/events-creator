"use client";

import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";

const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Events", url: "/events" },
    { id: 3, title: "About", url: "/about" },
    { id: 4, title: "Contact", url: "/contact-us" },
];

const Event = () => {
    const [open, setOpen] = useState(false);
    const user = false;

    return (
        <div>
            {!open ? (
                <button
                    onClick={() => setOpen(true)}
                    className="w-5 h-5 flex flex-col justify-center items-center"
                    aria-label="Open menu"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            ) : (
                <button
                    onClick={() => setOpen(false)}
                    className="w-5 h-5 flex flex-col justify-center items-center"
                    aria-label="Close menu"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
            {open && (
                <div
                    className="bg-blue-500 text-white absolute left-0 top-24 
                        w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center 
                        justify-center text-3xl z-10"
                >
                    {links.map((link) => (
                        <Link
                            href={link.url}
                            key={link.id}
                            onClick={() => setOpen(false)}
                        >
                            {link.title}
                        </Link>
                    ))}
                    {!user ? (
                        <Link
                            href="/login"
                            className="text-3xl"
                            onClick={() => setOpen(false)}
                        >
                            Login
                        </Link>
                    ) : (
                        <Link
                            href="/booking"
                            className="text-3xl"
                            onClick={() => setOpen(false)}
                        >
                            Booking
                        </Link>
                    )}
                    <Link href="/cart" onClick={() => setOpen(false)}>
                        <CartIcon />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Event;
