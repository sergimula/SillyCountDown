'use client';
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from 'next/image';
import image from './image.jpg'

const localeConfig = {
    locale: 'en-US',
    config: { minimumIntegerDigits: 2, useGrouping: false }
}
const TARGET_TIME = new Date("March 22, 2025 21:30:00");
const MILISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;

const CountDown = () => {
    const { theme, setTheme } = useTheme();
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const isTimeUp = remainingTime !== null && remainingTime <= 0;

    useEffect(() => {
        const interval = setInterval(() => {
            const newCurrentTime = new Date();
            setRemainingTime(TARGET_TIME.getTime() - newCurrentTime.getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (remainingTime === null) return;
        if (remainingTime <= 0) {
            setTheme('party')
        }

    }, [remainingTime, theme, setTheme]);

    if (remainingTime === null) return <div className="flex flex-row content-center gap-1 text-4xl font-bold sm:text-9xl">Loading...</div>;

    if (isTimeUp) {
        return <div className="flex flex-col gap-1 items-center text-4xl font-bold sm:text-9xl text-center">
            <Image src={image} alt="image" className="w-1/2 h-1/2 mb-8" />
            <div>Empiezan las hostias!</div>
        </div>;
    }

    const seconds = Math.floor(remainingTime / MILISECONDS_IN_A_SECOND % SECONDS_IN_A_MINUTE).toLocaleString(localeConfig.locale, localeConfig.config);
    const minutes = Math.floor(remainingTime / (MILISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE) % MINUTES_IN_AN_HOUR).toLocaleString(localeConfig.locale, localeConfig.config);
    const hours = Math.floor(remainingTime / (MILISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR) % HOURS_IN_A_DAY).toLocaleString(localeConfig.locale, localeConfig.config);
    const days = Math.floor(remainingTime / (MILISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY)).toLocaleString(localeConfig.locale, localeConfig.config);

    return (
        <div className="flex flex-row content-center gap-1 text-4xl font-bold sm:text-9xl">
            <div>{days}</div>
            <div>:</div>
            <div>{hours}</div>
            <div>:</div>
            <div>{minutes}</div>
            <div>:</div>
            <div>{seconds}</div>
        </div>
    );
}

export default CountDown;
