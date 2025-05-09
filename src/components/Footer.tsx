import CopyrightIcon from "@mui/icons-material/Copyright";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="h-12 md:h-15 p-4 lg:px-20 xl:px-40 text-blue-500 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl uppercase">
                Events Org.
            </Link>
            <p>
                <CopyrightIcon fontSize="small" /> 2024 All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
