import Image from "next/image";
import { ImageUploadProps } from "../types";

export const ImageUpload = ({
    label,
    file,
    dragActive,
    onFileChange,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    currentImage = "",
}: ImageUploadProps) => (
    <div className="group">
        <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
            {label}
        </label>
        <div
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
            }`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={onFileChange}
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
                        {file
                            ? file.name
                            : "Drop your image here or click to browse"}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            </div>
        </div>

        {/* Current Image Preview */}
        {currentImage && (
            <div className="mt-4">
                <p className="text-slate-300 text-sm mb-2">Current Image:</p>
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/10">
                    <Image
                        src={currentImage}
                        alt="Current category image"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-1 left-1 bg-green-600/80 text-white text-xs px-2 py-1 rounded">
                        Current
                    </div>
                </div>
            </div>
        )}
    </div>
);
