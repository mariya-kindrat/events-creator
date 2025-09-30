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
 * Upload image to Cloudinary
 * @param file - The image file to upload
 * @returns Promise<string> - The uploaded image URL
 */
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "events-board");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/event-board-api/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    const responseData = await response.json();
    return responseData.url;
};

/**
 * Create a new event
 * @param eventData - The event data to create
 * @returns Promise<any> - The created event response
 */
export const createEvent = async (eventData: any) => {
    const response = await fetch(`${getBaseUrl()}/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create event");
    }

    return data;
};

/**
 * Create a new category
 * @param categoryData - The category data to create
 * @returns Promise<any> - The created category response
 */
export const createCategory = async (categoryData: any) => {
    const response = await fetch(`${getBaseUrl()}/api/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create category");
    }

    return data;
};
