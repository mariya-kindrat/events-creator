import { EVENTS_CATEGORIES } from "@/dummy-store/data";
import Link from "next/link";

const EventsBoardPage = () => {
    return (
        <div
            className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-30rem)] md:gap-4 md:mt-7 
                        flex flex-col md:flex-row items-center"
        >
            {EVENTS_CATEGORIES.map((category) => (
                <Link
                    href={`events-board/${category.slug}`}
                    key={category.id}
                    style={{ backgroundImage: `url(${category.image})` }}
                    className="bg-cover bg-center h-full  w-full rounded-lg shadow-lg m-2 flex items-center 
                            justify-center text-white hover:scale-105 transition duration-300 
                            ease-in-out"
                >
                    <div className={`text-${category.color} w-1/2`}>
                        <h1 className="uppercase font-bold text-3xl">
                            {category.title}
                        </h1>
                        <p className="text-lg my-8 text-shadow-blue-200">
                            {category.description}
                        </p>
                        <button
                            className="hidden 2xl:block bg-amber-500 text-white font-bold py-2 px-4 rounded bt:md-4
                             hover:bg-amber-600 hover:scale-110 transition duration-300 ease-in-out"
                        >
                            Explore
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default EventsBoardPage;
