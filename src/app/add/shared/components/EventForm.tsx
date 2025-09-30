import { EventFormProps } from "../types";
import { CategoryDropdown } from "./CategoryDropdown";
import { EventOptionsSection } from "./EventOptionsSection";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { MultiImageUpload } from "./MultiImageUpload";
import { SubmitButton } from "./SubmitButton";

export const EventForm = ({
    inputs,
    option,
    options,
    file,
    files,
    isSubmitting,
    dragActive,
    onInputChange,
    onOptionChange,
    onSetOptions,
    onDeleteOption,
    onFileChange,
    onFilesChange,
    onRemoveFile,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onSubmit,
    submitText = "Create Event",
    currentImages = [],
}: EventFormProps) => (
    <form
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-12 space-y-8 animate-slide-up"
        onSubmit={onSubmit}
    >
        <FormInput
            label="Event Name"
            name="title"
            placeholder="Enter your event name..."
            required
            value={inputs.title}
            onChange={onInputChange}
        />

        <MultiImageUpload
            label="Event Images"
            files={files}
            dragActive={dragActive}
            onFilesChange={onFilesChange}
            onRemoveFile={onRemoveFile}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            maxFiles={4}
            currentImages={currentImages}
        />

        <FormTextarea
            label="Description"
            name="description"
            placeholder="Describe your event in detail..."
            value={inputs.description}
            onChange={onInputChange}
            rows={4}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormInput
                label="Price ($)"
                name="price"
                type="number"
                placeholder="0.00"
                required
                value={inputs.price || ""}
                onChange={onInputChange}
                prefix="$"
                min="0"
                step="0.01"
            />

            <CategoryDropdown
                label="Category"
                name="catSlug"
                value={inputs.catSlug}
                onChange={onInputChange}
                required
            />
        </div>

        <FormInput
            label="Event Location"
            name="location"
            placeholder="Enter venue or address..."
            required
            value={inputs.location}
            onChange={onInputChange}
        />

        <EventOptionsSection
            option={option}
            options={options}
            onOptionChange={onOptionChange}
            onAddOption={onSetOptions}
            onDeleteOption={onDeleteOption}
        />

        <SubmitButton isSubmitting={isSubmitting} text={submitText} />
    </form>
);
