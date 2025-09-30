"use client";

import { useHydration } from "@/hooks/useHydration";
import { EventType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleEventPrice = ({ event }: { event: EventType }) => {
    const [total, setTotal] = useState(event.price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);
    const isHydrated = useHydration();

    const { addToCart } = useCartStore();

    const handleQuantityChange = (operation: "increment" | "decrement") => {
        if (operation === "increment") {
            setQuantity((prev) => prev + 1);
        } else if (operation === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleSelected = (index: number) => {
        setSelected(index);
    };

    useEffect(() => {
        setTotal(
            event.options?.length
                ? quantity *
                (Number(event.price) +
                    Number(event.options[selected].additionalPrice))
                : quantity * event.price
        );
    }, [quantity, selected, event]);

    const handleAddToCart = () => {
        addToCart({
            id: String(event.id), // cart expects string id
            title: event.title,
            image:
                event.images && event.images.length > 0
                    ? event.images[0]
                    : "",
            price: total,
            ...(event.options?.length && {
                optionsTitle: event.options?.[selected].option,
            }),
            quantity: quantity,
        });
        toast.success(`${event.title} event has been added to your cart!`);
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h2 className="text-2xl font-bold">${total}</h2>

            {/* OPTIONS CONTAINER */}
            <div className="flex gap-4">
                {event.options?.length &&
                    event.options?.map((option, index) => (
                        <button
                            className="p-2 ring-1 ring-blue-400 rounded-md hover:scale-115 hover:bg-blue-300 
                                    hover:font-bold hover:text-blue-900 transition-all duration-300 ease-in-out"
                            key={option.option}
                            style={{
                                backgroundColor:
                                    selected === index ? "#3b82f6" : "#e5e7eb",
                                color: selected === index ? "#fff" : "#3b82f6",
                            }}
                            onClick={() => handleSelected(index)}
                        >
                            {option.option}
                        </button>
                    ))}
            </div>

            {/* QUANTITY AND CART CONTAINER */}
            <div className="flex gap-3 w-full items-stretch">
                {/* QUANTITY SECTION - 2/3 width */}
                <div className="flex-[2] flex justify-between items-center px-4 py-3 ring-1 ring-blue-400 rounded-xl bg-gray-200 h-14">
                    <span className="text-gray-700 font-medium">Quantity</span>
                    <div className="flex gap-3 items-center">
                        <button
                            className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 
                                     text-white rounded-full cursor-pointer transition-all duration-200 
                                     hover:scale-110 active:scale-95 shadow-md"
                            onClick={() => handleQuantityChange("decrement")}
                            disabled={quantity <= 1}
                        >
                            <span className="text-lg font-bold">−</span>
                        </button>
                        <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                            {quantity}
                        </span>
                        <button
                            className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 
                                     text-white rounded-full cursor-pointer transition-all duration-200 
                                     hover:scale-110 active:scale-95 shadow-md"
                            onClick={() => handleQuantityChange("increment")}
                        >
                            <span className="text-lg font-bold">+</span>
                        </button>
                    </div>
                </div>

                {/* CART BUTTON - 1/3 width */}
                <button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                             text-white font-bold px-4 rounded-xl shadow-lg hover:shadow-xl 
                             transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                             uppercase tracking-wide text-sm h-14"
                    onClick={handleAddToCart}
                >
                    Add Event
                </button>
            </div>
        </div>
    );
};

export default SingleEventPrice;
