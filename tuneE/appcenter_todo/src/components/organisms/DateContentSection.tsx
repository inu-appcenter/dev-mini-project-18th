"use client";
import { format } from "date-fns";
import { color } from "@/types/color";
// AnimatePresence는 렌더링 부하가 큼
import { motion, Transition } from "framer-motion";

interface DateContentSectionProps {
  isScrolled: boolean;
}

const smoothTransition: Transition = { duration: 0.35, ease: "easeInOut" };

const DateContentSection = ({ isScrolled }: DateContentSectionProps) => {
  const today = new Date();
  const dateText = format(today, "d");
  const dayText = today.toLocaleDateString("ko-KR", { weekday: "long" });
  const yearMonthText = format(today, "yyyy년 M월");

  return (
    <div className="flex flex-col items-center justify-center w-full">
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
        <p
          className="text-2xl whitespace-nowrap"
          style={{ color: color["text-secondary"] }}
        >
          Hello!
        </p>
      </motion.div>

      <div className="relative flex justify-center items-center w-full min-h-[40px]">
        {isScrolled ? (
          // 스크롤 내렸을 때 (가로 배치)
          // 가로 배치, 세로 배치 컴포넌트로 분리해야됨..
          <div className="flex flex-row items-center gap-2  mb-2">
            <motion.p
              layoutId="dateText"
              transition={smoothTransition}
              className="font-bold whitespace-nowrap text-3xl"
              style={{ color: color["brand-color"] }}
            >
              {dateText}
            </motion.p>
            <motion.p
              layoutId="dayText"
              transition={smoothTransition}
              className="font-bold whitespace-nowrap text-lg"
              style={{ color: color["brand-color"] }}
            >
              {dayText}
            </motion.p>
          </div>
        ) : (
          // 스크롤 맨 위일 때 (세로 배치)
          <div className="flex flex-col items-center mb-4">
            <motion.p
              layoutId="dateText"
              transition={smoothTransition}
              className="font-bold whitespace-nowrap text-4xl"
              style={{ color: color["brand-color"] }}
            >
              {dateText}
            </motion.p>
            <motion.p
              layoutId="dayText"
              transition={smoothTransition}
              className="font-bold whitespace-nowrap text-base"
              style={{ color: color["brand-color"] }}
            >
              {dayText}
            </motion.p>
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
          className="text-sm whitespace-nowrap"
          style={{ color: color["text-secondary"] }}
        >
          {yearMonthText}
        </p>
      </motion.div>
    </div>
  );
};

export default DateContentSection;
