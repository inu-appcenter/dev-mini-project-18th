"use client";
import HeaderLayout from "@/components/templates/HeaderLayout";
import MainLayout from "@/components/templates/MainLayout";
import AddTodoButton from "@/components/atoms/AddButton";
import { color } from "@/types/color";
import { createContext, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    setIsScrolled(e.currentTarget.scrollTop > 0);
    console.log(`isScrolled: ${isScrolled}`);
  };

  const useContext = createContext({});

  return (
    // h-[100dvh] = h-dvh
    <div
      onScroll={handleScroll}
      className="w-full h-dvh overflow-y-auto scrollbar-hide"
    >
      <useContext.Provider value={{}}></useContext.Provider>
      {/* max-w-103 = max-w-[412px] */}
      <div
        className="mx-auto w-full max-w-103 h-full flex flex-col relative break-keep border-x "
        style={{
          backgroundColor: color["bg-primary"],
          borderColor: color["stroke-primary"],
        }}
      >
        <header
          className="w-full sticky top-0 z-50"
          style={{
            backgroundColor: color["bg-primary"],
          }}
        >
          <HeaderLayout isScrolled={isScrolled} />
        </header>
        <main
          className="w-full h-[800px]"
          style={{
            backgroundColor: color["bg-primary"],
          }}
        >
          {/* 스크롤 테스트 */}
          <MainLayout />
        </main>
        {/* 할 일 추가 버튼 */}
        <aside>
          <AddTodoButton />
        </aside>
      </div>
    </div>
  );
}
