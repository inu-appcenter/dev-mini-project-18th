import TodoContent from '../molecules/TodoContent';
import { useTodos, useSelectedDate } from '@/store/useTodoStore';

const TodoContentSection = () => {
  const todos = useTodos();
  const selectedDate = useSelectedDate();
  const filteredTodos = todos.filter(
    (v) => v.dueDate.split('T')[0] === selectedDate
  );
  return (
    <div className="w-full">
      {/* 선택된 날짜와 일치하는 것들만 뿌려주기 */}
      {filteredTodos.map((todo) => (
        <TodoContent key={todo.id} {...todo} />
      ))}
      {/* 선택된 날짜와 일치하는 데이터가 없을 때 */}
      {filteredTodos.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <p className="text-text-secondary">해당 날짜에 일정이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default TodoContentSection;
