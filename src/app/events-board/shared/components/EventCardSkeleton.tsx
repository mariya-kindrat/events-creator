/**
 * Loading skeleton for event cards
 */
export const EventCardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-pulse">
        <div className="aspect-[4/3] bg-slate-700/30"></div>
        <div className="p-6">
            <div className="h-6 bg-slate-600/30 rounded mb-3"></div>
            <div className="h-4 bg-slate-600/30 rounded mb-2"></div>
            <div className="h-4 bg-slate-600/30 rounded w-2/3 mb-4"></div>
            <div className="flex justify-between items-center">
                <div className="h-8 bg-slate-600/30 rounded w-20"></div>
                <div className="h-10 bg-slate-600/30 rounded w-24"></div>
            </div>
        </div>
    </div>
);
