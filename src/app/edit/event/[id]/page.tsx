"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { EventForm } from "../../../add/shared/components/EventForm";
import { useEditEventForm } from "./shared/utils/hooks";

const EditEventPage = () => {
    const params = useParams();
    const eventId = params.id as string;
    const { data: session, status } = useSession();
    const router = useRouter();

    const {
        inputs,
        option,
        options,
        file,
        files,
        isSubmitting,
        dragActive,
        loading,
        error,
        currentImages,
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
    } = useEditEventForm(eventId);

    useEffect(() => {
        if (status === "loading") return;

        if (!session?.user.isAdmin) {
            router.push("/");
            return;
        }
    }, [session, status, router]);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 text-lg">Loading event...</p>
                </div>
            </div>
        );
    }

    if (!session?.user.isAdmin) {
        return null;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">Error</div>
                    <p className="text-slate-300">{error}</p>
                    <button
                        onClick={() => router.push("/admin")}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Back to Admin
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        {/* Back Button */}
                        <div className="flex justify-start mb-6">
                            <button
                                onClick={() => router.push(`/event/${eventId}`)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 text-slate-300 hover:text-white transition-all duration-200"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Back to Event
                            </button>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                            Edit Event
                        </h1>
                        <p className="text-slate-300 text-xl max-w-2xl mx-auto">
                            Update your event details and make it even better
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-8 lg:p-12">
                            <EventForm
                                inputs={inputs}
                                option={option}
                                options={options}
                                file={file}
                                files={files}
                                isSubmitting={isSubmitting}
                                dragActive={dragActive}
                                onInputChange={onInputChange}
                                onOptionChange={onOptionChange}
                                onSetOptions={onSetOptions}
                                onDeleteOption={onDeleteOption}
                                onFileChange={onFileChange}
                                onFilesChange={onFilesChange}
                                onRemoveFile={onRemoveFile}
                                onDragEnter={onDragEnter}
                                onDragLeave={onDragLeave}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                onSubmit={onSubmit}
                                submitText="Update Event"
                                currentImages={currentImages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEventPage;
