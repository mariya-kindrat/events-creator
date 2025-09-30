import { useHydration } from "@/hooks/useHydration";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MultiImageUploadProps } from "../types";

export const MultiImageUpload = ({
    label,
    files,
    dragActive,
    onFilesChange,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onRemoveFile,
    maxFiles = 4,
    currentImages = [],
}: MultiImageUploadProps) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const isHydrated = useHydration();

    // Generate preview URLs when files change
    useEffect(() => {
        if (!isHydrated) return;

        // Clean up previous URLs
        previewUrls.forEach((url) => {
            if (url.startsWith("blob:")) {
                URL.revokeObjectURL(url);
            }
        });

        // Generate new URLs
        const newUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(newUrls);

        // Cleanup function
        return () => {
            newUrls.forEach((url) => {
                if (url.startsWith("blob:")) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [files, isHydrated]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => {
                if (url.startsWith("blob:")) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const imageFiles = selectedFiles.filter((file) =>
            file.type.startsWith("image/")
        );

        // Combine with existing files, but don't exceed maxFiles (considering current images)
        const availableSlots = maxFiles - currentImages.length;
        const newFiles = [...files, ...imageFiles].slice(0, availableSlots);
        onFilesChange(newFiles);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDragLeave(e);

        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            const imageFiles = droppedFiles.filter((file) =>
                file.type.startsWith("image/")
            );

            // Combine with existing files, but don't exceed maxFiles (considering current images)
            const availableSlots = maxFiles - currentImages.length;
            const newFiles = [...files, ...imageFiles].slice(0, availableSlots);
            onFilesChange(newFiles);
        }
    };

    return (
        <div className="group">
            <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                {label} ({currentImages.length + files.length}/{maxFiles})
            </label>

            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 mb-4 ${
                    dragActive
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
                } ${
                    currentImages.length + files.length >= maxFiles
                        ? "opacity-50 pointer-events-none"
                        : ""
                }`}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={handleDrop}
            >
                <input
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    name="images"
                    disabled={currentImages.length + files.length >= maxFiles}
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
                            {currentImages.length + files.length >= maxFiles
                                ? `Maximum ${maxFiles} images selected`
                                : "Drop your images here or click to browse"}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            PNG, JPG, GIF up to 10MB each • Max {maxFiles}{" "}
                            images
                        </p>
                    </div>
                </div>
            </div>

            {/* Preview Grid */}
            {(files.length > 0 || currentImages.length > 0) && isHydrated && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Current Images */}
                    {currentImages.map((imageUrl, index) => (
                        <div
                            key={`current-${index}`}
                            className="relative group/preview"
                        >
                            <div className="aspect-square relative overflow-hidden rounded-xl border border-white/10 bg-slate-800/50">
                                <Image
                                    src={imageUrl}
                                    alt={`Current image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                {/* Current image indicator */}
                                <div className="absolute bottom-2 left-2 bg-green-600/80 text-white text-xs px-2 py-1 rounded">
                                    Current
                                </div>
                            </div>
                            <p className="text-slate-300 text-xs mt-1 truncate">
                                Current image {index + 1}
                            </p>
                        </div>
                    ))}

                    {/* New File Uploads */}
                    {files.map((file, index) => (
                        <div
                            key={`new-${index}`}
                            className="relative group/preview"
                        >
                            <div className="aspect-square relative overflow-hidden rounded-xl border border-white/10 bg-slate-800/50">
                                {previewUrls[index] ? (
                                    <Image
                                        src={previewUrls[index]}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                                    </div>
                                )}
                                {/* Remove button */}
                                <button
                                    type="button"
                                    onClick={() => onRemoveFile(index)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 text-xs"
                                >
                                    ×
                                </button>
                                {/* New image indicator */}
                                <div className="absolute bottom-2 left-2 bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                                    New
                                </div>
                            </div>
                            <p className="text-slate-300 text-xs mt-1 truncate">
                                {file.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
