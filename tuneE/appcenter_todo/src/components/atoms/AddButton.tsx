"use client";
import { color } from "@/types/color";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

const AddButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  return (
    <>
      {/* 할일 추가 페이지로 이동 */}
      <Link
        href={"/add"}
        className="absolute bottom-8 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 z-50"
        style={{ backgroundColor: color["brand-color"] }}
      >
        {/* 플러스 아이콘 */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 19.5H19.5V27C19.5 27.825 18.825 28.5 18 28.5C17.175 28.5 16.5 27.825 16.5 27V19.5H9C8.175 19.5 7.5 18.825 7.5 18C7.5 17.175 8.175 16.5 9 16.5H16.5V9C16.5 8.175 17.175 7.5 18 7.5C18.825 7.5 19.5 8.175 19.5 9V16.5H27C27.825 16.5 28.5 17.175 28.5 18C28.5 18.825 27.825 19.5 27 19.5Z"
            fill="white"
          />
        </svg>
      </Link>
    </>
  );
};

export default AddButton;
