import { StatusBadgeProps } from "../types";
import { getStatusColors } from "../utils";

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const colors = getStatusColors(status);

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
        >
            <span className={`w-2 h-2 rounded-full mr-2 ${colors.dot}`}></span>
            {status}
        </span>
    );
};
