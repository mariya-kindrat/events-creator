export type TabType = "event" | "category";

export interface Inputs {
    title: string;
    description: string;
    price: number;
    location: string;
    catSlug: string;
}

export interface CategoryInputs {
    title: string;
    description: string;
    color: string;
    image: string;
    slug: string;
}

export interface Option {
    option: string;
    additionalPrice: number;
}

export interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    value: string | number;
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    prefix?: string;
    min?: string;
    step?: string;
}

export interface ImageUploadProps {
    label: string;
    file: File | undefined;
    dragActive: boolean;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    currentImage?: string;
}

export interface MultiImageUploadProps {
    label: string;
    files: File[];
    dragActive: boolean;
    onFilesChange: (files: File[]) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onRemoveFile: (index: number) => void;
    maxFiles?: number;
    currentImages?: string[];
}

export interface SubmitButtonProps {
    isSubmitting: boolean;
    text: string;
    submittingText?: string;
}

export interface TabSwitcherProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export interface PageHeaderProps {
    activeTab: TabType;
}

export interface EventFormProps {
    inputs: Inputs;
    option: Option;
    options: Option[];
    file: File | undefined;
    files: File[];
    isSubmitting: boolean;
    dragActive: boolean;
    onInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSetOptions: () => void;
    onDeleteOption: (option: Option) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFilesChange: (files: File[]) => void;
    onRemoveFile: (index: number) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText?: string;
    currentImages?: string[];
}

export interface CategoryFormProps {
    inputs: CategoryInputs;
    file: File | undefined;
    isSubmitting: boolean;
    dragActive: boolean;
    onInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText?: string;
    currentImage?: string;
}
