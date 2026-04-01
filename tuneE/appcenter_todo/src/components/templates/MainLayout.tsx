"use client";
import SortingButton from "../atoms/SortingButton";
import TodoContentSection from "../organisms/TodoContentSection";
import { useState } from "react";

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
      <TodoContentSection />
    </div>
  );
};

export default MainLayout;
