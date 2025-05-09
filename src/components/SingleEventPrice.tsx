"use client";

import { useEffect, useState } from "react";

type PriceProps = {
    price: number;
    id: number;
    options?: {
        option: string;
        additionalPrice: number;
    }[];
};

const SingleEventPrice = ({ price, id, options }: PriceProps) => {
    const [total, setTotal] = useState(price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);

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
            quantity *
                (options ? price + options[selected].additionalPrice : price)
        );
    }, [quantity, price, selected, options]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>

            {/* OPTIONS CONTAINER */}
            <div className="flex gap-4">
                {options?.map((option, index) => (
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
                >
                    Add Event
                </button>
            </div>
        </div>
    );
};

export default SingleEventPrice;
