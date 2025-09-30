/**
 * CartIcon - Shopping cart icon with event count badge
 * Uses Zustand store to display current number of events in cart
 */
"use client";

import { useHydration } from "@/hooks/useHydration";
import { useCartStore } from "@/utils/store";
import Link from "next/link";

const CartIcon = () => {
    const { totalEvents } = useCartStore();
    const isHydrated = useHydration();

    return (
        <Link href="/cart" className="flex items-center gap-4">
            <div className="relative w-8 h-8 md:w-5 md:h-5">
                <svg
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4m-8 2h.01M15 15h.01"
                    />
                </svg>
            </div>
            <span>Cart ({isHydrated ? totalEvents : 0})</span>
        </Link>
    );
};

export default CartIcon;
