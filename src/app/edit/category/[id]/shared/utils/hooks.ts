import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CategoryInputs } from "../../../../../add/shared/types";
import {
    fetchCategory,
    updateCategory,
    uploadImage,
} from "../../../../shared/utils/apiUtils";

export const useEditCategoryForm = (categoryId: string) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [inputs, setInputs] = useState<CategoryInputs>({
        title: "",
        description: "",
        color: "#6366f1",
        image: "",
        slug: "",
    });

    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [currentImage, setCurrentImage] = useState<string>("");

    // Load category data on mount
    useEffect(() => {
        if (categoryId) {
            loadCategoryData();
        }
    }, [categoryId]);

    const loadCategoryData = async () => {
        try {
            setLoading(true);
            const categoryData = await fetchCategory(categoryId);

            setInputs({
                title: categoryData.title || "",
                description: categoryData.description || "",
                color: categoryData.color || "#6366f1",
                image: categoryData.image || "",
                slug: categoryData.slug || "",
            });

            setCurrentImage(categoryData.image || "");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load category"
            );
        } finally {
            setLoading(false);
        }
    };

    // Generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleChangeInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === "title") {
            // Auto-generate slug when title changes (but allow manual override)
            setInputs((previous) => ({
                ...previous,
                title: value,
                // Only auto-generate slug if it matches the current auto-generated one
                slug:
                    previous.slug === generateSlug(previous.title)
                        ? generateSlug(value)
                        : previous.slug,
            }));
        } else {
            setInputs((previous) => ({
                ...previous,
                [name]: value,
            }));
        }
    };

    const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const image = (target.files as FileList)[0];
        setFile(image);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                setFile(droppedFile);
            }
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = currentImage;

            // Upload new image if provided
            if (file) {
                imageUrl = await uploadImage(file);
            }

            await updateCategory(categoryId, {
                ...inputs,
                image: imageUrl,
            });

            alert("Category updated successfully!");
            router.push(`/events-board/${inputs.slug}`);
        } catch (error) {
            console.error("Error updating category:", error);
            alert("Error updating category. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        loading,
        error,
        inputs,
        file,
        isSubmitting,
        dragActive,
        currentImage,
        onInputChange: handleChangeInput,
        onFileChange: handleUploadImage,
        onDragEnter: handleDrag,
        onDragLeave: handleDrag,
        onDragOver: handleDrag,
        onDrop: handleDrop,
        onSubmit: handleSubmit,
    };
};
