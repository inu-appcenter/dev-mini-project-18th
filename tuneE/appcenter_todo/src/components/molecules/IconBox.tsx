'use client';
import { CheckSquare, Square, SquarePen, X } from 'lucide-react';
import { useSetTodos } from '@/store/useTodoStore';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface IconBoxProps {
  id: number;
  content: string;
  dueDate: string;
  category: 'IMPORTANT' | 'MEETING' | 'STUDY';
  completed: boolean;
}

const IconBox = ({
  id,
  content,
  dueDate,
  category,
  completed,
}: IconBoxProps) => {
  const setTodos = useSetTodos();
  // Delete 메서드 요청 보내는 로직
  const handleDelete = async () => {
    try {
      // 서버에 특정 할 일 삭제 요청 (DELETE 메서드)
      const deleteResponse = await fetch(`/todos/${id}`, {
        method: 'DELETE',
      });
      if (deleteResponse.ok) {
        console.log(`${id}번 Todo 삭제 완료!`);
        // 삭제 성공 시, 서버에서 최신 할 일 목록을 다시 가져옴(GET)
        const getResponse = await fetch('/todos');
        const updatedTodos = await getResponse.json();

        // 다시 가져온 데이터를 Zustand 스토어에 초기화
        setTodos(updatedTodos);
      } else {
        console.error('삭제에 실패했습니다.');
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('API 요청 중 에러 발생:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      // 서버에 특정 할 일 완료 설정 (PATCH 메서드)
      const patchResponse = await fetch(`/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          dueDate,
          category,
          completed: !completed,
        }),
      });
      if (patchResponse.ok) {
        if (!completed) {
          console.log(`id:${id} Todo 완료 설정 성공`);
        } else {
          console.log(`id:${id} Todo 미완료 설정 성공`);
        }

        // 완료 요청(데이터 수정 요청) 성공 시, 서버에서 최신 할 일 목록을 다시 가져옴(GET)
        const getResponse = await fetch('/todos');
        const updatedTodos = await getResponse.json();

        // 다시 가져온 데이터를 Zustand 스토어에 초기화
        setTodos(updatedTodos);
      } else {
        console.error('할일 완료 설정에 실패했습니다.');
        alert('할일 완료 설정에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('API 요청 중 에러 발생:', error);
    }
  };

  return (
    <div className="flex">
      {/* 클릭 시 완료 상태로 변경되는 아이콘 */}
      <button onClick={handleToggleComplete} className="cursor-pointer">
        {completed ? (
          <CheckSquare className="text-brand-color" />
        ) : (
          <Square className="text-text-secondary" />
        )}
      </button>

      <Link href={`/amend/${id}`}>
        <SquarePen className="text-text-secondary" />
      </Link>

      {/* 모달창 ("할 일을 삭제하시겠습니까?" - "삭제" / "취소" 버튼)  */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer">
            <X className="text-text-secondary" />
          </button>
        </DialogTrigger>
        {/* h-28 = h-[112px], w-52.75 =w-[211px] */}
        <DialogContent showCloseButton={false} className="h-28 w-52.75">
          <DialogTitle>
            <p className="text-text-primary text-base text-[16px]">
              할 일을 삭제하시겠습니까?
            </p>
          </DialogTitle>
          <DialogDescription className="flex w-fit gap-4">
            <button
              onClick={handleDelete}
              className="rounded-[12px] bg-[#FF7777] px-[24.75px] py-2.5 text-[16px] text-white"
            >
              삭제
            </button>
            <DialogClose asChild>
              <button className="rounded-[12px] px-[24.75px] py-2.5 text-[16px] font-bold text-black">
                취소
              </button>
            </DialogClose>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconBox;
