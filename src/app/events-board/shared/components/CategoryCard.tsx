import Link from "next/link";

interface CategoryCardProps {
    category: {
        id: string;
        title: string;
        description?: string;
        image?: string;
        slug: string;
    };
}

/**
 * Enhanced Category Card Component with hover effects and animations
 */
export const CategoryCard = ({ category }: CategoryCardProps) => {
    return (
        <Link
            href={`events-board/${category.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
        >
            {/* Background Image with Overlay */}
            <div className="aspect-[4/3] relative overflow-hidden">
                {category.image && (
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${category.image})` }}
                    />
                )}

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <svg
                        className="w-5 h-5 text-white"
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
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full glass border border-white/20 text-xs font-medium text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                    Premium Category
                </div>

                {/* Title */}
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-3 group-hover:text-gradient-primary transition-all duration-300">
                    {category.title}
                </h2>

                {/* Description */}
                {category.description && (
                    <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-6 line-clamp-2 group-hover:text-white transition-colors duration-300">
                        {category.description}
                    </p>
                )}

                {/* CTA Button */}
                <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <span>Explore Events</span>
                    <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                </button>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </Link>
    );
};
