'use client';
import SortingButton from '../atoms/SortingButton';
import TodoContentSection from '../organisms/TodoContentSection';
import { useState } from 'react';

const MainLayout = () => {
  const [isUpperSorted, setIsUpperSorted] = useState(false);
  const handleSorting = () => {
    setIsUpperSorted((prev) => !prev);
  };
  return (
    <div>
      <SortingButton
        handleSorting={handleSorting}
        isUpperSorted={isUpperSorted}
      />
      {/* 선택된 날짜와 일치하는 것들만 뿌려주기 */}
      <TodoContentSection />
    </div>
  );
};

export default MainLayout;
