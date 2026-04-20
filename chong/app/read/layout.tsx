"use client";
import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";
import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import AddIcon from "@images/AddIcon.svg";
import Link from "next/link";
import Header from "./Header";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import dayjs from "@constants/dayjs";
import { DateFormat1 } from "@/constants/Date";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());
    const isMobile = useIsMobile();
    const [isRow, setIsRow] = useState<boolean>(false);
    const clientH = useRef<number>(0);
    const startY = useRef<number>(0);
    const isDown = useRef<boolean>(false);

    let pathname = usePathname();
    if (pathname === "/") {
        pathname = `/read/${dayjs().format(DateFormat1)}/4`;
    }
    let pathnames = pathname.split("/");
    let date = dayjs(pathnames[2]);
    let index = Number(pathnames[3]);
    let dateQuery = date.add(index-4, "day").format(DateFormat1);

    const onWheel = useCallback((e: WheelEvent) => {
        setIsRow(e.deltaY > 0);
    }, []);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "ArrowDown") setIsRow(true);
        else if (e.key === "ArrowUp") setIsRow(false);
    }, []);

    const onPointerDown = useCallback((e: PointerEvent) => {
        startY.current = e.clientY;
        isDown.current = true;
    }, []);

    const onPointerCancelOrLeave = useCallback(() => {
        isDown.current = false;
    }, []);

    const onPointerUp = useCallback(
        (e: PointerEvent) => {
            if(!isDown.current) return;

            const currY: number = e.clientY;
            const deltaY = currY - startY.current;
            const criteria = (clientH.current / 9) * (deltaY > 0 ? 1 : -1);
            if (deltaY !== 0) {
                if (deltaY > 0 && deltaY > criteria) {
                    setIsRow(false);
                } else if (deltaY < criteria) {
                    setIsRow(true);
                }
                startY.current = currY;
            }
        },
        [],
    );

    useEffect(() => {
        clientH.current = document.body.clientHeight
        document.addEventListener("wheel", onWheel, { passive: true });
        document.addEventListener("keydown", onKeyDown, { passive: true });
        document.addEventListener("pointerdown", onPointerDown, { passive: true });
        document.addEventListener("pointercancel", onPointerCancelOrLeave, {passive: true});
        document.addEventListener("pointerleave", onPointerCancelOrLeave, {passive: true});
        document.addEventListener("pointerup", onPointerUp, { passive: true });

        return () => {
            document.removeEventListener("wheel", onWheel);
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("pointercancel", onPointerCancelOrLeave);
            document.removeEventListener("pointerleave", onPointerCancelOrLeave);
            document.removeEventListener("pointerup", onPointerUp);
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
                    "fixed right-1 bottom-1 md:right-[calc(35vw+6px)] md:bottom-1.5",
                    "rounded-full bg-(--brand-color) text-white",
                    "cursor-pointer dark:text-(--text-primary)",
                    "z-2 flex size-fit items-center justify-center p-1.5 box-content",
                )}
                title="할 일 추가"
            >
                <AddIcon {... isMobile ? {width: 28, height: 28} : {width: 30, height: 30}} />
            </Link>
        </Provider>
    );
}
