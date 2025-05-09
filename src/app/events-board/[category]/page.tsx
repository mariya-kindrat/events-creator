import { FUTURE_EVENTS_DATA } from "@/dummy-store/data";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
    return (
        <div className="flex flex-wrap items-center justify-center md:mt-7 gap-4 md:gap-8 text-blue-500">
            {FUTURE_EVENTS_DATA.map((event) => (
                <Link
                    key={event.id}
                    href={`/event/${event.id}`}
                    className="w-[80%] h-[40vh] md:h-[50vh] lg:h-[70vh] md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 rounded-lg 
                            shadow-lg bg-white hover:scale-110 transition-transform duration-300 ease-in-out
                            flex flex-col justify-between group"
                >
                    {/* IMAGE CONTAINER */}
                    <div className="relative h-[80%] p-2">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    {/* text CONTAINER */}
                    <div className="flex items-center justify-center p-3 gap-2">
                        <h1 className="font-bold flex-1 text-blue-500 mb-2">
                            {event.title}
                        </h1>
                        <h2 className="flex-1 group-hover:hidden">
                            ${event.price}
                        </h2>
                        <button
                            className="hidden bg-amber-600 font-bold sm:bt-sm text-white p-2 rounded-md flex-1
                         group-hover:block transition duration-300 ease-in-out ripple"
                        >
                            Book Now
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryPage;
