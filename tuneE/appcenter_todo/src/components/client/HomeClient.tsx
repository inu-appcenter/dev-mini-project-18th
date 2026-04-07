'use client';
import HeaderLayout from '@/components/templates/HeaderLayout';
import MainLayout from '@/components/templates/MainLayout';
import AddTodoButton from '@/components/atoms/AddButton';
import { useState, useEffect } from 'react';
import { Todo, useSetTodos } from '@/store/useTodoStore';

type HomeClientProps = {
  Todos: Todo[];
};

const HomeClient = ({ Todos }: HomeClientProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const setTodos = useSetTodos();

  // useEffect()는 렌더링이 되고 나서 실행되므로 서버 컴포넌트를 도입한 이유가 없다..
  // SSR의 장점을 최대한 살리는 방향을 찾아야 함
  // tanstack Query 도입 예정
  useEffect(() => {
    setTodos(Todos);
  }, [Todos]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  };

  return (
    <div
      onScroll={handleScroll}
      className="scrollbar-hide relative h-dvh w-full overflow-y-auto"
    >
      <div className="bg-bg-primary border-stroke-primary relative mx-auto flex min-h-full w-full max-w-103 flex-col border-x break-keep">
        <header className="bg-bg-primary sticky top-0 z-50 w-full">
          <HeaderLayout isScrolled={isScrolled} />
        </header>
        <main className="bg-bg-primary h-[200vh] w-full">
          <MainLayout />
        </main>
        <aside className="sticky bottom-4 z-50 mr-3 flex w-fit justify-end self-end">
          <AddTodoButton />
        </aside>
      </div>
    </div>
  );
};

export default HomeClient;
