import { ActionType, CartState } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Initial state with proper typing
const INITIAL_STATE: CartState = {
    events: [],
    totalEvents: 0,
    totalPrice: 0,
};

// Helper functions for cart calculations
const calculateTotals = (events: CartState["events"]) => {
    return events.reduce(
        (totals, event) => ({
            totalEvents: totals.totalEvents + event.quantity,
            totalPrice: totals.totalPrice + event.price,
        }),
        { totalEvents: 0, totalPrice: 0 }
    );
};

// Helper function to find existing event
const findExistingEvent = (events: CartState["events"], targetEvent: any) => {
    return events.find(
        (e) =>
            e.id === targetEvent.id &&
            e.optionsTitle === targetEvent.optionsTitle
    );
};

// Helper function to validate event data
const validateEvent = (event: any): boolean => {
    return (
        event &&
        typeof event.id === "string" &&
        typeof event.quantity === "number" &&
        typeof event.price === "number" &&
        event.quantity > 0 &&
        event.price >= 0
    );
};

export const useCartStore = create(
    persist<CartState & ActionType>(
        (set, get) => ({
            // Initial state
            ...INITIAL_STATE,

            // Add item to cart with improved logic
            addToCart: (event) => {
                // Validate event data
                if (!validateEvent(event)) {
                    console.error("Invalid event data:", event);
                    return;
                }

                set((state) => {
                    const existingEventIndex = state.events.findIndex(
                        (e) =>
                            e.id === event.id &&
                            e.optionsTitle === event.optionsTitle
                    );

                    let updatedEvents;
                    if (existingEventIndex !== -1) {
                        // Update existing event
                        const existingEvent = state.events[existingEventIndex];
                        updatedEvents = state.events.map((e, index) =>
                            index === existingEventIndex
                                ? {
                                      ...existingEvent,
                                      quantity:
                                          existingEvent.quantity +
                                          event.quantity,
                                      price: existingEvent.price + event.price,
                                  }
                                : e
                        );
                    } else {
                        // Add new event
                        updatedEvents = [...state.events, { ...event }];
                    }

                    // Recalculate totals
                    const totals = calculateTotals(updatedEvents);

                    return {
                        ...state,
                        events: updatedEvents,
                        totalEvents: totals.totalEvents,
                        totalPrice: totals.totalPrice,
                    };
                });
            },

            // Remove item from cart with improved logic
            removeFromCart: (event) => {
                if (!event || !event.id) {
                    console.error("Invalid event data for removal:", event);
                    return;
                }

                set((state) => {
                    const updatedEvents = state.events.filter(
                        (e) =>
                            !(
                                e.id === event.id &&
                                e.optionsTitle === event.optionsTitle
                            )
                    );

                    // Recalculate totals
                    const totals = calculateTotals(updatedEvents);

                    return {
                        ...state,
                        events: updatedEvents,
                        totalEvents: totals.totalEvents,
                        totalPrice: totals.totalPrice,
                    };
                });
            },

            // Update quantity of specific item
            updateQuantity: (eventId, optionsTitle, newQuantity) => {
                if (newQuantity < 0) {
                    console.error("Quantity cannot be negative");
                    return;
                }

                set((state) => {
                    const eventIndex = state.events.findIndex(
                        (e) =>
                            e.id === eventId && e.optionsTitle === optionsTitle
                    );

                    if (eventIndex !== -1) {
                        const event = state.events[eventIndex];
                        const pricePerUnit = event.price / event.quantity;

                        let updatedEvents;
                        if (newQuantity === 0) {
                            // Remove item if quantity is 0
                            updatedEvents = state.events.filter(
                                (_, index) => index !== eventIndex
                            );
                        } else {
                            // Update quantity and price
                            updatedEvents = state.events.map((e, index) =>
                                index === eventIndex
                                    ? {
                                          ...e,
                                          quantity: newQuantity,
                                          price: pricePerUnit * newQuantity,
                                      }
                                    : e
                            );
                        }

                        // Recalculate totals
                        const totals = calculateTotals(updatedEvents);

                        return {
                            ...state,
                            events: updatedEvents,
                            totalEvents: totals.totalEvents,
                            totalPrice: totals.totalPrice,
                        };
                    }

                    return state;
                });
            },

            // Clear entire cart
            clearCart: () => {
                set(() => ({
                    ...INITIAL_STATE,
                }));
            },

            // Get cart item count
            getItemCount: () => {
                return get().events.length;
            },

            // Get total items (sum of all quantities)
            getTotalItems: () => {
                return get().totalEvents;
            },

            // Get formatted total price
            getFormattedTotal: () => {
                return get().totalPrice.toFixed(2);
            },

            // Check if item exists in cart
            isInCart: (eventId, optionsTitle) => {
                const events = get().events;
                return events.some(
                    (e) => e.id === eventId && e.optionsTitle === optionsTitle
                );
            },

            // Get specific item from cart
            getCartItem: (eventId, optionsTitle) => {
                const events = get().events;
                return events.find(
                    (e) => e.id === eventId && e.optionsTitle === optionsTitle
                );
            },

            // Get cart summary
            getCartSummary: () => {
                const state = get();
                return {
                    itemCount: state.events.length,
                    totalQuantity: state.totalEvents,
                    totalPrice: state.totalPrice,
                    formattedTotal: state.totalPrice.toFixed(2),
                    isEmpty: state.events.length === 0,
                };
            },

            // Validate cart integrity
            validateCart: () => {
                const state = get();
                const calculatedTotals = calculateTotals(state.events);

                // Check if stored totals match calculated totals
                const isValid =
                    state.totalEvents === calculatedTotals.totalEvents &&
                    Math.abs(state.totalPrice - calculatedTotals.totalPrice) <
                        0.01;

                if (!isValid) {
                    console.warn(
                        "Cart totals mismatch detected, recalculating..."
                    );
                    set((state) => ({
                        ...state,
                        totalEvents: calculatedTotals.totalEvents,
                        totalPrice: calculatedTotals.totalPrice,
                    }));
                }

                return isValid;
            },
        }),
        {
            name: "cart",
            skipHydration: true, // Skip hydration to avoid mismatch between server and client-
        }
    )
);
