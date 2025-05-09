"use client";

import Image from "next/image";
import { useState } from "react";
import { SLIDER_DATA } from "../dummy-store/data";

const EventSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentSlide((prev) =>
    //             prev === SLIDER_DATA.length - 1 ? 0 : prev + 1
    //         );
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-14rem)] md:w-[80%] lg:flex-row bg-fuchsia-50">
            {/* TEXT CONTAINER */}
            <div className=" flex items-center justify-center flex-col gap-8 text-blue-500 font-bold flex-1">
                <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
                    {SLIDER_DATA[currentSlide].title}
                </h1>
                <button
                    className="bg-blue-500 text-white py-4 px-8 rounded-md hover:bg-blue-700 
                                    transition duration-300 ease-in-out"
                >
                    Book Now
                </button>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="relative flex-1">
                <Image
                    src={SLIDER_DATA[currentSlide].image}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default EventSlider;
