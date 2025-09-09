"use client";

import { EventType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleEventPrice = ({ event }: { event: EventType }) => {
    const [total, setTotal] = useState(event.price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);

    const { addToCart } = useCartStore();

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

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
            image: event.image,
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

            {/* QUANTITY CONTAINER */}
            <div className="flex justify-between items-center gap-1">
                <div className=" flex justify-between w-full p-2 ring-1 ring-blue-400 rounded-md bg-gray-200">
                    <span className="">Quantity</span>
                    <div className="flex gap-4 items-center">
                        <button
                            className="cursor-pointer"
                            onClick={() => handleQuantityChange("decrement")}
                        >
                            ➖
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="cursor-pointer"
                            onClick={() => handleQuantityChange("increment")}
                        >
                            ➕
                        </button>
                    </div>
                </div>

                {/* CART BUTTON */}
                <button
                    className="uppercase w-46 bg-blue-400 text-white p-2 ring-1 ring-blue-800 rounded-md hover:scale-105
                hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
                    onClick={handleAddToCart}
                >
                    Add Event
                </button>
            </div>
        </div>
    );
};

export default SingleEventPrice;
