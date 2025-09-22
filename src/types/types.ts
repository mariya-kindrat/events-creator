export type EventCategory = {
    id: string;
    slug: string;
    title: string;
    image?: string;
    description?: string;
    color: string;
}[];

export type Option = {
    option: string;
    additionalPrice: number;
};

export type EventType = {
    id: number;
    title: string;
    description?: string;
    image: string;
    location?: string;
    price: number;
    options?: Option[];
};

export type BookingType = {
    id: string;
    title: string;
    userEmail: string;
    price: number;
    events: CartEventType[];
    status: string;
    createdAt: string;
    intent_id?: string;
};

export type CartEventType = {
    id: string;
    title: string;
    image?: string;
    price: number;
    optionsTitle?: string;
    quantity: number;
};

export type CartState = {
    events: CartEventType[];
    totalEvents: number;
    totalPrice: number;
};

export type Inputs = {
    title: string;
    description: string;
    price: number;
    location: string;
    catSlug: string;
};

export type CategoryInputs = {
    title: string;
    description: string;
    color: string;
    image: string;
    slug: string;
};

export type ActionType = {
    addToCart: (event: CartEventType) => void;
    removeFromCart: (event: CartEventType) => void;
    updateQuantity: (
        eventId: string,
        optionsTitle: string | undefined,
        newQuantity: number
    ) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getTotalItems: () => number;
    getFormattedTotal: () => string;
    isInCart: (eventId: string, optionsTitle?: string) => boolean;
    getCartItem: (
        eventId: string,
        optionsTitle?: string
    ) => CartEventType | undefined;
    getCartSummary: () => {
        itemCount: number;
        totalQuantity: number;
        totalPrice: number;
        formattedTotal: string;
        isEmpty: boolean;
    };
    validateCart: () => boolean;
};
