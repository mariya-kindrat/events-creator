export interface CartEvent {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
    optionsTitle?: string;
}

export interface OrderSummaryProps {
    totalEvents: number;
    totalPrice: number;
    onCheckout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface CartItemProps {
    event: CartEvent;
    onRemove: (event: CartEvent) => void;
}

export interface PricingCalculation {
    serviceFee: number;
    tax: number;
    finalTotal: number;
}
