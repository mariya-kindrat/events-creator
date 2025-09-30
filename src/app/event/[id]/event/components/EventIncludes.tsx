"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface EventIncludesProps {
    includes?: string[];
    eventId?: number;
}

const EventIncludes = ({
    includes = [
        "Premium venue access",
        "Professional event coordination",
        "Complimentary refreshments",
    ],
    eventId,
}: EventIncludesProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleDeleteEventFromDB = async () => {
        if (!eventId) return;

        const baseUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            process.env.NEXTAUTH_URL ||
            "http://localhost:3000";

        try {
            const response = await fetch(`${baseUrl}/api/events/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                router.push("/events-board");
                toast.success("Event deleted successfully from db!");
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to delete event from db.");
            }

            if (response.status === 401) {
                console.error(
                    "Unauthorized: You do not have permission to delete this event."
                );
                return;
            }
        } catch (error) {
            toast.error("An error occurred while deleting the event.");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* What's Included Section */}
            <div className="p-8 rounded-3xl glass border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">
                    What's Included
                </h3>
                <ul className="space-y-3 text-slate-300">
                    {includes.map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                            <svg
                                className="w-5 h-5 text-green-400 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Admin Delete Button Section */}
            {status !== "loading" && session?.user.isAdmin && eventId && (
                <div className="flex justify-end">
                    <div className="w-1/3">
                        <button
                            onClick={handleDeleteEventFromDB}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                                     text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl 
                                     transition-all duration-300 ease-in-out transform hover:scale-105 
                                     flex items-center justify-center gap-3 border border-red-400/20"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            <span>Delete Event</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventIncludes;
