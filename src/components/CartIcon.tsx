import Image from "next/image";
import Link from "next/link";
import cartImg from "../../public/temporary/shopping-cart.png";

const CartIcon = () => {
    return (
        <Link href="/cart" className="flex items-center gap-4 ">
            <div className="relative w-8 h-8 md:w-5 md:h-5">
                <Image src={cartImg} alt="cart" fill sizes="" />
            </div>
            <span>Cart (3)</span>
        </Link>
    );
};

export default CartIcon;
