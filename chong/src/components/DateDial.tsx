"use client";
import { useMemo } from "react";
import dayjs from "@constants/dayjs";
import { DateFormat1, KorDateAry } from "@/constants/Date";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
    date: string;
    index: number;
}

export default function DateDial({ date, index }: Props) {
    const router = useRouter();

    const ary = useMemo(() => {
        let res: dayjs.Dayjs[] = [dayjs(date)];
        for (let i = 1; i < 5; ++i) {
            res[i] = res[0].add(i, "day");
        }

        return res;
    }, [date, index]);

    return (
        <div className="flex h-fit w-full gap-x-2.5 shadow-md p-0">
            {ary.map((d, i) => (
                <div
                    className={clsx(
                        "rounded-t-sm w-[20%] gap-1 aspect-square",
                        "flex flex-col items-center justify-center",
                        index === i ? "bg-(--brand-color)" : "bg-transparent"
                    )}
                    onClick={() => {
                        router.push(`/read/${date}/${i}`);
                    }}
                    key={d.toString()}
                >
                    <div
                        className={clsx(
                            "h-fit w-full text-center text-sm font-medium",
                            index === i ? "text-white" : "text-(--text-secondary)",
                        )}
                    >
                        {KorDateAry[d.day()]}
                    </div>

                    <div
                        className={clsx(
                            "h-fit w-full text-center text-[22px] font-semibold",
                            index === i ? "text-white" : "text-(--text-primary)",
                        )}
                    >
                        {d.date()}
                    </div>
                </div>
            ))}
        </div>
    );
}
