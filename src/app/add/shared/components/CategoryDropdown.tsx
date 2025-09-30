import { useEffect, useState } from "react";

interface Category {
    id: string;
    title: string;
    slug: string;
    color: string;
}

interface CategoryDropdownProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

export const CategoryDropdown = ({
    label,
    name,
    value,
    onChange,
    required = false,
}: CategoryDropdownProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load categories"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="group">
            <label className="block text-slate-200 text-sm font-semibold mb-3 group-focus-within:text-purple-400 transition-colors duration-300">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {loading ? (
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-slate-400 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-3"></div>
                    Loading categories...
                </div>
            ) : error ? (
                <div className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 text-red-400">
                    {error}
                </div>
            ) : (
                <div className="relative">
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10 appearance-none cursor-pointer backdrop-blur-xl"
                        style={{
                            colorScheme: "dark",
                        }}
                    >
                        <option
                            value=""
                            className="text-slate-300"
                            style={{
                                backgroundColor: "rgb(15 23 42)",
                                color: "rgb(203 213 225)",
                                padding: "12px 16px",
                            }}
                        >
                            Select a category...
                        </option>
                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.slug}
                                className="text-white"
                                style={{
                                    backgroundColor: "rgb(88 28 135)",
                                    color: "rgb(255 255 255)",
                                    padding: "12px 16px",
                                }}
                            >
                                {category.title}
                            </option>
                        ))}
                    </select>

                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            )}

            {!loading && !error && categories.length === 0 && (
                <p className="text-slate-400 text-sm mt-2">
                    No categories available. Create a category first.
                </p>
            )}
        </div>
    );
};
