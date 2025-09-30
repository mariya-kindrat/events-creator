/**
 * Format date to a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
    return new Date(date.toString()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/**
 * Get status color classes based on booking status
 * @param status - The booking status
 * @returns Object with background and text color classes
 */
export const getStatusColors = (status: string) => {
    switch (status) {
        case "confirmed":
            return {
                bg: "bg-green-100",
                text: "text-green-800",
                dot: "bg-green-500",
                row: "bg-green-50 border-l-4 border-green-500",
            };
        case "pending":
            return {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                dot: "bg-yellow-500",
                row: "bg-yellow-50 border-l-4 border-yellow-500",
            };
        default:
            return {
                bg: "bg-red-100",
                text: "text-red-800",
                dot: "bg-red-500",
                row: "bg-red-50 border-l-4 border-red-500",
            };
    }
};
