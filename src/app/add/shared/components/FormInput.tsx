import { FormInputProps } from "../types";

export const FormInput = ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    value,
    onChange,
    prefix,
    min,
    step,
}: FormInputProps) => (
    <div className="group">
        <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
            {label}
        </label>
        <div className="relative">
            {prefix && (
                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">
                    {prefix}
                </span>
            )}
            <input
                className={`w-full bg-white/5 border border-white/10 rounded-2xl ${
                    prefix ? "pl-12 pr-6" : "px-6"
                } py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10`}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                value={value}
                min={min}
                step={step}
            />
        </div>
    </div>
);
