interface PageHeaderProps {
    badge?: {
        text: string;
        icon?: boolean;
    };
    title: {
        primary: string;
        secondary?: string;
    };
    description: string;
}

/**
 * Reusable page header component with badge, title, and description
 */
export const PageHeader = ({ badge, title, description }: PageHeaderProps) => {
    return (
        <div className="text-center mb-16">
            {badge && (
                <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                    {badge.icon && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    )}
                    {badge.text}
                </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                <span className="text-gradient-primary block">
                    {title.primary}
                </span>
                {title.secondary && (
                    <span className="text-white">{title.secondary}</span>
                )}
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {description}
            </p>
        </div>
    );
};
