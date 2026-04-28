'use client';
import { motion, Transition } from 'motion/react';
import { cn } from '@/lib/utils';
type DateContentProps = {
  dateText: string;
  dayText: string;
  transition: Transition;
  dateTextSize: string;
  dayTextSize: string;
};

const DateContentDirection = ({
  dateText,
  dayText,
  transition,
  dateTextSize,
  dayTextSize,
}: DateContentProps) => {
  return (
    <>
      <motion.p
        layoutId="dateText"
        transition={transition}
        className={cn(
          'text-brand-color',
          dateTextSize,
          'font-Bold',
          'whitespace-nowrap'
        )}
      >
        {dateText}
      </motion.p>
      <motion.p
        layoutId="dayText"
        transition={transition}
        className={cn(
          'text-brand-color',
          dayTextSize,
          'font-SemiBold',
          'whitespace-nowrap'
        )}
      >
        {dayText}
      </motion.p>
    </>
  );
};

export default DateContentDirection;
