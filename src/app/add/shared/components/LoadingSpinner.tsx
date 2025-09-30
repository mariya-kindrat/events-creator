interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner = ({ message }: LoadingSpinnerProps) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-pink-400 rounded-full animate-spin animation-delay-150"></div>
            {message && (
                <p className="text-slate-300 text-center mt-4">{message}</p>
            )}
        </div>
    </div>
);
