import { CartEvent } from "../types";

/**
 * Create booking via API
 */
export const createBooking = async (
    events: CartEvent[],
    totalPrice: number,
    userEmail: string
): Promise<{ id: string }> => {
    const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            events,
            status: "Not Paid!",
            price: totalPrice,
            userEmail,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return response.json();
};

/**
 * Handle cart item removal with animation delay
 */
export const handleItemRemoval = async (
    event: CartEvent,
    onRemove: (event: CartEvent) => void,
    delay: number = 300
): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            onRemove(event);
            resolve();
        }, delay);
    });
};
