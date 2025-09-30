import Link from "next/link";

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionText?: string;
    actionHref?: string;
}

/**
 * Empty state component for when no events are available
 */
export const EmptyState = ({
    title = "No Events Available",
    description = "We're working on adding amazing events to this category. Check back soon!",
    actionText = "Explore Other Categories",
    actionHref = "/events-board",
}: EmptyStateProps) => {
    return (
        <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-800/50 rounded-full flex items-center justify-center">
                <svg
                    className="w-12 h-12 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4"
                    />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-slate-400 mb-8">{description}</p>
            <Link
                href={actionHref}
                className="btn-premium inline-flex items-center space-x-2"
            >
                <span>{actionText}</span>
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
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </Link>
        </div>
    );
};
