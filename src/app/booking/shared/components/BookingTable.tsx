import { BookingType } from "@/types/types";
import { BookingRow } from "./BookingRow";

interface BookingTableProps {
    bookings: BookingType[];
    isAdmin: boolean;
    onUpdateBooking: (
        event: React.FormEvent<HTMLFormElement>,
        id: string
    ) => void;
}

export const BookingTable = ({
    bookings,
    isAdmin,
    onUpdateBooking,
}: BookingTableProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <tr>
                            <th className="hidden md:table-cell px-6 py-4 text-left font-semibold">
                                Booking ID
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Price
                            </th>
                            <th className="hidden md:table-cell px-6 py-4 text-left font-semibold">
                                Event
                            </th>
                            <th className="px-6 py-4 text-left font-semibold">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {bookings.map((booking) => (
                            <BookingRow
                                key={booking.id}
                                booking={booking}
                                isAdmin={isAdmin}
                                onUpdateBooking={onUpdateBooking}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
