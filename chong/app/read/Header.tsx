"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useShallow } from "zustand/shallow";
import { KorDateAry } from "@/constants/Date";
import clsx from "clsx";

interface HeaderProps {
    isRow: boolean;
}

export default function Header({ isRow }: HeaderProps) {
    const [today, setToday] = useState(dayjs());

    //자정 지나면 today 갱신 + store 재정렬
    useEffect(() => {
        const restTime = today.add(1, "day").startOf("date").diff(today);
        const timer = setTimeout(() => {
            const newToday = dayjs();
            setToday(newToday);
        }, restTime);
        return () => clearTimeout(timer);
    }, [today]);

    return (
        <motion.header
            layout
            className={clsx(
                "flex h-auto w-auto items-center pt-4",
                isRow ? "flex-row gap-1.5" : "flex-col",
            )}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {!isRow && (
                <motion.div
                    key="hello"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="text-2xl font-normal text-(--text-secondary)"
                >
                    Hello!
                </motion.div>
            )}

            <motion.div
                layout
                className="text-6xl font-bold text-(--brand-color)"
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {today.date()}
            </motion.div>

            <motion.div
                layout
                className="text-[20px] font-semibold text-(--brand-color)"
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {KorDateAry[today.day()]}요일
            </motion.div>

            {!isRow && (
                <motion.div
                    key="yearmonth"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="text-sm font-normal text-(--text-secondary)"
                >
                    {today.format("YYYY년 MM월")}
                </motion.div>
            )}
        </motion.header>
    );
}
