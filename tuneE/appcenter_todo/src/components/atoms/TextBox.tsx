'use client';
import { TodoContentCategory, color } from '../../types/color';

interface TextBoxProps {
  content: string;
  category: TodoContentCategory;
}

/* tailwindCSS의 컴파일러(JIT)의 동작방식으로 인해, `bg-${[색깔변수]}`과 같은 형식 사용 불가 */
// 이러한 이유로 색깔변수를 bg-[#123456]과 같은 형태로 설정
const categoryColorMap: Record<TodoContentCategory, string> = {
  IMPORTANT: 'bg-[#D65A5E]',
  MEETING: 'bg-[#8ECA89]',
  STUDY: 'bg-[#F7E096]',
};

const TextBox = ({ content, category }: TextBoxProps) => {
  const roundColor = categoryColorMap[category];

  return (
    <div className="flex items-center gap-2 px-5 py-6">
      {/* 카테고리에 맞는 색깔을 가진 원 */}
      <div
        className={`${roundColor} absolute left-7 h-2.25 w-2.25 shrink-0 rounded-full`}
      />
      <p className="text-text-primary font-SemiBold text-lg leading-7">
        {content}
      </p>
    </div>
  );
};

export default TextBox;
