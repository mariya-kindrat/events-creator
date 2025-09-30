import Image from "next/image";
import React, { useState } from "react";
import { CartItemProps } from "../types";
import { handleItemRemoval } from "../utils";

export const CartItem: React.FC<CartItemProps> = ({ event, onRemove }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await handleItemRemoval(event, onRemove);
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <div
            className={`group p-6 rounded-2xl glass border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 ${
                isRemoving ? "opacity-50 scale-95" : ""
            }`}
        >
            <div className="flex items-start space-x-6">
                {/* Event Image */}
                <div className="flex-shrink-0 relative overflow-hidden rounded-xl">
                    {event.image && (
                        <Image
                            src={event.image}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            width={120}
                            height={120}
                            alt={event.title}
                        />
                    )}

                    {/* Quantity Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {event.quantity}
                    </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-colors duration-300">
                                {event.title}
                            </h3>

                            {event.optionsTitle && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full glass border border-slate-700/50 text-sm text-slate-300 mb-3">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                    {event.optionsTitle}
                                </div>
                            )}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Remove from cart"
                        >
                            {isRemoving ? (
                                <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Price and Quantity Info */}
                    <div className="flex items-center justify-between">
                        <div className="text-slate-400 text-sm">
                            Quantity:{" "}
                            <span className="text-white font-medium">
                                {event.quantity}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-gradient-primary">
                            ${event.price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
