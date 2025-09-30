import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component
 */
export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    {index > 0 && (
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
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-blue-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-white capitalize">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
};
