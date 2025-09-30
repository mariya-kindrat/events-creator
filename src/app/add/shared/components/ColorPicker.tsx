interface ColorPickerProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    description?: string;
}

export const ColorPicker = ({
    label,
    name,
    value,
    onChange,
    description = "Choose a color that represents this category",
}: ColorPickerProps) => (
    <div className="group">
        <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
            {label}
        </label>
        <div className="flex items-center space-x-4">
            <input
                className="w-20 h-12 bg-white/5 border border-white/10 rounded-xl cursor-pointer"
                type="color"
                name={name}
                onChange={onChange}
                value={value}
            />
            <input
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
                type="text"
                name={name}
                placeholder="#6366f1"
                onChange={onChange}
                value={value}
            />
        </div>
        <p className="text-slate-400 text-sm mt-2">{description}</p>
    </div>
);
