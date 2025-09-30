"use client";

import { useHydration } from "@/hooks/useHydration";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserLinks = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isHydrated = useHydration();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    // Don't render anything until hydrated to prevent hydration mismatch
    if (!isHydrated) {
        return (
            <div className="w-16 h-6 bg-slate-700/50 animate-pulse rounded"></div>
        );
    }

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
