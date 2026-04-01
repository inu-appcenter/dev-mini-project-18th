import { color } from "@/types/color";
import { ChevronLeft } from "lucide-react";
import FormField from "@/components/atoms/FromField";
import Link from "next/link";
const Page = () => {
  return (
    <>
      <div className="w-full h-dvh overflow-y-auto scrollbar-hide">
        {/* max-w-103 = max-w-[412px] */}
        <div
          className="mx-auto w-full max-w-103 h-full flex flex-col relative break-keep border-x "
          style={{
            backgroundColor: color["bg-primary"],
            borderColor: color["stroke-primary"],
          }}
        >
          {/* 할 일 추가 */}
          <section
            className="w-full relative z-10"
            style={{
              backgroundColor: color["bg-primary"],
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
          >
            <Link href={"../"}>
              <ChevronLeft
                className="absolute left-1 top-4.5 cursor-pointer"
                style={{ color: color["text-primary"] }}
              />
            </Link>

            <FormField title="할 일 추가" />
          </section>
          {/* 할 일 내용, 날짜, 카테고리 */}
          <section
            className="w-full"
            style={{
              backgroundColor: color["bg-primary"],
            }}
          >
            <FormField title="할 일 내용">
              <input
                type="text"
                className="px-2 py-1  border rounded-md placeholder:text-[#8B8B8B] focus:ring-2 focus:outline-none"
                style={{
                  color: color["text-secondary"],
                  borderColor: color["stroke-primary"],
                }}
                placeholder="할 일을 입력해주세요."
              />
            </FormField>
            <FormField title="날짜">
              <input
                type="date"
                className="px-2 py-1 placeholder:text-[#8B8B8B] border rounded-md  focus:ring-2 focus:outline-none"
                style={{
                  color: color["text-secondary"],
                  borderColor: color["stroke-primary"],
                }}
              />
            </FormField>
            {/* (예정)활성화 시 카테고리별 색상 적용 */}
            <FormField title="카테고리">
              <div className="flex gap-4">
                <button
                  className="border px-2 py-1  rounded-xl cursor-pointer"
                  style={{
                    color: color["text-primary"],
                    borderColor: color["stroke-primary"],
                  }}
                >
                  중요한 일
                </button>
                <button
                  className="border px-2 py-1  rounded-xl cursor-pointer"
                  style={{
                    color: color["text-primary"],
                    borderColor: color["stroke-primary"],
                  }}
                >
                  회의
                </button>
                <button
                  className="border px-2 py-1  rounded-xl cursor-pointer "
                  style={{
                    color: color["text-primary"],
                    borderColor: color["stroke-primary"],
                  }}
                >
                  스터디
                </button>
              </div>
            </FormField>
          </section>
          {/* 취소, 추가 */}
          <section className="w-full px-8 flex justify-end">
            <div className="flex gap-2">
              <Link
                href="../"
                className="px-3"
                style={{ color: color["text-secondary"] }}
              >
                취소
              </Link>
              {/* (예정)모든 폼을 다 채워야만 제출가능 및 버튼이 brand-color로 바뀜 */}
              {/* 클릭 시 서버로 요청을 보내고 메인화면으로 돌아가도록 */}
              <button
                className="border px-3 rounded-md"
                style={{
                  color: color["bg-primary"],
                  backgroundColor: color["stroke-primary"],
                }}
              >
                추가
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
<></>;
