import Link from "next/link";

const EventBreadcrumb = () => (
    <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
        <Link
            href="/events-board"
            className="hover:text-blue-400 transition-colors"
        >
            Events Board
        </Link>
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
        <span className="text-white">Event Details</span>
    </nav>
);

export default EventBreadcrumb;
