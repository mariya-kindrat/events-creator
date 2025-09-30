import { Option } from "@/types/types";

interface EventOptionsSectionProps {
    option: Option;
    options: Option[];
    onOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddOption: () => void;
    onDeleteOption: (option: Option) => void;
}

export const EventOptionsSection = ({
    option,
    options,
    onOptionChange,
    onAddOption,
    onDeleteOption,
}: EventOptionsSectionProps) => (
    <div className="space-y-6">
        <div>
            <label className="block text-slate-200 text-sm font-semibold mb-3">
                Event Options
            </label>
            <p className="text-slate-400 text-sm mb-4">
                Add additional options for your event (VIP tickets, merchandise,
                etc.)
            </p>
        </div>

        {/* Add Option Form */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    type="text"
                    name="option"
                    placeholder="Option name (e.g., VIP Access)"
                    onChange={onOptionChange}
                    value={option.option}
                />
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                        $
                    </span>
                    <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                        type="number"
                        name="additionalPrice"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        onChange={onOptionChange}
                        value={option.additionalPrice || ""}
                    />
                </div>
            </div>
            <button
                type="button"
                className="w-full lg:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={onAddOption}
            >
                Add Option
            </button>
        </div>

        {/* Options List */}
        {options.length > 0 && (
            <div className="space-y-3">
                <h4 className="text-slate-200 font-medium">Added Options:</h4>
                <div className="grid gap-3">
                    {options.map((opt, index) => (
                        <div
                            key={`${opt.option}-${index}`}
                            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between group hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 cursor-pointer"
                            onClick={() => onDeleteOption(opt)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                <span className="text-white font-medium">
                                    {opt.option}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400 font-semibold">
                                    ${opt.additionalPrice}
                                </span>
                                <button className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);
