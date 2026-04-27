'use client';
import { CheckSquare, Square, SquarePen, X } from 'lucide-react';
// import { useSelectedDate, useSetTodos } from '@/store/useTodoStore';
import { useDeleteTodo, useToggleCompleted } from '@/hooks/useTodosQuery';

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

const IconBox = ({ id, completed }: IconBoxProps) => {
  // const setTodos = useSetTodos();
  // const selectedDate = useSelectedDate();
  const deleteMutation = useDeleteTodo();
  const toggleMutation = useToggleCompleted();

  // DELETE  요청 보내는 로직
  const handleDelete = async () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        console.log(`${id}번 Todo 삭제 완료`);
      },
      onError: () => {
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  const handleToggleComplete = async () => {
    toggleMutation.mutate(
      { id, completed: !completed },
      {
        onSuccess: (updatedTodo) => {
          console.log(
            `id:${id} Todo ${!completed ? '완료' : '미완료'} 설정 성공`
          );
        },
        onError: () => {
          alert('완료 설정에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
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
