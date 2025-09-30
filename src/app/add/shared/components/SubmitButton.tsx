import { SubmitButtonProps } from "../types";

export const SubmitButton = ({
    isSubmitting,
    text,
    submittingText = "Creating...",
}: SubmitButtonProps) => (
    <div className="pt-6">
        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:scale-100 disabled:shadow-none relative overflow-hidden"
        >
            {isSubmitting && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <span className={isSubmitting ? "opacity-0" : "opacity-100"}>
                {text}
            </span>
        </button>
    </div>
);
