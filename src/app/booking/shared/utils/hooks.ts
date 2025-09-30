import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchBookings, updateBookingStatus } from "./apiUtils";

/**
 * Custom hook for managing bookings data
 */
export const useBookings = () => {
    return useQuery({
        queryKey: ["bookings"],
        queryFn: fetchBookings,
    });
};

/**
 * Custom hook for updating booking status
 */
export const useUpdateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            updateBookingStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            toast.success("Booking updated successfully", {
                position: "bottom-right",
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update booking", {
                position: "bottom-right",
            });
        },
    });
};
