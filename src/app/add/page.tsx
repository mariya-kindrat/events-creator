"use client";

import { CategoryInputs, Inputs, Option } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type TabType = "event" | "category";

const AddPage = () => {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<TabType>("event");

    // Event form states
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
    const [eventFile, setEventFile] = useState<File>();
    const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
    const [eventDragActive, setEventDragActive] = useState(false);

    // Category form states
    const [categoryInputs, setCategoryInputs] = useState<CategoryInputs>({
        title: "",
        description: "",
        color: "#6366f1",
        image: "",
        slug: "",
    });

    const [categoryFile, setCategoryFile] = useState<File>();
    const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
    const [categoryDragActive, setCategoryDragActive] = useState(false);

    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-400 rounded-full animate-spin animation-delay-150"></div>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        router.push("/");
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-red-300/20">
                    <div className="text-red-300 text-xl font-semibold">
                        Access Denied
                    </div>
                    <div className="text-red-200/70 mt-2">
                        You don't have permission to access this page.
                    </div>
                </div>
            </div>
        );
    }

    // Event form handlers
    const handleChangeInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputs((previous) => {
            return {
                ...previous,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
        setOption((previous) => {
            return {
                ...previous,
                [e.target.name]: e.target.value,
            };
        });
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

    const handleEventUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const image = (target.files as FileList)[0];
        setEventFile(image);
    };

    const handleEventDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setEventDragActive(true);
        } else if (e.type === "dragleave") {
            setEventDragActive(false);
        }
    };

    const handleEventDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEventDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                setEventFile(droppedFile);
            }
        }
    };

    // Category form handlers
    const handleChangeCategoryInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCategoryInputs((previous) => {
            return {
                ...previous,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleCategoryUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const image = (target.files as FileList)[0];
        setCategoryFile(image);
    };

    const handleCategoryDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setCategoryDragActive(true);
        } else if (e.type === "dragleave") {
            setCategoryDragActive(false);
        }
    };

    const handleCategoryDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCategoryDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                setCategoryFile(droppedFile);
            }
        }
    };

    // Generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    // Auto-generate slug when title changes
    const handleCategoryTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setCategoryInputs((previous) => ({
            ...previous,
            title,
            slug: generateSlug(title),
        }));
    };

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "events-board");
        // Replace with your Cloudinary upload preset
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

    const handleEventSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmittingEvent(true);

        try {
            const imageUrl = await uploadImage(eventFile!);
            const response = await fetch("http://localhost:3000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: imageUrl,
                    ...inputs,
                    options: options,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Reset form
                setInputs({
                    title: "",
                    description: "",
                    price: 0,
                    location: "",
                    catSlug: "",
                });
                setOptions([]);
                setEventFile(undefined);
                alert("Event created successfully!");
            } else {
                throw new Error(data.error || "Failed to create event");
            }
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Error creating event. Please try again.");
        } finally {
            setIsSubmittingEvent(false);
        }
    };

    const handleCategorySubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmittingCategory(true);

        try {
            const imageUrl = await uploadImage(categoryFile!);
            const response = await fetch(
                "http://localhost:3000/api/categories",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...categoryInputs,
                        image: imageUrl,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Reset form
                setCategoryInputs({
                    title: "",
                    description: "",
                    color: "#6366f1",
                    image: "",
                    slug: "",
                });
                setCategoryFile(undefined);
                alert("Category created successfully!");
            } else {
                throw new Error(data.error || "Failed to create category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Error creating category. Please try again.");
        } finally {
            setIsSubmittingCategory(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            {activeTab === "event"
                                ? "Create Event"
                                : "Create Category"}
                        </h1>
                        <p className="text-slate-300 text-lg lg:text-xl max-w-2xl mx-auto">
                            {activeTab === "event"
                                ? "Bring your vision to life with our premium event creation experience"
                                : "Create new categories to organize your events"}
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                            <button
                                type="button"
                                onClick={() => setActiveTab("event")}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    activeTab === "event"
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                        : "text-slate-300 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                Add Event
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("category")}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    activeTab === "category"
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                        : "text-slate-300 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                Add Category
                            </button>
                        </div>
                    </div>

                    {/* Event Form */}
                    {activeTab === "event" && (
                        <form
                            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-12 space-y-8 animate-slide-up"
                            onSubmit={handleEventSubmit}
                        >
                            {/* Event Name */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Event Name
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                    type="text"
                                    name="title"
                                    placeholder="Enter your event name..."
                                    required
                                    onChange={handleChangeInput}
                                    value={inputs.title}
                                />
                            </div>

                            {/* Image Upload with Drag & Drop */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Event Image
                                </label>
                                <div
                                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                                        eventDragActive
                                            ? "border-purple-500 bg-purple-500/10"
                                            : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
                                    }`}
                                    onDragEnter={handleEventDrag}
                                    onDragLeave={handleEventDrag}
                                    onDragOver={handleEventDrag}
                                    onDrop={handleEventDrop}
                                >
                                    <input
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEventUploadImage}
                                        name="image"
                                    />
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                            <svg
                                                className="w-8 h-8 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-200 font-medium">
                                                {eventFile
                                                    ? eventFile.name
                                                    : "Drop your image here or click to browse"}
                                            </p>
                                            <p className="text-slate-400 text-sm mt-1">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Description
                                </label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 resize-none h-32"
                                    name="description"
                                    placeholder="Describe your event in detail..."
                                    onChange={handleChangeInput}
                                    value={inputs.description}
                                />
                            </div>

                            {/* Price and Category Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                        Price ($)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">
                                            $
                                        </span>
                                        <input
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                            type="number"
                                            name="price"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                            onChange={handleChangeInput}
                                            value={inputs.price || ""}
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                        Category
                                    </label>
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                        type="text"
                                        name="catSlug"
                                        placeholder="e.g., music, sports, technology..."
                                        required
                                        onChange={handleChangeInput}
                                        value={inputs.catSlug}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Event Location
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                    type="text"
                                    name="location"
                                    placeholder="Enter venue or address..."
                                    required
                                    onChange={handleChangeInput}
                                    value={inputs.location}
                                />
                            </div>

                            {/* Options Section */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-slate-200 text-sm font-semibold mb-3">
                                        Event Options
                                    </label>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Add additional options for your event
                                        (VIP tickets, merchandise, etc.)
                                    </p>
                                </div>

                                {/* Add Option Form */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                        <input
                                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                                            type="text"
                                            name="option"
                                            placeholder="Option name (e.g., VIP Access)"
                                            onChange={handleChangeOption}
                                            value={option.option}
                                        />
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                                                $
                                            </span>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                                                type="number"
                                                name="additionalPrice"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                onChange={handleChangeOption}
                                                value={
                                                    option.additionalPrice || ""
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full lg:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                        onClick={handleSetOptions}
                                    >
                                        Add Option
                                    </button>
                                </div>

                                {/* Options List */}
                                {options.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-slate-200 font-medium">
                                            Added Options:
                                        </h4>
                                        <div className="grid gap-3">
                                            {options.map((opt, index) => (
                                                <div
                                                    key={`${opt.option}-${index}`}
                                                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between group hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 cursor-pointer"
                                                    onClick={() =>
                                                        handleDeleteOption(opt)
                                                    }
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                                        <span className="text-white font-medium">
                                                            {opt.option}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-green-400 font-semibold">
                                                            $
                                                            {
                                                                opt.additionalPrice
                                                            }
                                                        </span>
                                                        <button className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <svg
                                                                className="w-5 h-5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmittingEvent}
                                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:scale-100 disabled:shadow-none relative overflow-hidden"
                                >
                                    {isSubmittingEvent && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                    <span
                                        className={
                                            isSubmittingEvent
                                                ? "opacity-0"
                                                : "opacity-100"
                                        }
                                    >
                                        Create Event
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Category Form */}
                    {activeTab === "category" && (
                        <form
                            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-12 space-y-8 animate-slide-up"
                            onSubmit={handleCategorySubmit}
                        >
                            {/* Category Name */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Category Name
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                    type="text"
                                    name="title"
                                    placeholder="Enter category name..."
                                    required
                                    onChange={handleCategoryTitleChange}
                                    value={categoryInputs.title}
                                />
                            </div>

                            {/* Category Slug */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Category Slug
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                    type="text"
                                    name="slug"
                                    placeholder="category-slug"
                                    required
                                    onChange={handleChangeCategoryInput}
                                    value={categoryInputs.slug}
                                />
                                <p className="text-slate-400 text-sm mt-2">
                                    URL-friendly version of the category name
                                    (auto-generated)
                                </p>
                            </div>

                            {/* Category Image */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Category Image
                                </label>
                                <div
                                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                                        categoryDragActive
                                            ? "border-purple-500 bg-purple-500/10"
                                            : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
                                    }`}
                                    onDragEnter={handleCategoryDrag}
                                    onDragLeave={handleCategoryDrag}
                                    onDragOver={handleCategoryDrag}
                                    onDrop={handleCategoryDrop}
                                >
                                    <input
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCategoryUploadImage}
                                        name="image"
                                    />
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                            <svg
                                                className="w-8 h-8 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-200 font-medium">
                                                {categoryFile
                                                    ? categoryFile.name
                                                    : "Drop your image here or click to browse"}
                                            </p>
                                            <p className="text-slate-400 text-sm mt-1">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Category Description */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Description
                                </label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 resize-none h-32"
                                    name="description"
                                    placeholder="Describe this category..."
                                    required
                                    onChange={handleChangeCategoryInput}
                                    value={categoryInputs.description}
                                />
                            </div>

                            {/* Category Color */}
                            <div className="group">
                                <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                                    Category Color
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        className="w-20 h-12 bg-white/5 border border-white/10 rounded-xl cursor-pointer"
                                        type="color"
                                        name="color"
                                        onChange={handleChangeCategoryInput}
                                        value={categoryInputs.color}
                                    />
                                    <input
                                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                                        type="text"
                                        name="color"
                                        placeholder="#6366f1"
                                        onChange={handleChangeCategoryInput}
                                        value={categoryInputs.color}
                                    />
                                </div>
                                <p className="text-slate-400 text-sm mt-2">
                                    Choose a color that represents this category
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmittingCategory}
                                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:scale-100 disabled:shadow-none relative overflow-hidden"
                                >
                                    {isSubmittingCategory && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                    <span
                                        className={
                                            isSubmittingCategory
                                                ? "opacity-0"
                                                : "opacity-100"
                                        }
                                    >
                                        Create Category
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPage;
