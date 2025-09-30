export interface BookingRowProps {
    booking: any; // Using any to match the existing BookingType from global types
    isAdmin: boolean;
    onUpdateBooking: (
        event: React.FormEvent<HTMLFormElement>,
        id: string
    ) => void;
}

export interface StatusBadgeProps {
    status: string;
}

export interface BookingFormProps {
    booking: any;
    onSubmit: (event: React.FormEvent<HTMLFormElement>, id: string) => void;
}
