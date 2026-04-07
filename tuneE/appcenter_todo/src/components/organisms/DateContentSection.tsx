'use client';
import { format } from 'date-fns';
import { color } from '@/types/color';
// AnimatePresence는 렌더링 부하가 큼
// framer-motion 에서 motion/react로 변경됨 (용량최적화, 구조분리)
import { motion, Transition } from 'motion/react';
import { useTodoStore } from '@/store/useTodoStore';
import DateContentDirection from '../atoms/DateContentDirection';

interface DateContentSectionProps {
  isScrolled: boolean;
}

const DateContentSection = ({ isScrolled }: DateContentSectionProps) => {
  const today = new Date();
  const dateText = format(today, 'd');
  const dayText = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  const yearMonthText = format(today, 'yyyy년 M월');
  const smoothTransition: Transition = { duration: 0.35, ease: 'easeInOut' };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : 32,
          opacity: isScrolled ? 0 : 1,
          marginBottom: isScrolled ? 0 : 4,
        }}
        transition={smoothTransition}
        className="flex justify-center overflow-hidden"
      >
        <p className="text-text-secondary font-Regular whitespace-nowrap">
          Hello!
        </p>
      </motion.div>

      {/* min-h-10 = min-h-[40px] */}
      {/* 스크롤 내렸을때 발생하는 애니메이션 (가로 <-> 세로) */}
      <div className="relative flex min-h-10 w-full items-center justify-center">
        {isScrolled ? (
          <div className="mb-2 flex flex-row items-center gap-2">
            <DateContentDirection
              dateText={dateText}
              dayText={dayText}
              transition={smoothTransition}
              dateTextSize={'text-3xl'}
              dayTextSize={'text-lg'}
            />
          </div>
        ) : (
          <div className="mb-4 flex flex-col items-center">
            <DateContentDirection
              dateText={dateText}
              dayText={dayText}
              transition={smoothTransition}
              dateTextSize={'text-4xl'}
              dayTextSize={'text-base'}
            />
          </div>
        )}
      </div>

      {/* 오늘 연 월 */}
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : 20,
          opacity: isScrolled ? 0 : 1,
        }}
        transition={smoothTransition}
        className="flex justify-center overflow-hidden"
      >
        <p
          className="font-Regular text-sm whitespace-nowrap"
          style={{ color: color['text-secondary'] }}
        >
          {yearMonthText}
        </p>
      </motion.div>
    </div>
  );
};

export default DateContentSection;
