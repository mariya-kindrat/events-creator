import { PricingCalculation } from "../types";

/**
 * Calculate service fee, tax, and final total for cart
 */
export const calculatePricing = (totalPrice: number): PricingCalculation => {
    const serviceFee = Math.round(totalPrice * 0.05 * 100) / 100; // 5% service fee
    const tax = Math.round(totalPrice * 0.08 * 100) / 100; // 8% tax
    const finalTotal = totalPrice + serviceFee + tax;

    return {
        serviceFee,
        tax,
        finalTotal,
    };
};

/**
 * Format price to display with proper decimal places
 */
export const formatPrice = (price: number): string => {
    return price.toFixed(2);
};
