/**
 * Generate URL-friendly slug from title
 * @param title - The title to convert to slug
 * @returns string - The generated slug
 */
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

/**
 * Validate image file type and size
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10)
 * @returns boolean - Whether the file is valid
 */
export const validateImageFile = (
    file: File,
    maxSizeMB: number = 10
): boolean => {
    // Check file type
    if (!file.type.startsWith("image/")) {
        return false;
    }

    // Check file size (convert MB to bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return false;
    }

    return true;
};

/**
 * Handle drag events for file upload
 * @param e - The drag event
 * @param setDragActive - Function to set drag active state
 */
export const handleDragEvents = (
    e: React.DragEvent,
    setDragActive: (active: boolean) => void
) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
    } else if (e.type === "dragleave") {
        setDragActive(false);
    }
};

/**
 * Handle file drop for image upload
 * @param e - The drop event
 * @param setFile - Function to set the selected file
 * @param setDragActive - Function to set drag active state
 */
export const handleFileDrop = (
    e: React.DragEvent,
    setFile: (file: File) => void,
    setDragActive: (active: boolean) => void
) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        if (validateImageFile(droppedFile)) {
            setFile(droppedFile);
        }
    }
};
