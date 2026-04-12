import TodoContent from '../molecules/TodoContent';
import {
  useIsAscending,
  useTodos,
  useSelectedDate,
} from '@/store/useTodoStore';

const TodoContentSection = () => {
  const todos = useTodos();
  const selectedDate = useSelectedDate();
  const isAscending = useIsAscending();
  // 선택된 날짜에 해당하는 데이터만 filtering 진행
  const filteredTodos = todos.filter(
    (v) => v.dueDate.split('T')[0] === selectedDate
  );
  // filtering된 데이터를 isAscending을 기준으로 내림차순/오름차순 정렬 (단, 이때 완료된 할 일은 빗금치고 맨 밑으로 보내도록)
  // sort(a, b) a는 1순위 완료 여부, b는 2순위 완료여부이고 a와 b를 비교하여 반환값에 따라 배열의 순서를 결정
  // a와 b는 모두 filteredTodos를 순회하는 filteredTodos의 TodoInterface 타입 파라미터
  const sortedTodos = filteredTodos.sort((a, b) => {
    // a와 b의 완료 상태가 다를 경우(a가 완료라면 a를 배열의 뒤로, 미완료라면 배열의 앞으로)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // a와 b의 완료 상태가 같을 경우
    // 오름차순이라면
    if (isAscending) {
      return a.id - b.id; // 음수를 반환 => a를 배열의 앞으로 (과거 데이터가 위로)
    }
    // 내림차순(기본값;최신순)이라면 id값이 큰 것부터 나열
    else {
      return b.id - a.id; // 양수를 반환 => a를 배열의 뒤로 (최신 데이터가 위로)
    }
  });
  return (
    <div className="w-full">
      {/* sortedTodos를 선택된 날짜와 일치하는 것들만 뿌려주기 */}
      {sortedTodos.map((todo) => (
        <TodoContent key={todo.id} {...todo} />
      ))}
      {/* 선택된 날짜와 일치하는 데이터가 없을 때의 예외처리 */}
      {filteredTodos.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <p className="text-text-secondary">해당 날짜에 일정이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TodoContentSection;
