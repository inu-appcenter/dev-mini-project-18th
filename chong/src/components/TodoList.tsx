"use client";
import { TodoI } from "@/schema/TodoSchema";
import { DivProps } from "@/types/Props";
import { cn } from "@/utils/cn";
import { Line } from "./Line";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import UncheckedBoxIcon from "@images/UncheckedBox.svg";
import CheckedBoxIcon from "@images/CheckedBox.svg";
import WritePencilIcon from "@images/WritePencil.svg";
import XIcon from "@images/X.svg";
import Button from "./Button";
import { useRouter } from "next/navigation";
import ArrowDropUpIcon from "@images/ArrowDropUp.svg";
import ArrowDropDownIcon from "@images/ArrowDropDown.svg";
import { api } from "@/utils/api";
import { useDialog } from "@/store/useDialog";
import { useShallow } from "zustand/shallow";
import { Dialog } from "./Dialog";
import { DateFormat1 } from "@/constants/Date";
import { usePosts } from "@/hooks/usePosts";
import axios from "redaxios";
import clsx from "clsx";

interface TodoListProps extends DivProps {
    date: string;
}

interface TodoItemProps {
    item: TodoI;
    onToggle: (id: number, to: boolean) => void;
    onDelete: (id: number) => void;
}

const TodoItem = memo(({ item, onToggle, onDelete }: TodoItemProps) => {
    const router = useRouter();
    const { id, content, category, dueDate, completed } = item;

    const onEdit = useCallback(() => {
        const url =
            "/modify?" +
            `content=${content}` +
            `&category=${category}` +
            `&date=${dueDate.format(DateFormat1)}` +
            `&completed=${completed}` +
            `&id=${id}`;
        router.push(url);
    }, [id, content, category, dueDate, completed]);

    return (
        <div className="flex h-fit w-full items-center justify-between px-6">
            <div className={cn("relative px-1.5")}>
                <Line className="z-1" />
                <div
                    className={cn(
                        "absolute top-[50%] left-[50%]",
                        "translate-x-[-50%] translate-y-[-50%]",
                        "z-2 aspect-square w-2.25 rounded-full",
                    )}
                    style={{
                        backgroundColor: `var(--${category.toLowerCase()}-task-color)`,
                    }}
                />
            </div>

            <div
                className={cn(
                    "grow px-5 text-2xl font-semibold",
                    completed && "line-through opacity-50",
                )}
            >
                {content}
            </div>

            <div className="flex w-fit gap-2 p-2.5">
                <Button className="h-4 w-4" onClick={() => onToggle(id, !completed)}>
                    {completed ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
                </Button>

                <Button className="h-[12.75px] w-[12.75px]" onClick={onEdit}>
                    <WritePencilIcon />
                </Button>

                <Button className="h-3.5 w-3.5" onClick={() => onDelete(id)}>
                    <XIcon />
                </Button>
            </div>
        </div>
    );
});
TodoItem.displayName = "TodoItem";

export default function TodoList({ date, ...rest }: TodoListProps) {
    //정렬 방향 — false: 최신순(내림차순), true: 오름차순
    const [direction, setDirection] = useState<boolean>(false);

    const actions = useDialog(useShallow((store) => store.actions));

    const { data, isLoading, isError, error, isRefetching } = usePosts(date);

    const showLoading = isLoading || isRefetching;

    //로딩 중일 때만 점 애니메이션
    const [loadingCnt, setLoadingCnt] = useState(1);
    useEffect(() => {
        if (!showLoading) return;
        const timer = setTimeout(() => {
            setLoadingCnt((c) => (c === 3 ? 1 : c + 1));
        }, 300);
        return () => clearTimeout(timer);
    }, [loadingCnt, showLoading]);

    //optimistic update용 local items
    const [items, setItems] = useState<TodoI[]>([]);
    useEffect(() => {
        if (data === undefined) return;
        setItems(data);
    }, [data]);

    //done/todo 분리 및 정렬은 items으로부터 파생
    const { done, todo } = useMemo(() => {
        const n = direction ? 1 : -1;
        const compare = (a: TodoI, b: TodoI) => (a.createdAt.isBefore(b.createdAt) ? 1 : -1) * n;

        const done: TodoI[] = [];
        const todo: TodoI[] = [];
        for (const item of items) {
            (item.completed ? done : todo).push(item);
        }
        done.sort(compare);
        todo.sort(compare);
        return { done, todo };
    }, [items, direction]);

    const changeCompleted = useCallback(async (id: number, to: boolean) => {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, completed: to } : it)));
        const res = await api.patch(`/todos/${id}/completed`, { completed: to });
        console.log(res.status, res.statusText);
    }, []);

    //삭제 확인 대화상자 대상 id
    const [rmId, setRmId] = useState<number | null>(null);

    const requestDelete = useCallback(
        (id: number) => {
            setRmId(id);
            actions.setOpen(true);
        },
        [actions],
    );

    const onRmBtnClick = useCallback(async () => {
        actions.setOpen(false);
        if (rmId === null) return;

        setItems((prev) => prev.filter((it) => it.id !== rmId));
        try {
            await axios.delete(`/api/proxy/todos/${rmId}`);
        } catch (err) {
            console.error("delete api에서 오류남.", err);
        }
    }, [rmId, actions]);

    if (showLoading) {
        return (
            <div className="flex h-fit w-full grow flex-col items-center justify-center">
                <div className="size-fit">로딩 중{".".repeat(loadingCnt)}</div>
            </div>
        );
    }

    if (isError) {
        console.error(error);
        return (
            <div className="flex size-fit grow items-center justify-center">
                서버의 오류로 인해 목록을 불러오지 못했습니다.
                <br />
                나중에 다시 시도하여 주십시오.
            </div>
        );
    }

    const hasItems = done.length > 0 || todo.length > 0;

    return (
        <>
            <Dialog>
                <div className="h-fit w-fit text-center font-semibold">
                    할 일을 삭제하시겠습니까?
                </div>

                <div className="flex h-10 w-full gap-4 text-base">
                    <Button
                        className={cn(
                            "grow rounded-xl bg-[#ff7777] px-6.75 py-3 text-white",
                            "cursor z-103 text-center text-[16px] font-semibold",
                        )}
                        onClick={onRmBtnClick}
                    >
                        삭제
                    </Button>

                    <Button
                        className={cn(
                            "grow rounded-xl px-6.75 py-3",
                            "border border-solid border-(--stroke-primary) text-black",
                            "cursor text-center text-[16px] font-semibold",
                        )}
                        onClick={() => actions.setOpen(false)}
                    >
                        취소
                    </Button>
                </div>
            </Dialog>

            <div
                className={clsx("flex h-fit w-full items-center justify-between px-3", {
                    "mt-2": !hasItems,
                })}
            >
                {hasItems && (
                    <div className="box-content h-fit w-fit pl-4.5">
                        <Line />
                    </div>
                )}

                <div className="ml-auto flex h-fit w-fit">
                    <Button
                        className="flex text-(--text-secondary)"
                        onClick={() => setDirection((d) => !d)}
                    >
                        생성순
                        {direction ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </Button>
                </div>
            </div>

            <div className={cn("flex h-auto w-full grow flex-col items-center", rest.className)}>
                {hasItems ? (
                    <>
                        {todo.map((item) => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                onToggle={changeCompleted}
                                onDelete={requestDelete}
                            />
                        ))}
                        {done.map((item) => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                onToggle={changeCompleted}
                                onDelete={requestDelete}
                            />
                        ))}
                    </>
                ) : (
                    <div className="flex h-full w-full grow items-center justify-center">
                        해당 날짜에 일정이 없습니다.
                    </div>
                )}
            </div>
        </>
    );
}
