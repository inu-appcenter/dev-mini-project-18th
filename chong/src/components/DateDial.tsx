"use client";
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import dayjs from "@constants/dayjs";
import { DateFormat1, KorDateAry } from "@/constants/Date";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
    date: dayjs.Dayjs;
    index: number;
}

// 총 13개. 앞에서 5번째(index 4)가 기준 날짜가 되도록 배치한다.
// [-4, -3, -2, -1, date, +1, +2, +3, +4, +5, +6, +7, +8]
const ARY_LEN = 13;
const VISIBLE_COUNT = 5; // 한 화면에 보이는 칸 수
const ANCHOR_INDEX = 4; // 왼쪽 첫 칸으로 보여야 하는 ary index (5번째 요소)
const CLICK_THRESHOLD_PX = 5; // click으로 간주할 최대 이동량(px)
const SETTLE_MS = 220;

function initialAry(date: dayjs.Dayjs): dayjs.Dayjs[] {
    const res: dayjs.Dayjs[] = [];
    for (let i = 0; i < ARY_LEN; ++i) {
        res[i] = date.add(i - ANCHOR_INDEX, "day");
    }
    return res;
}

interface DateCellProps {
    day: dayjs.Dayjs;
    selected: boolean;
}

const DateCell = memo(
    ({ day, selected }: DateCellProps) => {
        return (
            <div
                className={clsx(
                    "aspect-square w-[20%] shrink-0 gap-1 rounded-t-sm",
                    "flex cursor-pointer flex-col items-center justify-center",
                    selected ? "bg-(--brand-color)" : "bg-transparent",
                )}
            >
                <div
                    className={clsx(
                        "h-fit w-full cursor-pointer text-center text-sm font-medium select-none",
                        selected ? "text-white" : "text-(--text-secondary)",
                    )}
                >
                    {KorDateAry[day.day()]}
                </div>

                <div
                    className={clsx(
                        "h-fit w-full cursor-pointer text-center text-[22px] font-semibold select-none",
                        selected ? "text-white" : "text-(--text-primary)",
                    )}
                >
                    {day.date()}
                </div>
            </div>
        );
    },
    (prev, next) => prev.selected === next.selected && prev.day.isSame(next.day, "day"),
);
DateCell.displayName = "DateCell";

export default function DateDial({ date, index }: Props) {
    const router = useRouter();

    const [ary, setAry] = useState<dayjs.Dayjs[]>(() => initialAry(date));
    // settle/클릭 핸들러가 항상 최신 ary를 볼 수 있도록 ref로도 보관
    const aryRef = useRef<dayjs.Dayjs[]>(ary);
    aryRef.current = ary;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const startX = useRef<number>(0);
    const isDown = useRef<boolean>(false);
    // pointer down 이후 누적 이동량(px). 임계값 미만이면 click으로 간주한다.
    const moveDistance = useRef<number>(0);
    // ary가 shift된 누적 칸 수. 시각적 이동에서 보정할 때 사용
    const shiftedRef = useRef<number>(0);
    const indexRef = useRef(index);
    indexRef.current = index;

    // itemWidth / anchorScrollLeft를 매 pointer move마다 읽으면 clientWidth 접근으로
    // 레이아웃이 강제 발생(reflow). pointerDown, resize, mount 시점에만 측정해 캐시
    const itemWidthRef = useRef<number>(0);
    const anchorScrollLeftRef = useRef<number>(0);

    // rAF 기반 delta 누적. 여러 pointer move 이벤트를 1프레임에 묶어 처리.
    const pendingDxRef = useRef<number>(0);
    const rafIdRef = useRef<number | null>(null);

    // settle에서 사용하는 setTimeout id. unmount 시 정리.
    const settleTimerRef = useRef<number | null>(null);

    const measure = useCallback((el: HTMLElement) => {
        const w = el.clientWidth / VISIBLE_COUNT;
        itemWidthRef.current = w;
        anchorScrollLeftRef.current = w * ANCHOR_INDEX;
    }, []);

    // 초기 렌더 시 5번째 요소가 맨 왼쪽에 보이도록 scroll 위치 설정.
    // paint 이전에 동기적으로 설정해야 깜빡임이 없어서 useLayoutEffect 사용.
    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        measure(el);
        el.scrollLeft = anchorScrollLeftRef.current;
    }, [measure]);

    // ary가 변하면 scrollLeft를 변경
    //paint 전에 scrollLeft를 변경해야하므로 useLayoutEffect 사용
    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el || shiftedRef.current === 0) return;
        el.scrollLeft -= shiftedRef.current * itemWidthRef.current;
        shiftedRef.current = 0;
    }, [ary]);

    // drag 도중 scrollLeft가 한 칸 이상 벗어나면 ary를 그만큼 shift하고
    // 동시에 scrollLeft도 보정해서 무한 스크롤 기능 구현
    const normalizeDuringDrag = useCallback((el: HTMLElement) => {
        const itemWidth = itemWidthRef.current;
        const anchor = anchorScrollLeftRef.current;
        const diff = el.scrollLeft - anchor;
        // 한 칸 이상 벗어난 "칸 수"만큼 ary를 미리 당겨둔다.
        const steps = diff > 0 ? Math.floor(diff / itemWidth) : Math.ceil(diff / itemWidth);
        if (steps === 0) return;

        const prev = aryRef.current;
        const next = prev.map((d) => d.add(steps, "day"));
        aryRef.current = next;
        setAry(next);
        // 시각적으로 튀지 않도록 scrollLeft도 즉시 역보정
        el.scrollLeft -= steps * itemWidth;
        // useLayoutEffect에서의 추가 보정은 필요 없으므로 0 유지
        shiftedRef.current = 0;
    }, []);

    // pointer up/cancel/leave 시 anchor 위치로 snap한다.
    // - 반 칸 미만이면 현재 anchor(원래 위치)로 복귀
    // - 반 칸 이상이면 다음 칸으로 이동 + ary도 한 칸 shift하여 다시 anchor에 맞추기
    const settle = useCallback(
        (el: HTMLElement) => {
            const itemWidth = itemWidthRef.current;
            const anchor = anchorScrollLeftRef.current;
            const diff = el.scrollLeft - anchor;
            const curIndex = indexRef.current;

            if (Math.abs(diff) < itemWidth / 2) {
                // 원래 위치로 부드럽게 복귀
                el.scrollTo({ left: anchor, behavior: "smooth" });
                router.push(
                    `/read/${aryRef.current[ANCHOR_INDEX].format(DateFormat1)}/${curIndex}`,
                );
                return;
            }

            const dir = diff > 0 ? 1 : -1;
            const target = anchor + dir * itemWidth;

            // 1) 먼저 "다음 칸이 왼쪽 끝에 오도록" 부드럽게 스크롤
            el.scrollTo({ left: target, behavior: "smooth" });

            // 2) smooth scroll이 어느 정도 진행된 뒤 ary를 한 칸 shift하고
            //    scrollLeft를 anchor로 되돌려 시각적 점프 없이 상태를 정규화한다.
            //    (useLayoutEffect의 shiftedRef 보정이 이 되돌림을 처리한다.)
            settleTimerRef.current = window.setTimeout(() => {
                settleTimerRef.current = null;
                shiftedRef.current = dir;
                const prev = aryRef.current;
                const next = prev.map((d) => d.add(dir, "day"));
                aryRef.current = next;
                setAry(next);
                router.push(`/read/${next[ANCHOR_INDEX].format(DateFormat1)}/${curIndex}`);
            }, SETTLE_MS);
        },
        [router],
    );

    // 누적된 포인터 이동량을 1프레임에 한번 스크롤에 반영.
    const flushPointerMove = useCallback(() => {
        rafIdRef.current = null;
        const el = containerRef.current;
        const dx = pendingDxRef.current;
        pendingDxRef.current = 0;
        if (!el || dx === 0) return;
        el.scrollLeft -= dx;
        normalizeDuringDrag(el);
    }, [normalizeDuringDrag]);

    // 창 크기가 바뀌면 itemWidth가 바뀌므로 anchor 재설정
    useEffect(() => {
        const handle = () => {
            const el = containerRef.current;
            if (!el) return;
            measure(el);
            el.scrollLeft = anchorScrollLeftRef.current;
        };
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, [measure]);

    // unmount 시 대기중인 timer / rAF 정리
    useEffect(() => {
        return () => {
            if (settleTimerRef.current !== null) {
                window.clearTimeout(settleTimerRef.current);
                settleTimerRef.current = null;
            }
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, []);

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const el = e.currentTarget;
            isDown.current = true;
            startX.current = e.clientX;
            moveDistance.current = 0;
            // drag 시작 시점에 1번만 레이아웃 측정.
            measure(el);
            el.setPointerCapture(e.pointerId);
        },
        [measure],
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!isDown.current) return;
            const dx = e.clientX - startX.current;
            startX.current = e.clientX;
            moveDistance.current += Math.abs(dx);
            pendingDxRef.current += dx;
            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(flushPointerMove);
            }
        },
        [flushPointerMove],
    );

    const onPointerUp = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!isDown.current) return;
            isDown.current = false;
            const el = e.currentTarget;

            // 대기중인 rAF가 있으면 즉시 반영하여 settle이 최신 scrollLeft를 기준으로 동작하도록 함.
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
                const dx = pendingDxRef.current;
                pendingDxRef.current = 0;
                if (dx !== 0) {
                    el.scrollLeft -= dx;
                    normalizeDuringDrag(el);
                }
            }

            // 거의 움직이지 않았다면 클릭으로 간주하여 해당 칸으로 이동
            if (moveDistance.current < CLICK_THRESHOLD_PX) {
                const rect = el.getBoundingClientRect();
                const itemWidth = itemWidthRef.current;
                const clickedVisible = Math.floor((e.clientX - rect.left) / itemWidth);
                const clickedAryIndex = ANCHOR_INDEX + clickedVisible;
                const curAry = aryRef.current;
                const d = curAry[clickedAryIndex];
                if (d) {
                    router.push(
                        `/read/${curAry[ANCHOR_INDEX].format(DateFormat1)}/${clickedAryIndex}`,
                    );
                }
                return;
            }
            settle(el);
        },
        [normalizeDuringDrag, router, settle],
    );

    const onPointerCancelOrLeave = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!isDown.current) return;
            isDown.current = false;
            const el = e.currentTarget;

            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
                const dx = pendingDxRef.current;
                pendingDxRef.current = 0;
                if (dx !== 0) {
                    el.scrollLeft -= dx;
                    normalizeDuringDrag(el);
                }
            }

            settle(el);
        },
        [normalizeDuringDrag, settle],
    );

    // clsx 결과는 props에 의존하지 않으므로 1회만 계산.
    const containerClassName = useMemo(
        () =>
            clsx(
                "scrollbar-hide flex h-fit w-full p-0 shadow-md",
                "scroll-p-0 overflow-x-scroll",
                "outline-0 focus:outline-0 active:outline-0 ",
            ),
        [],
    );

    return (
        <div
            ref={containerRef}
            className={containerClassName}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerCancelOrLeave}
            onPointerCancel={onPointerCancelOrLeave}
        >
            {ary.map((d, i) => (
                <DateCell key={d.toString()} day={d} selected={index === i} />
            ))}
        </div>
    );
}
