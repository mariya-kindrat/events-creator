import Image from "next/image";
import { FUTURE_EVENTS_DATA } from "../dummy-store/data";

const Offer = () => {
    return (
        <div className="bg-black h-screen flex flex-col md:flex-row">
            {/* TEXT CONTAINER */}
            <div className="flex-1"></div>

            {/* IMAGE CONTAINER */}
            <div className="flex-1 w-full relative">
                <Image
                    src={FUTURE_EVENTS_DATA[0].image}
                    alt="Offer"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Offer;
