import SingleEventPrice from "@/components/SingleEventPrice";
import { FUTURE_EVENTS_DATA } from "@/dummy-store/data";
import Image from "next/image";

const SingleEvent = () => {
    return (
        <div
            className="p-3 lg:px-20 xl:px-40 h-[100vh] flex flex-col items-center justify-around text-blue-500
                    md:flex-row gap-2 md:gap-4 bg-gray-100"
        >
            {/* {IMAGE CONTAINER} */}
            <div className="relative w-full h-1/2 md:w-1/2 md:h-[80vh] md:mt-2 hover:scale-105 transition-all duration-300 ease-in-out">
                <Image
                    src={FUTURE_EVENTS_DATA[2].image}
                    alt=""
                    fill
                    className="object-cover rounded-lg shadow-2xl shadow-blue-500/50"
                />
            </div>

            {/* {TEXT CONTAINER} */}
            <div className="h-1/2 md:w-1/2 md:h-[80vh] md:mt-2 flex flex-col gap-4 justify-center items-center">
                <h1 className="text-3xl font-bold uppercase">
                    {FUTURE_EVENTS_DATA[2].title}
                </h1>
                <p>{FUTURE_EVENTS_DATA[2].description}</p>
                <SingleEventPrice
                    price={FUTURE_EVENTS_DATA[2].price}
                    id={FUTURE_EVENTS_DATA[2].id}
                    options={FUTURE_EVENTS_DATA[2].options}
                />
            </div>
        </div>
    );
};

export default SingleEvent;
