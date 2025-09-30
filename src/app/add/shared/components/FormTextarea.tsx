interface FormTextareaProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}

export const FormTextarea = ({
    label,
    name,
    placeholder,
    required = false,
    value,
    onChange,
    rows = 4,
}: FormTextareaProps) => (
    <div className="group">
        <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
            {label}
        </label>
        <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 resize-none"
            style={{ height: `${rows * 2}rem` }}
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            value={value}
        />
    </div>
);
