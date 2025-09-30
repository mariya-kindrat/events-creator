interface StatItem {
    value: string;
    label: string;
}

interface StatsSectionProps {
    stats?: StatItem[];
}

const defaultStats: StatItem[] = [
    { value: "20+", label: "Premium Events" },
    { value: "10+", label: "Events For Kids" },
    { value: "2K+", label: "Happy Guests" },
];

/**
 * Stats section component displaying key metrics
 */
export const StatsSection = ({ stats = defaultStats }: StatsSectionProps) => {
    return (
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gradient-primary mb-2">
                        {stat.value}
                    </div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
            ))}
        </div>
    );
};
