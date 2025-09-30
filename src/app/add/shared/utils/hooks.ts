import { ChangeEvent, FormEvent, useState } from "react";
import { CategoryInputs, Inputs, Option } from "../types";
import { createCategory, createEvent, uploadImage } from "./apiUtils";

export const useEventForm = () => {
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

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                setFile(droppedFile);
            }
        }
    };

    const handleMultiDrop = (e: React.DragEvent) => {
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
            // Upload all images
            const imageUrls: string[] = [];

            // Upload files from multi-image upload
            for (const imageFile of files) {
                const imageUrl = await uploadImage(imageFile);
                imageUrls.push(imageUrl);
            }

            // If there's a single file upload as well, add it
            if (file) {
                const singleImageUrl = await uploadImage(file);
                imageUrls.unshift(singleImageUrl); // Add to beginning
            }

            // Use first image as main image for backward compatibility
            const mainImage = imageUrls[0] || "";

            await createEvent({
                image: mainImage,
                images: imageUrls,
                ...inputs,
                options: options,
            });

            // Reset form
            setInputs({
                title: "",
                description: "",
                price: 0,
                location: "",
                catSlug: "",
            });
            setOptions([]);
            setFile(undefined);
            setFiles([]);
            alert("Event created successfully!");
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Error creating event. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        inputs,
        option,
        options,
        file,
        files,
        isSubmitting,
        dragActive,
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
        onDrop: handleMultiDrop,
        onSubmit: handleSubmit,
    };
};

export const useCategoryForm = () => {
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
            // Auto-generate slug when title changes
            setInputs((previous) => ({
                ...previous,
                title: value,
                slug: generateSlug(value),
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
            const imageUrl = await uploadImage(file!);
            await createCategory({
                ...inputs,
                image: imageUrl,
            });

            // Reset form
            setInputs({
                title: "",
                description: "",
                color: "#6366f1",
                image: "",
                slug: "",
            });
            setFile(undefined);
            alert("Category created successfully!");
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Error creating category. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        inputs,
        file,
        isSubmitting,
        dragActive,
        onInputChange: handleChangeInput,
        onFileChange: handleUploadImage,
        onDragEnter: handleDrag,
        onDragLeave: handleDrag,
        onDragOver: handleDrag,
        onDrop: handleDrop,
        onSubmit: handleSubmit,
    };
};
