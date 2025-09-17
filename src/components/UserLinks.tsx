"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserLinks = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return (
        <div>
            {status === "authenticated" && session?.user.isAdmin && (
                <div>
                    <Link href="/add">Add</Link>
                    <Link className="ml-4 cursor-pointer" href="/booking">
                        Booking
                    </Link>
                    <span
                        className="ml-4 cursor-pointer"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </span>
                </div>
            )}
            {status === "authenticated" && !session?.user.isAdmin && (
                <div>
                    <Link className="cursor-pointer" href="/booking">
                        Booking
                    </Link>
                    <span
                        className="ml-4 cursor-pointer"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </span>
                </div>
            )}
            {status !== "authenticated" && <Link href="/login">Login</Link>}
        </div>
    );
};

export default UserLinks;
