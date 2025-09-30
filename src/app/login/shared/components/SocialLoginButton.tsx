interface SocialLoginButtonProps {
    provider: string;
    icon: React.ReactNode;
    onClick: () => void;
    isLoading: boolean;
}

export const SocialLoginButton = ({
    provider,
    icon,
    onClick,
    isLoading,
}: SocialLoginButtonProps) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="group relative w-full flex items-center justify-center space-x-3 p-4 rounded-xl glass border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isLoading ? (
            <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin"></div>
        ) : (
            <div className="w-5 h-5 flex items-center justify-center">
                {icon}
            </div>
        )}
        <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
            Continue with {provider}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </button>
);
