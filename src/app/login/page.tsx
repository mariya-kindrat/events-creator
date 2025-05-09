import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
            {/* BOX */}
            <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-[50%]">
                {/* IMAGE CONTAINER */}
                <div className="relative h-1/3 w-full md:h-full md:w-1/2">
                    <Image
                        src="/events/future_event_01.jpg"
                        className="object-cover rounded-lg"
                        fill
                        alt=""
                    />
                </div>
                {/* FORM CONTAINER */}
                <div className="p-10 flex flex-col gap-8 md:w-1/2">
                    <h1 className="font-bold text-xl">Welcome</h1>
                    <p className="">Log in your account</p>
                    <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md hover:bg-blue-500 hover:scale-105 transition-all duration-200 ease-in-out">
                        <Image
                            src="/events/future_event_01.jpg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                        <span className="text-blue-500 font-bold hover:text-white">
                            Sign-in with Google
                        </span>
                    </button>
                    <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md hover:bg-blue-500 hover:scale-105 transition-all duration-200 ease-in-out">
                        <Image
                            src="/events/future_event_01.jpg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                        <span className="text-blue-500 font-bold hover:text-white">
                            Sign-in with Facebook
                        </span>
                    </button>
                    <p className="">
                        Have a problem?
                        <Link
                            href="/"
                            className="hover:font-bold hover:text-blue-600"
                        >
                            {" "}
                            Contact us
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
