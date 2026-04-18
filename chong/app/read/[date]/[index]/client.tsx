"use client";
import TodoList from "@/components/TodoList";
import DateDial from "@/components/DateDial";

interface Props {
    date: string;
    index: number;
}

export default function ReadClient({ date, index }: Props) {
    return (
        <>
            <DateDial date={date} index={index} />
            <TodoList date={date} index={index} />
        </>
    );
}
