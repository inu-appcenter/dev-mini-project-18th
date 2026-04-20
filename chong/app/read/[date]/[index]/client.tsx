"use client";
import TodoList from "@/components/TodoList";
import DateDial from "@/components/DateDial";
import dayjs from "@constants/dayjs";

interface Props {
    date: string;
    index: number;
}

export default function ReadClient({ date, index }: Props) {
    const d = dayjs(date);

    return (
        <>
            <DateDial date={d} index={index} />
            <TodoList date={date} index={index} />
        </>
    );
}
