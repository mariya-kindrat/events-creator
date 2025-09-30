import { CategoryFormProps } from "../types";
import { ColorPicker } from "./ColorPicker";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { ImageUpload } from "./ImageUpload";
import { SubmitButton } from "./SubmitButton";

export const CategoryForm = ({
    inputs,
    file,
    isSubmitting,
    dragActive,
    onInputChange,
    onFileChange,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onSubmit,
    submitText = "Create Category",
    currentImage = "",
}: CategoryFormProps) => (
    <form
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-12 space-y-8 animate-slide-up"
        onSubmit={onSubmit}
    >
        <FormInput
            label="Category Name"
            name="title"
            placeholder="Enter category name..."
            required
            value={inputs.title}
            onChange={onInputChange}
        />

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
                onChange={onInputChange}
                value={inputs.slug}
            />
            <p className="text-slate-400 text-sm mt-2">
                URL-friendly version of the category name (auto-generated)
            </p>
        </div>

        <ImageUpload
            label="Category Image"
            file={file}
            dragActive={dragActive}
            onFileChange={onFileChange}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            currentImage={currentImage}
        />

        <FormTextarea
            label="Description"
            name="description"
            placeholder="Describe this category..."
            required
            value={inputs.description}
            onChange={onInputChange}
            rows={4}
        />

        <ColorPicker
            label="Category Color"
            name="color"
            value={inputs.color}
            onChange={onInputChange}
        />

        <SubmitButton isSubmitting={isSubmitting} text={submitText} />
    </form>
);
