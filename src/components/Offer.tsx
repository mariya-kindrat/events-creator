import CountDown from "./CountDown";

const Offer = () => {
    return (
        <div
            className="bg-black h-200 w-full rounded-2xl shadow-lg 
        overflow-hidden mt-10 md:justify-between md:bg-[url('/events/event_14.jpg')] md:h-[70vh]"
        >
            {/* TEXT CONTAINER */}
            <div className="items-center justify-center flex flex-col gap-8 p-10 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold xl:text-8xl italic uppecase">
                    Next art event
                </h1>
                <p className="text-white text-2xl xl:text-3xl p-6">
                    Just in few days we are going to have a fantastic event.
                    DON'T MISS IT!
                </p>
                <CountDown />
                <button
                    className="bg-blue-500 hover:bg-blue-800 hover:scale-115 transition duration-300 ease-in-out
                                hover:font-bold text-white rounded-md py-3 px-6"
                >
                    Book Now
                </button>
            </div>

            {/* IMAGE CONTAINER */}
            {/* <div className="flex-1 w-full relative md:h-full">
                <Image
                    src={FUTURE_EVENTS_DATA[0].image}
                    alt="Offer"
                    width={1000}
                    height={1000}
                    className="rounded-xl object-cover h-full w-full hover:scale-105 transition duration-300 ease-in-out"
                />
            </div> */}
        </div>
    );
};

export default Offer;
