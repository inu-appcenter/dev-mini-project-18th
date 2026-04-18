"use client";
import Button from "@/components/Button";
import { Suspense, useEffect, useState } from "react";
import ArrowBackIcon from "@images/ArrowBack.svg";
import Head from "next/head";
import clsx from "clsx";
import { DatePicker } from "@/components/DatePicker";
import CheckIcon from "@images/CheckIcon.svg";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Field } from "@/components/Field";
import { api } from "@/utils/api";
import { DateFormat1 } from "@/constants/Date";
import { TodoRawSchema } from "@/schema/TodoSchema";

interface CategoryI {
    value: string;
    text: string;
}

type CategoryT = "IMPORTANT" | "MEETING" | "STUDY";

const CategoryToIndex: Record<CategoryT, number> = {
    IMPORTANT: 0,
    MEETING: 1,
    STUDY: 2,
};

export default function Modify() {
    return (
        <Suspense>
            <ModifyInner />
        </Suspense>
    );
}

function ModifyInner() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const contentParams = searchParams.get("content");
    const dateParams = dayjs(searchParams.get("date"), DateFormat1, true);
    const categoryParams = searchParams.get("category");
    const completed = searchParams.get("completed");
    const id = searchParams.get("id");

    useEffect(() => {
        if (
            !contentParams ||
            !dateParams ||
            !dateParams.isValid() ||
            !categoryParams ||
            completed === undefined ||
            !id
        ) {
            router.push("/");
        }
    }, []);

    const [content, setContent] = useState<string>(contentParams as string);
    const [date, setDate] = useState<dayjs.Dayjs>(dateParams);
    const [category, setCategory] = useState(categoryParams as string);
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
    const [index, setIndex] = useState<number>(CategoryToIndex[categoryParams as CategoryT]);
    const [step, setStep] = useState<boolean>(false);

    useEffect(() => {
        if (content !== "" && date && category !== "") setStep(true);
        else setStep(false);
    }, [content, date, category]);

    return (
        <>
            <Head>
                <title>할 일 수정 - {content}</title>
            </Head>

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

                            const res = await api.patch(`/todos/${id}`, {
                                content,
                                dueDate: date,
                                category,
                                completed,
                            });

                            const data = TodoRawSchema.safeDecode(res.data);
                            if (res.status !== 200) {
                                console.log("status : ", res.status);
                                console.log("statusText : ", res.statusText);
                                console.error("Res의 status가 200이 아님.\n", res);
                            } else if (!data.success) {
                                console.error("dto가 다름.\n", data);
                                console.log(data.error.issues);
                            } else router.back();
                        }}
                    >
                        확인
                    </Button>
                </div>
            </main>
        </>
    );
}
