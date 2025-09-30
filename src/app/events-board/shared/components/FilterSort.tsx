"use client";

import { useState } from "react";

interface FilterSortProps {
    onPriceFilterChange?: (value: string) => void;
    onSortChange?: (value: string) => void;
    initialPriceFilter?: string;
    initialSortBy?: string;
}

/**
 * Filter and Sort component for events
 */
export const FilterSort = ({
    onPriceFilterChange,
    onSortChange,
    initialPriceFilter = "",
    initialSortBy = "date",
}: FilterSortProps) => {
    const [priceFilter, setPriceFilter] = useState(initialPriceFilter);
    const [sortBy, setSortBy] = useState(initialSortBy);

    const handlePriceFilterChange = (value: string) => {
        setPriceFilter(value);
        onPriceFilterChange?.(value);
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        onSortChange?.(value);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
                <select
                    className="w-full input-premium"
                    value={priceFilter}
                    onChange={(e) => handlePriceFilterChange(e.target.value)}
                >
                    <option value="">All Price Ranges</option>
                    <option value="0-100">$0 - $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500+">$500+</option>
                </select>
            </div>
            <div className="flex-1">
                <select
                    className="w-full input-premium"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="date">Sort by Date</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popularity">Most Popular</option>
                </select>
            </div>
        </div>
    );
};
