/**
 * Loading skeleton for category cards
 */
export const CategoryCardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-pulse">
        <div className="aspect-[4/3] bg-slate-700/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="h-8 bg-slate-600/30 rounded-lg mb-4"></div>
            <div className="h-4 bg-slate-600/30 rounded mb-2"></div>
            <div className="h-4 bg-slate-600/30 rounded w-3/4 mb-6"></div>
            <div className="h-12 bg-slate-600/30 rounded-xl w-32"></div>
        </div>
    </div>
);
