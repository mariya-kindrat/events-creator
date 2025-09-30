import { TabSwitcherProps } from "../types";

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => (
    <div className="flex justify-center mb-6 sm:mb-8 px-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-1.5 sm:p-2 border border-white/10 w-full max-w-md sm:w-auto">
            <button
                type="button"
                onClick={() => onTabChange("event")}
                className={`w-1/2 sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === "event"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
            >
                Add Event
            </button>
            <button
                type="button"
                onClick={() => onTabChange("category")}
                className={`w-1/2 sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === "category"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
            >
                Add Category
            </button>
        </div>
    </div>
);
