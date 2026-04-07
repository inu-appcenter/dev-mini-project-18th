'use client';
import Link from 'next/link';
import Image from 'next/image';

const AddButton = () => {
  return (
    <>
      {/* 할일 추가 페이지로 이동 */}
      {/* right-[13%] md:right-[38%] */}
      <Link
        href={'/add'}
        className="z-50 flex w-fit items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
      >
        <Image
          src={'/icons/Frame 6.svg'}
          width={60}
          height={60}
          alt="플러스 버튼"
        ></Image>
      </Link>
    </>
  );
};

export default AddButton;
