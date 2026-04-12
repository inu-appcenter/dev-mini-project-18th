"use client";
import {
    ButtonProps,
    DivProps,
    TableProps,
    TdProps,
    TheadProps,
    ThProps,
    TrProps,
} from "@/types/Props";
import Button from "./Button";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { KorDateAry } from "@constants/Date";
import CalenderIcon from "@images/Calender.svg";
import ArrowForwardIcon from "@images/ArrowForward.svg";
import ArrowBackIcon from "@images/ArrowBack.svg";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export interface DatePickerProps extends Omit<DivProps, "defaultValue" | "onChange"> {
    ControlProps?: DivProps;
    ShowerProps?: DivProps;
    TrgProps?: ButtonProps;
    TableProps?: TableProps;
    TableHeadProps?: TheadProps;
    TableHeadRowProps?: TrProps;
    TableThProps?: ThProps;
    TableRowProps?: TrProps;
    TableDataProps?: TdProps;
    defaultOpen?: boolean;
    defaultValue?: dayjs.Dayjs;
    onChange?: (value: dayjs.Dayjs) => void;
    format?: "YYYY" | `YYYY${string}MM` | `YYYY${string}MM${string}DD`;
}

interface ContentI {
    prev: number[];
    curr: number[];
    next: number[];
}

export function DatePicker({
    ControlProps,
    ShowerProps,
    TrgProps,
    TableProps,
    TableHeadProps,
    TableHeadRowProps,
    TableThProps,
    TableRowProps,
    TableDataProps,
    defaultOpen,
    defaultValue,
    onChange,
    format,
    ...rest
}: DatePickerProps) {
    //locale을 ko로 설정
    dayjs.locale("ko");

    //Positioner의 열림 여부를 제어하는 state
    const [mounted, setMounted] = useState<boolean>(defaultOpen ?? false);
    const [value, setValue] = useState<dayjs.Dayjs>(defaultValue ?? dayjs().locale("ko")); //현재 날짜
    const [view, setView] = useState<dayjs.Dayjs>(value);
    const inputRef = useRef<HTMLInputElement>(null);

    //onChange 설정
    useEffect(() => {
        onChange?.(value);
    }, [value]);

    //dialog가 열리고 닫힐때 마다 view를 value(현재 날짜)로 설정
    useEffect(() => {
        setView(value);
    }, [mounted]);

    //content
    const [content, setContent] = useState<ContentI>({
        prev: [],
        curr: Array.from({ length: view.daysInMonth() }, (_, i) => i + 1),
        next: [],
    });

    //view가 업데이트 될때마다 content도 업데이트
    useEffect(() => {
        setContent((ct) => {
            let prev: number[] = [];
            const CurrDay = view.startOf("month").day();
            const PrevDate = view
                .subtract(1, "month")
                .endOf("month")
                .subtract(CurrDay, "day")
                .date();
            for (let i = 0; i < CurrDay; ++i) {
                prev[i] = PrevDate + i;
            }

            //보여줘야될 curr의 날짜의 개수가 현재 curr보다 많다면 추가
            if (view.daysInMonth() > ct.curr.length) {
                for (let i = content.curr[-1] + 1; i <= view.daysInMonth(); ++i) {
                    ct.curr[i - 1] = i;
                }
            } else if (view.daysInMonth() < ct.curr.length) {
                //적다면 기존 배열에서 재활용
                ct.curr = ct.curr.slice(0, view.daysInMonth());
            }

            let next: number[] = [];
            const LastDay = view.endOf("month").day();
            for (let i = 0; i < 6 - LastDay; ++i) {
                next[i] = i + 1;
            }

            return {
                prev,
                next,
                curr: ct.curr,
            };
        });
    }, [view]);

    //content안의 div들이 click될때 실행할 함수
    const setValueWhenClick = useCallback((d: dayjs.Dayjs) => {
        setValue(d);
        setMounted(false);
        const input = inputRef.current;
        if (!input) return;
        input.value = d.format("YYYY년 MM월 DD일");
    }, []);

    return (
        <div
            {...rest}
            className={twMerge("relative flex h-auto w-full max-w-full flex-col", rest.className)}
            data-scope="date-picker"
            data-part="root"
        >
            <div
                {...ControlProps}
                className={twMerge(
                    "relative flex h-auto max-h-full w-full max-w-full items-center rounded-sm",
                    ControlProps?.className,
                )}
                data-scope="date-picker"
                data-part="control"
            >
                <div
                    {...ShowerProps}
                    className={twMerge(
                        "flex h-8 max-h-full w-full max-w-full items-center justify-start p-2",
                        "appearance-none rounded-sm border border-solid border-(--stroke-primary)",
                        "text-sm text-(--fg-primary)",
                        "focus-within:border-black",
                        ShowerProps?.className,
                    )}
                    data-scope="date-picker"
                    data-part="shower"
                >
                    <input
                        type="text"
                        inputMode="numeric"
                        onFocus={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replaceAll(/[\D]/g, "");
                        }}
                        onBeforeInput={(e) => {
                            if (!/[0-9]/.test(e.data) || e.currentTarget.value.length > 8) {
                                e.preventDefault();
                            }
                        }}
                        onBlur={(e) => {
                            let tmp = dayjs(e.target.value);
                            if (!tmp.isValid()) tmp = dayjs();
                            setValue(tmp);
                            e.target.value = tmp.format("YYYY년 MM월 DD일");
                        }}
                        placeholder="연도. 월. 일"
                        className={clsx(
                            "h-8 border-0 text-base w-full",
                            "z-1 focus:border-0 focus:outline-0",
                        )}
                        ref={inputRef}
                    />
                    <div className="absolute top-0 right-2 flex h-full w-6 items-center justify-center">
                        <Button
                            className={clsx(
                                "relative z-2 h-6 w-6 rounded-sm p-[0.175rem]",
                                "hover-bg",
                            )}
                            onClick={() => {
                                setMounted((m) => !m);
                            }}
                            tabIndex={-1}
                        >
                            <CalenderIcon />
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mounted && (
                    <motion.div
                        className={twMerge(
                            "absolute h-auto w-[90%]",
                            "flex flex-col items-center",
                            "border border-solid border-(--stroke-primary)",
                            "top-10 left-[50%] z-3 translate-x-[-50%] rounded-sm bg-(--bg-color) p-2",
                        )}
                        data-scope="date-picker"
                        data-part="positioner"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 5, opacity: 0 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="z-3 flex w-full max-w-full justify-between px-2">
                            <Button
                                className={clsx(
                                    "hover-bg aspect-square h-6",
                                    "flex items-center justify-center",
                                )}
                                onClick={() => setView((v) => v.subtract(1, "month"))}
                            >
                                <ArrowBackIcon />
                            </Button>
                            <div>{view.format(format ?? "YYYY년 MM월")}</div>

                            <Button
                                className={clsx(
                                    "hover-bg aspect-square h-6",
                                    "flex items-center justify-center",
                                )}
                                onClick={() => setView((v) => v.add(1, "month"))}
                            >
                                <ArrowForwardIcon />
                            </Button>
                        </div>

                        <div className="mt-2 mb-1 grid w-full grid-cols-7">
                            {KorDateAry.map((v) => (
                                <div className="flex items-center justify-center">{v}</div>
                            ))}
                        </div>

                        <div className="grid w-full grid-cols-7">
                            {content.prev.map((d) => (
                                <div
                                    className={clsx(
                                        "hover-bg flex aspect-square items-center justify-center",
                                        "opacity-50",
                                    )}
                                    onClick={() => {
                                        setValueWhenClick(view.subtract(1, "month").set("date", d));
                                    }}
                                >
                                    {d}
                                </div>
                            ))}

                            {content.curr.map((d) => (
                                <div
                                    className="hover-bg flex aspect-square items-center justify-center"
                                    onClick={() => {
                                        setValueWhenClick(view.set("date", d));
                                    }}
                                >
                                    {d}
                                </div>
                            ))}

                            {content.next.map((d) => (
                                <div
                                    className={clsx(
                                        "hover-bg flex aspect-square items-center justify-center",
                                        "opacity-50",
                                    )}
                                    onClick={() => {
                                        setValueWhenClick(view.add(1, "month").set("date", d));
                                    }}
                                >
                                    {d}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
