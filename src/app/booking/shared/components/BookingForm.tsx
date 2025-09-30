/**
 * BookingForm - Inline form component for editing booking status
 * Allows users to update booking status with a clean input and edit button
 */
import { BookingFormProps } from "../types";

export const BookingForm = ({ booking, onSubmit }: BookingFormProps) => {
    return (
        <form
            className="flex items-center gap-3"
            onSubmit={(e) => onSubmit(e, booking.id)}
        >
            <input
                placeholder={booking.status}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-500"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                aria-label="Edit booking"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
            </button>
        </form>
    );
};
