import Image from "next/image";

const CheckoutPage = () => {
    return (
        <div
            className="h-[85vh] md:h-[80vh] flex flex-col justify-between items-center p-1 text-blue-500
            lg:flex-row"
        >
            {/* EVENTS CONTAINER */}
            <div
                className="flex-2 bg-amber-100 w-full rounded-t-lg lg:rounded-l-lg p-4 flex flex-col 
                            justify-center gap-4 lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40"
            >
                {/* SINGLE ENENT CONTAINER */}
                <div className="flex items-center justify-between mb-4">
                    <Image
                        src="/events/future_event_01.jpg"
                        className="object-cover rounded-lg"
                        // fill
                        width={100}
                        height={100}
                        alt=""
                    />
                    <div className="">
                        <h1 className=" uppercase text-xl font-bold">
                            Art Event
                        </h1>
                        <span className="">Premium Ticket</span>
                    </div>
                    <h2 className="font-bold">$55.50</h2>
                    <span className="cursor-pointer">X</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <Image
                        src="/events/future_event_01.jpg"
                        className="object-cover rounded-lg"
                        // fill
                        width={100}
                        height={100}
                        alt=""
                    />
                    <div className="">
                        <h1 className=" uppercase text-xl font-bold">
                            Art Event
                        </h1>
                        <span className="">Premium Ticket</span>
                    </div>
                    <h2 className="font-bold">$55.50</h2>
                    <span className="cursor-pointer">X</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <Image
                        src="/events/future_event_01.jpg"
                        className="object-cover rounded-lg"
                        // fill
                        width={100}
                        height={100}
                        alt=""
                    />
                    <div className="">
                        <h1 className=" uppercase text-xl font-bold">
                            Art Event
                        </h1>
                        <span className="">Premium Ticket</span>
                    </div>
                    <h2 className="font-bold">$55.50</h2>
                    <span className="cursor-pointer">X</span>
                </div>
            </div>

            {/* PAYMENTS CONTAINER */}
            <div
                className="flex-1 bg-gray-200 w-full rounded-b-lg lg:rounded-r-lg p-1 flex flex-col gap-4 justify-center
            lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40"
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="">Subtotal (3 events)</span>
                    <span className="">$98.70</span>
                </div>
                <hr className="" />
                <button
                    className="uppercase w-46 bg-blue-400 text-white p-2 ring-1 ring-blue-800 rounded-md hover:scale-105
                hover:bg-blue-500 hover:text-white hover:font-bold transition-all duration-300 ease-in-out self-end"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
