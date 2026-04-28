// src/lib/api.ts
import { TodoInterface } from '@/store/useTodoStore';

// 클라이언트 컴포넌트용 (rewrites 적용되어 상대경로 사용)
export const clientApi = {
  // GET
  getTodos: async (
    date: string,
    sort: string = 'createdAt'
  ): Promise<TodoInterface[]> => {
    const res = await fetch(`/api/todos?date=${date}&sort=${sort}`);
    if (!res.ok) throw new Error('할 일 목록 조회 실패');
    return res.json();
  },

  // POST
  createTodo: async (body: {
    content: string;
    dueDate: string;
    category: string;
  }): Promise<TodoInterface> => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('할 일 추가 실패');
    return res.json();
  },

  // PATCH
  updateTodo: async (
    id: number,
    body: { content: string; dueDate: string; category: string }
  ): Promise<TodoInterface> => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('할 일 수정 실패');
    return res.json();
  },

  // PATCH (completed 토글)
  toggleCompleted: async (
    id: number,
    completed: boolean
  ): Promise<TodoInterface> => {
    const res = await fetch(`/api/todos/${id}/completed`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error('완료 상태 변경 실패');
    return res.json();
  },

  deleteTodo: async (id: number): Promise<void> => {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('할 일 삭제 실패');
  },
};
