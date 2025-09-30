interface AccessDeniedProps {
    title?: string;
    message?: string;
}

export const AccessDenied = ({
    title = "Access Denied",
    message = "You don't have permission to access this page.",
}: AccessDeniedProps) => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-red-300/20">
            <div className="text-red-300 text-xl font-semibold">{title}</div>
            <div className="text-red-200/70 mt-2">{message}</div>
        </div>
    </div>
);
