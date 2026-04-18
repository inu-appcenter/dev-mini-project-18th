"use client";
import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/utils/cn";
import AddIcon from "@images/AddIcon.svg";
import Link from "next/link";
import Header from "./Header";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import dayjs from "@constants/dayjs";
import { DateFormat1 } from "@/constants/Date";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());
    const [isRow, setIsRow] = useState(false);
    const [clientH, setClientH] = useState(0);
    const [startY, setStartY] = useState(0);

    let pathname = usePathname();
    if(pathname === "/") {
        pathname = `/read/${dayjs().format(DateFormat1)}/0`;
    }
    let pathnames = pathname.split('/');
    let date = dayjs(pathnames[2]);
    let index = Number(pathnames[3]);
    let dateQuery = date.add(index, "day").format(DateFormat1);

    const onWheel = useCallback((e: WheelEvent) => {
        setIsRow(e.deltaY > 0);
    }, []);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "ArrowDown") setIsRow(true);
        else if (e.key === "ArrowUp") setIsRow(false);
    }, []);

    const onTouchStart = useCallback((e: TouchEvent) => {
        setStartY(e.touches[0].clientY);
    }, []);

    const onTouchEnd = useCallback((e: TouchEvent) => {
        if (e.touches[0]) {
            const currY: number = e.touches[0].clientY;
            const deltaY = currY - startY;
            const criteria = (clientH / 10) * (deltaY > 0 ? 1 : -1);
            if (deltaY !== 0) {
                if (deltaY > 0 && deltaY > criteria) {
                    setIsRow(true);
                } else if (deltaY < criteria) {
                    setIsRow(false);
                }
                setStartY(currY);
            }
        }
    }, []);

    useEffect(() => {
        setClientH(document.body.clientHeight);
        document.addEventListener("wheel", onWheel, { passive: true });
        document.addEventListener("keydown", onKeyDown, { passive: true });
        document.addEventListener("touchstart", onTouchStart, { passive: true });
        document.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            document.removeEventListener("wheel", onWheel);
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("touchstart", onTouchStart);
            document.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    return (
        <Provider client={client}>
            <Header isRow={isRow} />

            <motion.main
                layout
                className="Main mt-6 items-center"
                id="main"
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {children}
            </motion.main>

            <Link
                href={`/add?date=${dateQuery}`}
                className={cn(
                    "fixed right-1 bottom-1 md:right-[calc(35vw+4px)]",
                    "rounded-full bg-(--brand-color) text-white",
                    "cursor-pointer dark:text-(--text-primary)",
                    "z-2 flex aspect-square h-6 items-center justify-center md:h-10",
                )}
                title="할 일 추가"
            >
                <AddIcon className="h-6" />
            </Link>
        </Provider>
    );
}
