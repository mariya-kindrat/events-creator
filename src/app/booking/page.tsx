"use client";

import { BookingType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BookingPage = () => {
    const { data: session, status } = useSession();

    const router = useRouter();

    if (status === "unauthenticated") {
        router.push("/");
    }

    const { isPending, error, data } = useQuery({
        queryKey: ["bookings"],
        queryFn: () =>
            fetch(
                (process.env.NEXT_PUBLIC_APP_URL ||
                    process.env.NEXTAUTH_URL ||
                    "http://localhost:3000") + "/api/bookings"
            ).then((res) => res.json()),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            const baseUrl =
                process.env.NEXT_PUBLIC_APP_URL ||
                process.env.NEXTAUTH_URL ||
                "http://localhost:3000";
            return fetch(`${baseUrl}/api/bookings/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(status),
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
    });

    async function handleUpdateBooking(
        event: React.FormEvent<HTMLFormElement>,
        id: string
    ) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement;
        const status = input.value;

        mutation.mutate({ id, status });
        toast.success("Booking updated successfully", {
            position: "bottom-right",
        });
    }

    if (isPending || status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 text-lg">
                        Loading your bookings...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-slate-600">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">
                        My Bookings
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Manage and track your event bookings
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                <tr>
                                    <th className="hidden md:table-cell px-6 py-4 text-left font-semibold">
                                        Booking ID
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Price
                                    </th>
                                    <th className="hidden md:table-cell px-6 py-4 text-left font-semibold">
                                        Event
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {data.map(
                                    (booking: BookingType, index: number) => (
                                        <tr
                                            className={`hover:bg-slate-50 transition-colors duration-200 ${
                                                booking.status === "confirmed"
                                                    ? "bg-green-50 border-l-4 border-green-500"
                                                    : "bg-red-50 border-l-4 border-red-500"
                                            }`}
                                            key={booking.id}
                                        >
                                            <td className="hidden md:table-cell px-6 py-4">
                                                <div className="font-mono text-sm text-slate-600">
                                                    {booking.id.slice(0, 8)}...
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-800 font-medium">
                                                    {new Date(
                                                        booking.createdAt.toString()
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-2xl font-bold text-green-600">
                                                    ${booking.price}
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4">
                                                <div className="text-slate-800 font-medium">
                                                    {booking.events[0].title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {session?.user.isAdmin ? (
                                                    <form
                                                        className="flex items-center gap-3"
                                                        onSubmit={(e) =>
                                                            handleUpdateBooking(
                                                                e,
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        <input
                                                            placeholder={
                                                                booking.status
                                                            }
                                                            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                                        >
                                                            <Image
                                                                src="/temporary/edit-90.png"
                                                                alt="Edit"
                                                                width={16}
                                                                height={16}
                                                            />
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                            booking.status ===
                                                            "confirmed"
                                                                ? "bg-green-100 text-green-800"
                                                                : booking.status ===
                                                                  "pending"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`w-2 h-2 rounded-full mr-2 ${
                                                                booking.status ===
                                                                "confirmed"
                                                                    ? "bg-green-500"
                                                                    : booking.status ===
                                                                      "pending"
                                                                    ? "bg-yellow-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        ></span>
                                                        {booking.status}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-12 h-12 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            No bookings yet
                        </h3>
                        <p className="text-slate-600">
                            Start exploring events to make your first booking!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
