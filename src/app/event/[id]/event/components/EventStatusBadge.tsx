interface EventStatusBadgeProps {
    status?: "available" | "sold-out" | "upcoming";
    customText?: string;
}

const EventStatusBadge = ({
    status = "available",
    customText,
}: EventStatusBadgeProps) => {
    const getStatusConfig = () => {
        switch (status) {
            case "sold-out":
                return {
                    bgColor: "border-red-500/30 text-red-300",
                    dotColor: "bg-red-500",
                    text: customText || "Sold Out",
                };
            case "upcoming":
                return {
                    bgColor: "border-yellow-500/30 text-yellow-300",
                    dotColor: "bg-yellow-500",
                    text: customText || "Coming Soon",
                };
            default:
                return {
                    bgColor: "border-green-500/30 text-green-300",
                    dotColor: "bg-green-500",
                    text: customText || "Available for Booking",
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div
            className={`inline-flex items-center px-4 py-2 rounded-full glass border ${config.bgColor} text-sm font-medium mb-6`}
        >
            <span
                className={`w-2 h-2 ${config.dotColor} rounded-full mr-2 animate-pulse`}
            ></span>
            {config.text}
        </div>
    );
};

export default EventStatusBadge;
