"use client";
import {
  ButtonProps,
  DivProps,
  TableProps,
  TdProps,
  TheadProps,
  ThProps,
  TrProps,
} from "@/types/Props";
import Btn from "./Btn";
import dayjs from "dayjs";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import Portal from "./Portal";
import { nanoid } from "nanoid";
import { KorDateAry } from "@/types/Date";
import ArrowBackIcon from "@images/ArrowBack.svg";
import ArrowForwardIcon from "@images/ArrowForward.svg";
import CalenderIcon from "@images/Calender.svg";

export interface DatePickerProps extends Omit<DivProps, "defaultValue" | "onChange"> {
  ControlProps?: DivProps;
  ShowerProps?: DivProps;
  TrgProps?: ButtonProps;
  PositionerProps?: DivProps;
  TableProps?: TableProps;
  TableHeadProps?: TheadProps;
  TableHeadRowProps?: TrProps;
  TableThProps?: ThProps;
  TableRowProps?: TrProps;
  TableDataProps?: TdProps;
  defaultOpen?: boolean;
  defaultValue?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  format?: "YYYY" | `YYYY${string}MM` | `YYYY${string}MM${string}DD`;
}

export function DatePicker({
  ControlProps,
  ShowerProps,
  TrgProps,
  PositionerProps,
  TableProps,
  TableHeadProps,
  TableHeadRowProps,
  TableThProps,
  TableRowProps,
  TableDataProps,
  defaultOpen,
  defaultValue,
  onChange,
  format,
  ...rest
}: DatePickerProps) {
  //Positioner의 열림 여부를 제어하는 state
  const [Mounted, setMounted] = useState<boolean>(defaultOpen ?? false);
  //mounted랑 다르게 mount애니메이션 나타내는 state
  const [Open, setOpen] = useState<boolean>(defaultOpen ?? false);
  const [Value, setValue] = useState<dayjs.Dayjs>(defaultValue ?? dayjs().locale("ko")); //현재 날짜
  const [View, setView] = useState<dayjs.Dayjs>(Value);

  //onChange 설정
  useEffect(() => {
    onChange?.(Value);
  }, [Value]);

  //처음에 locale을 ko로 설정
  useEffect(() => {
    dayjs().locale("ko");
  }, []);

  //dialog가 열리고 닫힐때 마다 view를 value(현재 날짜)로 설정
  useEffect(() => {
    setView(Value);
  }, [Mounted]);

  //Positioner보여주는 함수
  function show() {
    setMounted(true);
    requestAnimationFrame(() => {
      setOpen(true);
    });
  }

  //Positioner 숨기는 함수
  function hide() {
    setOpen(false);
    setTimeout(() => {
      setMounted(false);
    }, 100);
  }

  //table에 렌더링될 content
  const Content = useMemo(() => {
    let ary: ReactElement[] = [];
    let tmp: ReactElement[] = [];

    //배열에 push하는 함수
    function push(el: ReactElement) {
      tmp.push(el);
      if (tmp.length === 7) {
        ary.push(
          <tr className="border-0 w-full flex justify-evenly my-2" key={nanoid()}>
            {tmp.map((v) => v)}
          </tr>
        );

        tmp = [];
      }
    }

    const FirstDay = View.startOf("month").day();
    let PrevDate = View.subtract(1, "month").endOf("month").date() - FirstDay + 1;
    for (let i = 0; i < FirstDay; ++i) {
      push(
        <td
          className="text-base font-medium opacity-50 flex items-center justify-center
        w-8 aspect-square cursor-pointer hover:bg-[rgba(129,139,152,0.15)]"
          key={nanoid()}
          onClick={() => {
            setValue(View.subtract(1, "month").set("date", PrevDate));
            hide();
          }}
        >
          {PrevDate}
        </td>
      );
      ++PrevDate;
    }

    for (let i = 1; i <= View.daysInMonth(); ++i) {
      push(
        <td
          className={`text-base text-current flex items-center justify-center w-8 aspect-square 
        hover:bg-[rgba(129,139,152,0.15)]
        ${View.set("date", i).isSame(Value) && i === Value.date() ? "font-bold underline underline-offset-6" : "font-medium"}`}
          key={nanoid()}
          onClick={() => {
            setValue(View.set("date", i));
            hide();
          }}
        >
          {i}
        </td>
      );
    }

    let cnt = 1;
    for (let i = View.endOf("month").day(); i <= 6; ++i) {
      push(
        <td
          className="text-base font-medium opacity-50 flex items-center justify-center w-8 
        aspect-square hover:bg-[rgba(129,139,152,0.15)]"
          key={nanoid()}
          onClick={() => {
            setValue(View.add(1, "month").set("date", cnt));
            hide();
          }}
        >
          {cnt}
        </td>
      );
      ++cnt;
    }

    return <>{ary.map((tr) => tr)}</>;
  }, [View]);

  return (
    <div
      {...rest}
      className={twMerge("w-auto max-w-full h-auto flex flex-col relative", rest.className)}
      data-scope="date-picker"
      data-part="root"
    >
      <div
        {...ControlProps}
        className={twMerge(
          "flex items-center w-auto h-auto max-w-full max-h-full relative rounded-sm",
          ControlProps?.className
        )}
        data-scope="date-picker"
        data-part="control"
      >
        <div
          {...ShowerProps}
          className={twMerge(
            "flex-[1_1_0%] flex items-center justify-center h-10 max-w-full max-h-full text-sm",
            "rounded-sm appearance-none",
            "text-(--fg-primary)",
            ShowerProps?.className
          )}
          data-scope="date-picker"
          data-part="shower"
        >
          <Btn
            className="p-0 w-6 h-6 mr-auto ml-6.5 hover:bg-[rgba(129,139,152,0.15)]
                        flex items-center justify-center"
            onClick={() => {
              if (Mounted && Open) setView((v) => v.subtract(1, "month"));
              else setValue((v) => v.subtract(5, "day"));
            }}
          >
            <ArrowBackIcon />
          </Btn>

          <div
            className="flex flex-row items-center justify-center mr-2 h-6 text-(--brand-color)
                    font-bold"
          >
            <Btn
              className="w-6 h-6 z-2 hover:bg-[rgba(129,139,152,0.15)] p-[0.175rem] rounded-sm 
                          text-(--text-primary) mr-0.5"
              onClick={() => {
                if (!Mounted) show();
                else hide();
              }}
            >
              <CalenderIcon />
            </Btn>
            {`${Value.format("MM월 DD일")} ${KorDateAry[Value.day()]}요일`}
          </div>

          <Btn
            className="p-0 w-6 h-6 ml-auto mr-6.5 hover:bg-[rgba(129,139,152,0.15)]
                        flex items-center justify-center"
            onClick={() => {
              if (Mounted && Open) setView((v) => v.add(1, "month"));
              else setValue((v) => v.add(5, "day"));
            }}
          >
            <ArrowForwardIcon />
          </Btn>
        </div>
      </div>

      <Portal
        className="w-full max-w-full max-h-full h-full absolute z-1"
        onClick={(e) => {
          if (e.currentTarget === e.target) hide();
        }}
      ></Portal>

      {Mounted && (
        <div
          {...PositionerProps}
          className={twMerge(
            "w-full max-w-full h-auto border-y border-solid border-(--stroke-primary) absolute",
            "top-12.5 p-2 rounded-sm z-2 bg-(--bg-color)",
            PositionerProps?.className
          )}
          data-scope="date-picker"
          data-part="positioner"
          data-open={open}
        >
          <div className="flex flex-row w-full max-w-full justify-center z-2">
            {View.format(format ?? "YYYY년 MM월")}
          </div>

          <table
            {...TableProps}
            className={twMerge(
              "border-0 border-separate w-full max-w-full h-auto",
              TableProps?.className
            )}
          >
            <thead
              className="border-0 w-full max-w-full h-auto
            mt-6 flex justify-evenly"
            >
              {KorDateAry.map((kor) => (
                <th className="w-8 aspect-square whitespace-nowrap">{kor}</th>
              ))}
            </thead>

            <tbody className="border-0 w-full h-auto flex flex-col items-center">{Content}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
