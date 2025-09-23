"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: number }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>; // or a loading spinner
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return; // or a message indicating the user is not authenticated
    }

    const handleDeleteEventFromDB = async () => {
        const baseUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            process.env.NEXTAUTH_URL ||
            "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/events/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            router.push("/events-board"); // Redirect to events page after deletion

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
    };

    return (
        <button
            className="bg-blue-400 p-2 rounded-full top-4 right-4 text-white absolute 
        cursor-pointer hover:bg-red-500 transition-all duration-300 ease-in-out
        hover:scale-110"
            onClick={handleDeleteEventFromDB}
        >
            <Image
                src="/temporary/icons8-trash-188.png"
                alt="Delete"
                width={40}
                height={40}
                className="object-contain"
            />
        </button>
    );
};

export default DeleteButton;
