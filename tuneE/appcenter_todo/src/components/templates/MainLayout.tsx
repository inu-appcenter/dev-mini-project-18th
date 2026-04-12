'use client';
import SortingButton from '../atoms/SortingButton';
import TodoContentSection from '../organisms/TodoContentSection';
import { useToggleSortOrder, useIsAscending } from '@/store/useTodoStore';

const MainLayout = () => {
  const isAscending = useIsAscending(); // 초깃값은 false
  const toggleSortOrder = useToggleSortOrder(); // isAscending 상태를 toggle 해주는 커스텀 훅

  return (
    <div>
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
