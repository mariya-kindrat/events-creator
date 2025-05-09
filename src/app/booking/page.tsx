const BookingPage = () => {
    return (
        <div className="p-4 lg:px-20 xl:px-40">
            <table className="w-full border-separate border-spacing-3">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="hidden md:block">Booking ID</th>
                        <th className="">Date</th>
                        <th className="">Price</th>
                        <th className="hidden md:block">Events</th>
                        <th className="">Status</th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="text-sm md:text-base bg-red-100">
                        <td className="hidden md:block py-6 px-1">123455</td>
                        <td className="py-6 px-1">07/15/1983</td>
                        <td className="py-6 px-1">$ 46</td>
                        <td className="hidden md:block py-6 px-1">Painting</td>
                        <td className="py-6 px-1">Booked</td>
                    </tr>
                    <tr className="text-sm md:text-base odd:bg-blue-100">
                        <td className="hidden md:block py-6 px-1">123455</td>
                        <td className="py-6 px-1">07/15/1983</td>
                        <td className="py-6 px-1">$ 46</td>
                        <td className="hidden md:block py-6 px-1">Painting</td>
                        <td className="py-6 px-1">Booked</td>
                    </tr>
                    <tr className="text-sm md:text-base odd:bg-blue-100">
                        <td className="hidden md:block py-6 px-1">123455</td>
                        <td className="py-6 px-1">07/15/1983</td>
                        <td className="py-6 px-1">$ 46</td>
                        <td className="hidden md:block py-6 px-1">Painting</td>
                        <td className="py-6 px-1">Booked</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BookingPage;
