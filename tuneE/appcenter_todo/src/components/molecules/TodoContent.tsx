import TextBox from '../atoms/TextBox';
import IconBox from './IconBox';
import { TodoContentCategory } from '@/types/color';

interface TodoContentProps {
  id: number;
  content: string;
  category: TodoContentCategory;
  dueDate: string;
  completed: boolean;
}

const TodoContent = (props: TodoContentProps) => {
  return (
    <div className="relative flex items-center justify-between px-8">
      <div className="flex items-center justify-center gap-5">
        {/* 할 일 제목 */}
        <TextBox
          content={props.content}
          category={props.category}
          completed={props.completed}
        />
      </div>
      {/* 완료 전/후, 수정, 삭제 아이콘 */}
      <div className="flex justify-end">
        <IconBox
          id={props.id}
          content={props.content}
          dueDate={props.dueDate}
          category={props.category}
          completed={props.completed}
        />
      </div>
    </div>
  );
};

export default TodoContent;
