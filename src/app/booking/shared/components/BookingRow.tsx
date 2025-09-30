import { BookingRowProps } from "../types";
import { formatDate, getStatusColors } from "../utils";
import { BookingForm } from "./BookingForm";
import { StatusBadge } from "./StatusBadge";

export const BookingRow = ({
    booking,
    isAdmin,
    onUpdateBooking,
}: BookingRowProps) => {
    const statusColors = getStatusColors(booking.status);

    return (
        <tr
            className={`hover:bg-slate-50 transition-colors duration-200 ${statusColors.row}`}
        >
            <td className="hidden md:table-cell px-6 py-4">
                <div className="font-mono text-sm text-slate-600">
                    {booking.id.slice(0, 8)}...
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-slate-800 font-medium">
                    {formatDate(booking.createdAt)}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-2xl font-bold text-green-600">
                    ${booking.price}
                </div>
            </td>
            <td className="hidden md:table-cell px-6 py-4">
                <div className="text-slate-800 font-medium">
                    {booking.events[0].title}
                </div>
            </td>
            <td className="px-6 py-4">
                {isAdmin ? (
                    <BookingForm booking={booking} onSubmit={onUpdateBooking} />
                ) : (
                    <StatusBadge status={booking.status} />
                )}
            </td>
        </tr>
    );
};
