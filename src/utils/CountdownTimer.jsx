import React, { useEffect, useState } from "react";

export const CountdownTimer = () => {
    const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;

    const [secondsLeft, setSecondsLeft] = useState(TWO_HOURS_IN_SECONDS);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) return TWO_HOURS_IN_SECONDS; // Reset on 0
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${h}h : ${m}m : ${s}s`;
    };

    return (
        <p>Sale ends in : <strong>{formatTime(secondsLeft)}</strong></p>
    );
};