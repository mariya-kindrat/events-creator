"use client";

import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import cartImg from "../../public/temporary/shopping-cart.png";

const CartIcon = () => {
    const { totalEvents } = useCartStore();

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    return (
        <Link href="/cart" className="flex items-center gap-4 ">
            <div className="relative w-8 h-8 md:w-5 md:h-5">
                <Image src={cartImg} alt="cart" fill sizes="" />
            </div>
            <span>Cart ({totalEvents})</span>
        </Link>
    );
};

export default CartIcon;
