'use client';
import SortingButton from '../atoms/SortingButton';
import TodoContentSection from '../organisms/TodoContentSection';
import {
  useToggleSortOrder,
  useIsAscending,
  useTodos,
} from '@/store/useTodoStore';

const MainLayout = () => {
  const isAscending = useIsAscending(); // 초깃값은 false
  const toggleSortOrder = useToggleSortOrder(); // isAscending 상태를 toggle 해주는 커스텀 훅
  const todos = useTodos();
  const hasTodos = todos.length > 0;

  return (
    <div className="relative">
      {/* 할 일이 하나라도 있을 때만 구분선(세로 점선) 보이도록 */}
      {hasTodos && (
        <div
          aria-hidden
          className="border-stroke-primary pointer-events-none absolute top-0 bottom-0 left-8 border-l border-dashed"
        />
      )}

      <SortingButton
        handleSorting={toggleSortOrder}
        isUpperSorted={isAscending}
      />
      {/* 선택된 날짜와 일치하는 것들만 뿌려주기 */}
      <TodoContentSection />
    </div>
  );
};

export default MainLayout;
