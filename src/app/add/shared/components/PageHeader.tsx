import { TabType } from "../types";

interface PageHeaderProps {
    activeTab: TabType;
}

export const PageHeader = ({ activeTab }: PageHeaderProps) => (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            {activeTab === "event" ? "Create Event" : "Create Category"}
        </h1>
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            {activeTab === "event"
                ? "Bring your vision to life with our premium event creation experience"
                : "Create new categories to organize your events"}
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
    </div>
);
