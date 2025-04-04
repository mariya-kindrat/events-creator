import Image from "next/image";
import Link from "next/link";
import phone from "../../public/temporary/phone_icon.png";
import CartIcon from "./CartIcon";
import Event from "./Event";

const Navbar = () => {
    const user = true; // Simulating user authentication status

    return (
        <div
            className="h-12 text-blue-500 p-4 flex items-center 
        justify-between border-b-2 border-b-blue-700 
        uppercase md:h-24 lg:px-10 xl:px-40"
        >
            {/* LEFT LINKS */}
            <div className="hidden md:flex md:justify-center gap-4 flex-1 md:text-base xl:text-xl">
                <Link
                    href="/"
                    className="hover:text-blue-700 hover:font-bold hover:bg-blue-100 rounded-md px-2"
                >
                    Home
                </Link>
                <Link
                    href="/events-board"
                    className="hover:text-blue-700 hover:font-bold hover:bg-blue-100 rounded-md px-2"
                >
                    Events
                </Link>
                <Link
                    href="/"
                    className="hover:text-blue-700 hover:font-bold hover:bg-blue-100 rounded-md px-2"
                >
                    Contact
                </Link>
            </div>
            {/* LOGO */}
            <div className="text-xl font-semibold md:font-bold md:text-center flex-1">
                <Link href="/"> Events Menu</Link>
            </div>
            {/* MOBILE MENU */}
            <div className="md:hidden">
                <Event />
            </div>

            {/* RIGHT LINKS */}
            <div className="hidden md:flex gap-4 items-center justify-end flex-1">
                <div className="md:absolute top-3 r-2 lg:static flex gap-2 items-center cursor-pointer bg-blue-200 rounded-md px-2 md:text-base xl:text-xl">
                    <Image src={phone} alt="phone" width={20} height={20} />
                    <span className="font-bold text-blue-900">
                        +1 234 567 890
                    </span>
                </div>
                {!user ? (
                    <Link
                        href="/login"
                        className="hover:text-blue-700 hover:font-bold hover:bg-blue-100 rounded-md px-2"
                    >
                        Login
                    </Link>
                ) : (
                    <Link
                        href="/booking"
                        className="hover:text-blue-700 hover:font-bold hover:bg-blue-100 rounded-md px-2"
                    >
                        Booking
                    </Link>
                )}
                <CartIcon />
            </div>
        </div>
    );
};

export default Navbar;
