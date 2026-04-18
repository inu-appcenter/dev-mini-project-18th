"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@images/ArrowBack.svg";
import clsx from "clsx";
import { DatePicker } from "@/components/DatePicker";
import CheckIcon from "@images/CheckIcon.svg";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Field } from "@/components/Field";
import { api } from "@/utils/api";
import { TodoRawSchema } from "@/schema/TodoSchema";
import { DateFormat1 } from "@/constants/Date";

interface CategoryI {
    value: string;
    text: string;
}

export default function AddClient() {
    const [content, setContent] = useState<string>("");
    const [date, setDate] = useState<dayjs.Dayjs>();
    const [category, setCategory] = useState("");
    const CategoryAry: CategoryI[] = [
        {
            value: "IMPORTANT",
            text: "중요한 일",
        },
        {
            value: "MEETING",
            text: "회의",
        },
        {
            value: "STUDY",
            text: "스터디",
        },
    ];
    const [index, setIndex] = useState<number | undefined>();
    const [step, setStep] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (content !== "" && date && category !== "") setStep(true);
        else setStep(false);
    }, [content, date, category]);

    const searchParams = useSearchParams();
    useEffect(() => {
        const dateParams = searchParams.get("date");
        if(dateParams) {
            const d = dayjs(dateParams, DateFormat1, true);
            if(d.isValid()) setDate(d);
        }
    }, [])

    return (
        <>
            <header className="flex w-full items-center px-3 py-6 shadow-md">
                <Button
                    className="flex h-6 w-6 items-center justify-center p-0 hover:bg-[rgba(129,139,152,0.15)]"
                    onClick={() => {
                        router.back();
                    }}
                >
                    <ArrowBackIcon />
                </Button>
                <div className="text-xl font-semibold whitespace-nowrap">할 일 추가</div>
            </header>

            <main className="Main mt-6 items-start px-8">
                <Field
                    LabelProps={{
                        className: "text-xl font-semibold",
                    }}
                    Label="할 일 내용"
                    InputProps={{
                        placeholder: "할 일을 입력해주세요.",
                        className: clsx(
                            "text-md boder-solid mt-1 h-8 border border-(--stroke-primary)",
                            "rounded-md p-2",
                        ),
                        value: content,
                        onChange: (e) => setContent(e.target.value),
                    }}
                />

                <div className="mt-12 mb-1 text-xl font-semibold">날짜</div>
                <DatePicker
                    onChange={(d) => {
                        setDate(d);
                    }}
                    InputProps={{
                        defaultValue: date ? date.format("YYYY년 MM월 DD일") : undefined
                    }}
                />

                <div className="mt-12 text-xl font-semibold">카테고리</div>

                <div className="mt-1 flex flex-row gap-2">
                    {CategoryAry.map(({ value, text }, i) => (
                        <Button
                            className={clsx(
                                "border border-solid border-(--stroke-primary) font-normal",
                                "flex items-center justify-center rounded-xl border border-solid px-2",
                                "gap-0.5 focus:border-(--stroke-primary)",
                                {
                                    "border-0 text-white": index !== undefined && index === i,
                                },
                            )}
                            style={
                                index !== undefined && index === i
                                    ? {
                                          backgroundColor: `var(--${value.toLowerCase()}-task-color)`,
                                      }
                                    : undefined
                            }
                            onClick={() => {
                                setCategory(value);
                                setIndex(i);
                            }}
                            key={i}
                        >
                            {index !== undefined && index === i && <CheckIcon />}
                            {text}
                        </Button>
                    ))}
                </div>

                <div className="mt-8 ml-auto flex gap-3">
                    <Button
                        className={clsx(
                            "rounded-md border border-solid border-(--stroke-color)",
                            "px-2 font-semibold text-(--text-secondary)",
                        )}
                        onClick={() => {
                            router.back();
                        }}
                    >
                        취소
                    </Button>

                    <Button
                        className={clsx(
                            "rounded-md bg-(--brand-color) text-white",
                            "px-2 font-semibold",
                            {
                                "opacity-50": !step,
                            },
                        )}
                        onClick={async () => {
                            if (!step) return;
                            if(!content || !category || !date) return;

                            try {
                                const res = await api.post("/todos", {
                                    content,
                                    category,
                                    dueDate: date.format(DateFormat1),
                                });

                                if (res.status !== 201) {
                                    console.log("status : ", res.status);
                                    console.log("statusText : ", res.statusText);
                                    throw new Error("res의 status가 200이 아님.");
                                }

                                console.log(res.data);
                                const data = TodoRawSchema.safeDecode(res.data);
                                if (!data.success) {
                                    console.log(data.error.issues);
                                    throw new Error("response dto가 다름.");
                                }

                                router.back();
                            } catch (err) {
                                console.error("post api에서 에러남.\n", err);
                            }
                        }}
                    >
                        추가
                    </Button>
                </div>
            </main>
        </>
    );
}
