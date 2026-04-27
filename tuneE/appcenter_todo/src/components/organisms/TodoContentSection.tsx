'use client';

import TodoContent from '../molecules/TodoContent';
import { useIsAscending, useSelectedDate } from '@/store/useTodoStore';
import { useGetTodos } from '@/hooks/useTodosQuery';

const TodoContentSection = () => {
  const selectedDate = useSelectedDate();
  const isAscending = useIsAscending();
  const { data: todos = [], isLoading, isError } = useGetTodos(selectedDate);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-text-secondary">불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-text-secondary">데이터를 불러오지 못했습니다.</p>
      </div>
    );
  }

  // todos 데이터를 isAscending을 기준으로 내림차순/오름차순 정렬 (단, 이때 완료된 할 일은 빗금치고 맨 밑으로 보내도록)
  const sortedTodos =
    // 원본배열이 수정되는 것을 방지하기 위해 스프레드 연산자로 새로운 배열 생성
    [...todos].sort((a, b) => {
      // a와 b의 완료 상태가 다를 경우(a가 완료라면 a를 배열의 뒤로, 미완료라면 배열의 앞으로)
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // a와 b의 완료 상태가 같을 경우
      // 오름차순이라면
      if (isAscending)
        return a.id - b.id; // 음수를 반환 => a를 배열의 앞으로 (과거 데이터가 위로)
      // 내림차순이라면 id값이 큰 것부터 나열
      else return b.id - a.id; // 양수를 반환 => a를 배열의 뒤로 (최신 데이터가 위로)
    });

  return (
    <div className="w-full">
      {sortedTodos.map((todo) => (
        <TodoContent key={todo.id} {...todo} />
      ))}

      {sortedTodos.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <p className="text-text-secondary">해당 날짜에 일정이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TodoContentSection;
