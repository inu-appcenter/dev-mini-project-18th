'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSetSelectedDate, useSelectedDate } from '@/store/useTodoStore';

// 상수 설정 (Date 페이지당 날짜 수, 페이지 전환 기준값)
const DAYS_PER_DATE_PAGE = 5;
const SWIPE_THRESHOLD = 80;

// variants: 방향에 따라 들어오고 나가는 위치 결정 (오른쪽으로 이동하면 x: 100%, 왼쪽으로 이동하면 x: -100%)
const variantsItem = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const DateSection = () => {
  const setSelectedDate = useSetSelectedDate();
  const selectedDate = useSelectedDate();

  // Date 페이지 인덱스(시작 페이지), 마지막 이동 방향
  const [datePage, setDatePage] = useState(0);
  const [direction, setDirection] = useState(0); // -1: 왼쪽으로, +1: 오른쪽으로

  // 현재 Date 페이지의 5일치 날짜
  const today = new Date();
  const baseDate = addDays(today, datePage * DAYS_PER_DATE_PAGE);
  const days = Array.from({ length: DAYS_PER_DATE_PAGE }, (_, i) =>
    addDays(baseDate, i)
  );

  // Date 페이지 전환 함수: 방향 설정 후 페이지 업데이트 (페이지 인덱스가 바뀌면 AnimatePresence가 새 motion.div를 렌더링)
  const paginate = (dir: number) => {
    setDirection(dir);
    setDatePage((p) => p + dir);
  };

  return (
    <div className="shadow-custom relative w-full overflow-hidden">
      {/* Date 페이지 전환 과정에서 이전 motin.div와 새 motion.div가 DOM에 동시 존재함 => UX 저해
       mode="popLayout" 사용하면 exit중인 요소를 레이아웃에서 없애줌 */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={datePage}
          custom={direction}
          variants={variantsItem}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 280, damping: 25 } }} // stiffness = 클수록 빨리 도착, damping = 클수록 진동이 적음
          drag="x" // 가로방향 드래그만 허용
          dragConstraints={{ left: 0, right: 0 }} // 드래그 범위 제한 (드래그 해도 위치 고정)
          dragElastic={0.25} // 드래그 탄성 (이 속성으로 인해 드래그 시 약간 따라오면서 스와이프 느낌이 살아남)
          // 드래그가 끝난 후 이동한 거리가 SWIPE_THRESHOLD 이상이면 페이지 전환
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD)
              paginate(1); // 왼쪽으로 끌면 다음 페이지
            else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1); // 오른쪽으로 끌면 이전 페이지
          }}
          className="flex w-full gap-2"
        >
          {days.map((day) => {
            const dayString = format(day, 'yyyy-MM-dd');
            const isSelected = dayString === selectedDate;

            return (
              <div
                key={dayString}
                onClick={() => setSelectedDate(dayString)}
                className={`${
                  isSelected
                    ? 'bg-brand-color text-[#ffffff]'
                    : 'text-text-secondary bg-transparent'
                } flex h-16.5 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-t-lg transition-colors`}
              >
                <span className="font-Medium text-sm">
                  {format(day, 'EEE', { locale: ko })}
                </span>
                <span className="font-SemiBold text-base">
                  {format(day, 'd')}
                </span>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DateSection;
