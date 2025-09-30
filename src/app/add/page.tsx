"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    AccessDenied,
    BackgroundElements,
    CategoryForm,
    EventForm,
    LoadingSpinner,
    PageHeader,
    TabSwitcher,
} from "./shared/components";
import { useCategoryForm, useEventForm } from "./shared/utils/hooks";

type TabType = "event" | "category";

const AddPage = () => {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<TabType>("event");
    const router = useRouter();

    // Custom hooks for form logic
    const eventForm = useEventForm();
    const categoryForm = useCategoryForm();

    if (status === "loading") {
        return <LoadingSpinner />;
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        router.push("/");
        return <AccessDenied />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            <BackgroundElements />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16">
                <div className="max-w-4xl mx-auto">
                    <PageHeader activeTab={activeTab} />

                    <TabSwitcher
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-8 lg:p-12">
                            {activeTab === "event" ? (
                                <EventForm
                                    inputs={eventForm.inputs}
                                    option={eventForm.option}
                                    options={eventForm.options}
                                    file={eventForm.file}
                                    files={eventForm.files}
                                    isSubmitting={eventForm.isSubmitting}
                                    dragActive={eventForm.dragActive}
                                    onInputChange={eventForm.onInputChange}
                                    onOptionChange={eventForm.onOptionChange}
                                    onSetOptions={eventForm.onSetOptions}
                                    onDeleteOption={eventForm.onDeleteOption}
                                    onFileChange={eventForm.onFileChange}
                                    onFilesChange={eventForm.onFilesChange}
                                    onRemoveFile={eventForm.onRemoveFile}
                                    onDragEnter={eventForm.onDragEnter}
                                    onDragLeave={eventForm.onDragLeave}
                                    onDragOver={eventForm.onDragOver}
                                    onDrop={eventForm.onDrop}
                                    onSubmit={eventForm.onSubmit}
                                />
                            ) : (
                                <CategoryForm
                                    inputs={categoryForm.inputs}
                                    file={categoryForm.file}
                                    isSubmitting={categoryForm.isSubmitting}
                                    dragActive={categoryForm.dragActive}
                                    onInputChange={categoryForm.onInputChange}
                                    onFileChange={categoryForm.onFileChange}
                                    onDragEnter={categoryForm.onDragEnter}
                                    onDragLeave={categoryForm.onDragLeave}
                                    onDragOver={categoryForm.onDragOver}
                                    onDrop={categoryForm.onDrop}
                                    onSubmit={categoryForm.onSubmit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPage;
