/**
 * Get the base URL for API calls
 */
export const getBaseUrl = () => {
    return (
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NEXTAUTH_URL ||
        "http://localhost:3000"
    );
};

/**
 * Fetch all bookings for the current user
 * @returns Promise<any> - The bookings data
 */
export const fetchBookings = async () => {
    const response = await fetch(`${getBaseUrl()}/api/bookings`);

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return response.json();
};

/**
 * Update booking status
 * @param id - The booking ID
 * @param status - The new status
 * @returns Promise<any> - The updated booking response
 */
export const updateBookingStatus = async (id: string, status: string) => {
    const response = await fetch(`${getBaseUrl()}/api/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
    });

    if (!response.ok) {
        throw new Error("Failed to update booking status");
    }

    return response.json();
};
