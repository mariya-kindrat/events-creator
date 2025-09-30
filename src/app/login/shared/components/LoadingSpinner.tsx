interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner = ({
    message = "Loading...",
}: LoadingSpinnerProps) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-slate-300 text-lg">{message}</p>
        </div>
    </div>
);
