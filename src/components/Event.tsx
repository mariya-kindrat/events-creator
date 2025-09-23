"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import closeMenuImg from "../../public/temporary/close.png";
import { links } from "../../public/temporary/data";
import openMenuImg from "../../public/temporary/open-menu.png";
import CartIcon from "./CartIcon";

const Event = () => {
    const [open, setOpen] = useState(false);
    const user = false;

    return (
        <div>
            {!open ? (
                <Image
                    src={openMenuImg}
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => setOpen(true)}
                />
            ) : (
                <Image
                    src={closeMenuImg}
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => setOpen(false)}
                />
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
