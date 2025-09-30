"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    BookingTable,
    EmptyState,
    ErrorState,
    LoadingSpinner,
    PageHeader,
} from "./shared/components";
import { useBookings, useUpdateBooking } from "./shared/utils";

const BookingPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect unauthenticated users
    if (status === "unauthenticated") {
        router.push("/");
    }

    // Custom hooks for data fetching and mutations
    const { isPending, error, data } = useBookings();
    const updateBookingMutation = useUpdateBooking();

    // Handle booking status update
    const handleUpdateBooking = async (
        event: React.FormEvent<HTMLFormElement>,
        id: string
    ) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement;
        const status = input.value;

        updateBookingMutation.mutate({ id, status });
    };

    // Loading state
    if (isPending || status === "loading") {
        return <LoadingSpinner />;
    }

    // Error state
    if (error) {
        return <ErrorState error={error} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader />

                {data.length === 0 ? (
                    <EmptyState />
                ) : (
                    <BookingTable
                        bookings={data}
                        isAdmin={session?.user.isAdmin || false}
                        onUpdateBooking={handleUpdateBooking}
                    />
                )}
            </div>
        </div>
    );
};

export default BookingPage;

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
