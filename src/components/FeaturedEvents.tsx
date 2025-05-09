import Image from "next/image";
import { FUTURE_EVENTS_DATA } from "../dummy-store/data";

const FeaturedEvents = () => {
    return (
        <div className="w-full overflow-x-scroll text-blue-500 py-4">
            {/* WRAPPER */}
            <div className="w-max flex">
                {/* SINGLE ITEM */}
                {FUTURE_EVENTS_DATA.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className="h-180 w-[380] md:h-260 md:w-160 flex flex-col gap-2 items-center justify-center
                                     p-3 hover:bg-sky-50 transition duration-300 m-4 ease-in-out 
                                     border-2 border-blue-100 rounded-xl shadow-lg"
                        >
                            {/* IMAGE CONTAINER */}
                            <div className="relative h-full w-full flex flex-1 p-2 hover:scale-115 transition duration-300 ease-in-out">
                                <Image
                                    src={event.image}
                                    alt=""
                                    fill={true}
                                    className="rounded-xl"
                                />
                            </div>

                            {/* TEXT CONTAINER */}
                            <div className="flex flex-1 flex-col gap-7 p-3 items-center justify-around text-center">
                                <h1 className="text-lg font-bold uppercase xl:text-2xl 2xl:text-3xl">
                                    {event.title}
                                </h1>
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <p className="p-2 xl:text-xl 2xl:text-2xl">
                                        {event.description}
                                    </p>
                                    <p>{event.date}</p>
                                    <p>{event.time}</p>
                                    <p>{event.location}</p>
                                    <span className="text-xl font-bold">
                                        ${event.price}
                                    </span>
                                </div>
                                <div>
                                    <button className="bg-blue-500 text-white rounded-md hover:scale-115 hover:bg-blue-700 transition duration-300 ease-in-out p-2">
                                        Add to booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedEvents;
