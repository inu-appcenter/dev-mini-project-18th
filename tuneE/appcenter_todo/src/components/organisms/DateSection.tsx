"use client";
import { useState } from "react";
import { format, addDays } from "date-fns";
import { ko } from "date-fns/locale";
import { color } from "@/types/color";

const DateSection = () => {
  const [selected, setSelected] = useState(new Date());
  const today = new Date();
  const start = today;
  const week = Array.from({ length: 5 }, (_, i) => addDays(start, i));

  return (
    <div
      className="w-full flex gap-2"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      }}
    >
      {week.map((day) => {
        const isSelected =
          format(day, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd");
        return (
          <div
            key={day.toISOString()}
            onClick={() => setSelected(day)}
            className="flex flex-col flex-1 justify-center items-center gap-1 h-16.5 cursor-pointer transition-colors"
            style={{
              backgroundColor: isSelected
                ? color["brand-color"]
                : "transparent",
              color: isSelected ? "#FFFFFF" : color["text-secondary"],
              borderRadius: "4px 4px 0 0",
            }}
          >
            <span className="text-sm">
              {format(day, "EEE", { locale: ko })}
            </span>
            <span className="text-base font-semibold">{format(day, "d")}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DateSection;
