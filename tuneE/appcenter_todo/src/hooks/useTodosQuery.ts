// tanstack query 훅

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/lib/api';

export const todoKeys = {
  all: ['todos'] as const,
  byDate: (date: string) => ['todos', date] as const,
};

// 날짜별 조회
export const useGetTodos = (date: string) => {
  return useQuery({
    queryKey: todoKeys.byDate(date),
    queryFn: () => clientApi.getTodos(date),
  });
};

// 생성
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
};

// 수정
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: Parameters<typeof clientApi.updateTodo>[1];
    }) => clientApi.updateTodo(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
};

// 완료 토글
export const useToggleCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      clientApi.toggleCompleted(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
};

// 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
};
