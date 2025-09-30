import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Inputs, Option } from "../../../../../add/shared/types";
import {
    fetchEvent,
    updateEvent,
    uploadImage,
} from "../../../../shared/utils/apiUtils";

export const useEditEventForm = (eventId: string) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        description: "",
        price: 0,
        location: "",
        catSlug: "",
    });

    const [option, setOption] = useState<Option>({
        option: "",
        additionalPrice: 0,
    });

    const [options, setOptions] = useState<Option[]>([]);
    const [file, setFile] = useState<File>();
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [currentImages, setCurrentImages] = useState<string[]>([]);

    // Load event data on mount
    useEffect(() => {
        if (eventId) {
            loadEventData();
        }
    }, [eventId]);

    const loadEventData = async () => {
        try {
            setLoading(true);
            const eventData = await fetchEvent(eventId);

            setInputs({
                title: eventData.title || "",
                description: eventData.description || "",
                price: Number(eventData.price) || 0,
                location: eventData.location || "",
                catSlug: eventData.catSlug || "",
            });

            setOptions(eventData.options || []);

            // Set current images
            const images =
                eventData.images || (eventData.image ? [eventData.image] : []);
            setCurrentImages(images);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load event"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setInputs((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
        setOption((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSetOptions = () => {
        if (option.option.trim() && option.additionalPrice >= 0) {
            setOptions((previous) => [...previous, option]);
            setOption({ option: "", additionalPrice: 0 });
        }
    };

    const handleDeleteOption = (currentOption: Option) => {
        setOptions(
            options.filter((opt) => opt.option !== currentOption.option)
        );
    };

    const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const image = (target.files as FileList)[0];
        setFile(image);
    };

    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles);
    };

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
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

        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            const imageFiles = droppedFiles.filter((file) =>
                file.type.startsWith("image/")
            );

            // Combine with existing files, but don't exceed 4
            const newFiles = [...files, ...imageFiles].slice(0, 4);
            setFiles(newFiles);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            // Upload new images
            const newImageUrls: string[] = [];

            // Upload files from multi-image upload
            for (const imageFile of files) {
                const imageUrl = await uploadImage(imageFile);
                newImageUrls.push(imageUrl);
            }

            // If there's a single file upload as well, add it
            if (file) {
                const singleImageUrl = await uploadImage(file);
                newImageUrls.unshift(singleImageUrl); // Add to beginning
            }

            // Combine current images with new images
            const allImages = [...currentImages, ...newImageUrls];
            const mainImage = allImages[0] || "";

            await updateEvent(eventId, {
                image: mainImage,
                images: allImages,
                ...inputs,
                options: options,
            });

            alert("Event updated successfully!");
            router.push(`/event/${eventId}`);
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Error updating event. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        loading,
        error,
        inputs,
        option,
        options,
        file,
        files,
        isSubmitting,
        dragActive,
        currentImages,
        onInputChange: handleChangeInput,
        onOptionChange: handleChangeOption,
        onSetOptions: handleSetOptions,
        onDeleteOption: handleDeleteOption,
        onFileChange: handleUploadImage,
        onFilesChange: handleFilesChange,
        onRemoveFile: handleRemoveFile,
        onDragEnter: handleDrag,
        onDragLeave: handleDrag,
        onDragOver: handleDrag,
        onDrop: handleDrop,
        onSubmit: handleSubmit,
    };
};
