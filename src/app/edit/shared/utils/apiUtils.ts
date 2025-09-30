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
 * Fetch a single event by ID
 * @param eventId - The event ID to fetch
 * @returns Promise<any> - The event data
 */
export const fetchEvent = async (eventId: string) => {
    const response = await fetch(`${getBaseUrl()}/api/events/${eventId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch event");
    }

    return data;
};

/**
 * Update an existing event
 * @param eventId - The event ID to update
 * @param eventData - The event data to update
 * @returns Promise<any> - The updated event response
 */
export const updateEvent = async (eventId: string, eventData: any) => {
    const response = await fetch(`${getBaseUrl()}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update event");
    }

    return data;
};

/**
 * Fetch a single category by ID
 * @param categoryId - The category ID to fetch
 * @returns Promise<any> - The category data
 */
export const fetchCategory = async (categoryId: string) => {
    const response = await fetch(
        `${getBaseUrl()}/api/categories/${categoryId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch category");
    }

    return data;
};

/**
 * Update an existing category
 * @param categoryId - The category ID to update
 * @param categoryData - The category data to update
 * @returns Promise<any> - The updated category response
 */
export const updateCategory = async (categoryId: string, categoryData: any) => {
    const response = await fetch(
        `${getBaseUrl()}/api/categories/${categoryId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update category");
    }

    return data;
};

/**
 * Delete an event
 * @param eventId - The event ID to delete
 * @returns Promise<any> - The delete response
 */
export const deleteEvent = async (eventId: string) => {
    const response = await fetch(`${getBaseUrl()}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
    }

    return data;
};

/**
 * Delete a category
 * @param categoryId - The category ID to delete
 * @returns Promise<any> - The delete response
 */
export const deleteCategory = async (categoryId: string) => {
    const response = await fetch(
        `${getBaseUrl()}/api/categories/${categoryId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete category");
    }

    return data;
};
