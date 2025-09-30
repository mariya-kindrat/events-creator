interface Stat {
    value: string;
    label: string;
}

interface StatsSectionProps {
    stats?: Stat[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
    const defaultStats: Stat[] = [
        {
            value: "10K+",
            label: "Happy Customers",
        },
        {
            value: "500+",
            label: "Premium Events",
        },
        {
            value: "4.9★",
            label: "Average Rating",
        },
    ];

    const displayStats = stats || defaultStats;

    return (
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700/50">
            {displayStats.map((stat, index) => (
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
