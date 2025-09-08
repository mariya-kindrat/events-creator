const Loading = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
            <div className="text-center">
                {/* Animated Logo */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-primary animate-pulse">
                        EventsLux
                    </h1>
                </div>

                {/* Loading Animation */}
                <div className="flex justify-center items-center space-x-2 mb-8">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                        className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                        className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                </div>

                {/* Loading Text */}
                <p className="text-slate-300 text-lg">
                    Preparing your premium experience...
                </p>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-slate-700 rounded-full mx-auto mt-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
