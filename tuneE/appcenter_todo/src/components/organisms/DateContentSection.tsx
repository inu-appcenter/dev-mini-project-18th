'use client';
import { format } from 'date-fns';
// framer-motion 에서 motion/react로 변경됨 (용량최적화, 구조분리)
import { motion, Transition } from 'motion/react';
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
    <div className="flex w-full flex-col items-center justify-center font-sans">
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : 24,
          opacity: isScrolled ? 0 : 1,
          marginBottom: isScrolled ? 0 : 14,
        }}
        transition={smoothTransition}
        className="flex justify-center overflow-hidden"
      >
        <p className="text-text-secondary font-Regular text-[24px] leading-none whitespace-nowrap">
          Hello!
        </p>
      </motion.div>

      {/* min-h-10 = min-h-[40px] */}
      {/* 스크롤 내렸을때 발생하는 애니메이션 (가로 <-> 세로) */}
      <div className="relative flex min-h-10 w-full items-center justify-center">
        {isScrolled ? (
          // 스크롤 올렸을 때; 휠을 내렸을 때 (가로 모드)
          <div className="mb-2 flex flex-row items-center gap-2">
            <DateContentDirection
              dateText={dateText}
              dayText={dayText}
              transition={smoothTransition}
              dateTextSize={'text-[60px] font-Bold'}
              dayTextSize={'text-[20px] font-SemiBold'}
            />
          </div>
        ) : (
          // 스크롤 내렸을 때; 휠을 올렸을 때 (세로 모드)
          <div className="mb-3 flex flex-col items-center">
            <DateContentDirection
              dateText={dateText}
              dayText={dayText}
              transition={smoothTransition}
              dateTextSize={'text-[60px] font-Bold leading-none'}
              dayTextSize={'text-[20px] font-SemiBold leading-none'}
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
        {/* 연월: 14px, Regular(400), 100%(leading-none) */}
        <p className="text-text-secondary font-Regular text-[14px] leading-none whitespace-nowrap">
          {yearMonthText}
        </p>
      </motion.div>
    </div>
  );
};

export default DateContentSection;
