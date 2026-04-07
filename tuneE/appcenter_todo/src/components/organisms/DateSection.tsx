'use client';
import { format, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSetSelectedDate, useSelectedDate } from '@/store/useTodoStore';

const DateSection = () => {
  const setSelectedDate = useSetSelectedDate();
  const selectedDate = useSelectedDate();

  const today = new Date();
  const start = today;
  const week = Array.from({ length: 5 }, (_, i) => addDays(start, i));

  return (
    <div className="shadow-custom flex w-full gap-2">
      {week.map((day) => {
        const dayString = format(day, 'yyyy-MM-dd');
        const isSelected = dayString === selectedDate;

        return (
          <div
            key={day.toISOString()}
            onClick={() => setSelectedDate(dayString)}
            className={`${isSelected ? 'bg-brand-color text-[#ffffff]' : 'text-text-secondary bg-transparent'} flex h-16.5 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-t-lg transition-colors`}
          >
            <span className="font-Medium text-sm">
              {format(day, 'EEE', { locale: ko })}
            </span>
            <span className="font-SemiBold text-base">{format(day, 'd')}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DateSection;
