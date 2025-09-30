interface FeatureHighlightProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const FeatureHighlight = ({
    icon,
    title,
    description,
}: FeatureHighlightProps) => (
    <div className="flex items-start space-x-4 p-6 rounded-xl glass border border-slate-700/30">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-blue-400">
            {icon}
        </div>
        <div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    </div>
);
