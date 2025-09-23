"use client";
import Countdown from "react-countdown";

const endDate = new Date("2025-05-01"); // Set your end date here

const CountDown = () => {
    return (
        <div>
            <Countdown
                date={endDate}
                renderer={({ days, hours, minutes, seconds }) => (
                    <div
                        className="font-bold text-5xl text-yellow-500 italic
                        hover:text-red-500 hover:scale-110 transition duration-300 ease-in-out"
                    >
                        <span>{days} days, </span>
                        <span>{hours} hours, </span>
                        <span>
                            {minutes}:{seconds}
                        </span>
                    </div>
                )}
            />
        </div>
    );
};

export default CountDown;
