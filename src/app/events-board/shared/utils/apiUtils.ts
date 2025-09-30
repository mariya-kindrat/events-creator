/**
 * Utility functions for Events Board API calls
 */

/**
 * Get the base URL for API calls
 * @returns The base URL for the application
 */
export const getBaseUrl = (): string =>
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

/**
 * Fetch all event categories
 * @returns Promise resolving to categories data
 */
export const getCategories = async () => {
    const response = await fetch(`${getBaseUrl()}/api/categories`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
};

/**
 * Fetch events by category
 * @param category - The category slug to filter by
 * @returns Promise resolving to events data
 */
export const getEventsByCategory = async (category: string) => {
    const response = await fetch(
        `${getBaseUrl()}/api/events?category=${category}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch events");
    }
    return response.json();
};

/**
 * Get category information by slug
 * @param category - The category slug
 * @returns Promise resolving to category info
 */
export const getCategoryInfo = async (category: string) => {
    const response = await fetch(`${getBaseUrl()}/api/categories`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        return { title: category, description: "Explore premium events" };
    }

    const categories = await response.json();
    const categoryInfo = categories.find((cat: any) => cat.slug === category);
    return (
        categoryInfo || {
            title: category,
            description: "Explore premium events",
        }
    );
};
