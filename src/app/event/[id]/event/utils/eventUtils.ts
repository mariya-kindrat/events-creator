/**
 * Get the base URL for API calls
 * @returns The base URL for the application
 */
export const getBaseUrl = (): string =>
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

/**
 * Fetch event data by ID
 * @param id - The event ID
 * @returns Promise resolving to event data
 */
export const getData = async (id: string) => {
    const response = await fetch(`${getBaseUrl()}/api/events/${id}`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};
